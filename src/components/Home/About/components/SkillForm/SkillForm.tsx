import Input from "@/common/Input/Input";
import { RealtimeListener } from "@/components/RealtimeListener/RealtimeListener";
import { SKILL_FORM_ID, SKILL_FORM_INPUTS, TABLES } from "@/constants";
import useForm from "@/hooks/useForm/useForm";
import useSkill from "@/hooks/useSkill/useSkill";

export default function SkillForm(){
    const {state, error, handleChange, handleSubmit} = useForm({
        tag:"",
        title:"",
        short_description:""
    })
    const {dispatchSkill, newSkill} = useSkill()

    return(<>
        <RealtimeListener 
            table={TABLES.skills}
            onInsert={newSkill} 
        />
        <form id={SKILL_FORM_ID} onSubmit={handleSubmit(dispatchSkill)}>
            {
                SKILL_FORM_INPUTS.map((input, index)=>(
                    <Input 
                        key={`form-${index}`} {...input} 
                        value={state[input.id as keyof typeof state]} 
                        onChange={handleChange}
                        error={error[input.id as keyof typeof error]}
                    />
                ))
            }
        </form>
    </>)
}