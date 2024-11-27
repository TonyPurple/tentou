import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Doc } from "@/convex/_generated/dataModel";
import { formatPrice } from "@/lib/formatPrice";
import Link from "next/link";

type Props = {
  store: Doc<"users">;
  product: Doc<"products">;
};

export function ProductCard({ store, product }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span>{product.name}</span>
          <span className="text-lg">
            {formatPrice({ price: product.price })}
          </span>
        </CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {product.coverImage ? (
          <img
            src={product.coverImage}
            className="border mb-6 h-40 w-full object-cover rounded-md"
          />
        ) : (
          <div className="h-40 bg-zinc-200 w-full mb-6 rounded-md" />
        )}
        <Button asChild size="sm" className="w-full">
          <Link href={`/${store.username}/${product._id}`}>View Product</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
