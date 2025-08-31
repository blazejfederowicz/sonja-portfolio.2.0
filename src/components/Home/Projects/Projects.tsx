'use client'
import { useState } from "react"
import {motion} from 'motion/react'
import { useProjects } from "@/store/ProjectContext"
import { useRouter } from "next/navigation"
import { AnimateProject } from "./Projects.types"
import Tag from "@/common/Tag/Tag"
import { PROJECTS_Text } from "@/constants"


export default function Projects(){
    const [animateProject, setAnimateProject] = useState<AnimateProject>(null)
    const [hoverAnim, setHoverAnim] = useState(true)
    const router = useRouter()
    const [canClick, setCanClick] = useState(true)
    const projectsArr = useProjects()


    const handlePageTransition = (
        element: { index: number; src: string; height?: string | number; title?: string },
        event: React.MouseEvent<HTMLDivElement>
    ) => {
        if(!canClick) return;

        document.body.classList.add("overflow-hidden")
        document.documentElement.classList.remove("scroll-smooth")

        const rect = event.currentTarget.getBoundingClientRect();

        setTimeout(() => {
            setAnimateProject({
            index: element.index,
            src: element.src,
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
                <Tag text={PROJECTS_Text}/>
                <div className="grid md:grid-cols-2 gap-[1em] max-w-[400px] md:max-w-[1000px] w-full mx-auto mt-25">
                    <div className="flex w-full flex-col gap-[1em]">
                    {projectsArr.filter((_,i)=> i%2===0).map((e,i)=>{
                        return(
                        <motion.div  key={`even-${e.index}`} className="group relative " 
                        whileHover={!animateProject ? { scale: 1.02,cursor:"pointer", boxShadow: '0 10px 20px rgba(0,0,0,0.25)',
                                    transition:{
                                        duration:0.28
                                    }
                                 } : {}}
                        >
                            <motion.div onClick={(event)=>handlePageTransition(e,event)} className={` text-white bg-center bg-no-repeat bg-cover `} 
                                style={{backgroundImage:`url(${e.src})`,height:e.height}}
                                initial={{transform:"translateX(-100px)", opacity:0}}
                                whileInView={{transform:"translateX(0)",opacity:1, transition:{delay:0.2, ease:[0.4,0.2,0.6,1]}}}
                                viewport={{once:true}}
                            />
                             <div className={`w-full h-full flex items-end justify-end py-10 px-5 absolute top-0 left-0 bg-sea/80 scale-x-0 origin-right ${hoverAnim?"group-hover:scale-x-100":""} duration-400 pointer-events-none`}>
                                 <p className="font-alta tracking-widest font-bold text-4xl text-white opacity-0 transition-opacity duration-200 delay-300 group-hover:opacity-100">{e.title}</p>
                            </div>
                       </motion.div>
                    )})}
                    </div>
                    <div className="flex w-full flex-col gap-[1em]">
                    {projectsArr.filter((_,i)=> i%2!==0).map((e,i)=>{
                        return(
                        <motion.div  key={`odd-${e.index}`} className="group relative "
                        whileHover={!animateProject ? { scale: 1.02, cursor:"pointer", boxShadow: '0 10px 20px rgba(0,0,0,0.25)',
                                    transition:{
                                        duration:0.28
                                    }
                                 } : {}}
                        >
                            <motion.div onClick={(event)=>handlePageTransition(e,event)} className={` text-white bg-center bg-no-repeat bg-cover`}
                                style={{backgroundImage:`url(${e.src})`,height:e.height}}
                                initial={{transform:"translateX(100px)", opacity:0}}
                                whileInView={{transform:"translateX(0)",opacity:1, transition:{delay:0.2, ease:[0.4,0.2,0.6,1]}}}
                                viewport={{once:true}}
                            />
                            <div className={`w-full h-full flex items-end justify-end py-10 px-5 absolute top-0 left-0 bg-sea/80 scale-x-0 origin-right ${hoverAnim?"group-hover:scale-x-100":""} duration-400 pointer-events-none`}>
                                 <p className="font-alta tracking-widest font-bold text-4xl text-white opacity-0 transition-opacity duration-200 delay-300 group-hover:opacity-100">{e.title}</p>
                            </div>
                       </motion.div>
                    )})}
                    </div>
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
                            height: "100vh",
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