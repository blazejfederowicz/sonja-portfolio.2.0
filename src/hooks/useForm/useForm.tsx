import { handleErrors } from "@/lib/getFormHelpers";
import { useState } from "react";

export default function useForm<T extends Record<string, any>>(initialValues:T){
    const [state, setState] = useState<T>(initialValues)
    const [error, setError] = useState<Partial<Record<keyof T, string>>>({})

    const fileToBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });

    const handleChange = async (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.currentTarget;
        const files = (e.currentTarget as HTMLInputElement).files;
        
        if (files && files[0]) {
            const base64 = await fileToBase64(files[0]);
            setState(prev => ({ ...prev, [name]: base64 }));
        } else {
            setState(prev => ({ ...prev, [name]: value }));
        }

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