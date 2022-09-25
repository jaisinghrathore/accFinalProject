import React from "react";
import Routers from "./utils/Routers";
import { Router } from "react-router-dom";
import { contextAuthStore } from "./utils/store";

const App = ({ history, userToken }) => {
    const { state, dispatch } = contextAuthStore();

    React.useEffect(() => {
        if (userToken?.isAdmin) {
            dispatch({
                type: "GET_USER_DATA_AFTER_LOGIN",
                payload: { ...userToken },
            });
        }
    }, []);
    React.useEffect(() => {
        if (!state?.GlazierToken?.isAdmin) {
            history.push("/");
        }
    }, [state.GlazierToken]);

    return (
        <>
            <Router history={history}>
                <Routers />
            </Router>
        </>
    );
};

export default App;
