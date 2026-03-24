import { Metadata } from "next";
import { PaymentSuccessContainer } from "@/features/payment/containers/PaymentSuccessContainer";

export const metadata: Metadata = {
  title: "Payment Successful | HyperStrike",
  description: "Your payment has been processed successfully.",
};

export default function PaymentSuccessPage() {
  return <PaymentSuccessContainer />;
}
