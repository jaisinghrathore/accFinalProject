import React from "react";
import "./login.css";
import { Link } from "react-router-dom";
import ErrorComponent from "../../components/ErrorComponent";
import { userLogin } from "../../components/LoginUserQuery";
import { contextAuthStore } from "../../utils/store";
import { useHistory } from "react-router-dom";

const Login = () => {
    const { state, dispatch } = contextAuthStore();
    const router = useHistory();
    const [inpVal, setInpVal] = React.useState({
        email: "",
        password: "",
    });

    const { data, mutate: LoginUser, isLoading, isError, error } = userLogin();

    React.useEffect(() => {
        if (data?.response?.data.error) {
            alert(data?.response.data.error);
        }
        if (data?.data) {
            dispatch({ type: "USER_LOGIN", payload: data?.data });
            router.push("/");
            window.location.reload();
        }
    }, [data]);

    const onError = React.useMemo(() => {
        const errors = {};
        if (
            !inpVal.email.match(
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
        ) {
            errors.email = "Please use a valid email address";
        }

        if (inpVal.password.length < 9) {
            errors.password = "Password should be at least 9 characters!";
        }

        return errors;
    }, [inpVal]);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInpVal({ ...inpVal, [name]: value });
    };

    const handleLogin = () => {
        if (Object.values(onError).length === 0) {
            LoginUser(inpVal);
        }
    };

    if (isError) {
        alert(error);
    }

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
                            <input
                                onChange={handleChange}
                                type="text"
                                placeholder="Email"
                                name="email"
                            />
                            <ErrorComponent onError={onError} name="email" />

                            <input
                                onChange={handleChange}
                                type="password"
                                placeholder="Password"
                                name="password"
                            />
                            <ErrorComponent onError={onError} name="password" />
                        </div>

                        <br />

                        <div className="login-remember-me--forget-password">
                            <p style={{ cursor: "pointer" }}>
                                <Link to="/auth/forget_password">
                                    forget password?
                                </Link>
                            </p>
                        </div>
                        <br />

                        <br />
                        <button onClick={handleLogin}>Login</button>
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

export default React.memo(Login);
