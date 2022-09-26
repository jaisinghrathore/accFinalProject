import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import React, { useEffect, useContext, useReducer } from "react";
import DashboardNav from "../../components/DashboardNav";
import { contextAuthStore } from "../../utils/store";

import {
    CircularProgress,
    Grid,
    List,
    ListItem,
    Typography,
    Card,
    Button,
    ListItemText,
    Container,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from "@mui/material";

function reducer(state, action) {
    switch (action.type) {
        case "FETCH_REQUEST":
            return { ...state, loading: true, error: "" };
        case "FETCH_SUCCESS":
            return {
                ...state,
                loading: false,
                products: action.payload,
                error: "",
            };
        case "FETCH_FAIL":
            return { ...state, loading: false, error: action.payload };
        case "CREATE_REQUEST":
            return { ...state, loadingCreate: true };
        case "CREATE_SUCCESS":
            return { ...state, loadingCreate: false };
        case "CREATE_FAIL":
            return { ...state, loadingCreate: false };
        case "DELETE_REQUEST":
            return { ...state, loadingDelete: true };
        case "DELETE_SUCCESS":
            return { ...state, loadingDelete: false, successDelete: true };
        case "DELETE_FAIL":
            return { ...state, loadingDelete: false };
        case "DELETE_RESET":
            return { ...state, loadingDelete: false, successDelete: false };
        default:
            state;
    }
}

function AdminProducts() {
    const router = useHistory();
    const { state } = contextAuthStore();

    const [
        {
            loading,
            error,
            products,
            loadingCreate,
            successDelete,
            loadingDelete,
        },
        dispatch,
    ] = useReducer(reducer, {
        loading: false,
        products: [],
        error: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({ type: "FETCH_REQUEST" });
                const { data } = await axios.get(
                    `http://localhost:8000/admin/products`,
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
        };
        if (successDelete) {
            dispatch({ type: "DELETE_RESET" });
        } else {
            fetchData();
        }
    }, [successDelete]);

    const createHandler = async () => {
        if (!window.confirm("Are you sure?")) {
            return;
        }
        try {
            dispatch({ type: "CREATE_REQUEST" });
            const { data } = await axios.post(
                `http://localhost:8000/admin/add_products`,
                {},
                {
                    headers: {
                        authorization: `Bearer ${state.GlazierToken.token}`,
                    },
                }
            );
            dispatch({ type: "CREATE_SUCCESS" });
            alert("Product created successfully");
            router.push(`/admin/product/${data.product._id}`);
        } catch (err) {
            dispatch({ type: "CREATE_FAIL" });
            alert(err);
        }
    };
    const deleteHandler = async (productId) => {
        if (!window.confirm("Are you sure?")) {
            return;
        }
        try {
            dispatch({ type: "DELETE_REQUEST" });
            const data = await axios.delete(
                `http://localhost:8000/admin/delete_products/${productId}`,
                {
                    headers: {
                        authorization: `Bearer ${state.GlazierToken.token}`,
                    },
                }
            );
            dispatch({ type: "DELETE_SUCCESS" });
        } catch (err) {
            dispatch({ type: "DELETE_FAIL" });
            console.log(err);
        }
    };

    // React.useEffect(() => {
    // if (!userInfo) {
    //     router.push("/login");
    // }
    // if (userInfo?.isAdmin == "false") {
    //     router.push("/");
    // }
    // console.log(state.GlazierToken);
    // }, [state.GlazierToken]);

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
                                <Grid container alignItems="center">
                                    <Grid item xs={6}>
                                        <Typography component="h3" variant="h5">
                                            Products
                                        </Typography>
                                        {loadingDelete && <CircularProgress />}
                                    </Grid>
                                    <Grid align="right" item xs={6}>
                                        <Button
                                            onClick={createHandler}
                                            color="primary"
                                            variant="contained">
                                            Create
                                        </Button>
                                        {loadingCreate && <CircularProgress />}
                                    </Grid>
                                </Grid>
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
                                                    <TableCell>NAME</TableCell>
                                                    <TableCell>PRICE</TableCell>
                                                    <TableCell>
                                                        CATEGORY
                                                    </TableCell>
                                                    <TableCell>COUNT</TableCell>
                                                    <TableCell>
                                                        RATING
                                                    </TableCell>
                                                    <TableCell>
                                                        ACTIONS
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {products.map((product) => (
                                                    <TableRow key={product._id}>
                                                        <TableCell>
                                                            {product._id.substring(
                                                                20,
                                                                24
                                                            )}
                                                        </TableCell>
                                                        <TableCell>
                                                            {product.name}
                                                        </TableCell>
                                                        <TableCell>
                                                            ${product.price}
                                                        </TableCell>
                                                        <TableCell>
                                                            {product.category}
                                                        </TableCell>
                                                        <TableCell>
                                                            {
                                                                product.countInStock
                                                            }
                                                        </TableCell>
                                                        <TableCell>
                                                            {product.rating}
                                                        </TableCell>
                                                        <TableCell>
                                                            <Link
                                                                style={{
                                                                    textDecoration:
                                                                        "none",
                                                                }}
                                                                to={`/admin/product/${product._id}`}>
                                                                <Button
                                                                    size="small"
                                                                    variant="contained">
                                                                    Edit
                                                                </Button>
                                                            </Link>
                                                            <Button
                                                                sx={{
                                                                    backgroundColor:
                                                                        "red",
                                                                }}
                                                                onClick={() =>
                                                                    deleteHandler(
                                                                        product._id
                                                                    )
                                                                }
                                                                size="small"
                                                                variant="contained">
                                                                Delete
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
}

export default React.memo(AdminProducts);
