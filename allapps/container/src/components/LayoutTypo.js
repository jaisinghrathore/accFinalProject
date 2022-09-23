import React from "react";
import { Link } from "react-router-dom";

const LayoutTypo = ({ children, href }) => {
    return (
        <Link to={href} style={{ textDecoration: "none" }}>
            <span
                style={{
                    cursor: "pointer",
                    fontSize: "2rem",
                    fontWeight: "bold",
                    margin: "0 30px",
                    color: "white",
                }}>
                {children}
            </span>
        </Link>
    );
};

export default React.memo(LayoutTypo);
