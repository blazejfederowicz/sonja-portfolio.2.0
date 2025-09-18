"use client"
import { motion } from 'motion/react'
import { ProjectButtonProps } from './ProjectButtonProps.interface'
import useScreen from '@/hooks/useScreen/useScreen'

export default function ProjectButton({click, text}: ProjectButtonProps){
    const { mounted } = useScreen()

    return(
        <motion.button onClick={click} className='w-fit py-3 px-5 lg:py-5 group md:px-10 border relative border-white/70 cursor-pointer before:absolute before:content-[""] before:transition-transform before:block before:origin-left before:h-full before:w-full before:bg-white before:top-0 before:left-0 before:scale-x-0 before:duration-400 before:-z-30 hover:before:scale-x-100 active:before:scale-x-100'
            initial={false}
            animate={mounted?"visible":"hidden"}
            variants={{
                hidden:{
                    clipPath:"inset(0 0 0% 0)",
                    opacity: 1
                },
                visble:{
                    clipPath:"inset(0 0 0 0)",
                    opacity:1,
                    transition:{
                        delay:0.4,
                        duration:0.5,
                        ease:[0.4,0.2,0.6,1]
                    }
                }
            }}
            viewport={{once:true}}
        >
            <motion.p className='text-white font-bold tracking-wider text-xs md:text-base group-hover:text-black duration-150 transition-colors group-active:text-black'
                initial={false}
                whileInView={mounted?"visible": "hidden"}
                variants={{
                hidden:{
                    opacity:0
                },
                visble:{
                    opacity:1,
                    transition:{
                        duration:0.4,
                        delay:0.6
                    }
                }
            }}
                viewport={{once:true}}
            >
            {
                text
            }
            </motion.p>    
        </motion.button>
)
}