import { ReactNode } from "react";

export interface Children {
  children?: ReactNode;
}

export interface ContentItem {
  id: string;
  image?: string | null;
  name?: string;
  bgColor?: string;
  content?: string;
  isReverse?: boolean;
}

export interface Project {
  id?: number;
  project_id: string;
  thumbnail: string;
  tag: string;
  title: string;
  short_description: string;
  height: number;
  content: ContentItem[];
  thumbnailUrl?: string;
  created_at?: string;
}

export interface Skill {
  id?: number;
  skill_id: string;
  title: string;
  short_description: string;
  tag?: string;
  created_at?: string;
}

export interface Event {
  id?: number;
  event_id: string;
  title: string;
  short_description: string;
  side_text: string;
  thumbnail: string;
  thumbnailUrl?: string;
  created_at?: string;
}

// State interfaces
export interface ProjectState {
  projectList: Project[];
  isLoading: boolean;
  errorMessage: string | null;
}

export interface SkillState {
  skillList: Skill[];
  isLoading: boolean;
  errorMessage: string | null;
}

export interface EventState {
  eventList: Event[];
  isLoading: boolean;
  errorMessage: string | null;
}
