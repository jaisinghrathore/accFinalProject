import React from "react";
import { Router } from "react-router-dom";
import "../styles/App.css";
import { Container, Typography, Box, Stack } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import theme from "../styles/theme";
import Wrapper from "../components/wrapper";
import Products from "../components/productsList";
import { UIProvider } from "../ui/index";
import Promotions from "../components/promotions/index";
import SearchBox from "../components/search";
import { useEffect } from "react";

function ProductList() {
    useEffect(() => {
        document.title = "React Material UI - Products";
    }, []);
    return (
        <ThemeProvider theme={theme}>
            <Container
                disableGutters
                maxWidth="xl"
                sx={{
                    background: "#fff",
                }}>
                <Stack>
                    <UIProvider>
                        <Box
                            display="flex"
                            justifyContent="center"
                            sx={{ p: 4 }}>
                            <Typography variant="h4">Our Products</Typography>
                        </Box>
                        <Products />
                    </UIProvider>
                </Stack>
            </Container>
        </ThemeProvider>
    );
}

export default React.memo(ProductList);
