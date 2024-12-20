import { ConvexError, v } from "convex/values";
import {
  getProductsByClerkId,
  getSalesByProductId,
  getUserByClerkId,
  getUserByUsername,
  mutationWithUser,
  queryWithUser,
} from "./utils";
import { Id } from "./_generated/dataModel";
import { query } from "./_generated/server";

export const getProduct = queryWithUser({
  args: {
    productId: v.string(),
  },
  handler: (ctx, { productId }) => {
    return ctx.db.get(productId as Id<"products">);
  },
});

export const getProducts = queryWithUser({
  args: {},
  handler: async (ctx) => {
    const user = await getUserByClerkId(ctx.db, ctx.userId!);
    const products = await getProductsByClerkId(ctx.db, ctx.userId!);

    const productsWithRevenue = await Promise.all(
      products.map(async (product) => {
        const sales = await getSalesByProductId(ctx.db, product._id);

        return {
          ...product,
          sales: sales.length,
          user,
          revenue: sales.reduce((acc, sale) => acc + sale.price, 0),
        };
      })
    );

    return productsWithRevenue;
  },
});

export const createProduct = mutationWithUser({
  args: {
    name: v.string(),
    description: v.string(),
    price: v.number(),
    coverImage: v.string(),
    content: v.string(),
    published: v.boolean(),
  },
  handler: async (
    ctx,
    { name, description, price, coverImage, content, published }
  ) => {
    await ctx.db.insert("products", {
      clerkId: ctx.userId,
      name,
      currency: "CAD",
      description,
      price: Number(price.toFixed(2)),
      coverImage,
      content,
      published,
    });
  },
});

export const updateProduct = mutationWithUser({
  args: {
    productId: v.id("products"),
    name: v.string(),
    description: v.string(),
    price: v.number(),
    coverImage: v.string(),
    content: v.string(),
    published: v.boolean(),
  },
  handler: async (
    ctx,
    { productId, name, description, price, coverImage, content, published }
  ) => {
    const product = await ctx.db.get(productId);

    if (ctx.userId !== product?.clerkId) {
      throw new ConvexError("Unauthorized");
    }

    await ctx.db.patch(productId, {
      clerkId: ctx.userId,
      name,
      currency: "CAD",
      description,
      price: Number(price.toFixed(2)),
      coverImage,
      content,
      published,
    });
  },
});

export const deleteProduct = mutationWithUser({
  args: {
    productId: v.id("products"),
  },
  handler: async (ctx, { productId }) => {
    const product = await ctx.db.get(productId);

    if (ctx.userId !== product?.clerkId) {
      throw new ConvexError("Unauthorized");
    }

    await ctx.db.delete(productId);
  },
});

export const getStorePage = query({
  args: {
    username: v.string(),
  },
  handler: async (ctx, { username }) => {
    const store = await getUserByUsername(ctx.db, username);
    const products = await getProductsByClerkId(ctx.db, store?.clerkId!);
    return { store, products };
  },
});

export const getStoreProduct = query({
  args: {
    productId: v.string(),
  },
  handler: async (ctx, { productId }) => {
    const product = await ctx.db.get(productId as Id<"products">);

    if (!product) {
      return null;
    }

    const user = await getUserByClerkId(ctx.db, product.clerkId);

    const sales = await getSalesByProductId(ctx.db, productId);

    return { ...product, user, sales: sales.length };
  },
});
