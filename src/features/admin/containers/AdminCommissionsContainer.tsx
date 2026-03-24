"use client";

import { useState } from "react";
import { useAdminCommissionsQuery } from "@/hooks/queries/use-admin";
import { AdminCommissionsView } from "../components/AdminCommissionsView";

export function AdminCommissionsContainer() {
    const [page, setPage] = useState(1);
    const { data: commissionsData, isLoading } = useAdminCommissionsQuery(page, 20);

    return (
        <AdminCommissionsView
            commissions={commissionsData?.items || []}
            total={commissionsData?.total || 0}
            page={page}
            totalPages={commissionsData?.totalPages || 1}
            isLoading={isLoading}
            onPageChange={setPage}
        />
    );
}
