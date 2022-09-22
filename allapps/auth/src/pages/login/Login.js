import React from "react";
import "./login.css";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <>
            <div className="login-container">
                <div className="login-box-form">
                    <div className="login-left">
                        <div className="login-overlay">
                            <h1>Login.</h1>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Curabitur et est sed felis
                                aliquet sollicitudin
                            </p>
                        </div>
                    </div>

                    <div className="login-right">
                        <div className="login-inputs">
                            <input type="text" placeholder="Email" />
                            <br />
                            <input type="password" placeholder="Password" />
                        </div>

                        <br />
                        <br />

                        <div className="login-remember-me--forget-password">
                            <p style={{ cursor: "pointer" }}>
                                <Link to="/auth/forget_password">
                                    forget password?
                                </Link>
                            </p>
                        </div>

                        <br />
                        <button>Login</button>
                        <div className="login-signup">
                            <p>
                                Don't have an account?
                                <Link to="/auth/registration">
                                    Creat Your Account.
                                </Link>
                                it's free to sign in here!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
