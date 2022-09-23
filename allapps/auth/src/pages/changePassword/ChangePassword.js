import React from "react";
import "./changePassword.css";

const ChangePassword = () => {
    return (
        <>
            <div className="changePassword-container">
                <div className="changePassword-box-form">
                    <div className="changePassword-left">
                        <div className="changePassword-overlay">
                            <h1>Change Password.</h1>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Curabitur et est sed felis
                                aliquet sollicitudin
                            </p>
                        </div>
                    </div>

                    <div className="changePassword-right">
                        <div className="changePassword-inputs">
                            <input type="password" placeholder="Password" />
                            <br />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                            />
                        </div>

                        <br />
                        <br />
                        <button>Submit</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default React.memo(ChangePassword);
