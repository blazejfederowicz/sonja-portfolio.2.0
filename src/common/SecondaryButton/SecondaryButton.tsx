import { Reveal } from "@/features/Reveal/Reveal";
import Link from "next/link";
import { SecondaryButtonProps } from "./SecondaryButton.interface";

export default function SecondaryButton({click, text, href}:SecondaryButtonProps){
    return(
        <div className="flex items-center button2-grid-area">
            <Reveal>
                <Link href={href} onClick={click} className="relative group md:p-4 p-3 text-xs sm:text-base text-wood-brown transition-colors duration-150 ease-in-out hover:text-wood-brown/70 active:brightness-95 bg-light-pinkk/18 rounded-4xl">
                    <span className="me-2">{text}</span>
                    <i className="bi bi-box-arrow-up-right"/>
                    <div className="pointer-events-none absolute inset-px duration-150 ease-in-out rounded-4xl ring-1 group-hover:ring-wood-brown/30 shadow-sm ring-wood-brown/50"/>
                </Link>
            </Reveal>
        </div>
    )
}