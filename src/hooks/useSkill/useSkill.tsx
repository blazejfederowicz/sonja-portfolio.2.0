import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { getSkills } from "./selectors"
import { postSkill, removeSkill } from "@/store/skills/thunk"
import { ID, Skill } from "@/types/common"
import { addSkill } from "@/store/skills/slice"


export default function useSkill(){
    const dispatch = useAppDispatch()

    const skillState = useAppSelector(getSkills)
    const newSkill = (payload: Skill) => {
        console.log(payload)
        dispatch(addSkill(payload))}
    const dispatchSkill = (skill:Skill) => dispatch(postSkill({skill}))
    const deleteSkill = (id:ID) => dispatch(removeSkill(id))

    
    return {
        skillState,
        dispatchSkill,
        deleteSkill,
        newSkill
    }
}