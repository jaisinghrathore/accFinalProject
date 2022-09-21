import React, { useEffect, useRef } from "react";
import { mount } from "auth/userAuth";

const Authentication = () => {
    const elementRef = useRef(null);

    useEffect(() => {
        mount(elementRef.current);
    }, []);

    return (
        <>
            <div ref={elementRef}></div>
        </>
    );
};

export default Authentication;
