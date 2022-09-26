import React from "react";
import { contextAuthStore } from "../../utils/store";
import {
    Typography,
    Button,
    Card,
    ListItem,
    List,
    Grid,
    Container,
} from "@mui/material";
import BasicTable from "../../utils/CartTable";
import CheckoutWizard from "../../utils/CheckoutWizard";
import CircularProgress from "@mui/material/CircularProgress";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

function PlaceOrder() {
    const { state, dispatch } = contextAuthStore();
    const router = useHistory();
    const {
        GlazierToken,
        cart: { shippingAddress, cartItems },
    } = state;
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        if (cartItems.length === 0) {
            router.push("/products");
        }

        if (!shippingAddress.address) {
            router.push("/shipping");
        }
    }, []);

    React.useEffect(() => {
        if (!GlazierToken?._id) {
            router.push("/auth");
        }
    }, [state.GlazierToken]);

    const shippingPrice = 40;
    const totalPrice = cartItems.reduce(
        (acc, caa) => acc + caa.price * caa.quantity,
        0
    );

    const placeOrderHandler = async () => {
        const a = window.confirm("Are you sure you want to order this?");
        if (!a) return;
        try {
            setLoading(true);
            const val = await axios.post(
                "http://localhost:8000/admin/send_order",
                {
                    user: GlazierToken._id,
                    orderItems: cartItems,
                    shippingAddress,
                    paymentMethod: "cash",
                    shippingPrice,
                    taxPrice: "0",
                    totalPrice,
                },
                {
                    headers: {
                        authorization: `Bearer ${GlazierToken.token}`,
                    },
                }
            );
            setLoading(false);

            dispatch({ type: "CLEAR_CART" });
            Cookies.remove("cartItems");
            router.push(`/orderplaced/${val?.data.id}`);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Container>
                <Grid mt={5}>
                    <CheckoutWizard activeStep={3} mt={3} />
                </Grid>

                <Grid container spacing={2} style={{ padding: "40px" }}>
                    <Grid item sm={12} md={8}>
                        {/*Shipping*/}
                        <Card
                            variant="outlined"
                            style={{ marginBottom: "20px" }}>
                            <List>
                                <ListItem>
                                    <h2
                                        style={{
                                            padding: "0 0 0 4px",
                                            margin: " 4px 0 4px 0",
                                        }}>
                                        Shipping Address
                                    </h2>
                                </ListItem>

                                <ListItem>
                                    {shippingAddress.fullName},{" "}
                                    {shippingAddress.address},{" "}
                                    {shippingAddress.city},{" "}
                                    {shippingAddress.postalcode},{" "}
                                    {shippingAddress.landmark}.
                                </ListItem>
                            </List>
                        </Card>

                        {/*Payment Method*/}
                        <Card
                            variant="outlined"
                            style={{ marginBottom: "20px" }}>
                            <List>
                                <ListItem>
                                    <h2
                                        style={{
                                            padding: "0 0 0 4px",
                                            margin: " 4px 0 4px 0",
                                        }}>
                                        Payment Method
                                    </h2>
                                </ListItem>

                                <ListItem>Cash.</ListItem>
                            </List>
                        </Card>

                        {/* This is table */}
                        <Card
                            variant="outlined"
                            style={{ marginBottom: "20px" }}>
                            <BasicTable cartData={cartItems} />
                        </Card>
                    </Grid>
                    <Grid item sm={12} md={4}>
                        {/* small box */}
                        <Card variant="outlined" style={{ marginLeft: "30px" }}>
                            <List>
                                <ListItem>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Typography
                                                variant="h5"
                                                style={{
                                                    margin: "14px 0 20px 0",
                                                }}>
                                                Order Summary
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography
                                                style={{ marginTop: "4px" }}>
                                                {" "}
                                                Items:{" "}
                                                <span
                                                    style={{ float: "right" }}>
                                                    ${totalPrice}
                                                </span>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography
                                                style={{ marginTop: "4px" }}>
                                                {" "}
                                                Tax:{" "}
                                                <span
                                                    style={{ float: "right" }}>
                                                    $0
                                                </span>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography
                                                style={{ marginTop: "4px" }}>
                                                {" "}
                                                Shipping:{" "}
                                                <span
                                                    style={{ float: "right" }}>
                                                    ${shippingPrice}
                                                </span>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography
                                                style={{ marginTop: "4px" }}>
                                                {" "}
                                                Total:{" "}
                                                <span
                                                    style={{ float: "right" }}>
                                                    $
                                                    {totalPrice + shippingPrice}
                                                </span>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <ListItem>
                                    <Button
                                        onClick={placeOrderHandler}
                                        fullWidth
                                        color="primary"
                                        variant="contained">
                                        PLACE ORDER
                                    </Button>
                                </ListItem>
                                {loading && (
                                    <ListItem>
                                        <CircularProgress />
                                    </ListItem>
                                )}
                            </List>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default React.memo(PlaceOrder);
