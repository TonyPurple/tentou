import { ContentLayout } from "@/app/(auth)/content-layout";
import { EditProductForm } from "@/app/(auth)/products/edit/[productId]/edit-product-form";
import { api } from "@/convex/_generated/api";
import { getAuthToken } from "@/lib/getAuthToken";
import { fetchQuery } from "convex/nextjs";

type Props = {
  params: {
    productId: string;
  };
};

export default async function Page({ params }: Props) {
  const token = await getAuthToken();
  const product = await fetchQuery(
    api.products.getProduct,
    {
      productId: params.productId,
    },
    { token }
  );

  return (
    <ContentLayout
      title="Edit Product"
      description="Edit your product and update its details"
    >
      <EditProductForm product={product} />
    </ContentLayout>
  );
}
