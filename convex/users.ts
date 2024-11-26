import { v } from "convex/values";
import { internalMutation } from "./_generated/server";
import { generateUsername } from "friendly-username-generator";

export const createUser = internalMutation({
  args: {
    clerkId: v.string(),
    name: v.string(),
    email: v.string(),
  },
  handler: async (ctx, { clerkId, name, email }) => {
    await ctx.db.insert("users", {
      clerkId,
      name,
      email,
      username: generateUsername(),
    });
  },
});
