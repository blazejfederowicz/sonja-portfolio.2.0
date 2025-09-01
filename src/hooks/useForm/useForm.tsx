import { handleErrors } from "@/lib/getFormHelpers";
import { useState } from "react";

export default function useForm<T extends Record<string, any>>(initialValues:T){
    const [state, setState] = useState<T>(initialValues)
    const [error, setError] = useState<Partial<Record<keyof T, string>>>({})

    const handleChange= (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) =>{
        const {name, value} = e.currentTarget;

        setState(prev=>({...prev, [name]: value}))
        setError(prev=>({...prev, [name]: ""}))
    }

    const handleSubmit= (func?: (values: T)=>void) => (
        e: React.FormEvent
    ) =>{
        e.preventDefault()
        
        const errors = handleErrors({...state})

        if(Object.keys(errors).length > 0){
            setError(prev => ({...prev, ...errors}))
            return
        }

         if (func) {
            func(state);
        }

        setState(initialValues)
        setError({})

    }

    return{
        state,
        setState,
        error,
        setError,
        handleChange,
        handleSubmit
    }
}