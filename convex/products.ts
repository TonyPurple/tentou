import { ConvexError, v } from "convex/values";
import { mutationWithUser, queryWithUser } from "./utils";
import { Id } from "./_generated/dataModel";

export const getProduct = queryWithUser({
  args: {
    productId: v.string(),
  },
  handler: (ctx, { productId }) => {
    return ctx.db.get(productId as Id<"products">);
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
