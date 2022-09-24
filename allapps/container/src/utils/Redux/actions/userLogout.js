import { USER_LOGOUT } from "../types/userLogout";

export const userLogout = () => {
    return {
        type: USER_LOGOUT,
    };
};
