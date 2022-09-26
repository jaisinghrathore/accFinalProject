import axios from "axios";
import { Link, useLocation, useHistory } from "react-router-dom";

import React, { useEffect, useContext, useReducer, useState } from "react";
import {
    Grid,
    List,
    ListItem,
    Typography,
    Card,
    Button,
    ListItemText,
    TextField,
    CircularProgress,
    Container,
} from "@mui/material";
import DashboardNav from "../../components/DashboardNav";
import { contextAuthStore } from "../../utils/store";
import { Controller, useForm } from "react-hook-form";

function reducer(state, action) {
    switch (action.type) {
        case "FETCH_REQUEST":
            return { ...state, loading: true, error: "" };
        case "FETCH_SUCCESS":
            return { ...state, loading: false, error: "" };
        case "FETCH_FAIL":
            return { ...state, loading: false, error: action.payload };
        case "UPDATE_REQUEST":
            return { ...state, loadingUpdate: true, errorUpdate: "" };
        case "UPDATE_SUCCESS":
            return { ...state, loadingUpdate: false, errorUpdate: "" };
        case "UPDATE_FAIL":
            return {
                ...state,
                loadingUpdate: false,
                errorUpdate: action.payload,
            };
        case "UPLOAD_REQUEST":
            return { ...state, loadingUpload: true, errorUpload: "" };
        case "UPLOAD_SUCCESS":
            return {
                ...state,
                loadingUpload: false,
                errorUpload: "",
            };
        case "UPLOAD_FAIL":
            return {
                ...state,
                loadingUpload: false,
                errorUpload: action.payload,
            };

        default:
            return state;
    }
}
function ProductEdit() {
    const location = useLocation();
    const { state } = contextAuthStore();

    const productId = location.pathname.split("/")[3];

    const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
        useReducer(reducer, {
            loading: true,
            error: "",
        });
    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
    } = useForm();
    const router = useHistory();

    useEffect(() => {
        if (!state.GlazierToken) {
            return router.push("/login");
        } else {
            const fetchData = async () => {
                try {
                    dispatch({ type: "FETCH_REQUEST" });
                    const { data } = await axios.get(
                        `http://localhost:8000/admin/products/${productId}`,
                        {
                            headers: {
                                authorization: `Bearer ${state.GlazierToken.token}`,
                            },
                        }
                    );

                    dispatch({ type: "FETCH_SUCCESS" });
                    setValue("name", data.name);

                    setValue("price", data.price);
                    setValue("image", data.image);
                    setValue("featuredImage", data.featuredImage);
                    setValue("category", data.category);

                    setValue("countInStock", data.countInStock);
                    setValue("description", data.description);
                } catch (err) {
                    dispatch({ type: "FETCH_FAIL", payload: getError(err) });
                }
            };
            fetchData();
        }
    }, []);

    const uploadHandler = async (e, imageField = "image") => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append("file", file);
        try {
            dispatch({ type: "UPLOAD_REQUEST" });
            const { data } = await axios.post(
                "http://localhost:8000/admin/upload",
                bodyFormData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        authorization: `Bearer ${state.GlazierToken.token}`,
                    },
                }
            );
            dispatch({ type: "UPLOAD_SUCCESS" });
            setValue(imageField, data.secure_url);
            alert("File uploaded successfully");
        } catch (err) {
            dispatch({ type: "UPLOAD_FAIL", payload: getError(err) });
            alert(getError(err));
        }
    };

    const submitHandler = async ({
        name,
        price,
        category,
        image,
        countInStock,
        description,
    }) => {
        try {
            dispatch({ type: "UPDATE_REQUEST" });
            await axios.put(
                `http://localhost:8000/admin/update_products/${productId}`,
                {
                    name,
                    price,
                    category,
                    image,
                    countInStock,
                    description,
                },
                {
                    headers: {
                        authorization: `Bearer ${state.GlazierToken.token}`,
                    },
                }
            );
            dispatch({ type: "UPDATE_SUCCESS" });
            alert("Product updated successfully");
            router.push("/admin/products");
        } catch (err) {
            dispatch({ type: "UPDATE_FAIL", payload: getError(err) });
            alert(getError(err));
        }
    };

    return (
        <Container>
            <Grid container spacing={1}>
                <Grid item md={3} xs={12}>
                    <DashboardNav />
                </Grid>
                <Grid item md={9} xs={12}>
                    <Card>
                        <List>
                            <ListItem>
                                <Typography component="h3" variant="h5">
                                    Edit Product {productId}
                                </Typography>
                            </ListItem>
                            <ListItem>
                                {loading && (
                                    <CircularProgress></CircularProgress>
                                )}
                                {error && <Typography>{error}</Typography>}
                            </ListItem>
                            <ListItem sx={{ display: "block" }}>
                                <form onSubmit={handleSubmit(submitHandler)}>
                                    <List>
                                        <ListItem>
                                            <Controller
                                                name="name"
                                                control={control}
                                                defaultValue=""
                                                rules={{
                                                    required: true,
                                                }}
                                                render={({ field }) => (
                                                    <TextField
                                                        variant="outlined"
                                                        fullWidth
                                                        id="name"
                                                        label="Name"
                                                        error={Boolean(
                                                            errors.name
                                                        )}
                                                        helperText={
                                                            errors.name
                                                                ? "Name is required"
                                                                : ""
                                                        }
                                                        {...field}></TextField>
                                                )}></Controller>
                                        </ListItem>

                                        <ListItem>
                                            <Controller
                                                name="price"
                                                control={control}
                                                defaultValue=""
                                                rules={{
                                                    required: true,
                                                }}
                                                render={({ field }) => (
                                                    <TextField
                                                        variant="outlined"
                                                        fullWidth
                                                        id="price"
                                                        label="Price"
                                                        error={Boolean(
                                                            errors.price
                                                        )}
                                                        helperText={
                                                            errors.price
                                                                ? "Price is required"
                                                                : ""
                                                        }
                                                        {...field}></TextField>
                                                )}></Controller>
                                        </ListItem>
                                        <ListItem>
                                            <Controller
                                                name="image"
                                                control={control}
                                                defaultValue=""
                                                rules={{
                                                    required: true,
                                                }}
                                                render={({ field }) => (
                                                    <TextField
                                                        variant="outlined"
                                                        fullWidth
                                                        id="image"
                                                        label="Image"
                                                        error={Boolean(
                                                            errors.image
                                                        )}
                                                        helperText={
                                                            errors.image
                                                                ? "Image is required"
                                                                : ""
                                                        }
                                                        {...field}></TextField>
                                                )}></Controller>
                                        </ListItem>
                                        <ListItem>
                                            <Button
                                                variant="contained"
                                                component="label">
                                                Upload File
                                                <input
                                                    type="file"
                                                    onChange={uploadHandler}
                                                    hidden
                                                />
                                            </Button>
                                            {loadingUpload && (
                                                <CircularProgress />
                                            )}
                                        </ListItem>

                                        <ListItem>
                                            <Controller
                                                name="category"
                                                control={control}
                                                defaultValue=""
                                                rules={{
                                                    required: true,
                                                }}
                                                render={({ field }) => (
                                                    <TextField
                                                        variant="outlined"
                                                        fullWidth
                                                        id="category"
                                                        label="Category"
                                                        error={Boolean(
                                                            errors.category
                                                        )}
                                                        helperText={
                                                            errors.category
                                                                ? "Category is required"
                                                                : ""
                                                        }
                                                        {...field}></TextField>
                                                )}></Controller>
                                        </ListItem>

                                        <ListItem>
                                            <Controller
                                                name="countInStock"
                                                control={control}
                                                defaultValue=""
                                                rules={{
                                                    required: true,
                                                }}
                                                render={({ field }) => (
                                                    <TextField
                                                        variant="outlined"
                                                        fullWidth
                                                        id="countInStock"
                                                        label="Count in stock"
                                                        error={Boolean(
                                                            errors.countInStock
                                                        )}
                                                        helperText={
                                                            errors.countInStock
                                                                ? "Count in stock is required"
                                                                : ""
                                                        }
                                                        {...field}></TextField>
                                                )}></Controller>
                                        </ListItem>
                                        <ListItem>
                                            <Controller
                                                name="description"
                                                control={control}
                                                defaultValue=""
                                                rules={{
                                                    required: true,
                                                }}
                                                render={({ field }) => (
                                                    <TextField
                                                        variant="outlined"
                                                        fullWidth
                                                        multiline
                                                        id="description"
                                                        label="Description"
                                                        error={Boolean(
                                                            errors.description
                                                        )}
                                                        helperText={
                                                            errors.description
                                                                ? "Description is required"
                                                                : ""
                                                        }
                                                        {...field}></TextField>
                                                )}></Controller>
                                        </ListItem>

                                        <ListItem>
                                            <Button
                                                variant="contained"
                                                type="submit"
                                                fullWidth
                                                color="primary">
                                                Update
                                            </Button>
                                            {loadingUpdate && (
                                                <CircularProgress />
                                            )}
                                        </ListItem>
                                    </List>
                                </form>
                            </ListItem>
                        </List>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}

export default React.memo(ProductEdit);
