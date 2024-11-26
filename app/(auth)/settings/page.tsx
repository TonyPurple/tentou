import { ContentLayout } from "../content-layout";
import { SettingsForm } from "./settings-form";

export default function Settings() {
  return (
    <ContentLayout title="Settings" description="Update all of your store information">
      <SettingsForm />
    </ContentLayout>
  );
}
