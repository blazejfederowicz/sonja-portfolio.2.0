import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getProjectById, getProjects } from "./selectors";
import { ID } from "@/types/common";
import { removeProject } from "@/store/projects/thunk";

export default function useProject(){
    const dispatch = useAppDispatch()
    
    const projectState = useAppSelector(getProjects);
    const findProject = (id:string) => useAppSelector(getProjectById(id)); 
    const deleteProject = (id:ID) => dispatch(removeProject(id))

    return{
        projectState,
        findProject,
        deleteProject
    }
}