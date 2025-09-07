import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { getSkills } from "./selectors"
import { postSkill, removeSkill } from "@/store/skills/thunk"
import { ID, Skill } from "@/types/common"


export default function useSkill(){
    const dispatch = useAppDispatch()

    const skillState = useAppSelector(getSkills)
    const dispatchSkill = (skill:Skill) => dispatch(postSkill({skill}))
    const deleteSkill = (id:ID) => dispatch(removeSkill(id))

    
    return {
        skillState,
        dispatchSkill,
        deleteSkill
    }
}