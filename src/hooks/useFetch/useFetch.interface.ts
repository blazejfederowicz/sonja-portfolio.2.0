export interface UseFetchProps<T = unknown> {
    fetchFn: () => Promise<T>;
    deps?: unknown[];
}