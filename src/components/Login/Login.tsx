"use client"
import { FormButton } from "@/common/FormButton/FormButton";
import Input from "../../common/Input/Input";
import AuthLayout from "./Layout/AuthLayout/AuthLayout";
import { AUTH_EMAIL, AUTH_LOGIN, AUTH_MESSAGE, EMAIL, EMAIL_TEXT, ERROR } from "@/constants";
import { useState } from "react";
import supabaseAdmin from "@/lib/supabaseClient";

export default function Login(){
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { error } = await supabaseAdmin.auth.signInWithOtp({ email });
        if (error) setMessage(ERROR + error.message);
        else setMessage(AUTH_MESSAGE);
    };

    return(
        <AuthLayout title={AUTH_LOGIN}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-[2em]">
                <Input label={EMAIL_TEXT} id={AUTH_EMAIL} value={email}
                    onChange={(e) => setEmail(e.target.value)}/>
                <FormButton type="submit" text={AUTH_LOGIN} icon=""/>
            </form>
            <div className="flex flex-col w-full items-center justify-center">
                {!!message &&
                    <small className="text-salmon2 text-sm mt-2 text-center">
                        {message}
                    </small>
                }
            </div>
        </AuthLayout>
    )
}