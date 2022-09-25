import React, { createContext } from "react";
import Cookies from "js-cookie";

const Store = createContext();

const initialState = {
    GlazierToken:
        Cookies.get("GlazierToken") && Cookies.get("GlazierToken") !== undefined
            ? JSON.parse(Cookies.get("GlazierToken"))
            : null,
};

function reducer(state, action) {
    switch (action.type) {
        case "GET_USER_DATA_AFTER_LOGIN": {
            return {
                ...state,
                GlazierToken: action.payload,
            };
        }
        default:
            return state;
    }
}

export const contextAuthStore = () => {
    const nam = React.useContext(Store);
    return nam;
};

export default function AuthStoreProvider({ children }) {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const value = { state, dispatch };
    return <Store.Provider value={value}>{children}</Store.Provider>;
}
