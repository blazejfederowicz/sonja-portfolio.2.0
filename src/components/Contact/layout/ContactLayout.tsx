import { Reveal } from "@/features/Reveal/Reveal";
import { ContactLayoutProps } from "./ContactLayout.interface";

export default function ContactLayout({children, title}:ContactLayoutProps){
    return(
        <div className="rounded-lg border text-gray-800 shadow-sm bg-neutral-100 backdrop-blur-sm border-zinc-50">
            <Reveal customStyle="overflow-hidden h-full">
                <div className="p-6 space-y-6">
                    <h3 className="text-xl font-medium mb-4">{title}</h3>
                    {children}
                </div>
            </Reveal>
        </div>
    )
}