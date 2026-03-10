import { Event } from "@/types/common";

export interface EventState{
    eventList: Event[];
    isLoading: boolean;
    errorMessage: string | null;
}