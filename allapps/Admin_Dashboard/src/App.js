import React from "react";
import Routers from "./utils/Routers"
import { Router } from "react-router-dom";

const App = ({ history }) => {
    return (
        <>
            <Router history={history}>
                <Routers />
            </Router>
        </>
    );
};

export default App;
