'use client'
import { motion } from 'motion/react'
import { useEffect } from 'react'
import { Reveal } from '@/features/Reveal/Reveal';
import Image from 'next/image';
import { ProjectComponentProps } from './ProjectComponent.interface';

export default function ProjectComponent({project}:ProjectComponentProps){
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return(
        <main className="">
            <div className="w-full py-30 bg-neutral-300">
                <div className="grid md:grid-cols-2 gap-[5em] sm:gap-[10em] md:gap-[10em] container mx-auto px-2">
                    <Reveal delay={0.3}>
                    <Image width={500} height={500}src={project!.imageFirst} loading='lazy' className='md:h-full w-full object-cover object-center' alt={project!.title}/>
                    </Reveal>
                    <div className="w-full flex flex-col justify-center text-black/50 border-l-2 border-l-black/20 px-10">
                        <Reveal>
                            <h3 className='text-5xl mb-10'>{project!.title}</h3>
                        </Reveal>
                        <Reveal>
                            <p className=' text-lg max-w-[500px] whitespace-pre-line'>{project!.contentFirst}</p>
                        </Reveal>
                    </div>
                </div>
            </div>
            <div className="w-full py-30">
                <div className="grid md:grid-cols-2 gap-[5em] sm:gap-[10em] md:gap-[4em] lg:gap-[10em] container mx-auto px-2">
                    <motion.img width={500} height={500}src={project!.imageSecond} loading='lazy' className='md:order-1 md:h-full w-full object-cover object-center' alt={project!.title}
                    initial="hidden"
                    whileInView="visible"
                    transition={{delay:0.3}}
                    variants={{
                        visible:{opacity:1,transform:"translateX(0px)"},
                        hidden:{opacity:0,transform:"translateX(-100px)"}
                    }}
                    viewport={{once: true}}
                    />
                    <div className="w-full flex flex-col justify-center text-black/50 border-l-2 border-l-black/20 px-10">
                        <Reveal>
                            <h3 className='text-5xl mb-10'>{project!.title}</h3>
                        </Reveal>
                        <Reveal>
                            <p className=' text-lg max-w-[500px] whitespace-pre-line'>{project!.contentSecond}</p>
                        </Reveal>
                    </div>
                </div>
            </div>
        </main>
    )
}