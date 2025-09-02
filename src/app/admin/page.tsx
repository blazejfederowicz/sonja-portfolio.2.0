"use client"
import Login from "@/components/Login/Login";
import supabaseAdmin from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Admin(){
    const session = supabaseAdmin.auth.getSession()
    const router = useRouter()

    return(<Login/>)

}