import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "../pages/dashboard/index";
import Add from "../pages/Add";
import Graph from "../pages/Graph";
import Order from "../pages/orders/index";

const Routers = ({ history }) => {
    return (
        <>
            <Switch>
                <Route exact path="/" component={Dashboard}></Route>
                <Route
                    exact
                    path="/admin/dashboard"
                    component={Dashboard}></Route>
                <Route exact path="/admin/orders" component={Order}></Route>
                <Route exact path="/admin/add" component={Add}></Route>
                <Route exact path="/admin/graph" component={Graph}></Route>
            </Switch>
        </>
    );
};

export default Routers;
