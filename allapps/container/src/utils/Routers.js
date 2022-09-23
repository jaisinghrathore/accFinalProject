import React from "react";
import Authentication from "../Pages/auth/Authentication";
import Admin from "../Pages/admin/Admin";
import { Route, Switch } from "react-router-dom";
import Contact from "../Pages/contact/Contact";

function Home() {
    return <h1>Home</h1>;
}

const Routers = () => {
    return (
        <>
            <Switch>
                <Route path="/auth" component={Authentication}></Route>
                <Route path="/admin" component={Admin}></Route>
                <Route path="/contact" component={Contact}></Route>
                <Route exact path="/" component={Home}></Route>
            </Switch>
        </>
    );
};

export default React.memo(Routers);
