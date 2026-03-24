import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { createAdminAutoSchema, CreateAdminAutoInput } from "@/lib/validations/admin";
import { useCreateAdminAutoMutation } from "@/hooks/queries/use-super-admin";
import { toast } from "sonner";

export function CreateAdminForm() {
  const createAdminMutation = useCreateAdminAutoMutation();
  const [showCredentials, setShowCredentials] = useState(false);
  const [credentials, setCredentials] = useState<{
    email: string;
    password: string;
    referralCode: string;
    referralLink: string;
  } | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const form = useForm<CreateAdminAutoInput>({
    resolver: zodResolver(createAdminAutoSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: CreateAdminAutoInput) => {
    createAdminMutation.mutate(data, {
      onSuccess: (response) => {
        setCredentials({
          email: response.email,
          password: response.plainTextPassword,
          referralCode: response.referralCode,
          referralLink: response.referralLink,
        });
        setShowCredentials(true);
        form.reset();
      },
    });
  };

  const handleCopy = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      toast.success(`${field} copied to clipboard`);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Create Admin Account
          </CardTitle>
          <CardDescription>
            Generate admin account with auto-generated credentials
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Admin Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="admin@example.com"
                        className="h-12 text-base"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full h-12 text-base"
                disabled={createAdminMutation.isPending}
              >
                {createAdminMutation.isPending ? "Creating..." : "Create Admin"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Dialog open={showCredentials} onOpenChange={setShowCredentials}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Admin Account Created</DialogTitle>
            <DialogDescription>
              Save these credentials securely. The password will not be shown again.
            </DialogDescription>
          </DialogHeader>
          {credentials && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <div className="flex gap-2">
                  <Input value={credentials.email} readOnly className="text-sm" />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleCopy(credentials.email, "Email")}
                    className="shrink-0 h-10 w-10"
                  >
                    {copiedField === "Email" ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <div className="flex gap-2">
                  <Input
                    value={credentials.password}
                    readOnly
                    className="text-sm font-mono"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleCopy(credentials.password, "Password")}
                    className="shrink-0 h-10 w-10"
                  >
                    {copiedField === "Password" ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Referral Code</label>
                <div className="flex gap-2">
                  <Input
                    value={credentials.referralCode}
                    readOnly
                    className="text-sm font-mono"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleCopy(credentials.referralCode, "Referral Code")}
                    className="shrink-0 h-10 w-10"
                  >
                    {copiedField === "Referral Code" ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                onClick={() => setShowCredentials(false)}
                className="w-full h-12"
              >
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
