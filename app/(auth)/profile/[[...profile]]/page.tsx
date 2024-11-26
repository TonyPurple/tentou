import { UserProfile } from "@clerk/nextjs";

export const metadata = {
  name: "profile",
  title: "Profile",
  description: "Profile",
};

export default function Page() {
  return <UserProfile path="/profile" />;
}
