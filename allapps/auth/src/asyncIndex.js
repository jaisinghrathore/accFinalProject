import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const mount = (element) => {
    const root = ReactDOM.createRoot(element);
    root.render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
};

if (process.env.NODE_ENV === "development") {
    const element = document.getElementById("root");
    if (element) {
        mount(element);
    }
}

export { mount };
