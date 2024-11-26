import { Auth } from "convex/server";
import {
  customCtx,
  customQuery,
  customMutation,
  customAction,
} from "convex-helpers/server/customFunctions";
import { query, mutation, action } from "./_generated/server";
import { ConvexError } from "convex/values";

async function getUserId(ctx: { auth: Auth }) {
  const authInfo = await ctx.auth.getUserIdentity();
  return authInfo?.subject;
}

export const queryWithUser = customQuery(
  query,
  customCtx(async ctx => {
    return {
      userId: await getUserId(ctx),
    };
  }),
);

export const mutationWithUser = customMutation(
  mutation,
  customCtx(async ctx => {
    const userId = await getUserId(ctx);
    if (userId === undefined) {
      throw new ConvexError("User must be logged in.");
    }
    return { userId };
  }),
);

export const actionWithUser = customAction(
  action,
  customCtx(async ctx => {
    const userId = await getUserId(ctx);
    if (userId === undefined) {
      throw new ConvexError("User must be logged in.");
    }
    return { userId };
  }),
);
