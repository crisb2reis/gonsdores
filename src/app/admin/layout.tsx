"use client";

import AdminGuard from "@/components/AdminGuard";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Se estiver na página de login, não precisa da proteção
    // O basePath do projeto é /gonsdores
    const isLoginPage = pathname.endsWith("/admin/login") || pathname.includes("/admin/login");

    if (isLoginPage) {
        return <div className="min-h-screen bg-[#0f0720]">{children}</div>;
    }

    return <AdminGuard>{children}</AdminGuard>;
}
