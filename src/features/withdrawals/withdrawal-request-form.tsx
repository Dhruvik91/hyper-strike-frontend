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

interface WithdrawalRequestFormProps {
  availableBalance?: number;
  cryptoCurrency?: string;
  isSubmitting?: boolean;
  onSubmit?: (values: WithdrawalRequestInput) => void;
}

export function WithdrawalRequestForm({
  availableBalance: propAvailableBalance,
  cryptoCurrency: propCryptoCurrency,
  isSubmitting: propIsSubmitting,
  onSubmit: propOnSubmit,
}: WithdrawalRequestFormProps) {
  const internalWithdrawalMutation = useRequestWithdrawalMutation();
  const { data: internalWallet } = useWalletBalanceQuery();

  const isSubmitting = propIsSubmitting ?? internalWithdrawalMutation.isPending;
  const cryptoCurrency = propCryptoCurrency ?? internalWallet?.crypto_currency ?? "USDT";
  const availableBalance = propAvailableBalance ?? (internalWallet ? parseFloat(internalWallet.wallet_balance_crypto) : 0);

  const form = useForm<WithdrawalRequestInput>({
    resolver: zodResolver(withdrawalRequestSchema),
    defaultValues: {
      amount: 0,
      crypto_currency: cryptoCurrency,
      wallet_address: "",
    },
  });

  const handleSubmit = (data: WithdrawalRequestInput) => {
    if (propOnSubmit) {
      propOnSubmit(data);
    } else {
      internalWithdrawalMutation.mutate(data, {
        onSuccess: () => {
          form.reset();
        },
      });
    }
  };

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
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">Available Balance</p>
              <p className="text-2xl font-bold">
                {availableBalance.toFixed(8)} {cryptoCurrency}
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
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Request Withdrawal"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
