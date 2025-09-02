import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {EventState } from "./reducer.interface";
import { UNKNOWN_ERROR } from "@/constants";
import { fetchEvents, postEvent } from "./thunk";
import { Event } from "@/types/common";

const eventsInitialState: EventState = {
    eventList: [],
    isLoading: false,
    errorMessage:null
};

const eventSlice = createSlice({
    name: 'events',
    initialState: eventsInitialState,
    reducers:{
        addSkill(state, action: PayloadAction<Event>) {
            state.eventList.push(action.payload);
        },
    },
    extraReducers: builder =>{
        builder
            .addCase(fetchEvents.fulfilled,(_,action)=>{
                return{ ...eventsInitialState, eventList:action.payload}
            })
            .addCase(fetchEvents.pending, (state)=>{
                state.isLoading = true;
                state.errorMessage = null
            })
            .addCase(fetchEvents.rejected, (state, action)=>{
                state.isLoading = false;
                state.errorMessage = action.error.message || UNKNOWN_ERROR
            })
            .addCase(postEvent.fulfilled, (state, action)=>{
                state.isLoading = false
            })
            .addCase(postEvent.pending,(state)=>{
                state.isLoading = true;
            })
            .addCase(postEvent.rejected,(state, action)=>{
                state.isLoading = false;
                state.errorMessage = action.error.message || UNKNOWN_ERROR
            })
            
    }
})

// export const {
// } = projectSlice.actions;

export default eventSlice.reducer;