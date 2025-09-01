import { useAppSelector } from "@/lib/hooks";
import { getProjectById, getProjects } from "./selectors";

export default function useProject(){
    
    const projectState = useAppSelector(getProjects);
    const findProject = (id:string) => useAppSelector(getProjectById(id)); 

    return{
        projectState,
        findProject
    }
}