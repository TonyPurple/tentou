import dayjs from "dayjs";
import { formatPrice } from "../lib/formatPrice";
import {
  getProductsByClerkId,
  getSalesByStoreClerkId,
  getUserByClerkId,
  queryWithUser,
} from "./utils";
import { Doc, Id } from "./_generated/dataModel";

export const getDashboardStats = queryWithUser({
  args: {},
  handler: async (ctx) => {
    const sales = await getSalesByStoreClerkId(ctx.db, ctx.userId!);
    const products = await getProductsByClerkId(ctx.db, ctx.userId!);
    const revenue = sales.reduce((acc, sale) => acc + sale.price, 0);
    const formattedRevenue = formatPrice({ price: revenue });

    return {
      totalRevenue: formattedRevenue,
      totalSales: sales.length,
      totalProducts: products.length,
    };
  },
});

export const getDashboardSales = queryWithUser({
  args: {},
  handler: async (ctx) => {
    const sales = await getSalesByStoreClerkId(ctx.db, ctx.userId!);

    const oneWeekAgo = dayjs().subtract(7, "day");
    const recentSales = sales.filter((sale) =>
      dayjs(sale._creationTime).isAfter(oneWeekAgo)
    );

    const past7Days = getPast7Days();
    const salesByDay = past7Days.map(({ date, day }) => {
      return {
        day,
        date,
        revenue: calculateRevenueForDay(day, recentSales),
      };
    });

    return salesByDay;
  },
});

function getPast7Days() {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const date = dayjs().subtract(i, "day").format("YYYY-MM-DD");
    const day = dayjs().subtract(i, "day").format("dddd");
    days.push({ date, day });
  }
  return days;
}

function calculateRevenueForDay(dayName: string, sales: Doc<"sales">[]) {
  return sales
    .filter((sale) => dayjs(sale._creationTime).format("dddd") === dayName)
    .reduce((acc, sale) => acc + sale.price, 0);
}

export const getAllSales = queryWithUser({
  args: {},
  handler: async (ctx) => {
    const sales = await getSalesByStoreClerkId(ctx.db, ctx.userId!);

    const salesWithMetadata = await Promise.all(
      sales.map(async (sale) => {
        const customer = await getUserByClerkId(ctx.db, sale.customerClerkId);
        const product = await ctx.db.get(sale.productId as Id<"products">);

        return {
          ...sale,
          customerLogo: customer?.logo,
          customerName: customer?.name,
          productName: product?.name,
          customerEmail: customer?.email,
        };
      })
    );

    return salesWithMetadata;
  },
});
