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

function OrderPlaced() {
    const { state } = contextAuthStore();
    const router = useHistory();
    const { GlazierToken: userInfo, order } = state;

    React.useEffect(() => {
        if (!userInfo) {
            router.push("/auth");
        }
    }, [state.GlazierToken]);

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
                <Grid container spacing={2} sx={{ padding: "40px" }}>
                    <Grid item xs={12} sm={12} md={8}>
                        <Typography
                            style={{ textDecoration: "underline" }}
                            component="h5"
                            variant="h5"
                            mb={2}>
                            Order ID: {Math.floor(Math.random() * 2003)}
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
                                    {state.cart.shippingAddress.fullName},{" "}
                                    {state.cart.shippingAddress.address},{" "}
                                    {state.cart.shippingAddress.city},{" "}
                                    {state.cart.shippingAddress.postalcode},{" "}
                                    {state.cart.shippingAddress.landmark}.
                                </ListItem>

                                <ListItem>Status: not delivered</ListItem>
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

                                <ListItem>Cash</ListItem>

                                <ListItem>Status: not paid</ListItem>
                            </List>
                        </Card>

                        {/* This is table */}
                        <Card
                            variant="outlined"
                            style={{ marginBottom: "20px" }}>
                            <BasicTableNotEditable />
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
                                                variant="h5"
                                                style={{
                                                    margin: "4px 0 20px 0",
                                                    fontWeight: "bold",
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
                                                    ${totalPrice}
                                                </span>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography
                                                style={{
                                                    marginTop: "4px",
                                                }}></Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography
                                                style={{
                                                    marginTop: "4px",
                                                }}>
                                                Shipping:
                                                <span
                                                    style={{
                                                        float: "right",
                                                    }}>
                                                    $40
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
                                                    ${totalPrice + 40}
                                                </span>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                            </List>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default React.memo(OrderPlaced);
