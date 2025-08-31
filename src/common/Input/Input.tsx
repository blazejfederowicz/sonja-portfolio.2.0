import { InputProps } from "./Input.interface";

export default function Input(props:InputProps){
    const {id, label, isTextarea, error, ...rest} = props;

    return (
        <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor={id}>{label}</label>
            {isTextarea ?
                <textarea className="flex h-10 w-full rounded-md border px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium ring-offset-salmon2 ring-salmon file:text-white text-gray-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-gray-400/20 border-zinc-50 mt-2 min-h-[100px] mb-0" id={id} name={id} {...rest}/> 
                :
                <input className="flex h-10 w-full rounded-md border px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium ring-offset-salmon2 ring-salmon file:text-white text-gray-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-gray-400/20 border-zinc-50 mt-2 mb-0" id={id} name={id} autoComplete={`Your: ${id}`} {...rest}/>
            }
            {!!error && <small className="text-red-500 md:col-span-2">{error}</small>}
        </div>
    )
}