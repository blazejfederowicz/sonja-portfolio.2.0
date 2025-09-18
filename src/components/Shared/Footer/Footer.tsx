"use client"
import Link from 'next/link'
import Image from 'next/image'
import { COPYRIGHT, FOOTER_ROUTES, LINK_TEXT, SOCIAL_LINKS, SOCIALS } from '@/constants'
import useProject from '@/hooks/useProject/useProject'
import { useEffect, useState } from 'react'
import { useParams, usePathname } from 'next/navigation'
import { splitString } from '@/lib/getFormHelpers'

export default function Footer (){
    const [color, setColor] = useState("bg-white")
    const {projectState, findProject} = useProject()
    const pathname = usePathname()
    const {slug} = useParams()
    const currentProject = findProject(slug as string)

    useEffect(()=>{
        if(pathname === `/project/${slug}`){
            const newColor = !!currentProject ? currentProject.content[currentProject.content.length -1].bgColor : "bg-white-almost" 
            setColor(newColor || "bg-white-almost")
        }
    },[pathname, slug, currentProject])

    return(<>
        <footer className="bg-zinc-100 relative">
            <div className="flex justify-between gap-[2em] mb-5">
                <div className={`w-[4em] ms-5 h-[2em] rounded-full relative ${color} -translate-y-1/2`}></div>
                <div className={`w-1/2 mx-auto -translate-y-1/2 h-[3em] rounded-b-full ${color}`}></div>
                <div className={`w-[4em] me-5 h-[2em] rounded-full relative ${color} -translate-y-1/2`}></div>
            </div>
            <div className="container px-2 mx-auto mb-5  w-fit grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 items-start gap-[3em]  rounded-full ">
                <div className="h-[10em] flex justify-center col-span-2 sm:col-span-3 md:col-span-1 ">
                    <Image width={500} height={500} src='/images/paronama.svg' className='h-full' loading="lazy" alt="Paronama"/>
                </div>
                <div className="flex flex-col items-center sm:items-end justify-center order-1 sm:order-none">
                    <div className="flex flex-col">
                        <h4 className='text-lg sm:text-xl md:text-3xl mb-3 font-bold text-wood-brown'>{LINK_TEXT}</h4>
                        {
                            FOOTER_ROUTES.map((link, index)=>(
                                <Link key={`footer-links-${index}`} href={link.href} className='py-1 text-sm sm:text-base md:text-lg font-medium text-wood-brown/60 hover:text-wood-brown active:text-wood-brown/90'>{link.name}</Link>
                            ))
                        }
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <div className="flex flex-col">
                        <h4 className='text-lg sm:text-xl md:text-3xl mb-3 font-bold text-wood-brown'>{SOCIALS}</h4>
                        {
                            SOCIAL_LINKS.map((link, index)=>(
                                <Link key={`social-link-${index}`} target='_blank' href={link.href} className='py-1 text-sm sm:text-base md:text-lg font-medium text-wood-brown/60 hover:text-wood-brown active:text-wood-brown/90'>{link.name}</Link>
                            ))
                        }
                    </div>
                </div>
                <div className="flex flex-col items-center sm:items-start justify-center col-span-2 sm:col-span-1 order-2 sm:order-none">
                    <h4 className='text-lg sm:text-xl md:text-3xl mb-3 font-bold text-wood-brown'>Projects</h4>
                    <div className="flex flex-col flex-wrap h-[8em]">
                        {
                            projectState.projectList.map(e=>(
                                <Link key={e.project_id} href={`/project/${e.project_id}`} className='py-1 text-sm sm:text-base md:text-lg font-medium me-2 text-wood-brown/60 line-clamp-1 hover:text-wood-brown active:text-wood-brown/90 w-fit'>
                                    {splitString(e.title).albanian.slice(0,10)}...
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>
            <hr className="border-salmon"/>
            <div className="flex justify-center items-center px-5 py-7">
                <p className="text-wood-brown">{COPYRIGHT}</p>
            </div>
        </footer>
    </>)
}