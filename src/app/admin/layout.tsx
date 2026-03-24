'use client'
import { Providers } from "@/store/providers";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import LoadingAnim from "@/features/LoadingAnim/LoadingAnim";
import useAuth from "@/hooks/useAuth/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const { session, loading } = useAuth()
  const router = useRouter();

  useEffect(() => {
    if (!loading && !session) {
      router.replace("/login");
    }
  }, [loading, session, router]);

  if (loading || !session) return <div className="h-dvh text-2xl md:text-7xl animate-pulse flex justify-center items-center">Loading <LoadingAnim/></div>;

  return (
    <Providers>
      <div className="flex h-screen bg-background">
        <AdminSidebar />
        <main className="flex-1 overflow-auto pl-16 md:pl-0">{children}</main>
      </div>
    </Providers>
  );
}
