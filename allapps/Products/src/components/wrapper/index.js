import React from "react";
import { Button, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";
import {
    WrapperContainer,
    WrapperContent,
    WrapperDescription,
    WrapperImage,
    WrapperShopButton,
    WrapperTitle,
} from "../../styles/wrapper";
import { useHistory } from "react-router-dom";

export default function Wrapper() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));
    const history = useHistory();

    return (
        <WrapperContainer>
            <WrapperImage src="https://res.cloudinary.com/dlzl3yw0w/image/upload/v1664169748/sfrx54c6uamjqrwpo7xq.webp" />
            <WrapperContent>
                <Typography variant="h6">
                    A new PHILOSOPHY on JEWERLY
                </Typography>
                <WrapperTitle variant="h2">New Bags</WrapperTitle>

                <WrapperDescription variant="subtitle">
                    STRAIGHT FROM OUR ATELIER. DISCOVER OUR LATEST JEWELRY
                    DESIGNS: EARRINGS, RINGS, NECKLACES AND BRACELETS FOR LIFE
                    ON-THE-GO.
                </WrapperDescription>

                <WrapperShopButton
                    color="primary"
                    onClick={() => history.push("/products")}>
                    Shop Now
                </WrapperShopButton>
            </WrapperContent>
        </WrapperContainer>
    );
}
