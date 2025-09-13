import { Project, ProjectProp } from "@/types/common";

export interface ProjectState{
    projectList: ProjectProp[];
    isLoading: boolean;
    errorMessage: string | null;
}