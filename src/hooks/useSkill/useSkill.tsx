import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { getSkills } from "./selectors"
import { postSkill, removeSkill } from "@/store/skills/thunk"
import { ID, Skill } from "@/types/common"
import { addSkill } from "@/store/skills/slice"
import { useCallback } from "react"


export default function useSkill(){
    const dispatch = useAppDispatch()

    const skillState = useAppSelector(getSkills)
    const newSkill =  useCallback((payload: Skill) =>{
        dispatch(addSkill(payload))
    },[dispatch])
    const dispatchSkill = (skill:Skill) => dispatch(postSkill({skill}))
    const deleteSkill = (id:ID) => dispatch(removeSkill(id))

    
    return {
        skillState,
        dispatchSkill,
        deleteSkill,
        newSkill
    }
}