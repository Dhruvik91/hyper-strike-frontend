import { Wallet, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWalletBalanceQuery } from "@/hooks/queries/use-user";
import { CardSkeleton } from "@/components/shared/loading-skeleton";
import { ErrorState } from "@/components/shared/error-state";

export function WalletBalanceCard() {
  const { data: wallet, isLoading, isError, error, refetch } = useWalletBalanceQuery();

  if (isLoading) {
    return <CardSkeleton />;
  }

  if (isError) {
    return (
      <ErrorState
        message={(error as Error)?.message || "Failed to load wallet balance"}
        onRetry={() => refetch()}
      />
    );
  }

  if (!wallet) {
    return null;
  }

  const balanceINR = parseFloat(wallet.wallet_balance_inr);
  const balanceCrypto = parseFloat(wallet.wallet_balance_crypto);

  return (
    <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-background">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
        <Wallet className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <div className="text-3xl font-bold">
              ₹{balanceINR.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground mt-1">INR Balance</p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span className="text-muted-foreground">
              {balanceCrypto.toFixed(8)} {wallet.crypto_currency}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
