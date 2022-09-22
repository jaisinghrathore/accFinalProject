import React, { useEffect, useRef } from "react";
import { mount } from "auth/userAuth";
import { useHistory } from "react-router-dom";

const Authentication = () => {
    const elementRef = useRef(null);

    const history = useHistory();

    useEffect(() => {
        const { onParentNavigate } = mount(elementRef.current, {
            initialPath: history.location.pathname,
            onNavigate: ({ pathname: nextPathname }) => {
                if (nextPathname !== history.location.pathname) {
                    history.push(nextPathname);
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

export default Authentication;
