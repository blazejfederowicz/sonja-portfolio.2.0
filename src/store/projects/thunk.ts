import { ACTION_TYPES, API_ROUTES } from "@/constants";
import { Project } from "@/types/common";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProjects = createAsyncThunk<Project[]>(
  ACTION_TYPES.projects,
  async () => {
    const response = await axios.get(API_ROUTES.projects);
    
    return response.data;
  }
);

export const postProject = createAsyncThunk<Project, {project:Project}>(
  ACTION_TYPES.addProject,
  async ({project}) => {
    const response = await axios.post(API_ROUTES.projects, project, {
      headers: { "Content-Type": "application/json; charset=utf-8"  }
    });

    return response.data;
  }
);

export const removeProject = createAsyncThunk(
  ACTION_TYPES.removeProject,
  async ({id, path}:{id:string, path:string | undefined}) => {
  const response = await axios.delete(API_ROUTES.projects, { data: {id, path} });

    return response.data;
  }
);