'use client'
import { useEffect } from "react";
import Tag from "@/common/Tag/Tag";
import ContactInfo from "./ContactInfo/ContactInfo";
import ContactForm from "./ContactForm/ContactForm";
import { CONTACT_TEXT } from "@/constants";

export default function ContactComponent(){

    useEffect(()=>{
        window.scrollTo(0,0)
    },[])

    return(<>
        <main className="container mx-auto px-2 mt-20">
            <Tag text={CONTACT_TEXT}/>
            <div className="container max-w-xl lg:max-w-5xl px-5 sm:px-6 lg:px-8 mx-auto mb-40 mt-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full mx-auto">
                    <ContactInfo/>
                    <ContactForm/>
                </div>
            </div>
        </main>
    </>)
}