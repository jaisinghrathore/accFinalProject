import React from "react";
import Login from "../pages/login/Login";
import Registration from "../pages/registration/Registration";
import ForgetPassword from "../pages/forgetPassword/ForgetPassword";
import ChangePassword from "../pages/changePassword/ChangePassword"
import { Routes, Route } from "react-router-dom";

const Routers = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path="/registration" element={<Registration />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route
                    path="/change_password"
                    element={<ChangePassword />}></Route>
                <Route
                    path="forget_password"
                    element={<ForgetPassword />}></Route>
                <Route path="*" element={<ForgetPassword />}></Route>
            </Routes>
        </>
    );
};

export default Routers;
