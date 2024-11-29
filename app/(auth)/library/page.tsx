import { ContentLayout } from "@/app/(auth)/content-layout";
import { LibraryCard } from "@/app/(auth)/library/library-card";
import { api } from "@/convex/_generated/api";
import { getAuthToken } from "@/lib/getAuthToken";
import { fetchQuery } from "convex/nextjs";

export default async function Library() {
  const token = await getAuthToken();
  const products = await fetchQuery(
    api.library.getLibraryProducts,
    {},
    { token }
  );

  return (
    <ContentLayout
      title="Library"
      description="Access all your purchased products"
    >
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-3">
        {products.map((product) => (
          <LibraryCard key={product._id} product={product} />
        ))}
      </div>
    </ContentLayout>
  );
}
