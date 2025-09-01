import { ACTION_TYPES, API_ROUTES } from "@/constants";
import { Event, Skill } from "@/types/common";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchEvents = createAsyncThunk<Event[]>(
  ACTION_TYPES.events,
  async () => {
    const response = await axios.get(API_ROUTES.events);
    
    return response.data;
  }
);