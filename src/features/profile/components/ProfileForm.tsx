"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UserProfile } from "@/constants/interface";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const profileSchema = z.object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileFormProps {
    user: UserProfile;
    isUpdating: boolean;
    onSubmit: (values: ProfileFormData) => void;
}

export function ProfileForm({ user, isUpdating, onSubmit }: ProfileFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isDirty },
    } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            first_name: user.first_name || "",
            last_name: user.last_name || "",
            email: user.email || "",
        },
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="first_name">First Name</Label>
                    <Input
                        id="first_name"
                        {...register("first_name")}
                        placeholder="Enter your first name"
                        className="h-12"
                    />
                    {errors.first_name && (
                        <p className="text-sm text-red-500">{errors.first_name.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="last_name">Last Name</Label>
                    <Input
                        id="last_name"
                        {...register("last_name")}
                        placeholder="Enter your last name"
                        className="h-12"
                    />
                    {errors.last_name && (
                        <p className="text-sm text-red-500">{errors.last_name.message}</p>
                    )}
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="Enter your email"
                    className="h-12"
                />
                {errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
            </div>

            <div className="flex items-center gap-4 pt-4">
                <Button
                    type="submit"
                    disabled={!isDirty || isUpdating}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white font-bold h-12 px-8 rounded-xl"
                >
                    {isUpdating ? "Updating..." : "Update Profile"}
                </Button>
                {isDirty && !isUpdating && (
                    <p className="text-sm text-muted-foreground">You have unsaved changes</p>
                )}
            </div>
        </form>
    );
}
