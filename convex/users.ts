import { ConvexError, v } from "convex/values";
import { internalMutation } from "./_generated/server";
import { generateUsername } from "friendly-username-generator";
import { getUserByClerkId, mutationWithUser, queryWithUser } from "./utils";

export const getUser = queryWithUser({
  args: {},
  handler: ctx => {
    return getUserByClerkId(ctx.db, ctx.userId!);
  },
});

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

export const updateUser = mutationWithUser({
  args: {
    userId: v.id("users"),
    name: v.string(),
    about: v.string(),
    username: v.string(),
  },
  handler: async (ctx, { userId, name, about, username }) => {
    const isUsernameTaken = await ctx.db
      .query("users")
      .withIndex("by_username", q => q.eq("username", username))
      .filter(q => q.neq(q.field("clerkId"), ctx.userId!))
      .first();

    if (isUsernameTaken) {
      throw new ConvexError("USERNAME_TAKEN");
    }

    await ctx.db.patch(userId, { name, about, username });
  },
});
