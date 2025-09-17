'use client'
import {motion} from 'motion/react';
import { useEffect, useRef, useState } from "react";
import { Reveal } from '@/features/Reveal/Reveal';
import Marquee from '@/features/Marquee/Marquee';
import Image from 'next/image';
import useScreen from '@/hooks/useScreen/useScreen';
import { CV_BUTTON, HERO_PARAGRAPH, NAME, PROJECTS_BUTTON, SURNAME } from '@/constants';
import CvButton from '@/common/CvButton/CvButton';
import SecondaryButton from '@/common/SecondaryButton/SecondaryButton';

export default function Hero(){
    const [rectHeight, setRectHeight] = useState(0)
    const {width, mounted} = useScreen()
    const circle1 = useRef<HTMLDivElement>(null);

    useEffect(()=>{
        if(circle1.current){
            const rect= circle1.current.getBoundingClientRect();
            setRectHeight(rect.width)
        }

    },[width])
    
    return(<>
        <section id="home" className="min-h-lvh flex flex-col pt-[80px]">
            <div className="w-fit relative my-auto grow grid grid-rows-[1fr_repeat(4,auto)_1fr] lg:grid-rows-3 max-h-full lg:max-h-[400px] lg:grid-cols-[repeat(1,auto)] grid-cols-2 gap-[1em] md:gap-[2em] container mx-auto px-2">
                <div className=" flex items-center justify-center lg:justify-end word1-grid-area overflow-hidden">
                    <Reveal>
                        <h1 className="font-alta font-normal tracking-widest small text-4xl sm:text-6xl lg:text-7xl text-end text-zinc-700">{NAME}</h1>
                    </Reveal>
                    <motion.div className=" flex items-center px-2 ms-4 w-fit rounded-full lg:hidden" 
                        initial={false}
                        animate={mounted?"visible":"hidden"}
                        variants={{
                            hidden:{
                                opacity:0,
                                transform:"translateX(100px)"
                            },
                            visible:{
                                opacity:1,
                                transform:"translateX(0)",
                                transition:{
                                    delay:0.2
                                }
                            }
                        }}
                        viewport={{once:true}}
                    >
                        <h1 className="font-alta font-bold tracking-wider small text-salmon text-shadow-lg text-4xl sm:text-6xl lg:text-7xl">{SURNAME}</h1>

                    </motion.div>
                </div>
                <div className=" items-center word2-grid-area hidden lg:flex" >
                    <motion.div ref={circle1} className=" flex items-center px-2 custom-circle w-fit rounded-full" style={{height:rectHeight}}
                        initial={false}
                        animate={mounted?"visible":"hidden"}
                        variants={{
                            hidden:{
                                opacity:0,
                                transform:"translateX(100px)"
                            },
                            visible:{
                                opacity:1,
                                transform:"translateX(0)",
                                transition:{
                                    delay:0.2
                                }
                            }
                        }}
                        viewport={{once:true}}
                    >
                        <h1 className="font-alta font-bold small text-salmon text-shadow-lg text-5xl sm:text-6xl md:text-7xl">{SURNAME}</h1>
                    </motion.div>
                </div>
                <div className="row-span-2 ben-grid-area lg:hidden">
                    <Reveal>
                        <Image width={500} height={500}src='/images/tample.png' className="lg:h-[14em] h-[9em] object-contain w-fit" alt="bigBen"/>
                    </Reveal>
                </div>
                <div className="flex sm:gap-8 gap-2 md:gap-4 xl:gap-8 justify-center my-5 col-span-2      items-center word3-grid-area">
                    <Reveal>
                        <h1 className="font-alta text-end font-light w-fit tracking-widest text-black/70 text-xl sm:text-3xl md:text-4xl">{HERO_PARAGRAPH}</h1>
                    </Reveal>
                    <Reveal>
                        <div className="h-[1px] min-w-[3em] sm:min-w-[4em] md:min-w-[6em] bg-black/50 "/>
                    </Reveal>
                </div>
                <CvButton download="/CV.pdf" text={CV_BUTTON}/>
                <SecondaryButton text={PROJECTS_BUTTON} href='#projects'/>
                <div className="arch-grid-area flex justify-end items-end lg:justify-start lg:hidden">
                    <Reveal customStyle="shrink">
                            <Image width={500} height={500} className='h-[8em] object-contain w-fit' src='/images/rect.png' alt="arch"/>
                    </Reveal>
                </div>
            </div>
            <Marquee/>
        </section>
    </>)
}