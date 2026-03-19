"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAdminSchema, CreateAdminFormData } from "@/lib/validations/super-admin";
import { useCreateAdminMutation } from "@/hooks/queries/use-super-admin";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UserPlus, Mail, Lock, Phone } from "lucide-react";

export function CreateAdminDialog() {
    const [open, setOpen] = useState(false);
    const createAdminMutation = useCreateAdminMutation();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<CreateAdminFormData>({
        resolver: zodResolver(createAdminSchema),
    });

    const onSubmit = async (data: CreateAdminFormData) => {
        await createAdminMutation.mutateAsync(data);
        setOpen(false);
        reset();
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-500 text-white font-black px-6 h-11 rounded-2xl shadow-xl shadow-blue-900/20 border-0">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Create Admin
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-zinc-950 border-white/10 max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-white font-black uppercase text-xl">
                        Create Admin Account
                    </DialogTitle>
                    <DialogDescription className="text-zinc-500">
                        Create a new administrative user with elevated permissions.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-white uppercase tracking-wider">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                            <input
                                type="email"
                                {...register("email")}
                                className="w-full bg-black border border-white/10 rounded-2xl pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all"
                                placeholder="admin@example.com"
                            />
                        </div>
                        {errors.email && (
                            <p className="text-red-400 text-xs font-medium">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-white uppercase tracking-wider">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                            <input
                                type="password"
                                {...register("password")}
                                className="w-full bg-black border border-white/10 rounded-2xl pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all"
                                placeholder="Strong password"
                            />
                        </div>
                        {errors.password && (
                            <p className="text-red-400 text-xs font-medium">{errors.password.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-white uppercase tracking-wider">
                            WhatsApp Number
                        </label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                            <input
                                type="tel"
                                {...register("whatsapp_number")}
                                className="w-full bg-black border border-white/10 rounded-2xl pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all"
                                placeholder="+919876543210"
                            />
                        </div>
                        {errors.whatsapp_number && (
                            <p className="text-red-400 text-xs font-medium">{errors.whatsapp_number.message}</p>
                        )}
                    </div>

                    <DialogFooter className="gap-2 pt-4">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => {
                                setOpen(false);
                                reset();
                            }}
                            className="text-zinc-500 font-bold"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting || createAdminMutation.isPending}
                            className="bg-blue-600 hover:bg-blue-500 text-white font-black"
                        >
                            {isSubmitting || createAdminMutation.isPending ? "Creating..." : "Create Admin"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
