"use client";

import { motion } from "framer-motion";
import { User, Mail, Phone, Calendar, Shield } from "lucide-react";
import { UserProfile } from "@/constants/interface";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileForm } from "./ProfileForm";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

interface ProfileViewProps {
    user?: UserProfile;
    isLoading: boolean;
    isUpdating: boolean;
    onUpdateProfile: (values: { first_name: string; last_name: string; email: string }) => void;
}

export function ProfileView({ user, isLoading, isUpdating, onUpdateProfile }: ProfileViewProps) {
    if (isLoading) {
        return (
            <div className="space-y-8 pb-20">
                <Skeleton className="h-12 w-64" />
                <Skeleton className="h-96 w-full" />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="text-center py-20">
                <p className="text-zinc-500">Unable to load profile</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-20">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-blue-500/20 text-blue-400 p-2 rounded-xl border border-blue-500/20">
                        <User className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500/80">
                        Account Settings
                    </span>
                </div>
                <h1 className="text-5xl font-black tracking-tighter text-white lg:text-6xl drop-shadow-2xl">
                    My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Profile</span>
                </h1>
                <p className="text-zinc-500 font-medium mt-4 max-w-xl text-lg leading-relaxed">
                    Manage your personal information and account settings
                </p>
            </motion.div>

            <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ProfileForm
                                user={user}
                                isUpdating={isUpdating}
                                onSubmit={onUpdateProfile}
                            />
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Account Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-start gap-3">
                                <Phone className="w-5 h-5 text-muted-foreground mt-0.5" />
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-muted-foreground">WhatsApp</p>
                                    <p className="text-sm font-bold">{user.whatsapp_number}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-muted-foreground">Email</p>
                                    <p className="text-sm font-bold truncate">{user.email}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Shield className="w-5 h-5 text-muted-foreground mt-0.5" />
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-muted-foreground">Role</p>
                                    <p className="text-sm font-bold capitalize">
                                        {user.role_id === 1 ? "Super Admin" : user.role_id === 2 ? "Admin" : "User"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-muted-foreground">Member Since</p>
                                    <p className="text-sm font-bold">
                                        {format(new Date(user.created_at), "MMM dd, yyyy")}
                                    </p>
                                </div>
                            </div>

                            <div className="pt-4 border-t">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-muted-foreground">Status</span>
                                    <span
                                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                            user.is_active
                                                ? "bg-green-500/20 text-green-700"
                                                : "bg-gray-500/20 text-gray-700"
                                        }`}
                                    >
                                        {user.is_active ? "Active" : "Inactive"}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {user.referral_code && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Referral Code</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="bg-zinc-900/40 border border-white/10 rounded-lg px-4 py-3">
                                    <code className="text-emerald-400 font-bold text-lg tracking-wider">
                                        {user.referral_code}
                                    </code>
                                </div>
                                <p className="text-xs text-muted-foreground mt-2">
                                    Share this code to earn commissions
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
