import { fileToBase64, handleErrors } from "@/lib/getFormHelpers";
import { useState } from "react";

export default function useForm<T extends Record<string, any>>(initialValues:T){
    const [state, setState] = useState<T>(initialValues)
    const [error, setError] = useState<Partial<Record<keyof T, string>>>({})

    const handleChange = async (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.currentTarget;

        let fieldValue: string | boolean = value;
        const files = (e.currentTarget as HTMLInputElement).files;

        if (e.currentTarget instanceof HTMLInputElement && type === "checkbox") {
            fieldValue = e.currentTarget.checked;
        } else if(files && files[0]){
            fieldValue =  await fileToBase64(files[0]);
        }

        setState(prev => ({ ...prev, [name]: fieldValue }));
        setError(prev => ({ ...prev, [name]: "" }));
    };

    const handleSubmit= (func?: (values:T)=>void) => (
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