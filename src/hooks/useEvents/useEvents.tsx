import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getEvents } from "./selectors";
import { postEvent, removeEvent, updateEvent } from "@/store/events/thunk";
import { Event } from "@/types/common";
import { addEvent } from "@/store/events/slice";
import { useCallback } from "react";

export default function useEvents(){
    const dispatch = useAppDispatch()

    const eventState = useAppSelector(getEvents)
    const newEvent = useCallback( (payload: Event) => {
        dispatch(addEvent(payload as any))
    }, [dispatch])
    const findEvent = useCallback(
        (id: string) => eventState.eventList.find((e) => e.event_id === id),
        [eventState]
    );
    const dispatchEvent = async (event: Event) => await dispatch(postEvent({event}))
    const deleteEvent = async(payload:{id:string}) =>{ 
        const event = eventState.eventList.find((event) => event.event_id === payload.id)
        await dispatch(removeEvent({id:payload.id, path:event?.thumbnail}))
    }
    const updateCurrentEvent = useCallback(async (event: Event) =>{
            await dispatch(updateEvent({ event }))
        },[dispatch]) 

    return{
        eventState,
        dispatchEvent,
        deleteEvent,
        findEvent,
        newEvent,
        updateCurrentEvent
    }
}