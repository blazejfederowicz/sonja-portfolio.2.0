export interface UseFetchProps {
    fetchFn: () => Promise<any[] | any>;
    deps?: any[];
}