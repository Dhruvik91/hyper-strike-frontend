import { Users, Mail, Phone } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminReferralsQuery } from "@/hooks/queries/use-admin";
import { TableSkeleton } from "@/components/shared/loading-skeleton";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";
import { format } from "date-fns";

export function AdminReferralsList() {
  const { data, isLoading, isError, error, refetch } = useAdminReferralsQuery();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Referrals</CardTitle>
        </CardHeader>
        <CardContent>
          <TableSkeleton rows={5} />
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Referrals</CardTitle>
        </CardHeader>
        <CardContent>
          <ErrorState
            message={(error as Error)?.message || "Failed to load referrals"}
            onRetry={() => refetch()}
          />
        </CardContent>
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Referrals</CardTitle>
          <CardDescription>Users who signed up using your referral link</CardDescription>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={Users}
            title="No referrals yet"
            description="Share your referral link to start earning commissions"
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Referrals</CardTitle>
        <CardDescription>{data.length} users referred</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.map((user) => (
            <div
              key={user.id}
              className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
            >
              <div className="shrink-0">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm font-medium truncate">{user.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">{user.whatsapp_number}</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  Joined {format(new Date(user.created_at), "MMM dd, yyyy")}
                </p>
              </div>
              <div className="shrink-0">
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
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
