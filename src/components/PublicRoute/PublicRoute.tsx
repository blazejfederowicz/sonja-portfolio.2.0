"use client"

import useEvents from "@/hooks/useEvents/useEvents"
import useProject from "@/hooks/useProject/useProject"
import useSkill from "@/hooks/useSkill/useSkill"
import { useAppDispatch } from "@/lib/hooks"
import { fetchEvents } from "@/store/events/thunk"
import { fetchProjects } from "@/store/projects/thunk"
import { fetchSkills } from "@/store/skills/thunk"
import { useEffect } from "react"
import Error from "../Shared/Error/Error"
import { Children } from "@/types/common"
import LoadingScreen from "@/features/LoadingScreen/LoadingScreen"

export default function PublicRoute({children}:Children){
    const {projectState} = useProject()
    const {eventState} = useEvents()
    const {skillState} = useSkill()
    const state = [projectState, eventState, skillState]
    const error = state.some(s=>!!s.errorMessage)

    const dispatch = useAppDispatch()

    useEffect(()=>{
        if(!skillState.skillList.length) dispatch(fetchSkills())
        if(!eventState.eventList.length) dispatch(fetchEvents())
        if(!projectState.projectList.length)dispatch(fetchProjects())
    },[dispatch, skillState.skillList.length, eventState.eventList.length, projectState.projectList.length])
    
    // if(state.some(s=>s.isLoading)) return <LoadingScreen/>
    if(error) return <Error errorMessage={projectState.errorMessage}/>
    
    return(
        <>
            {children}
        </>
    )
}