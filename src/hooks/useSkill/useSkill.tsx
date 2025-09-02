import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { getSkills } from "./selectors"
import { postSkill } from "@/store/skills/thunk"
import { Skill } from "@/types/common"


export default function useSkill(){
    const dispatch = useAppDispatch()

    const skillState = useAppSelector(getSkills)
    const dispatchSkill = (skill:Skill) => dispatch(postSkill({skill}))

    
    return {
        skillState,
        dispatchSkill
    }
}