import { Skill } from "@/types/common";

export interface SkillState{
    skillList: Skill[];
    isLoading: boolean;
    errorMessage: string | null;
}