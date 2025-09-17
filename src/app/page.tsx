"use client"
import { CONTACT_TEXT } from "@/constants";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from 'motion/react'
import Navbar from "@/components/Shared/Navbar/Navbar";
import Hero from "@/components/Home/Hero/Hero";
import Projects from "@/components/Home/Projects/Projects";
import About from "@/components/Home/About/About";
import Events from "@/components/Home/Events/Events";


export default function Home() {
    const [footerPosition, setFooterPosition] = useState<null | DOMRect>(null)
    const router = useRouter()

    const handleClick = (e: React.MouseEvent)=>{
        setFooterPosition(e.currentTarget.getBoundingClientRect())
        document.documentElement.classList.remove("scroll-smooth")
        document.body.classList.add("overflow-hidden")
    }

    useEffect(()=>{

        document.body.classList.remove("overflow-hidden")
        const html=document.documentElement.classList;

        window.scrollTo(0,0)

        if(!html.contains("scroll-smooth")) {html.add("scroll-smooth")}
    },[])

    return(
        <>
            <header className="min-h-lvh relative w-full bg-no-repeat bg-[40%_23%] bg-cover" style={{backgroundImage:`url('/images/bg.jpg')`}}>
                <Navbar/>
                <Hero/>
            </header>
            <main className="h-fit">
                <About/>
                <Events/>
                <Projects/>
            </main>
            <footer className="w-full overflow-hidden">
                <div className="w-full bg-center h-[20em] py-16 mt-25 md:mt-50 bg-no-repeat bg-cover cursor-pointer transition-transform duration-300 translate-y-5 hover:translate-y-0 active:translate-y-0"
                    style={{backgroundImage:`url('/images/contact.jpg')`}}
                    onClick={(e)=>handleClick(e)}
                >
                    <div className="w-full mx-auto bg-black/20 py-5 md:py-10">
                        <h1 className="text-4xl md:text-7xl px-2 container mx-auto text-white font-alta text-shadow">{CONTACT_TEXT}</h1>
                    </div>
                </div>
            </footer>
            {footerPosition&&(
                <motion.div
                className="w-full bg-center bg-no-repeat bg-cover"
                style={{backgroundImage:`url('/images/contact.jpg')`}}
                initial="start"
                variants={{
                    start:{height:footerPosition.height, top:footerPosition.top, position:"fixed", zIndex:9999},
                    end:{height:"100vh", top:0}
                }}
                animate="end"
                transition= {{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
                onAnimationComplete={()=> router.push("/contact")}
            >
                <motion.div className="w-full mx-auto bg-black/20 py-5 mt-16 md:py-10"
                    initial={{opacity:1}}
                    animate={footerPosition?{opacity:0, transition:{duration:0.4}}:false}
                >
                    <h1 className="text-4xl md:text-7xl px-2 container mx-auto text-white font-alta text-shadow"
                        
                    >{CONTACT_TEXT}</h1>
                </motion.div>
            </motion.div>
            )}
        </>
    )
}
