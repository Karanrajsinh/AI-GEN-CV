'use client'

import { useUserDetails } from "@/src/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
    const router = useRouter();
    const { login } = useUserDetails();

    useEffect(() => {
        if (login === false) {
            router.push('/login');
        }
    }, [login, router]);

    if (!login) return <div className="bg-slate-950 min-w-screen h-screen bg-grid-cyan-950/[0.2]"></div>; // Return null until redirection happens
    return <>{children}</>;

}
