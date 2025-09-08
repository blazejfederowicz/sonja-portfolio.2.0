import { FormButtonProps } from "./FormButton.interface";

export function FormButton({click, text ,isSubmiting, icon = "bi bi-send-fill", ...rest}:FormButtonProps){
    return(
        <button {...rest} onClick={click} className="inline-flex overflow-hidden items-center justify-center gap-2 cursor-pointer whitespace-nowrap rounded-md text-sm font-medium ring-offset-salmon ring-salmon/50 transition-colors focus-visible:outline-none focus-visible:ring-1  focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-salmon2 hover:bg-salmon/70 h-10 px-4 py-2 w-full" value="Send">
            <span className="flex items-center me-1 text-white">{text}</span>
            {isSubmiting?
            <svg className="spinner" viewBox="0 0 50 50">
                <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
            </svg>:
            <i className={`${icon} text-white`}/>
            }
        </button>
    )
}