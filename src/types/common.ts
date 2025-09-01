import { ReactNode } from "react";

export interface Children{
    children?: ReactNode
}

export interface ProjectContent {
  image: string;
  title: string;
  content: string;
  bgColor: string;
  isReverse: boolean;
}

export interface Project{
    id: string;
    title: string;
    tag: string;
    thumbnail: string;
    height: string
    short_description: string;
    content: ProjectContent[]
}

export interface Skill{
    title: string;
    short_description: string;
    tag?:string
}

export interface Event{
    title: string;
    short_description: string;
    side_text: string;
    thumbnail: string
}
