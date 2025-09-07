'use client'

import { useEffect, useState } from "react"

export default function useScreen(){
    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);
    const [mounted, setMounted] = useState(false)

    useEffect(()=>{
        setMounted(true)

        const handleWindowSize = ()=>{
            setWidth(window.innerWidth)
            setHeight(window.innerHeight)
        }

        handleWindowSize()

        window.addEventListener("load", handleWindowSize)
        window.addEventListener("resize", handleWindowSize)

        return ()=>{
            window.removeEventListener("load", handleWindowSize)
            window.removeEventListener("resize", handleWindowSize)
        }
    },[])

    return {
        width,
        height,
        mounted
    }
}