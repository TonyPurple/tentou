"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/nextjs";
import { useAction } from "convex/react";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";

type Props = {
  product: Doc<"products"> & {
    user: Doc<"users"> & { hasStripeKey: boolean };
  };
};

export function BuyButton({ product }: Props) {
  const [isLoading, setLoading] = useState(false);
  const pay = useAction(api.stripe.pay);
  const { user } = useUser();

  return (
    <Button
      disabled={!product.user.hasStripeKey || isLoading}
      onClick={async () => {
        try {
          setLoading(true);
          const url = await pay({
            storeClerkId: product.user.clerkId,
            customerClerkId: user.id,
            productId: product._id,
          });
          window.location.href = url;
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      }}
    >
      {isLoading && <LoaderCircle className="mr-2 size-4 animate-spin" />}
      Buy now
    </Button>
  );
}
