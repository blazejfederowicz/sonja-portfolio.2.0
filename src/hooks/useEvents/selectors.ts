import { RootState } from "@/store";
import { EventProp, ID } from "@/types/common";

export const getEvents = (state: RootState) => state.events;
export const getEventById = (payload:string) => (state: RootState) => {
    const event = state.events.eventList.find((event: EventProp) => event.id === parseInt(payload))
    if(event){
        return event
    } else{
        return null;
    }
};