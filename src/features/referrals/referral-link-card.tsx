import { useState } from "react";
import { Copy, Check, Share2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMyReferralLinkQuery } from "@/hooks/queries/use-referrals";
import { CardSkeleton } from "@/components/shared/loading-skeleton";
import { ErrorState } from "@/components/shared/error-state";
import { toast } from "sonner";

export function ReferralLinkCard() {
  const { data, isLoading, isError, error, refetch } = useMyReferralLinkQuery();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!data?.referral_link) return;

    try {
      await navigator.clipboard.writeText(data.referral_link);
      setCopied(true);
      toast.success("Referral link copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  const handleShare = async () => {
    if (!data?.referral_link) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join HyperStrike Lottery",
          text: "Use my referral code to join HyperStrike and win big!",
          url: data.referral_link,
        });
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          toast.error("Failed to share link");
        }
      }
    } else {
      handleCopy();
    }
  };

  if (isLoading) {
    return <CardSkeleton />;
  }

  if (isError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Referral Link</CardTitle>
        </CardHeader>
        <CardContent>
          <ErrorState
            message={(error as Error)?.message || "Failed to load referral link"}
            onRetry={() => refetch()}
          />
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Share2 className="h-5 w-5" />
          Your Referral Link
        </CardTitle>
        <CardDescription>
          Share your link and earn commissions on ticket purchases
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Referral Code</label>
          <div className="flex gap-2">
            <Input
              value={data.referral_code}
              readOnly
              className="font-mono text-base"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={handleCopy}
              className="shrink-0 h-10 w-10"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Referral Link</label>
          <div className="flex gap-2">
            <Input
              value={data.referral_link}
              readOnly
              className="text-sm"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={handleCopy}
              className="shrink-0 h-10 w-10"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        <Button
          onClick={handleShare}
          className="w-full h-12"
          variant="default"
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share Referral Link
        </Button>
      </CardContent>
    </Card>
  );
}
