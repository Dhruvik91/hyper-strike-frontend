"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSetWinnersMutation } from "@/hooks/queries/use-super-admin";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trophy, Plus, Trash2, User, Ticket as TicketIcon, DollarSign } from "lucide-react";

const winnerSchema = z.object({
    user_id: z.string().min(1, "User ID is required"),
    ticket_id: z.string().min(1, "Ticket ID is required"),
    win_type: z.enum(["RANDOM_TICKET", "TOP_REFERRER"]),
    prize_amount_inr: z.string().min(1, "Prize amount is required"),
});

const setWinnersSchema = z.object({
    winners: z.array(winnerSchema).min(1, "At least one winner is required"),
});

type SetWinnersFormData = z.infer<typeof setWinnersSchema>;

interface ManualWinnerDialogProps {
    drawId: string;
}

export function ManualWinnerDialog({ drawId }: ManualWinnerDialogProps) {
    const [open, setOpen] = useState(false);
    const setWinnersMutation = useSetWinnersMutation();

    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<SetWinnersFormData>({
        resolver: zodResolver(setWinnersSchema),
        defaultValues: {
            winners: [
                {
                    user_id: "",
                    ticket_id: "",
                    win_type: "RANDOM_TICKET",
                    prize_amount_inr: "",
                },
            ],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "winners",
    });

    const onSubmit = async (data: SetWinnersFormData) => {
        await setWinnersMutation.mutateAsync({
            drawId,
            winners: data.winners,
        });
        setOpen(false);
        reset();
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-amber-600 hover:bg-amber-500 text-white font-black px-6 h-11 rounded-2xl shadow-xl shadow-amber-900/20 border-0">
                    <Trophy className="w-4 h-4 mr-2" />
                    Manual Assignment
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-zinc-950 border-white/10 max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-white font-black uppercase text-xl flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-amber-400" />
                        Manually Assign Winners
                    </DialogTitle>
                    <DialogDescription className="text-zinc-500">
                        Override automatic selection and manually assign winners for this draw.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        {fields.map((field, index) => (
                            <div
                                key={field.id}
                                className="bg-black/40 border border-white/10 rounded-2xl p-4 space-y-3"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="text-sm font-black text-white uppercase tracking-wider">
                                        Winner #{index + 1}
                                    </h4>
                                    {fields.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => remove(index)}
                                            className="text-red-400 hover:text-red-300 h-8"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                                            User ID
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                            <input
                                                {...register(`winners.${index}.user_id`)}
                                                className="w-full bg-black border border-white/10 rounded-xl pl-10 pr-3 py-2.5 text-white text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/50 transition-all"
                                                placeholder="User UUID"
                                            />
                                        </div>
                                        {errors.winners?.[index]?.user_id && (
                                            <p className="text-red-400 text-xs">
                                                {errors.winners[index]?.user_id?.message}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                                            Ticket ID
                                        </label>
                                        <div className="relative">
                                            <TicketIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                            <input
                                                {...register(`winners.${index}.ticket_id`)}
                                                className="w-full bg-black border border-white/10 rounded-xl pl-10 pr-3 py-2.5 text-white text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/50 transition-all"
                                                placeholder="Ticket UUID"
                                            />
                                        </div>
                                        {errors.winners?.[index]?.ticket_id && (
                                            <p className="text-red-400 text-xs">
                                                {errors.winners[index]?.ticket_id?.message}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                                            Win Type
                                        </label>
                                        <select
                                            {...register(`winners.${index}.win_type`)}
                                            className="w-full bg-black border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/50 transition-all"
                                        >
                                            <option value="RANDOM_TICKET">Random Ticket</option>
                                            <option value="TOP_REFERRER">Top Referrer</option>
                                        </select>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                                            Prize Amount (INR)
                                        </label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                            <input
                                                {...register(`winners.${index}.prize_amount_inr`)}
                                                className="w-full bg-black border border-white/10 rounded-xl pl-10 pr-3 py-2.5 text-white text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/50 transition-all"
                                                placeholder="50000.00"
                                            />
                                        </div>
                                        {errors.winners?.[index]?.prize_amount_inr && (
                                            <p className="text-red-400 text-xs">
                                                {errors.winners[index]?.prize_amount_inr?.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                            append({
                                user_id: "",
                                ticket_id: "",
                                win_type: "RANDOM_TICKET",
                                prize_amount_inr: "",
                            })
                        }
                        className="w-full border-white/10 bg-white/5 text-white hover:bg-white/10 h-11 rounded-xl font-bold"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Another Winner
                    </Button>

                    <DialogFooter className="gap-2 pt-4">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => {
                                setOpen(false);
                                reset();
                            }}
                            className="text-zinc-500 font-bold"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting || setWinnersMutation.isPending}
                            className="bg-amber-600 hover:bg-amber-500 text-white font-black"
                        >
                            {isSubmitting || setWinnersMutation.isPending ? "Assigning..." : "Assign Winners"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
