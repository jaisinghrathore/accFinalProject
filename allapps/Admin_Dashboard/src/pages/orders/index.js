import React, { useEffect, useContext, useReducer } from "react";
import { Link, useHistory } from "react-router-dom";
import { contextAuthStore } from "../../utils/store";
import DashboardNav from "../../components/DashboardNav";
import {
    CircularProgress,
    Grid,
    List,
    ListItem,
    Typography,
    Container,
    Card,
    Button,
    ListItemText,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from "@mui/material";
import axios from "axios";

function reducer(state, action) {
    switch (action.type) {
        case "FETCH_REQUEST":
            return { ...state, loading: true, error: "" };
        case "FETCH_SUCCESS":
            return {
                ...state,
                loading: false,
                orders: action.payload,
                error: "",
            };
        case "FETCH_FAIL":
            return { ...state, loading: false, error: action.payload };
        default:
            state;
    }
}

const Orders = () => {
    const router = useHistory();
    const { state } = contextAuthStore();
    const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
        loading: true,
        orders: [],
        error: "",
    });

    useEffect(() => {
        async function fetchData() {
            try {
                dispatch({ type: "FETCH_REQUEST" });
                const { data } = await axios.get(
                    `http://localhost:8000/admin/orders`,
                    {
                        headers: {
                            authorization: `Bearer ${state.GlazierToken.token}`,
                        },
                    }
                );
                dispatch({ type: "FETCH_SUCCESS", payload: data });
            } catch (err) {
                dispatch({ type: "FETCH_FAIL", payload: err });
            }
        }
        fetchData();
    }, []);

    const delivered = async (id) => {
        const a = confirm("Confirm");
        if (a) {
            try {
                const { data } = await axios.post(
                    `http://localhost:8000/admin/orders/delivered`,
                    { id },
                    {
                        headers: {
                            authorization: `Bearer ${userInfo.token}`,
                        },
                    }
                );
                if (data) {
                    window.location.reload();
                } else {
                    alert("Not Deleted");
                }
            } catch (err) {
                alert(getError(err));
            }
        }
    };

    //   React.useEffect(() => {
    //       if (!userInfo) {
    //           router.push("/login");
    //       }
    //       if (userInfo?.isAdmin == "false") {
    //           router.push("/");
    //       }
    //   }, [userInfo]);

    return (
        <Container>
            <Grid container spacing={1} mt={3}>
                <Grid item md={3} xs={12}>
                    <DashboardNav />
                </Grid>
                <Grid item md={9} xs={12}>
                    <Card>
                        <List>
                            <ListItem>
                                <Typography component="h3" variant="h4">
                                    Orders
                                </Typography>
                            </ListItem>

                            <ListItem>
                                {loading ? (
                                    <CircularProgress />
                                ) : error ? (
                                    <Typography>{error}</Typography>
                                ) : (
                                    <TableContainer>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>ID</TableCell>
                                                    <TableCell>USER</TableCell>
                                                    <TableCell align="center">
                                                        DATE
                                                    </TableCell>
                                                    <TableCell>TOTAL</TableCell>
                                                    <TableCell>PAID</TableCell>
                                                    <TableCell>
                                                        DELIVERED
                                                    </TableCell>
                                                    <TableCell>
                                                        ACTION
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {orders.map((order) => (
                                                    <TableRow key={order._id}>
                                                        <TableCell>
                                                            {order._id.substring(
                                                                20,
                                                                24
                                                            )}
                                                        </TableCell>
                                                        <TableCell>
                                                            {order.user
                                                                ? order.user
                                                                      .name
                                                                : "DELETED USER"}
                                                        </TableCell>
                                                        <TableCell>
                                                            {order.createdAt}
                                                        </TableCell>
                                                        <TableCell>
                                                            ${order.totalPrice}
                                                        </TableCell>
                                                        <TableCell>
                                                            {order.isPaid
                                                                ? `paid at ${order.paidAt}`
                                                                : "not paid"}
                                                        </TableCell>
                                                        <TableCell>
                                                            {order.isDelivered
                                                                ? `delivered at ${order.deliveredAt}`
                                                                : "not delivered"}
                                                        </TableCell>
                                                        <TableCell>
                                                            <Link
                                                                style={{
                                                                    textDecoration:
                                                                        "none",
                                                                }}
                                                                to={`/orderplaced/${order._id}`}>
                                                                <Button variant="contained">
                                                                    Details
                                                                </Button>
                                                            </Link>
                                                            <Button
                                                                onClick={() =>
                                                                    delivered(
                                                                        order._id
                                                                    )
                                                                }
                                                                variant="contained"
                                                                sx={{
                                                                    backgroundColor:
                                                                        "red",
                                                                }}>
                                                                Delivered
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                )}
                            </ListItem>
                        </List>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default React.memo(Orders);
