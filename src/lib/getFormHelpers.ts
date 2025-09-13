import { ERROR_MESSAGE, IMAGE_PLACEHOLDER } from "@/constants";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const checkString = (s: string, name: string) =>
    name === "email"
        ? !s.trim() || !emailRegex.test(s)
        : !s.trim();

export const handleErrors = <T extends Record<string, string>>(errors: T) =>
    Object.entries(errors).reduce((acc, [name, value]) => {
        if (checkString(String(value), name)) {
            acc[name] = ERROR_MESSAGE(name);
        }
        return acc;
    }, {} as Record<string, string>);

export const getReducedString = (string:string, length:number): string=>{
    if (!string) return "N/A";

    return string.length > length? string.slice(0,length)+"..." : string;
}

export const mapObject = (obj:any) =>{
    return obj.map((e:any) => getReducedString(e.title as string, 25))
}

export async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

export const isValidUrl = (urlString: any): string => {
  try {
        new URL(urlString)
        return urlString
    } catch (_) {
        return IMAGE_PLACEHOLDER
    }
}

