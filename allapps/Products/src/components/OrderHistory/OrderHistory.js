import React from "react";
import {
    Card,
    Grid,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    Button,
    TableRow,
    Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { contextAuthStore } from "../../utils/store";

import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

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

function OrderHistory() {
    const { state } = contextAuthStore();

    const router = useHistory();

    const [{ loading, error, order }, dispatch] = React.useReducer(reducer, {
        loading: true,
        order: {},
        error: "",
    });
    React.useEffect(() => {
        if (!state?.GlazierToken?._id) {
            router.push("/login");
        }
    }, [state.GlazierToken]);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({ type: "FETCH_REQUEST" });
                const { data } = await axios.get(
                    "http://localhost:8000/admin/orders/history",
                    {
                        headers: {
                            authorization: `Bearer ${state.GlazierToken.token}`,
                        },
                    }
                );
                dispatch({ type: "FETCH_SUCCESS", payload: data });
            } catch (err) {
                dispatch({ type: "FETCH_ERROR", payload: getError(err) });
                enqueueSnackbar(
                    err.response.data ? err.response.data.message : err.message,
                    { variant: "error" }
                );
            }
        };
        fetchData();
    }, []);

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        "&:nth-of-type(even)": {
            backgroundColor: theme.palette.action.hover,
        },
    }));

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    return (
        <>
            <Grid container spacing={1} style={{ padding: "30px 0 0 0" }}>
                <Grid
                    item
                    sm={4}
                    style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Card style={{ width: "300px", alignSelf: "start" }}>
                        <TableContainer>
                            <Table
                                aria-label="customized table"
                                style={{ width: "300px" }}>
                                <TableBody>
                                    <StyledTableRow>
                                        <StyledTableCell
                                            onClick={() =>
                                                router.push("/auth/profile")
                                            }
                                            style={{ cursor: "pointer" }}
                                            align="left">
                                            User Profile
                                        </StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow>
                                        <StyledTableCell
                                            onClick={() =>
                                                router.push("/order-history")
                                            }
                                            style={{ cursor: "pointer" }}
                                            align="left">
                                            Order History
                                        </StyledTableCell>
                                    </StyledTableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Card>
                </Grid>
                <Grid item sm={8}>
                    {loading ? (
                        <CircularProgress />
                    ) : error ? (
                        <Typography>{error}</Typography>
                    ) : (
                        <Card
                            style={{
                                padding: "10px 15px 15px 15px",
                                height: "400px",
                                overflow: "auto",
                            }}>
                            <Typography
                                component="h3"
                                variant="h5"
                                style={{
                                    padding: "0 0 10px 30px",
                                    marginBottom: "0",
                                }}>
                                Order History
                            </Typography>

                            {/* Table Start */}

                            <TableContainer>
                                <Table
                                    sx={{ minWidth: 650 }}
                                    aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>ID</TableCell>
                                            <TableCell align="right">
                                                DATE
                                            </TableCell>
                                            <TableCell align="right">
                                                TOTAL
                                            </TableCell>
                                            <TableCell align="right">
                                                PAID
                                            </TableCell>
                                            <TableCell align="right">
                                                DELIVERED
                                            </TableCell>
                                            <TableCell align="right">
                                                ACTION
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {order.map((order) => (
                                            <TableRow key={order._id}>
                                                <TableCell
                                                    component="th"
                                                    scope="row">
                                                    {order._id.substring(
                                                        20,
                                                        24
                                                    )}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {order.createdAt}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {order.totalPrice}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {order.isPaid
                                                        ? `paid at ${order.paidAt}`
                                                        : "Not paid"}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {order.isDelivered
                                                        ? `delivered at ${order.deliveredAt}`
                                                        : "Not delivered"}
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Link
                                                        to={`/orderplaced/${order._id}`}>
                                                        <Button variant="contained">
                                                            Details
                                                        </Button>
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Card>
                    )}
                </Grid>
            </Grid>
        </>
    );
}

export default React.memo(OrderHistory);
