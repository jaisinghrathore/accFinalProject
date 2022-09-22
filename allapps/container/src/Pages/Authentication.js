import React, { useEffect, useRef } from "react";
import { mount } from "auth/userAuth";
import { useHistory } from "react-router-dom";

const Authentication = () => {
    const elementRef = useRef(null);
    const history = useHistory();

    useEffect(() => {
        const { onParentNavigate } = mount(elementRef.current, {
            onNavigate: ({ pathname: nextPath }) => {
                const { pathname } = history.location;
                if (pathname !== nextPath) {
                    history.push(nextPath);
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
