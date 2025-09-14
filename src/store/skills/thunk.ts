import { ACTION_TYPES, API_ROUTES } from "@/constants";
import { ID, Skill } from "@/types/common";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSkills = createAsyncThunk<Skill[]>(
  ACTION_TYPES.skills,
  async () => {
    const response = await axios.get(API_ROUTES.skills);
    
    return response.data;
  }
);

export const postSkill = createAsyncThunk<Skill, {skill:Skill}>(
  ACTION_TYPES.addSkill,
  async ({skill}) => {
    const response = await axios.post(API_ROUTES.skills, skill, {
      headers: { "Content-Type": "application/json; charset=utf-8"  }
    });

    return response.data;
  }
);

export const removeSkill = createAsyncThunk(
  ACTION_TYPES.removeSkill,
  async (id:ID) => {
    const response = await axios.delete(API_ROUTES.skills, { data: id });
    
    return response.data;
  }
);