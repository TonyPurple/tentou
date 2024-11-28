import { v } from "convex/values";
import { internalQuery } from "./_generated/server";
import { getKeyByClerkId, getUserByClerkId } from "./utils";

export const getStoreStripeKey = internalQuery({
  args: {
    storeClerkId: v.string(),
  },
  handler: async (ctx, { storeClerkId }) => {
    const key = await getKeyByClerkId(ctx.db, storeClerkId);
    return key?.stripeKey;
  },
});

export const getStore = internalQuery({
  args: {
    storeClerkId: v.string(),
  },
  handler: (ctx, { storeClerkId }) => {
    return getUserByClerkId(ctx.db, storeClerkId);
  },
});

export const getProduct = internalQuery({
  args: {
    productId: v.id("products"),
  },
  handler: (ctx, { productId }) => {
    return ctx.db.get(productId);
  },
});
