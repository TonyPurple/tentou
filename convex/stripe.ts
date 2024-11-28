// @ts-nocheck

"use node";

import Stripe from "stripe";
import { action, internalAction } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";

const domain = process.env.HOSTING_URL ?? "http://localhost:3000";

export const pay = action({
  args: {
    storeClerkId: v.string(),
    customerClerkId: v.string(),
    productId: v.id("products"),
  },
  handler: async (
    { runQuery },
    { storeClerkId, customerClerkId, productId }
  ) => {
    const product = await runQuery(internal.stripe_utils.getProduct, {
      productId,
    });
    const store = await runQuery(internal.stripe_utils.getStore, {
      storeClerkId,
    });
    const storeStripeKey = await runQuery(
      internal.stripe_utils.getStoreStripeKey,
      {
        storeClerkId,
      }
    );

    if (!storeStripeKey) {
      throw new Error("Store does not have a Stripe key");
    }

    if (!product) {
      throw new Error("Product not found");
    }

    const stripe = new Stripe(storeStripeKey);

    const session = await stripe.checkout.sessions.create({
      metadata: {
        storeClerkId,
        customerClerkId,
        productId,
        currency: product.currency,
        price: product.price,
      },
      line_items: [
        {
          price_data: {
            currency: product.currency,
            product_data: {
              name: product.name,
              description: product.description,
              images: product.coverImage ? [product.coverImage] : [],
            },
            unit_amount: Math.round(product.price * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${domain}/library`,
      cancel_url: `${domain}/${store?.username}/${product._id}`,
    });

    return session.url;
  },
});
