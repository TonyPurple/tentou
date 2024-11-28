import { Auth } from "convex/server";
import {
  customAction,
  customCtx,
  customMutation,
  customQuery,
} from "convex-helpers/server/customFunctions";
import { action, DatabaseReader, mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

async function getUserId(ctx: { auth: Auth }) {
  const authInfo = await ctx.auth.getUserIdentity();
  return authInfo?.subject;
}

export const queryWithUser = customQuery(
  query,
  customCtx(async (ctx) => {
    return {
      userId: await getUserId(ctx),
    };
  })
);

export const mutationWithUser = customMutation(
  mutation,
  customCtx(async (ctx) => {
    const userId = await getUserId(ctx);
    if (userId === undefined) {
      throw new ConvexError("User must be logged in.");
    }
    return { userId };
  })
);

export const actionWithUser = customAction(
  action,
  customCtx(async (ctx) => {
    const userId = await getUserId(ctx);
    if (userId === undefined) {
      throw new ConvexError("User must be logged in.");
    }
    return { userId };
  })
);

export const getUserByClerkId = async (db: DatabaseReader, clerkId: string) => {
  const user = await db
    .query("users")
    .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkId))
    .first();

  const key = await getKeyByClerkId(db, clerkId);

  const hasStripeKey = !!key?.stripeKey;

  return { ...user, hasStripeKey };
};

export const getUserByUsername = async (
  db: DatabaseReader,
  username: string
) => {
  const user = await db
    .query("users")
    .withIndex("by_username", (q) => q.eq("username", username))
    .first();
  return user;
};

export const getProductsByClerkId = async (
  db: DatabaseReader,
  clerkId: string
) => {
  const products = await db
    .query("products")
    .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkId))
    .collect();
  return products;
};

export const getSalesByStoreClerkId = async (
  db: DatabaseReader,
  storeClerkId: string
) => {
  const sales = await db
    .query("sales")
    .withIndex("by_storeClerkId", (q) => q.eq("storeClerkId", storeClerkId))
    .collect();
  return sales;
};

export const getSalesByProductId = async (
  db: DatabaseReader,
  productId: string
) => {
  const sales = await db
    .query("sales")
    .withIndex("by_productId", (q) => q.eq("productId", productId))
    .collect();
  return sales;
};

export const getSalesByCustomerClerkId = async (
  db: DatabaseReader,
  customerClerkId: string
) => {
  const sales = await db
    .query("sales")
    .withIndex("by_customerClerkId", (q) =>
      q.eq("customerClerkId", customerClerkId)
    )
    .collect();
  return sales;
};

export const getKeyByClerkId = async (db: DatabaseReader, clerkId: string) => {
  const key = await db
    .query("keys")
    .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkId))
    .first();
  return key;
};
