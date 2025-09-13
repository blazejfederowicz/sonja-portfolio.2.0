import { ReactNode } from "react";

export interface Children{
    children?: ReactNode
}

export interface ContentItem {
    id: string;
    image?: string | null; 
    name?: string;
    bgColor?: string;
    content?: string;
    isReverse?: boolean;
}

export interface Project{
    id?: number;
    project_id: string;
    thumbnail: string;
    tag: string;
    title: string;
    short_description: string;
    height: number;
    content: ContentItem[];
    thumbnailUrl?: string;

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
    thumbnail: string;
}

export type ID={
    id:number
}
export interface EventProp extends Event, ID{
    thumbnailUrl:string
}


