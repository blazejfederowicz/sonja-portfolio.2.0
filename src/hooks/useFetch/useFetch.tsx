"use client"
import { useEffect, useState } from "react";
import { UseFetchProps } from "./useFetch.interface";

export default function useFetch<T>({ fetchFn, deps = [] }: UseFetchProps<T>) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // useEffect dependencies include a dynamic array; disable linting for the deps line below
    useEffect(() => {
        let isMounted = true;

        setLoading(true);
        setError(null);

        if (!isMounted) return;

        fetchFn()
            .then((result) => {
                if (isMounted) setData(result);
            })
            .catch((error) => setError((error as Error).message || "An error occurred while fetching data"))
            .finally(() => {
                if (isMounted) setLoading(false);
            });

        return () => {
            isMounted = false;
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchFn, ...deps]);

    return { data, loading, error };
}