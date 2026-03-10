'use client'
import Login from "@/components/Login/Login";
import { BRAND_TEXT } from "@/constants";
import  Link  from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import useAuth from "@/hooks/useAuth/useAuth";
import { useRouter } from "next/navigation";

export default function LoginPage(){
    const { user, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
    if (!loading && user) {
        router.replace("/admin")
    }
    }, [user, loading, router])

    return (<>
        <header className="fixed top-0 inset-x-0 z-100 duration-300 overflow-hidden bg-transparent  py-5 px-2 max-h-20 container h-full flex justify-between items-center mx-auto">
            <Link href="/" className="flex gap-5">
                <Image width={500} height={500} src='/images/brandIcon.svg' className="h-[2.5em] w-fit"  alt="brand"/>
                <p className="mt-3 font-alta text-[#525351]">{BRAND_TEXT}</p>
            </Link>
        </header>
        <main>
            <Login/>
        </main>
    </>)
}