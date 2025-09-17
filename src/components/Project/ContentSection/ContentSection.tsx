import { Reveal } from "@/features/Reveal/Reveal";
import Image from "next/image";
import { ContentItem } from "@/types/common";
import { isValidUrl, splitString } from "@/lib/getFormHelpers";

export default function ContentSection({image, name, content, bgColor, isReverse}:ContentItem){

    return(
        <div className={`w-full py-30 ${bgColor}`}>
            <div className="grid md:grid-cols-2 gap-[5em] sm:gap-[10em] md:gap-[10em] container mx-auto px-2">
                <Reveal delay={0.3} customStyle={isReverse?"order-1": "order-0"}>
                    <Image width={500} height={500} src={isValidUrl(image || "")} loading='lazy' className='md:h-full w-full object-cover object-center' alt={name || ""}/>
                </Reveal>
                <div className="w-full flex flex-col justify-center text-black/50 border-l-2 border-l-black/20 px-10">
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