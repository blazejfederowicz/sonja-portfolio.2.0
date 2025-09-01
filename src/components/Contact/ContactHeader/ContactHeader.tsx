"use client"
import Navbar from "@/components/Shared/Navbar/Navbar"
import { CONTACT, CONTACT_TAG, CONTACT_TITLE } from "@/constants"
import useScreen from "@/hooks/useScreen/useScreen"
import {motion} from "motion/react"
import { usePathname } from "next/navigation"

export default function ContactHeader(){
    const pathname = usePathname()
    const {mounted} = useScreen()

    return(
        <motion.header key={pathname} className="w-full h-lvh bg-center bg-no-repeat bg-cover min-h-[200px] md:min-h-[250px]" style={{backgroundImage:`url('/images/contact.jpg')`}}
            initial={false}
            animate={mounted?"visible":"hidden"}
            variants={{
                hidden:{
                    height:"100vh",
                },
                visible:{
                    height:"25vh",
                    transition:{
                        duration:0.4,
                        ease:[0.4,0.2,0.6,1],
                        delay:2
                    }
                }
            }}
            onAnimationComplete={()=>document.body.classList.remove("overflow-hidden")}
            viewport={{once:true}}
        >
            <Navbar delay={0.5} home={true}/>
            <motion.div className="md:px-20 px-5 mx-auto container flex flex-col items-start justify-end h-full"
                initial={false}
                animate={mounted?"visible":"hidden"}
                variants={{
                    hidden:{
                        paddingBottom:"10em"
                    },
                    visible:{
                        paddingBottom:"3em",
                        transition:{
                            delay:2,
                            duration:0.4,
                            ease:[0.4,0.2,0.6,1]
                        }
                    }
                }}
                viewport={{once:true}}
            >
                <motion.div className="flex items-center justify-center w-fit"
                        initial={false}
                        animate={mounted?"visible":"hidden"}
                        variants={{
                            hidden:{
                                opacity:0
                            },
                            visible:{
                                opacity:1,
                                transition:{
                                    delay:0.8,
                                    duration:0.4,
                                }
                            }
                        }}
                        viewport={{once:true}}
                    >
                    <p className='text-white font-bold tracking-widest text-xs sm:text-base text-shadow-[0px_2px_10px_rgba(0,0,0,0.5)]'>{CONTACT}</p>
                    <div className="h-[2em] md:h-[3em] w-[1px] bg-white/70 mx-5"></div>
                    <p className='text-white/70 font-bold tracking-widest text-xs sm:text-base text-shadow-[0px_2px_10px_rgba(0,0,0,0.5)]'>{CONTACT_TAG}</p>
                </motion.div>
                <motion.h1 className="text-white text-shadow-[0px_10px_20px_rgba(0,0,0,0.5)] text-4xl md:text-7xl tracking-widest font-bold font-alta "
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
                                duration:0.6,
                                ease:[0.4,0.2,0.6,1]
                            }
                        }
                    }}
                    viewport={{once:true}}
                >{CONTACT_TITLE}</motion.h1>
            </motion.div>
        </motion.header>
    )
}