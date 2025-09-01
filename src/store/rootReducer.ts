import { combineReducers } from "@reduxjs/toolkit";
import skillReducer from './skills/slice'
import projectReducer from './projects/slice'
import eventReducer from "./events/slice"


const rootReducer = combineReducers({
    skills: skillReducer,
    events: eventReducer,
    projects: projectReducer,
})

export default rootReducer



