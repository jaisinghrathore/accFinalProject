import React, { useEffect, useRef } from "react";
import { mount } from "admin/admin";

const Admin = () => {
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

export default Admin;
