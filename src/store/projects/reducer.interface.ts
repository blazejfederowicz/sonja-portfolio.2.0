import { Project } from "@/types/common";

export interface ProjectState{
    projectList: Project[];
    isLoading: boolean;
    errorMessage: string | null;
}