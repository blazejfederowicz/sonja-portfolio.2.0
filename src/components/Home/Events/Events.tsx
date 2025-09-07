"use client"
import { useEffect, useRef, useState } from 'react';
import {motion, useScroll, useTransform} from 'motion/react'
import { Reveal } from '@/features/Reveal/Reveal';
import Tag from '@/common/Tag/Tag';
import { DELETE_EVENT_ID, EDIT, EVENT_FORM_ID, EVENTS_TEXT, IMAGE_PLACEHOLDER } from '@/constants';
import Error from '@/components/Shared/Error/Error';
import LoadingAnim from '@/features/LoadingAnim/LoadingAnim';
import useEvents from '@/hooks/useEvents/useEvents';
import Modal from '@/components/Modal/Modal';
import EventForm from './components/EventForm/EventForm';
import useScreen from '@/hooks/useScreen/useScreen';
import Delete from '@/common/Delete/Delete';


export default function Events(){
    const ref = useRef<HTMLDivElement>(null)
    const [height, setHeight] = useState(0)
    const exebitionRef = useRef<HTMLDivElement>(null)
    const {width: screenWidth} = useScreen()
    const {scrollYProgress} = useScroll({
        target:exebitionRef,
        offset:["start end","end end"]
    });
    const smallScreenProgressBar = useScroll({
        target:exebitionRef,
        offset:["start start","end 20%"]
    }).scrollYProgress
    const radius = 90;
    const circumference = 2*Math.PI *radius
    const stroke = useTransform(scrollYProgress,[0,1],[circumference,0])
    const {eventState, deleteEvent} = useEvents()

    useEffect(() => {
        if (!ref.current) return

        const width = ref.current.offsetWidth;
        let newHeight

        if (width < 400 && screenWidth < 640) {
            newHeight = width;
        } else if (screenWidth < 768) {
            newHeight = 400
        } else {
            newHeight = 480;
        }

        setHeight(prev => (prev !== newHeight? newHeight: prev))
    }, [screenWidth, eventState.eventList]);



    return(
        <>
            <section id='events' className="py-22 bg-white-almost">
                <div className="flex container px-2 mx-auto gap-[1em]">
                    <Tag text={EVENTS_TEXT}/>
                    <Modal buttonColor='bg-blue-600' headline={EVENTS_TEXT} form={EVENT_FORM_ID} buttonText={EDIT}>
                        <EventForm/>
                    </Modal>
                    <Delete data={eventState.eventList} formId={DELETE_EVENT_ID} dispatch={deleteEvent}/>
                </div>
                <div className="h-[2em] w-full bg-white mt-5 sticky top-18 lg:hidden z-30 flex items-center">
                    <motion.div className="h-[1em] w-full bg-pond" style={{originX:0, scaleX:smallScreenProgressBar}}/>
                </div>
                <div ref={exebitionRef} className="grid gap-[2em] lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] mt-5 lg:mt-10 container px-2 mx-auto ">
                    <div className="h-full w-0 border-dashed mx-auto border-2 border-salmon2 hidden lg:block ">
                            <div className="lg:flex w-[10em] sticky top-[85%] items-center">
                                <i className="bi bi-caret-left-fill flex text-salmon2 text-4xl "/>
                                <motion.svg xmlns="http://www.w3.org/2000/svg" className="fill-transparent w-[5em] stroke-salmon2" viewBox="0 0 230 230">
                                <motion.ellipse 
                                    strokeWidth="25" 
                                    strokeDasharray={circumference} 
                                    strokeDashoffset={circumference} 
                                    cx="115" cy="115" rx={radius} ry={radius}
                                    style={{strokeDashoffset:stroke}}
                                />
                                </motion.svg>
                            </div>
                    </div>
                    <div>
                        {   
                        eventState.isLoading ? <LoadingAnim customClass='w-full h-full flex text-7xl justify-center items- center' />:
                        !!eventState.errorMessage? <Error errorMessage={eventState.errorMessage} />:
                            Array.isArray(eventState.eventList) && eventState.eventList.map((e,i,arr)=>(
                                <div key={i}>
                                    <div  className="w-full flex relative pr-10 sm:pr-20" style={{height:height}}>
                                        <div className="w-[15em] md:w-[22em] absolute sm:static bg-white-almost h-[280px] sm:h-full py-10 sm:py-20 px-5 md:px-0 flex justify-center text-wood-brown flex-col shadow-2xl -bottom-[90px] sm:bottom-0">
                                            <Reveal>
                                                <h5 className='md:text-xl sm:text-lg text-base tracking-wider md:pl-14 md:pr-5 font-semibold'>{e.title}</h5>
                                            </Reveal>
                                            <Reveal>
                                                <p className='mt-4 md:pl-14 md:pr-22 text-sm md:text-base'>{e.short_description}</p>
                                            </Reveal>
                                        </div>
                                        <div ref={ref} className="grow bg-no-repeat bg-cover bg-center flex items-end re sm:block h-full" style={{backgroundImage:`url(${!!e.thumbnail?e.thumbnail:IMAGE_PLACEHOLDER})`}}/>
                                        <h3 className="rotate-90 tracking-wider w-[1.5em] h-fit box-border flex items-center justify-center text-salmon2 font-alta text-4xl sm:text-6xl leading-none whitespace-nowrap absolute right-0 top-1/2 -translate-y-1/2"><Reveal>{e.side_text}</Reveal></h3>
                                    </div>
                                    {i < arr.length - 1 && (
                                        <div className="w-full pe-20">
                                            <Reveal>
                                                <div className="w-2/3 mx-auto h-[4px] rounded-full bg-salmon2 mt-35 mb-10 sm:my-10" />
                                            </Reveal>
                                        </div>
                                    )}
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>
        </>
    );
}