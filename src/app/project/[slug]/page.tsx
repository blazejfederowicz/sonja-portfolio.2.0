"use client"
import ProjectComponent from "@/components/Project/ProjectComponent";
import ProjectHeader from "@/components/Project/ProjectHeader/ProjectHeader";
import Footer from "@/components/Shared/Footer/Footer";
import { findProject } from "@/lib/projectHelpers";
import { AnimatePresence } from "motion/react";
import { useParams } from "next/navigation";


export default function Project(){
    const {slug} = useParams()
    const currentProject = findProject(slug as string)

    return(<>
            <ProjectHeader project={currentProject}/>
            <ProjectComponent project={currentProject}/>
            <Footer/>
    </>)
}