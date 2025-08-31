import { Reveal } from "@/features/Reveal/Reveal";

export default function Tag({text}:{text:string}){
    return (
        <Reveal>
            <h2 className="font-alta text-4xl tracking-widest text-gray-600">
                {text}
                <span className="tracking-tight">||</span>
            </h2>
        </Reveal>
    )
}