import { Children } from "@/types/common";

export interface ModalProps extends Children{
    open:boolean;
    setOpen: (bool:boolean)=>void;
    headline: string;
    form: string;
}