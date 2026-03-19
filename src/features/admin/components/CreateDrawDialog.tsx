"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createDrawSchema, CreateDrawFormData } from "@/lib/validations/super-admin";
import { useCreateDrawMutation } from "@/hooks/queries/use-super-admin";
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
import { Plus, Calendar, Trophy } from "lucide-react";

export function CreateDrawDialog() {
    const [open, setOpen] = useState(false);
    const createDrawMutation = useCreateDrawMutation();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<CreateDrawFormData>({
        resolver: zodResolver(createDrawSchema),
    });

    const onSubmit = async (data: CreateDrawFormData) => {
        await createDrawMutation.mutateAsync(data);
        setOpen(false);
        reset();
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-purple-600 hover:bg-purple-500 text-white font-black px-6 h-11 rounded-2xl shadow-xl shadow-purple-900/20 border-0">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Draw
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-zinc-950 border-white/10 max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-white font-black uppercase text-xl flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-purple-400" />
                        Schedule New Draw
                    </DialogTitle>
                    <DialogDescription className="text-zinc-500">
                        Create a new lottery draw event for the platform.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-white uppercase tracking-wider">
                            Draw Type
                        </label>
                        <select
                            {...register("type")}
                            className="w-full bg-black border border-white/10 rounded-2xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all"
                        >
                            <option value="">Select draw type</option>
                            <option value="DAILY">Daily Draw</option>
                            <option value="WEEKLY">Weekly Draw</option>
                            <option value="MEGA">Mega Event</option>
                        </select>
                        {errors.type && (
                            <p className="text-red-400 text-xs font-medium">{errors.type.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-white uppercase tracking-wider">
                            Scheduled Date & Time
                        </label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                            <input
                                type="datetime-local"
                                {...register("scheduled_at")}
                                className="w-full bg-black border border-white/10 rounded-2xl pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all"
                            />
                        </div>
                        {errors.scheduled_at && (
                            <p className="text-red-400 text-xs font-medium">{errors.scheduled_at.message}</p>
                        )}
                    </div>

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
                            disabled={isSubmitting || createDrawMutation.isPending}
                            className="bg-purple-600 hover:bg-purple-500 text-white font-black"
                        >
                            {isSubmitting || createDrawMutation.isPending ? "Creating..." : "Schedule Draw"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
