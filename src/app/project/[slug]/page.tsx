"use client"
import ProjectComponent from "@/components/Project/ProjectComponent";
import ProjectHeader from "@/components/Project/ProjectHeader/ProjectHeader";
import Error from "@/components/Shared/Error/Error";
import Footer from "@/components/Shared/Footer/Footer";
import { PROJECT_NOT_FOUND } from "@/constants";
import LoadingScreen from "@/features/LoadingScreen/LoadingScreen";
import useProject from "@/hooks/useProject/useProject";
import { useParams } from "next/navigation";


export default function Project(){
    const {slug} = useParams()
    const {findProject, projectState} = useProject()
    const currentProject = findProject(slug as string)

    if(projectState.isLoading) {
        return <LoadingScreen/>
    }  
    
    if(!!!currentProject) {
        return <Error errorMessage={PROJECT_NOT_FOUND}/>
    }

    return(
        <>        
            <ProjectHeader project={currentProject}/>
            <ProjectComponent project={currentProject}/>
            <Footer/>
        </>
    )
}