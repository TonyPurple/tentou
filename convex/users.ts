import { v } from "convex/values";
import { query } from "./_generated/server";

export const getUsers = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, { userId }) => {
    return ctx.db.get(userId);
  },
});
