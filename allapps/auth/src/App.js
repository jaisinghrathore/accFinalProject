import React from "react";
import Routes from "./utils/Routes";
import { Router } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import AuthStoreProvider from "./utils/store";

const queryClient = new QueryClient();

const App = ({ history }) => {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <AuthStoreProvider>
                    <Router history={history}>
                        <Routes />
                    </Router>
                </AuthStoreProvider>
            </QueryClientProvider>
        </>
    );
};

export default React.memo(App);
