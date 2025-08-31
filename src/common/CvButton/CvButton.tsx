"use client"
import { CV_BUTTON } from "@/constants";
import { Reveal } from "@/features/Reveal/Reveal";
import useScreen from "@/hooks/useScreen/useScreen";
import {motion} from 'motion/react';
import { useEffect, useState } from "react";
import { CvButtonProps } from "./CvButton.interface";

export default function CvButton({download, text}:CvButtonProps){
    const [buttonSlide, setButtonSlide] = useState(false);
    const [x, setX] = useState(0)
    const {width} = useScreen()

    const handleDwonload=()=>{
        setButtonSlide(true);
        setTimeout(() => {
            setButtonSlide(false)
        }, 500);
    }

    useEffect(()=>{
        setX(width<640?(2/7)*100: width<768?(2.33/7)*100:33)
    },[width])

    return(
        <div className="flex items-center justify-end button1-grid-area">
            <Reveal>
                <a onClick={handleDwonload}  download={download} className="relative cursor-pointer group md:p-4 p-3 text-xs group sm:text-base text-transparent bg-wood-brown rounded-4xl">
                    <motion.div className="absolute group-hover:bg-salmon group-active:bg-salmon transition-[background] duration-150 ease-in-out z-10 bottom-1/2 w-fit md:px-[0.85rem] px-[0.65rem] h-[90%] -translate-x-2/7 sm:-translate-x-1/3 flex items-center whitespace-nowrap translate-y-1/2 right-[1%]  text-xs sm:text-base text-white bg-light-pink rounded-4xl"
                        animate={buttonSlide ? {x:`${x}%`} : {x:0}}
                    >{CV_BUTTON}</motion.div>
                    <span className="opacity-0 pointer-events-none">{text}</span>
                    <span className="md:p-5 sm:p-4 p-3 bg-white group-hover:bg-light-pink group-active:bg-light-pink transition-[background] duration-150 ease-in-out rounded-full absolute bottom-1/2 translate-y-1/2 right-1">
                        <div className="relative">
                            <i className="bi bi-caret-right-fill flex top-1/2 left-1/2 -translate-1/2 text-xl sm:text-2xl absolute  text-black group-hover:text-white group-active::text-white transition-colors duration-150 ease-in-out"></i>
                        </div>
                    </span>
                </a>
            </Reveal>
            </div>
    )
}