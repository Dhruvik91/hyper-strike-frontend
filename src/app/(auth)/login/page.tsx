import { Metadata } from "next";
import { LoginContainer } from "@/features/auth/containers/LoginContainer";

export const metadata: Metadata = {
  title: "Login | HyperStrike",
  description: "Sign in to your HyperStrike account to manage your profile and referrals.",
};

export default function LoginPage() {
  return <LoginContainer />;
}
