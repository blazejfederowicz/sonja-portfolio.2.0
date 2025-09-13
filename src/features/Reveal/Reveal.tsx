"use client"
import {motion,useAnimation,useInView} from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { RevealProp } from './Reveal.interface';

export const Reveal = ({children, customStyle, delay}: RevealProp)=>{
    const ref = useRef(null)
    const view = useInView(ref,{once:true})
    const [styles, setStyles]= useState(`${customStyle}`)
    const controls = useAnimation()

    useEffect(()=>{
        if(view){
            controls.start("visible")//.then(()=>setStyles(""))
        }
    },[view, controls])

    useEffect(()=>{
        setStyles(`${customStyle}`)
    },[customStyle])

    return(
        <div ref={ref} className={styles}>
            <motion.div
                className='h-full'
                initial="hidden"
                animate={controls}
                transition={{delay:delay}}
                variants={{
                    visible:{opacity:1,transform:"translateX(0px)"},
                    hidden:{opacity:0,transform:"translateX(-100px)"}
                }}
                viewport={{once: true}}
            >{
                children
            }
            </motion.div>   
        </div>
    )
} 