import { ERROR_MESSAGE } from "@/constants";

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