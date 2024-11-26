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
});
