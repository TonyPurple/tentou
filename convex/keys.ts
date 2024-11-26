import { v } from "convex/values";
import { getKeyByClerkId, mutationWithUser, queryWithUser } from "./utils";

export const getStripeSecretKey = queryWithUser({
  args: {},
  handler: (ctx) => {
    return getKeyByClerkId(ctx.db, ctx.userId!);
  },
});

export const createStripeSecretKey = mutationWithUser({
  args: {
    stripeKey: v.string(),
  },
  handler: async (ctx, { stripeKey }) => {
    const hasStripeKey = await getKeyByClerkId(ctx.db, ctx.userId!);

    if (hasStripeKey) {
      await ctx.db.patch(hasStripeKey._id, { stripeKey });
    } else {
      await ctx.db.insert("keys", { clerkId: ctx.userId, stripeKey });
    }
  },
});
