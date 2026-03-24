import { Metadata } from "next";
import { ProfileContainer } from "@/features/profile/containers/ProfileContainer";

export const metadata: Metadata = {
  title: "My Profile | HyperStrike",
  description: "Manage your account settings and personal information.",
};

export default function ProfilePage() {
  return <ProfileContainer />;
}
