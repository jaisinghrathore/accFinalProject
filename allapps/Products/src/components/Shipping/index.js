import {
    List,
    ListItem,
    Typography,
    TextField,
    Button,
    Grid,
    Stack,
    Container,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import React, { useEffect } from "react";
import { contextAuthStore } from "../../utils/store";
import Cookies from "js-cookie";
import { Controller, useForm } from "react-hook-form";
import CheckoutWizard from "../../utils/CheckoutWizard";

export default function Shipping() {
    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
    } = useForm();
    const router = useHistory();
    const { state, dispatch } = contextAuthStore();
    const {
        GlazierToken: userInfo,
        cart: { shippingAddress, cartItems },
    } = state;

    // useEffect(() => {
    //     if (!userInfo) {
    //         router.push("/auth?redirect=/shipping");
    //     }
    // }, [userInfo]);

    useEffect(() => {
        if (cartItems.length === 0) {
            router.push("/products");
        }

        setValue("fullName", shippingAddress.fullName);
        setValue("address", shippingAddress.address);
        setValue("city", shippingAddress.city);
        setValue("postalcode", shippingAddress.postalcode);
        setValue("landmark", shippingAddress.landmark);
    }, []);

    const submitHandler = ({
        fullName,
        address,
        city,
        postalcode,
        landmark,
    }) => {
        dispatch({
            type: "SAVE_SHIPPING_ADDRESS",
            payload: { fullName, address, city, postalcode, landmark },
        });
        Cookies.set(
            "shippingAddress",
            JSON.stringify({ fullName, address, city, postalcode, landmark })
        );
        router.push("/placeOrder");
    };

    return (
        <>
            <Container>
                <Grid sx={{ marginTop: "50px" }}>
                    <CheckoutWizard activeStep={1} />
                </Grid>

                <form onSubmit={handleSubmit(submitHandler)}>
                    <List>
                        <ListItem>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                sx={{ width: "100%" }}>
                                <Typography
                                    sx={{ color: "#67645E" }}
                                    component="h5"
                                    variant="h5"
                                    mt={1}>
                                    Shipping Address
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ color: "red" }}
                                    mt={1}>
                                    * Order will be COD.
                                </Typography>
                            </Stack>
                        </ListItem>
                        <ListItem>
                            <Controller
                                name="fullName"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: true,
                                    minLength: 2,
                                }}
                                render={({ field }) => (
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        id="fullName"
                                        label="Full Name"
                                        error={Boolean(errors.fullName)}
                                        helperText={
                                            errors.fullName
                                                ? errors.fullName.type ===
                                                  "minLength"
                                                    ? "Full Name length is more than 1"
                                                    : "Full Name is required"
                                                : ""
                                        }
                                        {...field}></TextField>
                                )}></Controller>
                        </ListItem>

                        <ListItem>
                            <Controller
                                name="address"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: true,
                                    minLength: 2,
                                }}
                                render={({ field }) => (
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        id="address"
                                        label="Address"
                                        error={Boolean(errors.address)}
                                        helperText={
                                            errors.address
                                                ? errors.address.type ===
                                                  "minLength"
                                                    ? "Address length is more than 1"
                                                    : "Address is required"
                                                : ""
                                        }
                                        {...field}></TextField>
                                )}></Controller>
                        </ListItem>

                        <ListItem>
                            <Controller
                                name="city"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: true,
                                    minLength: 2,
                                }}
                                render={({ field }) => (
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        id="city"
                                        label="City"
                                        error={Boolean(errors.city)}
                                        helperText={
                                            errors.city
                                                ? errors.city.type ===
                                                  "minLength"
                                                    ? "City length is more than 1"
                                                    : "City is required"
                                                : ""
                                        }
                                        {...field}></TextField>
                                )}></Controller>
                        </ListItem>

                        <ListItem>
                            <Controller
                                name="postalcode"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: true,
                                    minLength: 2,
                                }}
                                render={({ field }) => (
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        id="postalcode"
                                        label="Postalcode"
                                        error={Boolean(errors.postalcode)}
                                        helperText={
                                            errors.postalcode
                                                ? errors.postalcode.type ===
                                                  "minLength"
                                                    ? "postalcode length is more than 1"
                                                    : "postalcode is required"
                                                : ""
                                        }
                                        {...field}></TextField>
                                )}></Controller>
                        </ListItem>

                        <ListItem>
                            <Controller
                                name="landmark"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: true,
                                    minLength: 2,
                                }}
                                render={({ field }) => (
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        id="landmark"
                                        label="Landmark"
                                        error={Boolean(errors.landmark)}
                                        helperText={
                                            errors.landmark
                                                ? errors.landmark.type ===
                                                  "minLength"
                                                    ? "Landmark length is more than 1"
                                                    : "Landmark is required"
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
                                style={{ backgroundColor: "#67645E" }}>
                                Proceed
                            </Button>
                        </ListItem>
                    </List>
                </form>
            </Container>
        </>
    );
}
