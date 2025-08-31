import { createSlice } from "@reduxjs/toolkit";
import { ProjectState } from "./reducer.interface";

const projectsInitialState: ProjectState = {
    projectList: [],
    isLoading: false,
    errorMessage:null
};

const projectSlice = createSlice({
    name: 'projects',
    initialState: projectsInitialState,
    reducers:{
    },
    extraReducers: builder =>{
        builder           
            
    }
})

// export const {
// } = projectSlice.actions;

export default projectSlice.reducer;