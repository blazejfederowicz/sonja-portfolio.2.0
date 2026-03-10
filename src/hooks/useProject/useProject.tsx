import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getProjects } from "./selectors";
import { Project } from "@/types/common";
import { postProject, removeProject, updateProject } from "@/store/projects/thunk";
import { useCallback } from "react";

export default function useProject(){
    const dispatch = useAppDispatch()
    
    const projectState = useAppSelector(getProjects);
    const addProject = useCallback(async (project: Project) =>{
        await dispatch(postProject({ project }))
    },[dispatch]) 
    const updateCurrentProject = useCallback(async (project: Project) =>{
        await dispatch(updateProject({ project }))
    },[dispatch]) 
    const findProject = useCallback(
        (id: string) => projectState.projectList.find((p) => p.project_id === id),
        [projectState]
    );
    const deleteProject = async (payload:{id:string}) =>{ 
            const project = projectState.projectList.find((project) => project.project_id === payload.id)
    
            await dispatch(removeProject({id:payload.id, path:project?.project_id}))
        }

    return{
        projectState,
        findProject,
        deleteProject,
        addProject,
        updateCurrentProject
    }
}