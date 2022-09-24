import React from "react";
import Login from "../pages/login/Login";
import Registration from "../pages/registration/Registration";
import ForgetPassword from "../pages/forgetPassword/ForgetPassword";
import ChangePassword from "../pages/changePassword/ChangePassword";
import { Switch, Route, Redirect } from "react-router-dom";
import { contextAuthStore } from "./store";

const Routers = () => {
    const { state } = contextAuthStore();
    return (
        <>
            <Switch>
                {/* later can remove it */}
                {!state.GlazierToken && (
                    <>
                        <Route exact path="/" component={Login}></Route>

                        <Route exact path="/auth" component={Login}></Route>
                        <Route
                            exact
                            path="/auth/registration"
                            component={Registration}></Route>
                    </>
                )}

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
