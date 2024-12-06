import { UserProfile } from "@clerk/nextjs";
import { ContentLayout } from "@/app/(auth)/content-layout";

export const metadata = {
  name: "profile",
  title: "Profile",
  description: "Profile",
};

export default function Page() {
  return (
    <ContentLayout
      title="Profile"
      description="Manage your account details"
    >
      <div className="lg:flex lg:gap-8">
        <div className="grow">
          <UserProfile path="/profile" />
        </div>
      </div>
    </ContentLayout>
  );
}
