import React from "react";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
    return (
        <>
            <Link to="/admin">Admin Dashboard</Link>
            <Link to="/auth">auth</Link>
            {children}
        </>
    );
};

export default Layout;
