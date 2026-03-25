import { useState } from "react";
import { Ticket, Trophy } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useMyTicketsQuery } from "@/hooks/queries/use-tickets";
import { TableSkeleton } from "@/components/shared/loading-skeleton";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";
import { format } from "date-fns";

export function MyTicketsList() {
  const [page] = useState(1);
  const { data, isLoading, isError, error, refetch } = useMyTicketsQuery(page, 20);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Tickets</CardTitle>
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
          <CardTitle>My Tickets</CardTitle>
        </CardHeader>
        <CardContent>
          <ErrorState
            message={(error as Error)?.message || "Failed to load tickets"}
            onRetry={() => refetch()}
          />
        </CardContent>
      </Card>
    );
  }

  if (!data || data.items.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Tickets</CardTitle>
          <CardDescription>View all your purchased lottery tickets</CardDescription>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={Ticket}
            title="No tickets yet"
            description="Purchase your first lottery ticket to participate in the draw"
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Tickets</CardTitle>
        <CardDescription>
          {data.total} ticket{data.total !== 1 ? "s" : ""} purchased
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.items.map((ticket) => (
            <div
              key={ticket.id}
              className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
            >
              <div className="shrink-0">
                {ticket.is_winner ? (
                  <div className="h-12 w-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                    <Trophy className="h-6 w-6 text-yellow-600" />
                  </div>
                ) : (
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Ticket className="h-6 w-6 text-primary" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{ticket.ticket_number}</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(ticket.created_at), "MMM dd, yyyy")}
                </p>
              </div>
              {ticket.is_winner && (
                <div className="shrink-0">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-700">
                    Winner
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
