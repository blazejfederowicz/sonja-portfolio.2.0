import { useState, useEffect, useMemo } from "react"
import  supabase  from "@/lib/supabaseClient"
import { Session } from "@supabase/supabase-js"

export default function useAuth() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        if (error) throw error
        setSession(data.session)
      } catch (err) {
        console.error("Error fetching session:", err)
        setSession(null)
      } finally {
        setLoading(false)
      }
    }

    getSession()

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
        setLoading(false)
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return useMemo(() => ({
    session,
    user: session?.user ?? null,
    loading,
    signOut
  }), [session, loading])
}