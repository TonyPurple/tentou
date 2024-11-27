import { ProductCard } from "@/app/(store)/[username]/product-card";
import { CustomImage } from "@/components/custom-image";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { StoreIcon } from "lucide-react";
import { notFound } from "next/navigation";

type Props = {
  params: {
    username: string;
  };
};

export default async function StorePage({ params }: Props) {
  const { store, products } = await fetchQuery(api.products.getStorePage, {
    username: params.username,
  });

  if (!store) {
    notFound();
  }

  return (
    <div>
      <header className="p-8 bg-zinc-200 flex items-center justify-between border-b border-zinc-300">
        <div className="flex items-center gap-3">
          <CustomImage src={store.logo} alt={store.name} />
          <h2 className="text-2xl font-bold tracking-tight">{store.name}</h2>
        </div>
        <div className="flex items-center gap-3">
          <StoreIcon />
          <span className="font-semibold">
            {products.length} Product{products.length === 1 ? "" : "s"}
          </span>
        </div>
      </header>

      <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-3 p-8">
        {products.map((product) => (
          <ProductCard key={product._id} store={store} product={product} />
        ))}
      </div>
    </div>
  );
}
