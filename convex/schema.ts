import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    username: v.string(),
    name: v.string(),
    email: v.string(),
    about: v.optional(v.string()),
    logo: v.optional(v.string()),
  }),

  products: defineTable({
    clerkId: v.string(),
    name: v.string(),
    description: v.string(),
    content: v.optional(v.string()),
    price: v.number(),
    currency: v.string(),
    coverImage: v.optional(v.string()),
    published: v.boolean(),
  }),

  sales: defineTable({
    storeClerkId: v.string(),
    customerClerkId: v.string(),
    productId: v.string(),
    price: v.number(),
    currency: v.string(),
  }),

  keys: defineTable({
    clerkId: v.string(),
    stripeKey: v.string(),
  }),
});
