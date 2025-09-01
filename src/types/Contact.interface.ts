import { FORM_TYPES } from '@/constants'

export interface State{
    name:string;
    email:string;
    title:string;
    message:string;
    error:{
        name:string;
        email:string;
        title:string;
        message:string;
    };
    fullfield:string | null;
    rejected:string | null;
    loading: boolean;
}

export type Action =
| {type: FORM_TYPES.INPUT_CHANGE; payload: { name: keyof State; value: string}}
| {type: FORM_TYPES.SET_FULLFIELD | FORM_TYPES.SET_REJECTED; payload: keyof State}
| {type: FORM_TYPES.SET_ERROR; payload: State['error']}
| {type: FORM_TYPES.CLEAR_FORM | FORM_TYPES.SET_PENDING}