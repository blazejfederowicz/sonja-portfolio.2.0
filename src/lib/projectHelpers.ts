import { useProjects } from "@/store/ProjectContext"

export const findProject = (slug:string)=>{
    return useProjects().find(e => e.index === parseInt(typeof slug === 'string' ? slug : '', 10))
}