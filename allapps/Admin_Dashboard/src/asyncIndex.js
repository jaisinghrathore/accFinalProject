import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createMemoryHistory, createBrowserHistory } from "history";

const mount = (element, { onNavigate, defaultHistory, initialPath }) => {
    const history =
        defaultHistory ||
        createMemoryHistory({
            initialEntries: [initialPath],
        });

    if (onNavigate) {
        history.listen(onNavigate);
    }

    const root = ReactDOM.createRoot(element);
    root.render(<App history={history} />);

    return {
        onParentNavigate({ pathname: nextPath }) {
            const { pathname } = history.location;
            if (pathname !== nextPath) {
                history.push(nextPath);
            }
        },
    };
};

if (process.env.NODE_ENV === "development") {
    const element = document.getElementById("admin_root");
    if (element) {
        mount(element, { defaultHistory: createBrowserHistory() });
    }
}

export { mount };
