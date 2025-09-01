import Input from "@/common/Input/Input";
import { EVENT_FORM_ID, EVENT_FORM_INPUTS } from "@/constants";
import useForm from "@/hooks/useForm/useForm";

export default function EventForm(){
    const {state, error, handleChange, handleSubmit} = useForm({
        thumbnail:"",
        title:"",
        desc:"",
        side_text:""
    })

    return(
        <form id={EVENT_FORM_ID} onSubmit={handleSubmit()}>
            {
                EVENT_FORM_INPUTS.map((input, index)=>(
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
        </form>
    )
}