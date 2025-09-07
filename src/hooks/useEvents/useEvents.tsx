import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getEvents } from "./selectors";
import { postEvent, removeEvent } from "@/store/events/thunk";
import { Event, ID } from "@/types/common";

export default function useEvents(){
    const dispatch = useAppDispatch()

    const eventState = useAppSelector(getEvents)
    const dispatchEvent = (event: Event) => dispatch(postEvent({event}))
    const deleteEvent = (id:ID) => dispatch(removeEvent(id))

    return{
        eventState,
        dispatchEvent,
        deleteEvent
    }
}