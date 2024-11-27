import { v } from "convex/values";
import { mutationWithUser } from "./utils";

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
