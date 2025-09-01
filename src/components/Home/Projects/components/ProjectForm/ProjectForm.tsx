import Input from "@/common/Input/Input";
import { PROJECT_FORM_ID, PROJECT_FORM_INPUTS } from "@/constants";
import useForm from "@/hooks/useForm/useForm";

export default function ProjectForm(){
    const {state, error, handleChange, handleSubmit} = useForm({
        thumbnail:"",
        tag:"",
        title:"",
        desc:"",
        height:"200"
    })

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
        </form>
    )
}