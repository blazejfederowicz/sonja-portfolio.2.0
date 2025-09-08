import { Children, ID } from "@/types/common";

export interface DeleteProps extends Children{
    formId?:string;
    data?:any;
    dispatch?: (id: any)=> Promise<any> | void;
}