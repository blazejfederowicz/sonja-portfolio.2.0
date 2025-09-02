import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getEvents } from "./selectors";
import { postEvent } from "@/store/events/thunk";
import { Event } from "@/types/common";

export default function useEvents(){
    const dispatch = useAppDispatch()

    const eventState = useAppSelector(getEvents)
    const dispatchEvent = (event: Event) => dispatch(postEvent({event}))

    return{
        eventState,
        dispatchEvent
    }
}