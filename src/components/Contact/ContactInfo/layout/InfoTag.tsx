import { InfoTagProps } from "./InfoTag.interface";

export default function InfoTag({children, headline, icon}:InfoTagProps){
    return(
        <div className="flex items-start gap-3">
            <div className="py-1 px-2 rounded-md bg-indigo-200/10 text-salmon shrink-0 ">
                <i className={icon}/>
            </div>
            <div>
                <h4 className="font-medium">{headline}</h4>
                {children}
            </div>
        </div>
    )
}