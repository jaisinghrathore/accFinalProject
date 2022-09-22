import React from "react";
import { Switch, Route, Router } from "react-router-dom";
import Landing from "./pages/Landing";
import Add from "./pages/Add";
import Graph from "./pages/Graph";

const App = ({ history }) => {
    return (
        <>
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={Landing}></Route>
                    <Route exact path="/final" component={Landing}></Route>
                    <Route exact path="/admin/add" component={Add}></Route>
                    <Route exact path="/admin/graph" component={Graph}></Route>
                </Switch>
            </Router>
        </>
    );
};

export default App;
