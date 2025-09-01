import { createSlice } from "@reduxjs/toolkit";
import {EventState } from "./reducer.interface";
import { UNKNOWN_ERROR } from "@/constants";
import { fetchEvents } from "./thunk";

const eventsInitialState: EventState = {
    eventList: [],
    isLoading: false,
    errorMessage:null
};

const eventSlice = createSlice({
    name: 'events',
    initialState: eventsInitialState,
    reducers:{
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
            
    }
})

// export const {
// } = projectSlice.actions;

export default eventSlice.reducer;