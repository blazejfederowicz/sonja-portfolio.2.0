import { EventProp } from "@/types/common";

export interface EventState{
    eventList: EventProp[];
    isLoading: boolean;
    errorMessage: string | null;
}