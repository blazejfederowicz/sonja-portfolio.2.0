import { createSlice } from "@reduxjs/toolkit";
import {SkillState } from "./reducer.interface";
import { fetchSkills, postSkill } from "./thunk";
import { UNKNOWN_ERROR } from "@/constants";
import { Skill } from "@/types/common";
import { PayloadAction } from "@reduxjs/toolkit";

const skillsInitialState: SkillState = {
    skillList: [],
    isLoading: false,
    errorMessage:null
};

const skillSlice = createSlice({
    name: 'skills',
    initialState: skillsInitialState,
    reducers:{
        addSkill(state, action: PayloadAction<Skill>) {
            state.skillList.push(action.payload);
        },
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
            .addCase(postSkill.fulfilled, (state)=>{
                state.isLoading = false
            })
            .addCase(postSkill.pending,(state)=>{
                state.isLoading = true;
            })
            .addCase(postSkill.rejected,(state, action)=>{
                state.isLoading = false;
                state.errorMessage = action.error.message || UNKNOWN_ERROR
            })
    }
})

export const {
    addSkill
} = skillSlice.actions;

export default skillSlice.reducer;