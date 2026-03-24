"use client";

import { useProfileQuery } from "@/hooks/queries/use-auth";
import { useUpdateProfileMutation } from "@/hooks/queries/use-user";
import { ProfileView } from "../components/ProfileView";

export function ProfileContainer() {
    const { data: user, isLoading } = useProfileQuery();
    const updateMutation = useUpdateProfileMutation();

    const handleUpdateProfile = (values: { first_name: string; last_name: string; email: string }) => {
        updateMutation.mutate(values);
    };

    return (
        <ProfileView
            user={user}
            isLoading={isLoading}
            isUpdating={updateMutation.isPending}
            onUpdateProfile={handleUpdateProfile}
        />
    );
}
