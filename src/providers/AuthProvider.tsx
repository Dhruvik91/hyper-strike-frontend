"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useProfileQuery } from "@/hooks/queries/use-auth";
import { UserProfile, UserRole } from "@/constants/interface";
import { FRONTEND_ROUTES } from "@/constants/constants";

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  role: UserRole | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  role: null,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: user, isLoading, isError, error } = useProfileQuery();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const isAuthenticated = !!user;
  const role = user?.role_id ?? null;

  useEffect(() => {
    if (isLoading) return;

    const isSuperAdminPath = pathname.startsWith("/super-admin");
    const isAdminPath = pathname.startsWith("/admin");
    
    // User paths: starts with /dashboard, /tickets, /referrals, /wallet, /payment, /profile
    const isUserPath =
      pathname.startsWith("/dashboard") ||
      pathname.startsWith("/tickets") ||
      pathname.startsWith("/referrals") ||
      pathname.startsWith("/wallet") ||
      pathname.startsWith("/payment") ||
      pathname.startsWith("/profile");

    const isProtectedRoute = isSuperAdminPath || isAdminPath || isUserPath;
    const isAuthPage = pathname === FRONTEND_ROUTES.LOGIN || pathname === FRONTEND_ROUTES.REGISTER;

    // Helper to get default dashboard for a role
    const getDashboardRoute = (userRole: UserRole) => {
      switch (userRole) {
        case UserRole.SUPER_ADMIN:
          return FRONTEND_ROUTES.SUPER_ADMIN.DASHBOARD;
        case UserRole.ADMIN:
          return FRONTEND_ROUTES.ADMIN.DASHBOARD;
        case UserRole.USER:
        default:
          return FRONTEND_ROUTES.USER.DASHBOARD;
      }
    };

    if (!isAuthenticated) {
      // If user is not logged in and on a protected route, send them to login page
      if (isProtectedRoute) {
        setIsRedirecting(true);
        router.replace(FRONTEND_ROUTES.LOGIN);
      } else {
        setIsRedirecting(false);
      }
    } else {
      // If user is logged in
      if (isAuthPage) {
        // Redirect away from login/register to their dashboard
        setIsRedirecting(true);
        router.replace(getDashboardRoute(role!));
      } else if (isProtectedRoute) {
        // Enforce role-based path restrictions
        let hasAccess = true;

        if (isSuperAdminPath) {
          hasAccess = role === UserRole.SUPER_ADMIN;
        } else if (isAdminPath) {
          hasAccess = role === UserRole.ADMIN;
        } else if (isUserPath) {
          // Special exception: ADMIN can access dashboard withdrawals
          if (role === UserRole.ADMIN && pathname.startsWith("/dashboard/withdrawals")) {
            hasAccess = true;
          } else if (pathname.startsWith("/profile")) {
            // All logged-in roles can access profile
            hasAccess = true;
          } else {
            hasAccess = role === UserRole.USER;
          }
        }

        if (!hasAccess) {
          setIsRedirecting(true);
          router.replace(getDashboardRoute(role!));
        } else {
          setIsRedirecting(false);
        }
      } else {
        setIsRedirecting(false);
      }
    }
  }, [user, isLoading, isAuthenticated, role, pathname, router]);

  // Determine if we should show the loading screen
  const isSuperAdminPath = pathname.startsWith("/super-admin");
  const isAdminPath = pathname.startsWith("/admin");
  const isUserPath =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/tickets") ||
    pathname.startsWith("/referrals") ||
    pathname.startsWith("/wallet") ||
    pathname.startsWith("/payment") ||
    pathname.startsWith("/profile");

  const isProtectedRoute = isSuperAdminPath || isAdminPath || isUserPath;
  const isAuthPage = pathname === FRONTEND_ROUTES.LOGIN || pathname === FRONTEND_ROUTES.REGISTER;

  const showLoading = isLoading || isRedirecting || (isAuthenticated && isAuthPage) || (!isAuthenticated && isProtectedRoute);

  if (showLoading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin glow-primary" />
          <p className="text-muted-foreground animate-pulse font-medium uppercase tracking-widest text-xs">
            Securing your striking session...
          </p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user: user ?? null, isLoading, isAuthenticated, role }}>
      {children}
    </AuthContext.Provider>
  );
}
