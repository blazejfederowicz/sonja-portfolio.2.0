import { InputProps } from "./Input.interface";

const INITIAL_INPUT_CLASS = "flex h-10 w-full rounded-md border px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium ring-offset-salmon2 ring-salmon file:text-white text-gray-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-gray-400/20 border-zinc-50 mt-2 mb-0"

export default function Input<T extends React.ElementType = "input">({
    id, label, error, labelClass, inputClass, as, options, ...props
}:InputProps<T>){
    const Component = as || "input";

    return (
        <div className="space-y-2">
            {label && (
                <label className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${labelClass}`} htmlFor={id}>{label}</label>
            )}

             {as === "select" ? 
                <Component className={`${INITIAL_INPUT_CLASS} ${inputClass}`} id={id} name={id} {...props}>
                    {options?.map((e,i)=>(
                        <option key={`option-${i}`}>{e}</option>
                    ))}
                </Component> 
                : 
                <Component className={`${INITIAL_INPUT_CLASS} ${inputClass} ${as==="textarea"?"min-h-[100px]":""}`} id={id} name={id} {...props}/>
            }
            
            {!!error && <small className="text-red-500 md:col-span-2">{error}</small>}
        </div>
    )
}