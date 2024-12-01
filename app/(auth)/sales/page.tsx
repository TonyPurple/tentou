import { ContentLayout } from "@/app/(auth)/content-layout";
import { SalesTable } from "@/app/(auth)/sales/sales-table";
import { api } from "@/convex/_generated/api";
import { getAuthToken } from "@/lib/getAuthToken";
import { fetchQuery } from "convex/nextjs";

export default async function Sales() {
  const token = await getAuthToken();
  const sales = await fetchQuery(api.sales.getAllSales, {}, { token });

  return (
    <ContentLayout
      title="Sales"
      description="View all your sales for your online store"
    >
      <SalesTable sales={sales} />
    </ContentLayout>
  );
}
