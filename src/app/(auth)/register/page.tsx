import { Metadata } from "next";
import { RegisterContainer } from "@/features/auth/containers/RegisterContainer";

export const metadata: Metadata = {
  title: "Register | HyperStrike",
  description: "Create a HyperStrike account and start winning big with our transparent lucky draws.",
};

export default function RegisterPage() {
  return <RegisterContainer />;
}
