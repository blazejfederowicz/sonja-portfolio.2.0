import { ACTION_TYPES, API_ROUTES } from "@/constants";
import { ID, Project } from "@/types/common";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProjects = createAsyncThunk<Project[]>(
  ACTION_TYPES.projects,
  async () => {
    const response = await axios.get(API_ROUTES.projects);
    
    return response.data;
  }
);

export const removeProject = createAsyncThunk(
  ACTION_TYPES.removeProject,
  async (id:ID) => {
    const response = await axios.delete(API_ROUTES.projects, { data: id });

    return response.data;
  }
);