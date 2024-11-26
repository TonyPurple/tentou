import { ContentLayout } from "@/app/(auth)/content-layout";
import { SettingsForm } from "@/app/(auth)/settings/settings-form";
import { api } from "@/convex/_generated/api";
import { getAuthToken } from "@/lib/getAuthToken";
import { fetchQuery } from "convex/nextjs";

export default async function Settings() {
  const token = await getAuthToken();
  const user = await fetchQuery(api.users.getUser, {}, { token });

  return (
    <ContentLayout
      title="Settings"
      description="Update all of your store information"
    >
      <SettingsForm user={user} />
    </ContentLayout>
  );
}
