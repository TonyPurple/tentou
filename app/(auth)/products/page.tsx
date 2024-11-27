import Link from "next/link";
import { ContentLayout } from "../content-layout";
import { Button } from "@/components/ui/button";

export const metadata = {
  name: "products",
  title: "Products",
  description: "Products",
};

export default function Page() {
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
      products
    </ContentLayout>
  );
}
