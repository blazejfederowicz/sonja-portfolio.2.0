import { useAppSelector } from "@/lib/hooks"
import { getSkills } from "./selectors"


export default function useSkill(){

    const skillState = useAppSelector(getSkills)
    
    return {
        skillState
    }
}