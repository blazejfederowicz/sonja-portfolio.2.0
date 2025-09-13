import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getProjectById, getProjects } from "./selectors";
import { Project } from "@/types/common";
import { postProject, removeProject } from "@/store/projects/thunk";

export default function useProject(){
    const dispatch = useAppDispatch()
    
    const projectState = useAppSelector(getProjects);
    const addProject = (project: Project) => dispatch(postProject({ project }))
    const findProject = (id:string) => useAppSelector(getProjectById(id)); 
    const deleteProject = (payload:{id:string}) =>{ 
            const project = projectState.projectList.find((project) => project.id === parseInt(payload.id))
    
            dispatch(removeProject({id:payload.id, path:project?.project_id}))
        }

    return{
        projectState,
        findProject,
        deleteProject,
        addProject
    }
}