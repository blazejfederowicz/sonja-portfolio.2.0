import { Reveal } from "@/features/Reveal/Reveal";
import Image from "next/image";
import { ContentItem } from "@/types/common";
import { isValidUrl, splitString } from "@/lib/getFormHelpers";
import { Zoom } from "@/common/Zoom/Zoom";

export default function ContentSection({image, name, content, bgColor, isReverse}:ContentItem){

    return(
        <div className={`w-full py-30 ${bgColor}`}>
            <div className="grid md:grid-cols-2 gap-[5em] xl:gap-[10em] container mx-auto px-2 relative">
                <Reveal delay={0.3} customStyle={`${isReverse?"order-1": "order-0"} `}>
                    <Zoom source={isValidUrl(image || "")}  alt={name || ""} className={!!name?"md:absolute":"max-h-[400px]"}/>
                </Reveal>
                <div className="w-full flex flex-col justify-center md:py-5 text-black/50 border-l-2 border-l-black/20 px-10">
                    <Reveal>
                        <h3 className='text-4xl sm:text-5xl line-clamp-none mb-2'>{splitString(name).albanian}</h3>
                        <h3 className='text-xl sm:text-4xl mb-10 italic opacity-80'>{splitString(name || "").english}</h3>
                    </Reveal>
                    <Reveal>
                        <p className='sm:text-lg max-w-[500px] whitespace-pre-line mb-4'>{splitString(content).albanian}</p>
                        <p className='sm:text-lg max-w-[500px] whitespace-pre-line italic opacity-80'>{splitString(content).english}</p>
                    </Reveal>
                </div>
            </div>
        </div>
    )
}