import React from "react";
import Login from "../pages/login/Login";
import Registration from "../pages/registration/Registration";
import ForgetPassword from "../pages/forgetPassword/ForgetPassword";
import ChangePassword from "../pages/changePassword/ChangePassword";
import Logout from "../pages/Logout";
import { Switch, Route, Redirect } from "react-router-dom";
import { contextAuthStore } from "./store";

const Routers = () => {
    const { state } = contextAuthStore();

    return (
        <>
            {/* later can remove it */}

            <Switch>
                <Route exact path="/" component={Login}></Route>
                {!state.GlazierToken ? (
                    <Route exact path="/auth" component={Login}></Route>
                ) : (
                    ""
                )}
                {!state.GlazierToken ? (
                    <Route
                        exact
                        path="/auth/registration"
                        component={Registration}></Route>
                ) : (
                    ""
                )}

                <Route exact path="/auth/removeUser" component={Logout}></Route>
                <Route
                    exact
                    path="/auth/change_password"
                    component={ChangePassword}></Route>
                <Route
                    exact
                    path="/auth/forget_password"
                    component={ForgetPassword}></Route>
                <Route
                    exact
                    path="/auth/forget_password"
                    component={ForgetPassword}></Route>
                <Redirect to="/"></Redirect>
            </Switch>
        </>
    );
};

export default Routers;
