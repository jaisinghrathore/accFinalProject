import React, { useEffect, useRef } from "react";
import { mount } from "auth/userAuth";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { userLoginData } from "../../utils/Redux/actions/getUserDataLogin";

const Authentication = () => {
    const elementRef = useRef(null);
    const data = useSelector((state) => state);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        const { onParentNavigate } = mount(elementRef.current, {
            initialPath: history.location.pathname,
            onNavigate: ({ pathname: nextPathname }) => {
                if (nextPathname !== history.location.pathname) {
                    history.push(nextPathname);
                    if (nextPathname == "/") {
                        setTimeout(() => {
                            dispatch(userLoginData(`${Math.random() * 2000}`));
                        }, 100);
                    }
                }
            },
        });
        history.listen(onParentNavigate);
    }, []);

    return (
        <>
            <div ref={elementRef}></div>
        </>
    );
};

export default React.memo(Authentication);
