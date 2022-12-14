import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Colors } from "../theme";

export const WrapperContainer = styled(Box)(({ matches, theme }) => ({
    display: "flex",
    marginTop: "10px",
    justifyContent: "center",
    width: "90%",
    height: "80%",
    padding: "10px 10px",
    marginLeft: "20px",
    background: Colors.secondary,
    borderRadius: "50px",
    [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "center",
    },
}));

export const WrapperContent = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    maxWidth: 576,
    padding: "30px",
}));

export const WrapperImage = styled("img")(({ src, theme }) => ({
    src: `url(${src})`,
    width: "350px",
    height: "480px",
    borderRadius: "30px",
    [theme.breakpoints.down("md")]: {
        width: "360px",
        height: "350px",
    },
    [theme.breakpoints.down("sm")]: {
        width: "150px",
        height: "150px",
    },
}));

export const WrapperTitle = styled(Typography)(({ matches, theme }) => ({
    lineHeight: 1.5,
    fontSize: "42px",
    marginBottom: "20px",
    fontFamily: "'Roboto', 'sans-serif'",
    fontWeight: "500",
    color: Colors.primary,
    [theme.breakpoints.down("sm")]: {
        fontSize: "42px",
    },
}));

export const WrapperDescription = styled(Typography)(({ theme }) => ({
    lineHeight: 1.25,
    letterSpacing: 1.25,
    marginBottom: "3em",
    [theme.breakpoints.down("md")]: {
        lineHeight: 1.15,
        letterSpacing: 1.15,
        marginBottom: "1.5em",
    },
}));

export const WrapperShopButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== "color",
    name: "MyShopButton",
    slot: "Root",
    overridesResolver: (props, styles) => [
        styles.root,
        props.color === "secondary" && styles.primary,
        props.color === "primary" && styles.secondary,
    ],
})(({ theme }) => ({
    padding: "20px 0px",
    color: Colors.secondary,
    fontWeight: "bold",
    backgroundColor: Colors.primary,
    "&:hover": { backgroundColor: Colors.secondary, color: Colors.primary },
    fontSize: "16px",
    borderRadius: "20px",

    [theme.breakpoints.down("sm")]: {
        padding: "10px 0px",
        fontSize: "14px",
        backgroundColor: Colors.primary,
        "&:hover": { backgroundColor: Colors.secondary, color: Colors.primary },
    },
}));
