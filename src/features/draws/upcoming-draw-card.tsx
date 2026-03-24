import { Calendar, Clock, Ticket } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useUpcomingDrawQuery } from "@/hooks/queries/use-draws";
import { CardSkeleton } from "@/components/shared/loading-skeleton";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";
import { format, formatDistanceToNow } from "date-fns";

export function UpcomingDrawCard() {
  const { data: draw, isLoading, isError, error, refetch } = useUpcomingDrawQuery();

  if (isLoading) {
    return <CardSkeleton />;
  }

  if (isError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Draw</CardTitle>
        </CardHeader>
        <CardContent>
          <ErrorState
            message={(error as Error)?.message || "Failed to load upcoming draw"}
            onRetry={() => refetch()}
          />
        </CardContent>
      </Card>
    );
  }

  if (!draw) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Draw</CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={Calendar}
            title="No upcoming draw"
            description="Check back later for the next lottery draw"
          />
        </CardContent>
      </Card>
    );
  }

  const drawDate = new Date(draw.draw_date);
  const timeUntilDraw = formatDistanceToNow(drawDate, { addSuffix: true });

  return (
    <Card className="border-primary/50 bg-gradient-to-br from-primary/5 to-background">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Upcoming Draw
        </CardTitle>
        <CardDescription>Next lottery draw details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3 p-4 rounded-lg bg-background/50">
          <Clock className="h-5 w-5 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Draw Date</p>
            <p className="font-semibold">{format(drawDate, "PPP 'at' p")}</p>
            <p className="text-xs text-muted-foreground mt-1">{timeUntilDraw}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 rounded-lg bg-background/50">
          <Ticket className="h-5 w-5 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Total Tickets</p>
            <p className="text-2xl font-bold">{draw.total_tickets.toLocaleString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
