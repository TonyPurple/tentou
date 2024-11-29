import { Id } from "./_generated/dataModel";
import { getSalesByCustomerClerkId, queryWithUser } from "./utils";
import { ConvexError, v } from "convex/values";

export const getLibraryProducts = queryWithUser({
  args: {},
  handler: async (ctx) => {
    const sales = await getSalesByCustomerClerkId(ctx.db, ctx.userId!);

    const products = await Promise.all(
      sales.map((sale) => {
        return ctx.db.get(sale.productId as Id<"products">);
      })
    );

    return products;
  },
});

export const getLibraryProduct = queryWithUser({
  args: {
    productId: v.string(),
  },
  handler: async (ctx, { productId }) => {
    const sales = await getSalesByCustomerClerkId(ctx.db, ctx.userId!);

    const hasPurchasedProduct = sales.find(
      (sale) => sale.productId === productId
    );

    if (!hasPurchasedProduct) {
      throw new ConvexError("Unauthorized");
    }

    const product = await ctx.db.get(productId as Id<"products">);

    return product;
  },
});
