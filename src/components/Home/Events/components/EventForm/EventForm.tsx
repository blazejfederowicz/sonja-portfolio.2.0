import Input from "@/common/Input/Input";
import { EVENT_FORM_ID, EVENT_FORM_INPUTS } from "@/constants";
import useEvents from "@/hooks/useEvents/useEvents";
import useForm from "@/hooks/useForm/useForm";

export default function EventForm(){
    const {state, error, handleChange, handleSubmit} = useForm({
        thumbnail:"",
        title:"",
        short_description:"",
        side_text:""
    })
    const { dispatchEvent } = useEvents()

    return(
        <form id={EVENT_FORM_ID} onSubmit={handleSubmit(dispatchEvent)}>
            {
                EVENT_FORM_INPUTS.map((input, index)=>(
                    <Input 
                        key={`form-${index}`} {...input} 
                        {...(input.type !== "file" && {
                            value: state[input.id as keyof typeof state],
                        })}
                        onChange={handleChange}
                        error={error[input.id as keyof typeof error]}
                    />
                ))
            }
        </form>
    )
}