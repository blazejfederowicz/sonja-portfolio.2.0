import { RootState } from "@/store";
import { Project } from "@/types/common";

export const getProjects = (state: RootState) => state.projects;
export const getProjectById = (payload:string) => (state: RootState) => {
    const project = state.projects.projectList.find((project: Project) => project.project_id === payload)
    if(project){
        return project
    } else{
        return null;
    }
};