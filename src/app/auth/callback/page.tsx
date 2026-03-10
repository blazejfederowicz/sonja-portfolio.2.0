"use client";

import { useEffect } from "react";
import supabase from "@/lib/supabaseClient"
import { useRouter } from "next/navigation";
import LoadingAnim from "@/features/LoadingAnim/LoadingAnim";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      await supabase.auth.getSession()

      router.replace("/admin")
    }

    handleAuth()
  }, [router])

  return <div className="h-dvh text-2xl md:text-7xl animate-pulse flex justify-center items-center">Loading <LoadingAnim/></div>;;
}