"use client"
import Tag from "@/common/Tag/Tag"
import { ABOUT_TEXT, DELETE_SKILL_ID, EDIT, SKILL_FORM_ID } from "@/constants"
import { Reveal } from "@/features/Reveal/Reveal"
import { useEffect, useRef, useState } from "react"
import Error from "@/components/Shared/Error/Error"
import Loading from "@/components/Shared/Loading/Loading"
import useSkill from "@/hooks/useSkill/useSkill"
import Modal from "@/components/Modal/Modal"
import SkillForm from "./components/SkillForm/SkillForm"
import Delete from "@/common/Delete/Delete"


export default function About(){
    const parentRef = useRef<HTMLDivElement>(null)
    const [childWidth, setChildWidth] = useState<string | number>(0)
    const {skillState, deleteSkill} = useSkill()

    useEffect(()=>{
         const updateWidth = ()=>{
            if(parentRef.current){
                setChildWidth(`${parentRef.current.offsetWidth}px`)
            }
        }

        updateWidth();
        window.addEventListener("resize",updateWidth);

        return()=>{
            window.removeEventListener("resize",updateWidth);
        }
    },[skillState])

    return(
        <section id="about" className="container mx-auto px-2 pt-22 mb-22">
            <div className="flex container px-2 mx-auto gap-[1em]">
                <Tag text={ABOUT_TEXT}/>
                <Modal buttonColor='bg-blue-600' headline={ABOUT_TEXT} form={SKILL_FORM_ID} buttonText={EDIT}>
                    <SkillForm/>
                </Modal>
                <Delete formId={DELETE_SKILL_ID} data={skillState.skillList} dispatch={deleteSkill}/>
            </div>
            <div className={`${!!skillState.errorMessage || skillState.isLoading?"":"grid"} grid-cols-1 sm:grid-cols-2 mx-auto gap-[2em] max-w-[420px] sm:max-w-[700px] w-full mt-24`}>
                {
                skillState.isLoading? <Loading/>:
                !!skillState.errorMessage? <Error errorMessage={skillState.errorMessage}/>:
                Array.isArray(skillState.skillList) && skillState.skillList.map((e,i)=>(
                    <div key={i}>
                        <div ref={parentRef} className="relative h-[3em]">
                            <Reveal>
                                <div
                                    className={`h-[2.5em] w-[2.5em] border-salmon relative border-2 rounded-full after:content-[''] after:block after:h-[2px] after:w-[calc(var(--child-width)-2.5em)] after:bg-salmon after:absolute after:left-full after:top-1/2 after:-translate-y-1/2 before:content-['skill'] before:font-alta before:text-salmon sm:before:text-xl before:absolute sm:before:-top-2 sm:before:left-[130%] before:-top-1 before:left-[110%]`}
                                    style={{ ['--child-width']: childWidth, ['--tag']: e.tag } as React.CSSProperties}
                                >
                                    <i className="bi bi-check absolute flex top-1/2 left-1/2 -translate-1/2 text-3xl text-salmon"></i>
                                </div>
                            </Reveal>
                        </div>
                        <div className="flex flex-col items-start justify-center mx-10 sm:mx-5 md:mx-10 text-gray-800">
                            <Reveal>
                                <h4 className="font-bold text-2xl sm:text-2xl break-words">{e.title}</h4>
                            </Reveal>
                            <Reveal>
                                <p className="sm:text-2xl text-lg mt-2">{e.short_description}</p>
                            </Reveal>
                        </div>
                    </div>
                ))
                }
            </div>
        </section>
    )
}