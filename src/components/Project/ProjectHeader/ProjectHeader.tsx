"use client"
import { motion } from 'motion/react'
import Navbar from '@/components/Shared/Navbar/Navbar'
import { PROJECT, PROJECT_BUTTON_TEXT } from '@/constants'
import { Reveal } from '@/features/Reveal/Reveal'
import ProjectButton from '@/common/ProjectButton/ProjectButton'
import { usePathname } from 'next/navigation'
import { ProjectComponentProp } from '../ProjectComponent.interface'
import useScreen from '@/hooks/useScreen/useScreen'
import { isValidUrl } from '@/lib/getFormHelpers'


export default function ProjectHeader({project}:ProjectComponentProp){
    const {mounted} = useScreen()
    const pathname = usePathname()
    
    const handleClick = ()=>{
        document.documentElement.classList.add("scroll-smooth")
        window.scrollTo(0,window.innerHeight)
        document.body.classList.remove("overflow-hidden")
    }

    return(
        <motion.header key={pathname} className="w-full h-lvh bg-center bg-cover bg-no-repeat" style={{backgroundImage:`url(${isValidUrl(project.thumbnailUrl)})`}}
            >
            <motion.div className="w-full h-full relative"
                initial={false}
                animate={mounted?"visible":"hidden"}
                viewport={{once:true, amount:0.2}}
                transition={{duration:0.3,ease:[0.4, 0, 0.9, 1]}}
                variants={{
                    hidden:{backgroundColor:"rgba(0,0,0,0)"},
                    visible:{backgroundColor:"rgba(0,0,0,0.3)"}
                }}
            >
                <Navbar delay={0.5} home={true} text='white'/>
                <div className="container mx-auto px-5 md:px-10 h-full flex flex-col justify-end py-40 md:py-20">
                        <motion.div className="flex items-center justify-center w-fit"
                            initial={false}
                            animate={mounted?"visible": "hidden"}
                            variants={{
                                hidden:{opacity:0},
                                visible:{
                                    opacity:1,
                                    transition:{
                                        delay:0.8,
                                        duration:0.4,
                                    }
                                }
                            }}
                            viewport={{once:true, amount:0.2}}
                        >
                            <p className='text-white font-bold tracking-widest text-xs sm:text-base md:text-lg text-shadow-[0px_2px_10px_rgba(0,0,0,0.5)]'>{PROJECT}</p>
                            <div className="h-[2em] md:h-[3em] w-[1px] bg-white/50 mx-5"></div>
                            <p className='text-white/50 font-bold tracking-widest text-xs sm:text-base md:text-lg text-shadow-[0px_2px_10px_rgba(0,0,0,0.5)]'>{project.tag}</p>
                        </motion.div>
                        <motion.h1 className=' text-white text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-alta tracking-widest max-w-[856px]'
                            initial={false}
                            animate={mounted?"visible":"hidden"}
                            variants={{
                                hidden:{
                                    clipPath:"inset(0 100% 0 0)",
                                    opacity:0
                                },
                                visible:{
                                    clipPath:"inset(0 0 0 0)",
                                    opacity:1,
                                    transition:{
                                        delay:1.2,
                                        duration:1,
                                        ease:[0.4,0.2,0.6,1]
                                    }
                                }
                            }}
                            viewport={{once:true}}
                        >{project.title}</motion.h1>
                        <Reveal delay={1}>
                            <p className='text-white/70 text-xs sm:text-base md:text-lg font font-medium tracking-widest mb-5 md:mb-10 md:mt-5 mt-2 max-w-[840px]'>{project.short_description}</p>
                        </Reveal>
                        <ProjectButton click={handleClick} text={PROJECT_BUTTON_TEXT}/>
                </div>
            </motion.div>
        </motion.header>
    )
}