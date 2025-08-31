"use client"
import { useEffect, useState } from "react";
import { UseFetchProps } from "./useFetch.interface";

export default function useFetch({fetchFn, deps = []}: UseFetchProps) {
    const [ data, setData ] = useState<Object | null | []>(null)
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        setLoading(true);
        setError(null);

        if (!isMounted) return;

        fetchFn()
            .then(setData)
            .catch((error) => setError(error.message || "An error occurred while fetching data"))
            .finally(() => setLoading(false));

        return () => {
            isMounted = false;
        }
    },deps)

    return { data, loading, error };
}