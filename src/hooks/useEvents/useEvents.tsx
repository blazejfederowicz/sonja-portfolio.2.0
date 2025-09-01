import { useAppSelector } from "@/lib/hooks";
import { getEvents } from "./selectors";

export default function useEvents(){

    const eventState = useAppSelector(getEvents)

    return{
        eventState
    }
}