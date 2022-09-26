import React from "react";
import Login from "../pages/login/Login";
import Registration from "../pages/registration/Registration";
import ForgetPassword from "../pages/forgetPassword/ForgetPassword";
import ChangePassword from "../pages/changePassword/ChangePassword";
import Logout from "../pages/Logout";
import { Switch, Route, Redirect } from "react-router-dom";
import { contextAuthStore } from "./store";
import Profile from "../pages/profile/index";

const Routers = () => {
    const { state } = contextAuthStore();
    return (
        <>
            {/* later can remove it */}
            {/* {!state.GlazierToken ? ( */}
            <Switch>
                <Route exact path="/" component={Login}></Route>
                <Route exact path="/auth" component={Login}></Route>
                <Route
                    exact
                    path="/auth/registration"
                    component={Registration}></Route>
                {/* </Switch> */}
                {/* ) : ( */}
                {/* <></> */}
                {/* )} */}
                {/* <Switch> */}
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
                <Route exact path="/auth/profile" component={Profile}></Route>
            </Switch>
        </>
    );
};

export default Routers;
