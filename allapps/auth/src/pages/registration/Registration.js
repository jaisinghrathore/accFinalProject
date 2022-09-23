import React from "react";
import "./registration.css";
import { Link } from "react-router-dom";

const Registration = () => {
    return (
        <>
            <div className="registration-container">
                <div className="registration-box-form">
                    <div className="registration-left">
                        <div className="registration-overlay">
                            <h1>Registration.</h1>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Curabitur et est sed felis
                                aliquet sollicitudin
                            </p>
                        </div>
                    </div>

                    <div className="registration-right">
                        <div className="registration-inputs">
                            <input
                                type="text"
                                placeholder="Username"
                                name="username"
                            />
                            <br />
                            <input
                                type="text"
                                placeholder="Email"
                                name="email"
                            />
                            <br />
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                            />
                            <br />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                name="cpassword"
                            />
                        </div>

                        <br />

                        <br />
                        <button>Register.</button>
                        <div className="registration-signup">
                            <p>
                                Already have an account?
                                <Link to="/auth"> Sign In</Link>. Make
                                experience better with us.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default React.memo(Registration);
