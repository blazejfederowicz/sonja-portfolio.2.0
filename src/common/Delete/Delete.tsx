import Modal from "@/components/Modal/Modal";
import { CHOOSE_OPTION, DELETE_BUTTON, DELETE_HEADLINE, DELETE_PARAGRAPH } from "@/constants";
import { DeleteProps } from "./Delete.interface";
import Input from "../Input/Input";
import useForm from "@/hooks/useForm/useForm";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth/useAuth";

export default function Delete({formId, dispatch, data}:DeleteProps){
    const [select, setSelect] = useState([{value: "", name: ""}])
    const [title, setTitle] = useState(CHOOSE_OPTION)
    const { session } = useAuth()
    const { state, handleChange, handleSubmit } = useForm({
            id:"",
        })

    useEffect(() => {
        const arr = data.map((e: any) => ({ value: e.id, name: e.title }));

        setSelect(arr);
    }, [data]);


    useEffect(()=>{
        const foundTitle = data.find((e:any)=> e.id === parseInt(state.id))?.title || CHOOSE_OPTION

        setTitle(foundTitle)
    },[state, data])

    if(!session) return;

    return(
        <div className="flex gap-[1em]">
            <Modal form={formId} buttonColor="bg-red-500" headline={DELETE_HEADLINE} buttonText={DELETE_BUTTON}>
                <p className="tracking-wide text-neutral-700">{DELETE_PARAGRAPH}<span className="text-red-400 font-bold">{title}</span></p>
            </Modal>
           <form id={formId} onSubmit={handleSubmit(dispatch)}>
                <Input as="select" id="id" options={select} value={state.id} onChange={handleChange} />
            </form>
        </div>
    )
}