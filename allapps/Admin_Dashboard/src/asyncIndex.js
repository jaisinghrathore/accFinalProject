import React from "react";
import ReactDOM from "react-dom/client";

const mount = (element) => {
    const root = ReactDOM.createRoot(element);
    root.render(<h1>fdsf</h1>);
};

if (process.env.NODE_ENV === "development") {
    const element = document.getElementById("admin_root");
    if (element) {
        mount(element);
    }
}

export { mount };
