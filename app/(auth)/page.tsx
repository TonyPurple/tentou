import { ContentLayout } from "@/app/(auth)/content-layout";
import { DashboardCard } from "@/app/(auth)/dashboard-card";
import { api } from "@/convex/_generated/api";
import { getAuthToken } from "@/lib/getAuthToken";
import { fetchQuery } from "convex/nextjs";
import { Barcode, CreditCard, DollarSign } from "lucide-react";
import { DashboardSales } from "./dashboard-sales";

export default async function DashboardPage() {
  const token = await getAuthToken();
  const stats = await fetchQuery(api.sales.getDashboardStats, {}, { token });

  return (
    <ContentLayout
      title="Dashboard"
      description="View all your recent sales and analytics"
    >
      <div className="grid lg:grid-cols-3 md:grid-cols-2 md:gap-8 gap-4 mb-4">
        <DashboardCard
          label="Total Revenue"
          value={stats.totalRevenue}
          icon={<DollarSign className="size-5 text-muted-foreground" />}
        />
        <DashboardCard
          label="Sales"
          value={stats.totalSales}
          icon={<CreditCard className="size-5 text-muted-foreground" />}
        />
        <DashboardCard
          label="Products"
          value={stats.totalProducts}
          icon={<Barcode className="size-5 text-muted-foreground" />}
        />
      </div>
      <DashboardSales />
    </ContentLayout>
  );
}
