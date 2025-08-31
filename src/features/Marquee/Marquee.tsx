"use client"
import { MARQUEE_IMAGES } from '@/constants'
import {motion} from 'motion/react'
import Image from 'next/image'

export default function Marquee(){
    return(<>
    <div className="relative overflow-hidden pointer-events-none"></div>
        <div className="pointer-events-none absolute top-full -translate-y-1/2 flex justify-center items-center overflow-hidden w-full h-full ">
            <div className=" absolute bottom-1/2  -left-2 -right-2 -rotate-4 md:-rotate-2 h-[4em] md:h-[7em] bg-wood-brown"></div>
        </div>
        <div className="w-full bg-gray-sky h-[4em] md:h-[7em] relative overflow-hidden">
            <motion.div className={`flex -right-4 gap-10 absolute flex-nowrap w-fit whitespace-nowrap top-1/2 -translate-y-1/2`}
                initial="off"
                animate="on"
                variants={{
                    off: {right:`0%`,x:"100%"},
                    on:{right:"100%", x:"0%"}
                }}
                transition={{ ease: "linear", duration: 40, repeat: Infinity, repeatType:"loop" }}
            >
            {MARQUEE_IMAGES.map((software,index)=>(
                <div key={index} className="flex items-center gap-10 ">
                    <h3 className="text-2xl md:text-4xl font-alta text-wood-brown">{software.name}</h3>
                    <div className="md:w-[4em] w-[2.5em]">
                        <Image width={500} height={500} priority src={software.src} alt={software.name}/>
                    </div>
                </div>
            ))}
            </motion.div>
        </div>
    </>)
}