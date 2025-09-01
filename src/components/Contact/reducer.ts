import { FORM_TYPES } from "@/constants"
import { Action, State } from "@/types/Contact.interface"

export const DEFAULT_STATE={
    name:"",
    email:"",
    title:"",
    message:"",
}

export const INITIAL_VALUE={
    ...DEFAULT_STATE,
    error:{
        name:"",
        email:"",
        title:"",
        message:"",
    },
    fullfield:null,
    rejected:null,
    loading: false
}

export const reducer = (state:State, action:Action) =>{
    switch(action.type){
        case FORM_TYPES.INPUT_CHANGE:
            return {...state, [action.payload.name]: action.payload.value,
                error:{...state.error, [action.payload.name]:null}, loading:false
            }
        case FORM_TYPES.SET_ERROR:
            return {...state, error:{...state.error, ...action.payload}, loading: false}
        case FORM_TYPES.SET_PENDING:
            return {...state, loading:true, fullfield: null, rejected:null}
        case FORM_TYPES.SET_FULLFIELD:
            return {...state, ...INITIAL_VALUE, fullfield: action.payload, rejected: null}
        case FORM_TYPES.SET_REJECTED:
            return {...state, ...INITIAL_VALUE, fullfield: null, rejected: action.payload}
        case FORM_TYPES.CLEAR_FORM:
            return {...state, ...INITIAL_VALUE}
    }
}