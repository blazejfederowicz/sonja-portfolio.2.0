import { createSlice } from "@reduxjs/toolkit";
import {SkillState } from "./reducer.interface";
import { fetchSkills } from "./thunk";
import { UNKNOWN_ERROR } from "@/constants";

const skillsInitialState: SkillState = {
    skillList: [],
    isLoading: false,
    errorMessage:null
};

const skillSlice = createSlice({
    name: 'skills',
    initialState: skillsInitialState,
    reducers:{
    },
    extraReducers: builder =>{
        builder
            .addCase(fetchSkills.fulfilled,(_,action)=>{
                return{ ...skillsInitialState, skillList:action.payload}
            })
            .addCase(fetchSkills.pending, (state)=>{
                state.isLoading = true;
                state.errorMessage = null
            })
            .addCase(fetchSkills.rejected, (state, action)=>{
                state.isLoading = false;
                state.errorMessage = action.error.message || UNKNOWN_ERROR
            })
    }
})

// export const {
// } = projectSlice.actions;

export default skillSlice.reducer;