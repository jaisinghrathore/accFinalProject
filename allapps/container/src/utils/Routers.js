import React from "react";
import Authentication from "../Pages/auth/Authentication";
import Admin from "../Pages/admin/Admin";
import { Route, Switch } from "react-router-dom";
import Contact from "../Pages/contact/Contact";
import ProductsMF from "../Pages/products/Products";

const Routers = () => {
    return (
        <>
            <Switch>
                <Route path="/auth" component={Authentication}></Route>
                <Route path="/admin" component={Admin}></Route>
                <Route path="/contact" component={Contact}></Route>
                <Route path="/" component={ProductsMF}></Route>
            </Switch>
        </>
    );
};

export default React.memo(Routers);
