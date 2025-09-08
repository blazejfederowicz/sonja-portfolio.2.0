export interface ContentItem {
  id: string;
  image?: string | null; 
  name?: string;
  bgColor?: string;
  content?: string;
  isReverse?: boolean;
}

export interface ProjectFormState {
  thumbnail: string;
  tag: string;
  title: string;
  short_description: string;
  height: number;
  content: ContentItem[];
}