import { z } from "zod";

export const purchaseTicketsSchema = z.object({
  quantity: z.number().min(1, "Quantity must be at least 1").max(100, "Maximum 100 tickets per purchase"),
});

export type PurchaseTicketsInput = z.infer<typeof purchaseTicketsSchema>;
