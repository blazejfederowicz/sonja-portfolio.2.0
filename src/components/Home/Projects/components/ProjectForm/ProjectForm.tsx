import { FormButton } from "@/common/FormButton/FormButton";
import Input from "@/common/Input/Input";
import { CONTENT, CONTENT_TEXT, PROJECT_FORM_ID, PROJECT_FORM_INPUTS } from "@/constants";
import useForm from "@/hooks/useForm/useForm";
import { DialogTitle } from "@headlessui/react";
import { useState } from "react";

export default function ProjectForm(){
    const {state, error, handleChange, handleSubmit} = useForm({
        thumbnail:"",
        tag:"",
        title:"",
        desc:"",
        height:"200"
    })

    const handleClick = () =>{

    }

    return(
        <form id={PROJECT_FORM_ID} onSubmit={handleSubmit()}>
            {
                PROJECT_FORM_INPUTS.map((input, index)=>(
                    <Input 
                        key={`form-${index}`} {...input} 
                        value={state[input.id as keyof typeof state]} 
                        onChange={handleChange}
                        error={error[input.id as keyof typeof error]}
                        labelClass="text-white"
                        inputClass="text-white"
                    />
                ))
            }
            <div className="mt-2">
                <DialogTitle as="h3" className="text-base font-semibold text-white">
                    {CONTENT}
                </DialogTitle>
                <FormButton text={CONTENT_TEXT} icon="bi bi-plus text-xl" click={handleClick}/>
            </div>
        </form>
    )
}