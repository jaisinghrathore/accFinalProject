import React from "react";
import { contextAuthStore } from "../utils/store";
import { useHistory } from "react-router-dom";

const Logout = () => {
    const { state, dispatch } = contextAuthStore();
    const history = useHistory();
    dispatch({ type: "USER_LOGOUT" });
    history.push("/");
    return <></>;
};

export default React.memo(Logout);
