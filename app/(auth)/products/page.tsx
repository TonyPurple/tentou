import { ContentLayout } from "@/app/(auth)/content-layout";
import { ProductsTable } from "@/app/(auth)/products/products-table";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { getAuthToken } from "@/lib/getAuthToken";
import { fetchQuery } from "convex/nextjs";
import Link from "next/link";

export const metadata = {
  title: "Products",
};

export default async function Page() {
  const token = await getAuthToken();
  const products = await fetchQuery(api.products.getProducts, {}, { token });

  return (
    <ContentLayout
      title="Products"
      description="Manage your products and view their sales performance"
      action={
        <Link href="/products/new">
          <Button>New Product</Button>
        </Link>
      }
    >
      <ProductsTable products={products} />
    </ContentLayout>
  );
}
