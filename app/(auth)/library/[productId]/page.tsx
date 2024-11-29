import { ContentLayout } from "@/app/(auth)/content-layout";
import { api } from "@/convex/_generated/api";
import { getAuthToken } from "@/lib/getAuthToken";
import { fetchQuery } from "convex/nextjs";
import { notFound } from "next/navigation";

type Props = {
  params: {
    productId: string;
  };
};

export default async function LibraryProduct({ params }: Props) {
  const token = await getAuthToken();
  const product = await fetchQuery(
    api.library.getLibraryProduct,
    {
      productId: params.productId,
    },
    { token }
  );

  if (!product) {
    notFound();
  }

  return (
    <ContentLayout title={product.name} description={product.description}>
      <div className="prose">
        <div dangerouslySetInnerHTML={{ __html: product.content }} />
      </div>
    </ContentLayout>
  );
}
