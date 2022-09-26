import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { contextAuthStore } from "./store";
import Home from "../pages/Home";
import Cart from "../components/Cart/index";
import Shipping from "../components/Shipping/index";
import OrderPlaced from "../components/OrderPlaced/index";
import PlaceOrder from "../components/PlaceOrder/index";
import OrderHistory from "../components/OrderHistory/OrderHistory";
import Products from "../pages/Products";

const Routers = () => {
    return (
        <>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/products" component={Products} />
                <Route exact path="/cart" component={Cart} />
                <Route exact path="/shipping" component={Shipping} />
                <Route exact path="/placeOrder" component={PlaceOrder} />
                <Route exact path="/orderplaced/:id" component={OrderPlaced} />
                <Route exact path="/order-history" component={OrderHistory} />
            </Switch>
        </>
    );
};

export default React.memo(Routers);
