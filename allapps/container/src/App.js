import React from "react";
import Authentication from "./Pages/Authentication";
import { Link } from "react-router-dom";

const App = () => {
    return (
        <>
            <Link to="/about">Login</Link>
            <Link to="/registration">Registration</Link>
            <Link to="/forget_password">forgetPassword</Link>
            <Authentication />
        </>
    );
};

export default App;
