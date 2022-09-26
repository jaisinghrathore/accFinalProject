import React from "react";
import { contextAuthStore } from "../../utils/store";
import {
    Typography,
    Button,
    Link,
    Card,
    ListItem,
    List,
    Grid,
    Container,
} from "@mui/material";
import BasicTableNotEditable from "../../utils/BasicTableNotEditable";
import { useHistory } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

function reducer(state, action) {
    switch (action.type) {
        case "FETCH_REQUEST":
            return { ...state, loading: true, error: "" };
        case "FETCH_SUCCESS":
            return {
                ...state,
                loading: false,
                order: action.payload,
                error: "",
            };
        case "FETCH_ERROR":
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

function OrderPlaced() {
    const { state } = contextAuthStore();
    const router = useHistory();
    const { GlazierToken } = state;
    const [{ loading, order, error }, dispatch] = React.useReducer(reducer, {
        loading: true,
        order: {},
        error: "",
    });

    const orderId = router.location.pathname.split("/")[2];

    React.useEffect(() => {
        if (!GlazierToken?._id) {
            router.push("/auth");
        }
    }, [state.GlazierToken]);

    React.useEffect(() => {
        const fetchOrder = async () => {
            try {
                dispatch({ type: "FETCH_REQUEST" });
                const { data } = await axios.get(
                    `http://localhost:8000/admin/get_order/${orderId}`,
                    {
                        headers: {
                            authorization: `Bearer ${GlazierToken.token}`,
                        },
                    }
                );
                dispatch({ type: "FETCH_SUCCESS", payload: data });
            } catch (err) {
                console.log(err);
                dispatch({ type: "FETCH_ERROR", payload: err });
            }
        };
        fetchOrder();
    }, []);

    React.useEffect(() => {
        if (order.length == 0) {
            router.push("/products");
        }
    }, [order]);

    const totalPrice = state.order.reduce(
        (acc, caa) => acc + caa.price * caa.quantity,
        0
    );

    return (
        <>
            <Container>
                {loading ? (
                    <CircularProgress />
                ) : error ? (
                    <Typography>{error}</Typography>
                ) : (
                    <Grid container spacing={2} sx={{ padding: "40px" }}>
                        <Grid item xs={12} sm={12} md={8}>
                            <Typography
                                style={{ textDecoration: "underline" }}
                                component="h5"
                                variant="h5"
                                mb={2}>
                                Order ID: {orderId}
                            </Typography>
                            {/*Shipping*/}
                            <Card
                                variant="outlined"
                                style={{ marginBottom: "20px" }}>
                                <List>
                                    <ListItem>
                                        <Typography
                                            variant="body1"
                                            sx={{ fontWeight: "bold" }}>
                                            Shipping Address
                                        </Typography>
                                    </ListItem>

                                    <ListItem>
                                        {order.shippingAddress.fullName},{" "}
                                        {order.shippingAddress.address},{" "}
                                        {order.shippingAddress.city},{" "}
                                        {order.shippingAddress.postalcode},{" "}
                                        {order.shippingAddress.landmark}.
                                    </ListItem>

                                    <ListItem>
                                        Status:{" "}
                                        {order.isDelivered
                                            ? `delivered at ${order.deliveredAt}`
                                            : "not delivered"}
                                    </ListItem>
                                </List>
                            </Card>

                            {/*Payment Method*/}
                            <Card
                                variant="outlined"
                                style={{ marginBottom: "20px" }}>
                                <List>
                                    <ListItem>
                                        <Typography
                                            variant="body1"
                                            sx={{ fontWeight: "bold" }}>
                                            Payment Method
                                        </Typography>
                                    </ListItem>

                                    <ListItem>{order.paymentMethod}</ListItem>

                                    <ListItem>
                                        Status:{" "}
                                        {order.isPaid
                                            ? `delivered at ${order.paidAt}`
                                            : "not paid"}
                                    </ListItem>
                                </List>
                            </Card>

                            {/* This is table */}
                            <Card
                                variant="outlined"
                                style={{ marginBottom: "20px" }}>
                                <BasicTableNotEditable order={order} />
                            </Card>
                        </Grid>
                        <Grid item sm={12} md={4}>
                            {/* small box */}
                            <Card
                                variant="outlined"
                                sx={{ marginLeft: { sm: "30px" } }}>
                                <List>
                                    <ListItem>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <Typography
                                                    variant="h4"
                                                    style={{
                                                        margin: "14px 0 20px 0",
                                                    }}>
                                                    Order Summary
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography
                                                    style={{
                                                        marginTop: "4px",
                                                    }}>
                                                    {" "}
                                                    Items:{" "}
                                                    <span
                                                        style={{
                                                            float: "right",
                                                        }}>
                                                        ${order.totalPrice}
                                                    </span>
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography
                                                    style={{
                                                        marginTop: "4px",
                                                    }}>
                                                    {" "}
                                                    Tax:{" "}
                                                    <span
                                                        style={{
                                                            float: "right",
                                                        }}>
                                                        ${order.taxPrice}
                                                    </span>
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography
                                                    style={{
                                                        marginTop: "4px",
                                                    }}>
                                                    {" "}
                                                    Shipping:{" "}
                                                    <span
                                                        style={{
                                                            float: "right",
                                                        }}>
                                                        ${order.shippingPrice}
                                                    </span>
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography
                                                    style={{
                                                        marginTop: "4px",
                                                    }}>
                                                    {" "}
                                                    Total:{" "}
                                                    <span
                                                        style={{
                                                            float: "right",
                                                        }}>
                                                        ${order.totalPrice + 40}
                                                    </span>
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                </List>
                            </Card>
                        </Grid>
                    </Grid>
                )}
            </Container>
        </>
    );
}

export default React.memo(OrderPlaced);
