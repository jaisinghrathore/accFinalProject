import React from "react";
import "./forgetPassword.css";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
    return (
        <>
            <div className="forgetPassword-container">
                <div className="forgetPassword-box">
                    <h1 style={{ marginBottom: "14px", textAlign: "center" }}>
                        Forget Password!
                    </h1>
                    <input
                        type="text"
                        placeholder="Enter your Email."
                        class="forgetPassword-input"
                    />
                    <button className="forgetPassword-submitButton">
                        <Link
                            style={{ color: "white", textDecoration: "none" }}
                            to="/auth/change_password">
                            Submit
                        </Link>
                    </button>
                </div>
            </div>
        </>
    );
};

export default ForgetPassword;
