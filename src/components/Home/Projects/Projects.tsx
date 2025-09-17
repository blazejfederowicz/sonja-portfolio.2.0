'use client'
import { useState } from "react"
import {motion} from 'motion/react'
import { useRouter } from "next/navigation"
import { AnimateProject } from "./Projects.types"
import Tag from "@/common/Tag/Tag"
import useProject from "@/hooks/useProject/useProject"
import Loading from "@/components/Shared/Loading/Loading"
import Error from "@/components/Shared/Error/Error"
import Modal from "@/components/Modal/Modal"
import { DELETE_PROJECT_ID, EDIT, PROJECT_FORM_ID, PROJECTS_TEXT } from "@/constants"
import ProjectForm from "./components/ProjectForm/ProjectForm"
import Delete from "@/common/Delete/Delete"
import { isValidUrl, splitString } from "@/lib/getFormHelpers"
import { Project } from "@/types/common"


export default function Projects(){
    const [animateProject, setAnimateProject] = useState<AnimateProject>(null)
    const [hoverAnim, setHoverAnim] = useState(true)
    const router = useRouter()
    const [canClick, setCanClick] = useState(true)
    const {projectState, deleteProject} = useProject()


    const handlePageTransition = (
        element: Partial<Project>,
        event: React.MouseEvent<HTMLDivElement>
    ) => {
        if(!canClick) return;

        document.body.classList.add("overflow-hidden")
        document.documentElement.classList.remove("scroll-smooth")

        const rect = event.currentTarget.getBoundingClientRect();

        setTimeout(() => {
            setAnimateProject({
            index: element.project_id || "",
            src: isValidUrl(element.thumbnailUrl || ""),
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
        })
        }, 400);
        

        setHoverAnim(false)
        setCanClick(false)
    }


    return(<>
        <section id="projects" className="container px-2 mx-auto mt-28">
            <div>
                <div className="flex flex-col sm:flex-row container px-2 mx-auto gap-[1em]">
                    <Tag text={PROJECTS_TEXT}/>
                    <Modal buttonColor='bg-blue-600' headline={PROJECTS_TEXT} form={PROJECT_FORM_ID} buttonText={EDIT}>
                        <ProjectForm/>
                    </Modal>
                    <Delete data={projectState.projectList} formId={DELETE_PROJECT_ID} dispatch={deleteProject}/>
                </div>
                <div className={`${!!projectState.errorMessage || projectState.isLoading?"":"grid"} md:grid-cols-2 gap-[1em] max-w-[400px] md:max-w-[1000px] w-full mx-auto mt-25 overflow-hidden`}>
                    {   
                    projectState.isLoading? <Loading/>:
                    !!projectState.errorMessage? <Error errorMessage={projectState.errorMessage}/>: <>
                    <div className="flex w-full flex-col gap-[1em]">
                    {projectState.projectList.filter((_,i)=> i%2===0).map((e)=>{
                        return(
                        <motion.div  key={`even-${e.project_id}`} className="group relative " 
                        whileHover={!animateProject ? { scale: 1.02,cursor:"pointer", boxShadow: '0 10px 20px rgba(0,0,0,0.25)',
                                    transition:{
                                        duration:0.28
                                    }
                                 } : {}}
                        >
                            <motion.div onClick={(event)=>handlePageTransition(e,event)} className={` text-white bg-center bg-no-repeat bg-cover `} 
                                style={{backgroundImage:`url(${isValidUrl(e.thumbnailUrl || "")})`,minHeight:e.height}}
                                initial={{transform:"translateX(-100px)", opacity:0}}
                                whileInView={{transform:"translateX(0)",opacity:1, transition:{delay:0.2, ease:[0.4,0.2,0.6,1]}}}
                                viewport={{once:true}}
                            >
                                <p className="font-alta tracking-widest font-bold text-end text-3xl sm:text-4xl py-10 px-5 select-none opacity-0">{e.title}</p>
                            </motion.div>
                             <div className={`w-full h-full flex flex-col items-end justify-end py-10 px-5 absolute top-0 left-0 bg-sea/80 scale-x-0 origin-right ${hoverAnim?"group-hover:scale-x-100":""} duration-400 pointer-events-none`}>
                                 <p className="font-alta tracking-widest font-bold text-end text-3xl sm:text-4xl text-white opacity-0 transition-opacity duration-200 w-full delay-300 group-hover:opacity-100">{splitString(e.title).albanian}</p>
                                 <p className="font-alta tracking-widest font-bold text-2xl sm:text-3xl text-white/80 opacity-0 transition-opacity duration-200 delay-300 w-full group-hover:opacity-100 italic">{splitString(e.title).english}</p>
                            </div>
                       </motion.div>
                    )})}
                    </div>
                    <div className="flex w-full flex-col gap-[1em]">
                    {projectState.projectList.filter((_,i)=> i%2!==0).map((e)=>{
                        return(
                        <motion.div  key={`odd-${e.project_id}`} className="group relative "
                        whileHover={!animateProject ? { scale: 1.02, cursor:"pointer", boxShadow: '0 10px 20px rgba(0,0,0,0.25)',
                                    transition:{
                                        duration:0.28
                                    }
                                 } : {}}
                        >
                            <motion.div onClick={(event)=>handlePageTransition(e,event)} className={` text-white bg-center bg-no-repeat bg-cover`}
                                style={{backgroundImage:`url(${isValidUrl(e.thumbnailUrl || "")})`,minHeight:e.height}}
                                initial={{transform:"translateX(100px)", opacity:0}}
                                whileInView={{transform:"translateX(0)",opacity:1, transition:{delay:0.2, ease:[0.4,0.2,0.6,1]}}}
                                viewport={{once:true}}
                            >
                                <p className="font-alta tracking-widest font-bold text-end text-3xl sm:text-4xl py-10 px-5 select-none opacity-0">{e.title}</p>
                            </motion.div>
                            <div className={`w-full h-full flex flex-col items-end justify-end py-10 px-5 absolute top-0 left-0 bg-sea/80 scale-x-0 origin-right ${hoverAnim?"group-hover:scale-x-100":""} duration-400 pointer-events-none`}>
                                 <p className="font-alta tracking-widest shrink font-bold text-3xl sm:text-4xl text-white opacity-0 transition-opacity duration-200 w-full text-end delay-300 group-hover:opacity-100">{splitString(e.title).albanian}</p>
                                 <p className="font-alta tracking-widest font-bold text-2xl sm:text-3xl text-white/80 opacity-0 transition-opacity duration-200 delay-300 w-full group-hover:opacity-100 italic">{splitString(e.title).english}</p>
                            </div>
                       </motion.div>
                    )})}
                    </div>
                    </>}
                    {animateProject && (
                        <motion.div
                            initial={{
                            position: "fixed",
                            top: animateProject.top,
                            left: animateProject.left,
                            width: animateProject.width,
                            height: animateProject.height,
                            backgroundImage: `url(${animateProject.src})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            zIndex: 9999,
                            }}
                            animate={{
                            top: 0,
                            left: 0,
                            width: "100vw",
                            height: "100dvh",
                            transition: { duration: 0.9, ease: [0.4, 0, 0.2, 1] },
                            }}
                            onAnimationComplete={() => {
                            router.push(`/project/${animateProject.index}`);
                            }}
                        />
                    )}
                </div>
            </div>
        </section>
    </>)
} 