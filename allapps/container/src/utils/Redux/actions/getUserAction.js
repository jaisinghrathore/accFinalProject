import { GET_USER } from "../types/userTypes";

export const getUser = (user) => {
    return {
        type: GET_USER,
        payload: user,
    };
};
