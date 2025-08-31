import { Children } from "@/types/common";

export interface InputProps extends Children{
    label?: string;
    id?: string;
    type?: string;
    name?:string;
    value?:string;
    placeholder?: string;
    isTextarea?: boolean;
    inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
    pattern?:string;
    min?: number;
    max?: number;
    onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>)=>void;
    error?: string;
}