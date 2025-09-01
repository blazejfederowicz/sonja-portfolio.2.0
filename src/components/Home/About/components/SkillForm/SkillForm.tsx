import Input from "@/common/Input/Input";
import { SKILL_FORM_ID, SKILL_FORM_INPUTS } from "@/constants";
import useForm from "@/hooks/useForm/useForm";

export default function SkillForm(){
    const {state, error, handleChange, handleSubmit} = useForm({
        tag:"",
        title:"",
        desc:""
    })

    return(
        <form id={SKILL_FORM_ID} onSubmit={handleSubmit()}>
            {
                SKILL_FORM_INPUTS.map((input, index)=>(
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