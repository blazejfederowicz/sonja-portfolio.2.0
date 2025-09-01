"use client"
import { FORM_TYPES, CONTACT_BUTTON, CONTACT_MESSAGE, FORM_INPUTS } from "@/constants";
import ContactLayout from "../layout/ContactLayout";
import Input from "@/common/Input/Input";
import { FormButton } from "@/common/FormButton/FormButton";
import emailService from "@/lib/emailService";
import { useReducer } from "react";
import { DEFAULT_STATE, INITIAL_VALUE, reducer } from "../reducer";
import { State } from "@/types/Contact.interface";
import { handleErrors } from "@/lib/getFormHelpers";

export default function ContactForm(){
     const [state, dispatch] = useReducer(reducer, INITIAL_VALUE)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        const {name, value} = e.target;
        dispatch({type:FORM_TYPES.INPUT_CHANGE, payload:{name:name as keyof State, value}})
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        
        dispatch({type: FORM_TYPES.SET_PENDING})
        const errors = handleErrors({
            name: state.name,
            email: state.email,
            title: state.title,
            message: state.message
        })

        if(Object.keys(errors).length > 0){
            dispatch({type:FORM_TYPES.SET_ERROR, payload: errors as State['error']})
            return
        }

        emailService(e.target as HTMLFormElement, dispatch)
    }
    return(
        <ContactLayout title={CONTACT_MESSAGE}>
            <form onSubmit={handleSubmit} className="space-y-4">
                {
                    FORM_INPUTS.map((input, index)=>(
                        <Input 
                            key={`form-${index}`} {...input} 
                            value={state[input.id as keyof typeof DEFAULT_STATE]} 
                            onChange={handleChange}
                            error={state.error[input.id as keyof typeof INITIAL_VALUE.error]}
                        />
                    ))
                }
                <FormButton type="submit" text={CONTACT_BUTTON} isSubmiting={state.loading}/>
                 {
                    !!state.fullfield ? 
                    <p className="text-sm -mt-3 text-green-400">{state.fullfield}</p>
                    :
                    <p className="text-sm -mt-3 text-red-500">{state.rejected}</p>
                }
            </form>
        </ContactLayout>
    )
}