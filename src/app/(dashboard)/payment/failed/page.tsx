import { Metadata } from "next";
import { PaymentFailedContainer } from "@/features/payment/containers/PaymentFailedContainer";

export const metadata: Metadata = {
  title: "Payment Failed | HyperStrike",
  description: "Your payment could not be processed.",
};

export default function PaymentFailedPage() {
  return <PaymentFailedContainer />;
}
