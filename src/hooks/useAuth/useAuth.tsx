import supabase from "@/lib/supabaseClient"
import { Session } from "@supabase/supabase-js"
import { useEffect, useState } from "react"

export default function useAuth(){
    const [session, setSession] = useState<Session | null>(null)

    const checkSession = async () =>{
        const {data} = await supabase.auth.getSession()
        setSession(data.session)
    }

    useEffect(()=> {checkSession()},[])

    return{
        session
    }
}