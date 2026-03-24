import { Users, DollarSign, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/shared/stat-card";
import { useAdminDashboardQuery } from "@/hooks/queries/use-admin";
import { StatCardSkeleton } from "@/components/shared/loading-skeleton";
import { ErrorState } from "@/components/shared/error-state";

export function AdminDashboardStats() {
  const { data, isLoading, isError, error, refetch } = useAdminDashboardQuery();

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <ErrorState
        message={(error as Error)?.message || "Failed to load dashboard stats"}
        onRetry={() => refetch()}
      />
    );
  }

  if (!data) {
    return null;
  }

  const totalCommissionAmount = data.commissions.reduce(
    (sum, commission) => sum + parseFloat(commission.amount_crypto),
    0
  );

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <StatCard
        title="Total Referrals"
        value={data.total_referrals}
        description="Users referred by you"
        icon={Users}
      />
      <StatCard
        title="Total Commissions"
        value={data.total_commissions}
        description="Commission transactions"
        icon={TrendingUp}
      />
      <StatCard
        title="Commission Earned"
        value={`${totalCommissionAmount.toFixed(4)} USDT`}
        description="Total earnings from referrals"
        icon={DollarSign}
      />
    </div>
  );
}
