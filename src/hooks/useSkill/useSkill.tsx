import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { getSkills } from "./selectors"
import { postSkill, removeSkill, updateSkill } from "@/store/skills/thunk"
import { Skill } from "@/types/common"
import { addSkill } from "@/store/skills/slice"
import { useCallback } from "react"


export default function useSkill(){
    const dispatch = useAppDispatch()

    const skillState = useAppSelector(getSkills)
    const newSkill =  useCallback((payload: Skill) =>{
        dispatch(addSkill(payload))
    },[dispatch])
    const dispatchSkill = async (skill:Skill) => await dispatch(postSkill({skill}))
    const deleteSkill = async (id:string) => await dispatch(removeSkill(id))
    const updateCurrentSkill = useCallback(async (skill: Skill) =>{
        await dispatch(updateSkill({ skill }))
    },[dispatch]) 

    
    return {
        skillState,
        dispatchSkill,
        deleteSkill,
        newSkill,
        updateCurrentSkill
    }
}