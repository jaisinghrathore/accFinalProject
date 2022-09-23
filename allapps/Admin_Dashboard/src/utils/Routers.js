import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "../pages/dashboard/index";
import Order from "../pages/orders/index";
import Users from "../pages/users/index";
import UserQueries from "../pages/userQueries/index";
import Products from "../pages/products/index";
import EditProduct from "../pages/products/EditProduct";

const Routers = () => {
    return (
        <>
            <Switch>
                <Route exact path="/" component={Dashboard}></Route>
                <Route
                    exact
                    path="/admin/dashboard"
                    component={Dashboard}></Route>
                <Route exact path="/admin/orders" component={Order}></Route>
                <Route exact path="/admin/users" component={Users}></Route>
                <Route
                    exact
                    path="/admin/products"
                    component={Products}></Route>
                <Route
                    exact
                    path="/admin/product/:id"
                    component={EditProduct}></Route>
                <Route
                    exact
                    path="/admin/user-query"
                    component={UserQueries}></Route>
            </Switch>
        </>
    );
};

export default React.memo(Routers);
