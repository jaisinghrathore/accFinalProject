import React from "react";
import "./registration.css";
import { Link } from "react-router-dom";
import ErrorComponent from "../../components/ErrorComponent";
import { userRegistration } from "../../components/RegisterUserQuery";
import { contextAuthStore } from "../../utils/store";
import { useHistory } from "react-router-dom";

const Registration = () => {
    const { state, dispatch } = contextAuthStore();
    const router = useHistory();

    const [inpVal, setInpVal] = React.useState({
        username: "",
        email: "",
        password: "",
        cpassword: "",
    });

    // sending the data
    const {
        data,
        mutate: RegisterUser,
        isLoading,
        isError,
        error,
    } = userRegistration();

    React.useEffect(() => {
        if (data?.response?.data.error) {
            alert(data?.response.data.error);
        }
        if (data?.data) {
            dispatch({ type: "USER_REGISTER", payload: data.data });
            router.push("/");
        }
    }, [data]);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInpVal({ ...inpVal, [name]: value });
    };

    const onError = React.useMemo(() => {
        const errors = {};
        if (inpVal.username.length < 3) {
            errors.username = "Please enter a proper username?";
        }
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

        if (inpVal.password !== inpVal.cpassword) {
            errors.password = "Password and confirm password must be same!";
        }

        return errors;
    }, [inpVal]);

    if (isError) {
        alert(error);
    }

    const handleSubmit = () => {
        if (Object.values(onError).length === 0) {
            RegisterUser(inpVal);
        }
    };

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
                                onChange={handleChange}
                                type="text"
                                placeholder="Username"
                                name="username"
                            />
                            <ErrorComponent onError={onError} name="username" />
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

                            <input
                                onChange={handleChange}
                                type="password"
                                placeholder="Confirm Password"
                                name="cpassword"
                            />
                            <ErrorComponent
                                onError={onError}
                                name="cpassword"
                            />
                        </div>

                        <br />

                        <br />
                        <button onClick={handleSubmit}>Register.</button>
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
