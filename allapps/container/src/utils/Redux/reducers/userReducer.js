import { GET_USER } from "../types/userTypes";
import { USER_LOGOUT } from "../types/userLogout";
import { GET_USER_DATA_AFTER_LOGIN } from "../types/userDataLogin";
import Cookies from "js-cookie";

const initialState = {
    GlazierToken:
        Cookies.get("GlazierToken") && Cookies.get("GlazierToken") !== undefined
            ? JSON.parse(Cookies.get("GlazierToken"))
            : null,
    dummy: "",
};

const userReducers = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER: {
            return { ...state, GlazierToken: action.payload };
        }
        case GET_USER_DATA_AFTER_LOGIN: {
            return {
                ...state,
                GlazierToken: JSON.parse(Cookies.get("GlazierToken")),
                dummy: action.payload,
            };
        }
        case USER_LOGOUT: {
            return { ...state, GlazierToken: null };
        }
        default:
            return state;
    }
};

export default userReducers;
