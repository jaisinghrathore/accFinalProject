import React, { useEffect, useRef } from "react";
import { mount } from "admin/admin";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../utils/Redux/actions/getUserAction";

const Admin = () => {
    const elementRef = useRef(null);

    const history = useHistory();
    const userToken = useSelector((state) => state.GlazierToken);

    useEffect(() => {
        const { onParentNavigate } = mount(
            elementRef.current,
            {
                initialPath: history.location.pathname,
                onNavigate: ({ pathname: nextPathname }) => {
                    if (nextPathname !== history.location.pathname) {
                        history.push(nextPathname);
                    }
                },
            },
            userToken
        );
        history.listen(onParentNavigate);
    }, []);

    return (
        <>
            <div ref={elementRef}></div>
        </>
    );
};

export default React.memo(Admin);
