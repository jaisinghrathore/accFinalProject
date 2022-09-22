import React from "react";
import Authentication from "./Pages/auth/Authentication";
import Admin from "./Pages/admin/Admin";

import { Route, Switch, Link } from "react-router-dom";

const App = () => {
    return (
        <>
            <Link to="/admin">Admin Dashboard</Link>;
            <Link to="/auth">auth</Link>;
            <Switch>
                <Route path="/auth" component={Authentication}></Route>
                <Route path="/admin" component={Admin}></Route>
                <Route exact path="/" component={Admin}></Route>
            </Switch>
        </>
    );
};

export default App;
