import React from "react";

const ErrorComponent = ({ onError, name }) => {
    return (
        <>
            {onError[name] ? (
                <p style={{ color: "red", textAlign: "left" }}>
                    {onError[name]}
                </p>
            ) : (
                <br />
            )}
        </>
    );
};

export default ErrorComponent;
