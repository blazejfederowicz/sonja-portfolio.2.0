import { Children } from "@/types/common";

export interface ModalProps extends Children{
    headline: string;
    form?: string;
    buttonColor: string;
    buttonText: string;
}