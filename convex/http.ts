import { httpRouter } from "convex/server";
import { onCreateUser } from "./clerk";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";

const http = httpRouter();

http.route({
  path: "/clerk",
  method: "POST",
  handler: onCreateUser,
});

http.route({
  path: "/stripe",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const signature = request.headers.get("stripe-signature");

    const result = await ctx.runAction(internal.stripe.fulfill, {
      payload: await request.text(),
      signature,
    });

    if (result.success) {
      return new Response(null, { status: 200 });
    } else {
      return new Response("Webhook Error", { status: 400 });
    }
  }),
});

export default http;
