"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Ticket, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { PaymentStatus } from "@/constants/interface";

interface PaymentSuccessViewProps {
    orderId: string;
    paymentStatus?: PaymentStatus;
    isLoading: boolean;
}

export function PaymentSuccessView({ orderId, paymentStatus, isLoading }: PaymentSuccessViewProps) {
    const isSuccess = paymentStatus?.status === "SUCCESS";
    const isPending = paymentStatus?.status === "PENDING";

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-2xl"
            >
                <Card className="bg-zinc-950/40 border-white/10 backdrop-blur-xl">
                    <CardContent className="p-12 text-center space-y-8">
                        {isLoading || isPending ? (
                            <>
                                <div className="flex justify-center">
                                    <div className="bg-blue-500/20 p-6 rounded-full">
                                        <Loader2 className="w-16 h-16 text-blue-400 animate-spin" />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <h1 className="text-3xl font-black text-white">Processing Payment...</h1>
                                    <p className="text-zinc-500 text-lg">
                                        Please wait while we confirm your transaction
                                    </p>
                                </div>
                            </>
                        ) : isSuccess ? (
                            <>
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                    className="flex justify-center"
                                >
                                    <div className="bg-emerald-500/20 p-6 rounded-full border-4 border-emerald-500/30">
                                        <CheckCircle2 className="w-16 h-16 text-emerald-400" />
                                    </div>
                                </motion.div>

                                <div className="space-y-3">
                                    <h1 className="text-4xl font-black text-white">Payment Successful!</h1>
                                    <p className="text-zinc-400 text-lg">
                                        Your tickets have been purchased successfully
                                    </p>
                                </div>

                                {orderId && (
                                    <div className="bg-zinc-900/60 border border-white/10 rounded-xl p-6">
                                        <p className="text-sm text-zinc-500 mb-2">Order ID</p>
                                        <code className="text-emerald-400 font-bold text-lg">{orderId}</code>
                                    </div>
                                )}

                                {paymentStatus?.tickets && paymentStatus.tickets.length > 0 && (
                                    <div className="bg-zinc-900/60 border border-white/10 rounded-xl p-6">
                                        <div className="flex items-center justify-center gap-2 mb-4">
                                            <Ticket className="w-5 h-5 text-blue-400" />
                                            <p className="text-sm font-bold text-white">Your Tickets</p>
                                        </div>
                                        <div className="flex flex-wrap gap-2 justify-center">
                                            {paymentStatus.tickets.map((ticket: { id: string; ticket_number: string }) => (
                                                <div
                                                    key={ticket.id}
                                                    className="bg-blue-500/10 border border-blue-500/20 rounded-lg px-4 py-2"
                                                >
                                                    <code className="text-blue-400 font-bold">
                                                        #{ticket.ticket_number}
                                                    </code>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                                    <Link href="/tickets">
                                        <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold h-12 px-8 rounded-xl">
                                            View My Tickets
                                            <ArrowRight className="ml-2 w-4 h-4" />
                                        </Button>
                                    </Link>
                                    <Link href="/dashboard">
                                        <Button variant="outline" className="h-12 px-8 rounded-xl">
                                            Back to Dashboard
                                        </Button>
                                    </Link>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex justify-center">
                                    <div className="bg-red-500/20 p-6 rounded-full">
                                        <CheckCircle2 className="w-16 h-16 text-red-400" />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <h1 className="text-3xl font-black text-white">Payment Status Unknown</h1>
                                    <p className="text-zinc-500 text-lg">
                                        Unable to verify payment status. Please contact support.
                                    </p>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
