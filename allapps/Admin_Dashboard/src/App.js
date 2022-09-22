import React from "react";
import { Switch, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Add from "./pages/Add";
import Graph from "./pages/Graph";

const App = () => {
    return (
        <>
            <Switch>
                <Route exact path="/" component={Landing}></Route>
                <Route exact path="/admin/add" component={Add}></Route>
                <Route exact path="/admin/graph" component={Graph}></Route>
            </Switch>
        </>
    );
};

export default App;
