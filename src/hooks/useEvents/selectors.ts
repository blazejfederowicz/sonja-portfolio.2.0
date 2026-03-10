import { RootState } from "@/store";
import { Event as EventType } from "@/types/common";

export const getEvents = (state: RootState) => state.events;
export const getEventById = (payload:string) => (state: RootState) => {
    const event = state.events.eventList.find((event: EventType) => event.id === parseInt(payload))
    if(event){
        return event
    } else{
        return null;
    }
};