import { ACTION_TYPES, API_ROUTES } from "@/constants";
import { Skill } from "@/types/common";
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
    const response = await axios.post(API_ROUTES.skills, skill);

    return response.data;
  }
);