import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { withdrawalRequestSchema, WithdrawalRequestInput } from "@/lib/validations/withdrawals";
import { useRequestWithdrawalMutation } from "@/hooks/queries/use-withdrawals";
import { useWalletBalanceQuery } from "@/hooks/queries/use-user";

export function WithdrawalRequestForm() {
  const withdrawalMutation = useRequestWithdrawalMutation();
  const { data: wallet } = useWalletBalanceQuery();

  const form = useForm<WithdrawalRequestInput>({
    resolver: zodResolver(withdrawalRequestSchema),
    defaultValues: {
      amount: 0,
      crypto_currency: wallet?.crypto_currency || "USDT",
      wallet_address: "",
    },
  });

  const onSubmit = (data: WithdrawalRequestInput) => {
    withdrawalMutation.mutate(data, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  const availableBalance = wallet ? parseFloat(wallet.wallet_balance_crypto) : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5" />
          Request Withdrawal
        </CardTitle>
        <CardDescription>
          Withdraw your crypto balance to your wallet
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">Available Balance</p>
              <p className="text-2xl font-bold">
                {availableBalance.toFixed(8)} {wallet?.crypto_currency || "USDT"}
              </p>
            </div>

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Withdrawal Amount</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      step="0.00000001"
                      placeholder="0.00000000"
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
                  <FormLabel>Cryptocurrency</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      readOnly
                      className="h-12 text-base bg-muted"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="wallet_address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Wallet Address</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your wallet address"
                      className="h-12 text-base font-mono"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full h-12 text-base"
              disabled={withdrawalMutation.isPending}
            >
              {withdrawalMutation.isPending ? "Submitting..." : "Request Withdrawal"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
