"use client";

import { motion } from "framer-motion";
import { XCircle, ArrowLeft, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

interface PaymentFailedViewProps {
    orderId: string;
    error: string;
}

export function PaymentFailedView({ orderId, error }: PaymentFailedViewProps) {
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
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="flex justify-center"
                        >
                            <div className="bg-red-500/20 p-6 rounded-full border-4 border-red-500/30">
                                <XCircle className="w-16 h-16 text-red-400" />
                            </div>
                        </motion.div>

                        <div className="space-y-3">
                            <h1 className="text-4xl font-black text-white">Payment Failed</h1>
                            <p className="text-zinc-400 text-lg">
                                We couldn't process your payment. Please try again.
                            </p>
                        </div>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
                                <p className="text-sm text-red-400">{error}</p>
                            </div>
                        )}

                        {orderId && (
                            <div className="bg-zinc-900/60 border border-white/10 rounded-xl p-6">
                                <p className="text-sm text-zinc-500 mb-2">Order ID</p>
                                <code className="text-zinc-400 font-bold text-lg">{orderId}</code>
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                            <Link href="/tickets">
                                <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white font-bold h-12 px-8 rounded-xl">
                                    <RefreshCw className="mr-2 w-4 h-4" />
                                    Try Again
                                </Button>
                            </Link>
                            <Link href="/dashboard">
                                <Button variant="outline" className="h-12 px-8 rounded-xl">
                                    <ArrowLeft className="mr-2 w-4 h-4" />
                                    Back to Dashboard
                                </Button>
                            </Link>
                        </div>

                        <div className="pt-6 border-t border-white/10">
                            <p className="text-sm text-zinc-500">
                                Need help? Contact our support team at{" "}
                                <a href="mailto:support@hyperstrike.app" className="text-blue-400 hover:underline">
                                    support@hyperstrike.app
                                </a>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
