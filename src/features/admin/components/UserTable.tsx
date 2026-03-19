"use client";

import { UserProfile, UserRole } from "@/constants/interface";
import { motion } from "framer-motion";
import { User, Shield, ShieldAlert, CheckCircle2, XCircle, MoreVertical, Ban, Check } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { FundUserDialog } from "./FundUserDialog";

interface UserTableProps {
    users: UserProfile[];
    isLoading?: boolean;
    onToggleStatus: (userId: string) => void;
}

export function UserTable({ users, isLoading, onToggleStatus }: UserTableProps) {
    if (isLoading) {
        return (
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-16 rounded-2xl bg-zinc-900/40 border border-white/5 animate-pulse" />
                ))}
            </div>
        );
    }

    return (
        <div className="bg-zinc-950/40 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-xl">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-white/5 bg-white/[0.02]">
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-500">Identity</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-500">Authority</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-500">Operational Status</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-500">Wallet</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-500"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {users.map((user, index) => (
                            <motion.tr
                                key={user.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="hover:bg-white/[0.03] transition-colors"
                            >
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-zinc-800 to-zinc-900 border border-white/10 flex items-center justify-center text-xs font-black text-white">
                                            {user.first_name?.[0] || user.whatsapp_number[0]}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-white leading-none mb-1">
                                                {user.first_name ? `${user.first_name} ${user.last_name || ''}` : 'Anonymous'}
                                            </p>
                                            <p className="text-[10px] text-zinc-500 font-medium">+{user.whatsapp_number}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        {user.role_id === UserRole.SUPER_ADMIN ? (
                                            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20">
                                                <ShieldAlert className="w-3 h-3" />
                                                <span className="text-[10px] font-black">SUPER_ADMIN</span>
                                            </div>
                                        ) : user.role_id === UserRole.ADMIN ? (
                                            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                                <Shield className="w-3 h-3" />
                                                <span className="text-[10px] font-black">ADMIN</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                <User className="w-3 h-3" />
                                                <span className="text-[10px] font-black">STRIKER</span>
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        {user.is_active ? (
                                            <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
                                                <CheckCircle2 className="w-3 h-3" /> Active
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1 text-[10px] font-bold text-red-500 uppercase tracking-widest">
                                                <XCircle className="w-3 h-3" /> Suspended
                                            </span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-xs font-black text-white tracking-tight italic">₹{user.wallet_balance}</p>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center gap-2 justify-end">
                                        <FundUserDialog 
                                            userId={user.id} 
                                            userName={user.first_name ? `${user.first_name} ${user.last_name || ''}` : user.whatsapp_number}
                                        />
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-white">
                                                    <MoreVertical className="w-4 h-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="bg-zinc-950 border-white/10">
                                                <DropdownMenuItem
                                                    className={`text-xs font-bold uppercase tracking-widest flex items-center gap-2 ${user.is_active ? 'text-red-400' : 'text-emerald-400'}`}
                                                    onClick={() => onToggleStatus(user.id)}
                                                >
                                                    {user.is_active ? <><Ban className="w-3.5 h-3.5" /> Suspend</> : <><Check className="w-3.5 h-3.5" /> Activate</>}
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
