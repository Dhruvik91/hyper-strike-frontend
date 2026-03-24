import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Minus, Plus, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { purchaseTicketsSchema, PurchaseTicketsInput } from "@/lib/validations/tickets";
import { usePurchaseTicketMutation, useTicketPriceQuery } from "@/hooks/queries/use-tickets";
import { CardSkeleton } from "@/components/shared/loading-skeleton";

export function PurchaseTicketsForm() {
  const { data: priceData, isLoading: isPriceLoading } = useTicketPriceQuery();
  const purchaseMutation = usePurchaseTicketMutation();
  const [quantity, setQuantity] = useState(1);

  const form = useForm<PurchaseTicketsInput>({
    resolver: zodResolver(purchaseTicketsSchema),
    defaultValues: {
      quantity: 1,
    },
  });

  const onSubmit = (data: PurchaseTicketsInput) => {
    purchaseMutation.mutate(data);
  };

  if (isPriceLoading) {
    return <CardSkeleton />;
  }

  const ticketPrice = priceData ? parseFloat(priceData.price_inr) : 0;
  const totalPrice = ticketPrice * quantity;

  const incrementQuantity = () => {
    const newQuantity = Math.min(quantity + 1, 100);
    setQuantity(newQuantity);
    form.setValue("quantity", newQuantity);
  };

  const decrementQuantity = () => {
    const newQuantity = Math.max(quantity - 1, 1);
    setQuantity(newQuantity);
    form.setValue("quantity", newQuantity);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Ticket className="h-5 w-5" />
          Purchase Tickets
        </CardTitle>
        <CardDescription>
          Buy lottery tickets for the upcoming draw
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Tickets</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={decrementQuantity}
                        disabled={quantity <= 1}
                        className="h-12 w-12 shrink-0"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        {...field}
                        type="number"
                        min={1}
                        max={100}
                        value={quantity}
                        onChange={(e) => {
                          const val = parseInt(e.target.value) || 1;
                          const clamped = Math.max(1, Math.min(100, val));
                          setQuantity(clamped);
                          field.onChange(clamped);
                        }}
                        className="text-center text-2xl font-bold h-12"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={incrementQuantity}
                        disabled={quantity >= 100}
                        className="h-12 w-12 shrink-0"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="rounded-lg bg-muted p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Price per ticket</span>
                <span className="font-medium">₹{ticketPrice.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Quantity</span>
                <span className="font-medium">{quantity}</span>
              </div>
              <div className="h-px bg-border my-2" />
              <div className="flex justify-between">
                <span className="font-semibold">Total Amount</span>
                <span className="text-xl font-bold text-primary">
                  ₹{totalPrice.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base"
              disabled={purchaseMutation.isPending}
            >
              {purchaseMutation.isPending ? "Processing..." : "Purchase Tickets"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
