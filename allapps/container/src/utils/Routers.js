import React, { lazy, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// import Admin from "../Pages/admin/Admin";
// import Contact from "../Pages/contact/Contact";
// import ProductsMF from "../Pages/products/Products";
// import Authentication from "../Pages/auth/Authentication";

const Admin = lazy(() => import("../Pages/admin/Admin"));
const Contact = lazy(() => import("../Pages/contact/Contact"));
const ProductsMF = lazy(() => import("../Pages/products/Products"));
const Authentication = lazy(() => import("../Pages/auth/Authentication"));

import { useSelector } from "react-redux";

const Routers = () => {
    const userData = useSelector((state) => state);
    console.log();
    return (
        <>
            <Suspense fallback={"Loading..."}>
                <Switch>
                    <Route path="/auth" component={Authentication}></Route>
                    {userData?.GlazierToken?.isAdmin && (
                        <Route path="/admin" component={Admin}></Route>
                    )}
                    <Route path="/contact" component={Contact}></Route>
                    <Route path="/" component={ProductsMF}></Route>
                </Switch>
            </Suspense>
        </>
    );
};

export default React.memo(Routers);
