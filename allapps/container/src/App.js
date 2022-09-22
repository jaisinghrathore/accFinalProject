import React from "react";
import Authentication from "./Pages/auth/Authentication";
import Admin from "./Pages/admin/Admin";
import { Route, Switch } from "react-router-dom";

const App = () => {
    return (
        <>
            <Switch>
                <Route path="/auth" component={Authentication}></Route>
            </Switch>
        </>
    );
};

export default App;
