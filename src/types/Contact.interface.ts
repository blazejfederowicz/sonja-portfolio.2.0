import { ACTION_TYPES } from '@/constants'

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
| {type: ACTION_TYPES.INPUT_CHANGE; payload: { name: keyof State; value: string}}
| {type: ACTION_TYPES.SET_FULLFIELD | ACTION_TYPES.SET_REJECTED; payload: keyof State}
| {type: ACTION_TYPES.SET_ERROR; payload: State['error']}
| {type: ACTION_TYPES.CLEAR_FORM | ACTION_TYPES.SET_PENDING}