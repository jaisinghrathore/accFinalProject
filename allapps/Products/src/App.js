import React from "react";
import Routers from "./utils/Routers.js";
import { Router } from "react-router-dom";
import { contextAuthStore } from "./utils/store";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

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

    return (
        <QueryClientProvider client={queryClient}>
            <Router history={history}>
                <Routers></Routers>
            </Router>
        </QueryClientProvider>
    );
};

export default App;
