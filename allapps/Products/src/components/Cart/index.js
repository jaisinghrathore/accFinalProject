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
import { Link, useHistory } from "react-router-dom";

function Cart() {
    const { state, dispatch } = contextAuthStore();
    const navigate = useHistory();
    const { cart } = state;
    const { cartItems } = cart;
    return (
        <>
            {cartItems.length === 0 ? (
                <Container
                    maxWidth="md"
                    sx={{
                        height: "19rem",
                        pt: "5rem",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}>
                    <Typography variant="h4">The cart is empty</Typography>
                    <Typography variant="h5" sx={{ color: "#f0c000" }}>
                        <Link to="/" style={{ color: "#f0c000" }}>
                            Go Shopping.
                        </Link>
                    </Typography>
                </Container>
            ) : (
                <>
                    <Container>
                        <Grid
                            container
                            spacing={2}
                            mt={5}
                            style={{ padding: "40px" }}>
                            <Grid item sm={12} md={8}>
                                {/* This is table */}
                                <BasicTable cartData={cartItems} />
                            </Grid>
                            <Grid item sm={12} md={4}>
                                {/* small box */}
                                <Card
                                    variant="outlined"
                                    style={{ marginLeft: "30px" }}>
                                    <List>
                                        <ListItem>
                                            <Grid container>
                                                <Grid item xs={12}>
                                                    <Typography
                                                        variant="h5"
                                                        style={{
                                                            marginBottom: "0px",
                                                        }}>
                                                        Subtotal (
                                                        {cartItems.reduce(
                                                            (a, c) =>
                                                                a + c.quantity,
                                                            0
                                                        )}{" "}
                                                        items):
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography
                                                        variant="h5"
                                                        style={{
                                                            marginTop: "4px",
                                                        }}>
                                                        $
                                                        {cartItems.reduce(
                                                            (a, c) =>
                                                                a +
                                                                c.price *
                                                                    c.quantity,
                                                            0
                                                        )}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </ListItem>
                                        <ListItem>
                                            <Button
                                                onClick={() =>
                                                    navigate.push("/shipping")
                                                }
                                                fullWidth
                                                color="primary"
                                                variant="contained">
                                                CHECK OUT
                                            </Button>
                                        </ListItem>
                                    </List>
                                </Card>
                            </Grid>
                        </Grid>
                    </Container>
                </>
            )}
        </>
    );
}

export default React.memo(Cart); //server side nahi
