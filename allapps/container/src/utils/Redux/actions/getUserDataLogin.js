import { GET_USER_DATA_AFTER_LOGIN } from "../types/userDataLogin";

export const userLoginData = (data) => {
    return {
        type: GET_USER_DATA_AFTER_LOGIN,
        payload:data
    };
};
