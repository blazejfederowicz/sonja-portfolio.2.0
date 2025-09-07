import { ACTION_TYPES, API_ROUTES } from "@/constants";
import { Event, ID } from "@/types/common";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchEvents = createAsyncThunk<Event[]>(
  ACTION_TYPES.events,
  async () => {
    const response = await axios.get(API_ROUTES.events);
    
    return response.data;
  }
);

export const postEvent = createAsyncThunk<Event, {event:Event}>(
  ACTION_TYPES.addEvent,
  async ({event}) => {
    const response = await axios.post(API_ROUTES.events, event);

    return response.data;
  }
);

export const removeEvent = createAsyncThunk(
  ACTION_TYPES.removeEvent,
  async (id:ID) => {
    const response = await axios.delete(API_ROUTES.events, { data: { ...id } });

    return response.data;
  }
);