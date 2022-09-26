import { useQuery } from "react-query";
import { request } from "./AxiosInterseptor";

export const useReactQueryInterseptor = (name, url) => {
    const { isLoading, data, isError, error } = useQuery(name, () =>
        request({ url })
    );

    return [isLoading, data, isError, error];
};
