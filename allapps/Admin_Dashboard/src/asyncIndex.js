import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const mount = (element) => {
    const root = ReactDOM.createRoot(element);
    root.render(<App />);
};

if (process.env.NODE_ENV === "development") {
    const element = document.getElementById("admin_root");
    if (element) {
        mount(element);
    }
}

export { mount };
