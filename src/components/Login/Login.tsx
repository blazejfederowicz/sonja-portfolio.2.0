"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import AuthLayout from "./Layout/AuthLayout/AuthLayout";
import { AUTH_LOGIN, EMAIL_TEXT } from "@/constants";
import { useState } from "react";
import supabase from "@/lib/supabaseClient";

export default function Login() {
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!email) {
            setMessage("Please enter an email")
            return
        }

        setLoading(true)
        setMessage("")

        const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
            emailRedirectTo: `${location.origin}/auth/callback`,
        },
        })

        if (error) setMessage(error.message)
        else setMessage("Check your email for the login link")

        setLoading(false)
    }

    return (
        <AuthLayout title={AUTH_LOGIN}>
        <form onSubmit={handleSubmit} className="space-y-4">

            <div className="space-y-2">
            <Label htmlFor="email">{EMAIL_TEXT}</Label>
            <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
            />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Sending link..." : AUTH_LOGIN}
            </Button>

        </form>

        {!!message && (
            <p className="text-sm text-center">{message}</p>
        )}
        </AuthLayout>
    )
}