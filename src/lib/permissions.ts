import { UserRole } from "@/constants/interface";

export type Permission =
    | 'view_dashboard'
    | 'manage_users'
    | 'manage_draws'
    | 'manage_withdrawals'
    | 'manage_config'
    | 'view_admin_stats'
    | 'purchase_tickets'
    | 'participate_draws'
    | 'request_withdrawals';

const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
    [UserRole.USER]: [
        'view_dashboard',
        'purchase_tickets',
        'participate_draws',
        'request_withdrawals',
    ],
    [UserRole.ADMIN]: [
        'view_dashboard',
        'view_admin_stats',
        'request_withdrawals',
    ],
    [UserRole.SUPER_ADMIN]: [
        'view_dashboard',
        'manage_users',
        'manage_draws',
        'manage_withdrawals',
        'manage_config',
        'view_admin_stats',
    ],
};

export const hasPermission = (role: UserRole, permission: Permission): boolean => {
    return ROLE_PERMISSIONS[role]?.includes(permission) || false;
};

export const hasRole = (userRole: UserRole, targetRoles: UserRole | UserRole[]): boolean => {
    if (Array.isArray(targetRoles)) {
        return targetRoles.includes(userRole);
    }
    return userRole === targetRoles;
};
