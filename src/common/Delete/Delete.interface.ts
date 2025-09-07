import { useAppDispatch } from "@/lib/hooks";
import { Children, ID } from "@/types/common";
import { PayloadAction } from "@reduxjs/toolkit";

export interface DeleteProps extends Children{
    formId?:string;
    data?:any;
    dispatch?: (id: ID)=> Promise<any>;
}