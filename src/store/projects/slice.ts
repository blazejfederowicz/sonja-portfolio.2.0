import { createSlice } from "@reduxjs/toolkit";
import { ProjectState } from "./reducer.interface";
import { fetchProjects } from "./thunk";
import { UNKNOWN_ERROR } from "@/constants";

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
            .addCase(fetchProjects.fulfilled,(_,action)=>{
                return{ ...projectsInitialState, projectList:action.payload}
            })
            .addCase(fetchProjects.pending, (state)=>{
                state.isLoading = true;
                state.errorMessage = null
            })
            .addCase(fetchProjects.rejected, (state, action)=>{
                state.isLoading = false;
                state.errorMessage = action.error.message || UNKNOWN_ERROR
            })
    }
})

// export const {
// } = projectSlice.actions;

export default projectSlice.reducer;