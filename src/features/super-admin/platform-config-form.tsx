import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateConfigSchema, UpdateConfigInput } from "@/lib/validations/admin";
import { usePlatformConfigQuery, useUpdatePlatformConfigMutation } from "@/hooks/queries/use-super-admin";
import { CardSkeleton } from "@/components/shared/loading-skeleton";
import { ErrorState } from "@/components/shared/error-state";

export function PlatformConfigForm() {
  const { data: config, isLoading, isError, error, refetch } = usePlatformConfigQuery();
  const updateConfigMutation = useUpdatePlatformConfigMutation();

  const form = useForm<UpdateConfigInput>({
    resolver: zodResolver(updateConfigSchema),
    values: config
      ? {
          user_commission_rate: config.user_commission_rate,
          admin_commission_rate: config.admin_commission_rate,
          ticket_price_inr: config.ticket_price_inr,
          weekly_draw_day: config.weekly_draw_day as any,
          crypto_currency: config.crypto_currency,
        }
      : undefined,
  });

  const onSubmit = (data: UpdateConfigInput) => {
    updateConfigMutation.mutate(data);
  };

  if (isLoading) {
    return <CardSkeleton />;
  }

  if (isError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Platform Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <ErrorState
            message={(error as Error)?.message || "Failed to load configuration"}
            onRetry={() => refetch()}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Platform Configuration
        </CardTitle>
        <CardDescription>
          Update platform-wide settings and commission rates
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="ticket_price_inr"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ticket Price (INR)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        min={1}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        className="h-12 text-base"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="crypto_currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Crypto Currency</FormLabel>
                    <FormControl>
                      <Input {...field} className="h-12 text-base" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="user_commission_rate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Commission Rate</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        step="0.0001"
                        min={0}
                        max={1}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        className="h-12 text-base"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="admin_commission_rate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Admin Commission Rate</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        step="0.0001"
                        min={0}
                        max={1}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        className="h-12 text-base"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base"
              disabled={updateConfigMutation.isPending}
            >
              {updateConfigMutation.isPending ? "Updating..." : "Update Configuration"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
