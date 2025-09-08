import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getEventById, getEvents } from "./selectors";
import { postEvent, removeEvent } from "@/store/events/thunk";
import { Event, EventProp } from "@/types/common";
import { addEvent } from "@/store/events/slice";

export default function useEvents(){
    const dispatch = useAppDispatch()

    const eventState = useAppSelector(getEvents)
    const newEvent = (payload: EventProp) => dispatch(addEvent(payload))
    const findEvent = (id: string) => useAppSelector(getEventById(id))
    const dispatchEvent = (event: Event) => dispatch(postEvent({event}))
    const deleteEvent = (payload:{id:string}) =>{ 
        const event = eventState.eventList.find((event) => event.id === parseInt(payload.id))

        dispatch(removeEvent({id:payload.id, path:event?.thumbnail}))
    }

    return{
        eventState,
        dispatchEvent,
        deleteEvent,
        findEvent,
        newEvent
    }
}