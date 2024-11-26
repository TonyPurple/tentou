import { ContentLayout } from "../content-layout";

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
    >
      products
    </ContentLayout>
  );
}
