import { BuyButton } from "@/app/(store)/[username]/[productId]/buy-button";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { formatPrice } from "@/lib/formatPrice";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { fetchQuery } from "convex/nextjs";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: {
    productId: string;
  };
};

export default async function StoreProductPage({ params }: Props) {
  const product = await fetchQuery(api.products.getStoreProduct, {
    productId: params.productId,
  });
  const { userId } = await auth();

  if (!product) {
    notFound();
  }

  return (
    <div className="w-full sm:p-12 items-center flex justify-center">
      <div className="sm:rounded-lg overflow-hidden w-full border shadow-md border-zinc-300 max-w-3xl">
        {product.coverImage ? (
          <img
            src={product.coverImage}
            className="mb-2 h-48 w-full shadow object-cover"
          />
        ) : (
          <div className="mb-2 h-48 bg-zinc-200" />
        )}

        <div className="flex items-center justify-between p-4">
          <div>
            <h1 className="text-3xl font-semibold">{product.name}</h1>
            <div className="flex items-center">
              <img
                src={product.user?.logo}
                className="rounded-full size-6 border-black border shadow-sm"
              />
              <Button asChild variant="link">
                <Link href={`/${product.user?.username}`}>
                  {product.user?.name}
                </Link>
              </Button>
            </div>
          </div>

          {userId ? (
            <BuyButton product={product} />
          ) : (
            <SignInButton>
              <Button>Sign in to buy</Button>
            </SignInButton>
          )}
        </div>

        <div className="grid sm:grid-cols-2 text-sm font-medium border-zinc-300 border-y sm:divide-x divide-y sm:divide-y-0 divide-zinc-300">
          <span className="flex items-center sm:justify-center px-4 py-2">
            {formatPrice({ price: product.price })}
          </span>
          <span className="py-2 px-4 flex items-center sm:justify-center">
            {product.sales} sales
          </span>
        </div>

        <div className="p-4 sm:text-base text-sm">{product.description}</div>
      </div>
    </div>
  );
}
