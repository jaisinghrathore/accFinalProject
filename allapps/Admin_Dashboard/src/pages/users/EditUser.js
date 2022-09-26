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
    Container,
    CircularProgress,
    Checkbox,
    FormControlLabel,
} from "@mui/material";
import DashboardNav from "../../components/DashboardNav";
import { Controller, useForm } from "react-hook-form";
import { contextAuthStore } from "../../utils/store";

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

function UserEdit() {
    const location = useLocation();
    const { state } = contextAuthStore();

    const userId = location.pathname.split("/")[3];

    const [{ loading, error, loadingUpdate }, dispatch] = useReducer(reducer, {
        loading: true,
        error: "",
    });
    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
    } = useForm();
    const [isAdmin, setIsAdmin] = useState(false);
    const router = useHistory();

    useEffect(() => {
        //   if (!state.GlazierToken) {
        //       return router.push("/login");
        //   } else {
        const fetchData = async () => {
            try {
                dispatch({ type: "FETCH_REQUEST" });
                const { data } = await axios.get(
                    `http://localhost:8000/user/${userId}`,
                    {
                        headers: {
                            authorization: `Bearer ${state.GlazierToken.token}`,
                        },
                    }
                );
                setIsAdmin(data.isAdmin ? true : false);
                dispatch({ type: "FETCH_SUCCESS" });
                setValue("name", data.username);
            } catch (err) {
                dispatch({ type: "FETCH_FAIL", payload: err });
            }
        };
        fetchData();
        //   }
    }, []);

    // useEffect(() => {}, []);
    // if (!state.GlazierToken) {
    //     return router.push("/auth/login");
    // } else {

    // React.useEffect(() => {
    //     if (!state.GlazierToken) {
    //         router.push("/login");
    //     }
    //     if (state.GlazierToken?.isAdmin == "false") {
    //         router.push("/");
    //     }
    // }, [state.GlazierToken]);

    const submitHandler = async ({ name }) => {
        try {
            dispatch({ type: "UPDATE_REQUEST" });
            await axios.put(
                `http://localhost:8000/registration/register/${userId}`,
                {
                    username: name,
                    isAdmin,
                },
                {
                    headers: {
                        authorization: `Bearer ${state.GlazierToken.token}`,
                    },
                }
            );
            dispatch({ type: "UPDATE_SUCCESS" });
            alert("User updated successfully");
            router.push("/admin/users");
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
                                    Edit User: {userId}
                                </Typography>
                            </ListItem>
                            <ListItem>
                                {loading && (
                                    <CircularProgress></CircularProgress>
                                )}
                                {error && <Typography>{error}</Typography>}
                            </ListItem>
                            <ListItem>
                                <form
                                    style={{ width: "100%" }}
                                    onSubmit={handleSubmit(submitHandler)}>
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
                                            <FormControlLabel
                                                label="Is Admin"
                                                control={
                                                    <Checkbox
                                                        onClick={(e) =>
                                                            setIsAdmin(
                                                                e.target.checked
                                                            )
                                                        }
                                                        checked={isAdmin}
                                                        name="isAdmin"
                                                    />
                                                }></FormControlLabel>
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

export default React.memo(UserEdit);
