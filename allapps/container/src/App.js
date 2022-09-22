import React from "react";
import Authentication from "./Pages/Authentication";
import { Route, Switch } from "react-router-dom";

const App = () => {
    return (
        <>
            <Switch>
                <Route path="/" component={Authentication}></Route>
            </Switch>
        </>
    );
};

export default App;
