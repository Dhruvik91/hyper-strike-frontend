import { useProfileQuery } from "@/hooks/queries/use-auth";
import { UserRole } from "@/constants/interface";
import { Permission, hasPermission, hasRole } from "@/lib/permissions";

export const useHasPermission = (permission: Permission) => {
    const { data: user } = useProfileQuery();

    if (!user) return false;

    return hasPermission(user.role_id, permission);
};

export const useHasRole = (roles: UserRole | UserRole[]) => {
    const { data: user } = useProfileQuery();

    if (!user) return false;

    return hasRole(user.role_id, roles);
};
