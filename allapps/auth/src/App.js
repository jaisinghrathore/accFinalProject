import React from "react";
import Routes from "./utils/Routes";
import { Router } from "react-router-dom";

const App = ({ history }) => {
    return (
        <>
            <Router history={history}>
                <Routes />
            </Router>
        </>
    );
};

export default App;
