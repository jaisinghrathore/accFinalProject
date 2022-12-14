import React from "react";
import "../styles/App.css";
import { Container, Typography, Box, Stack } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import theme from "../styles/theme";
import Wrapper from "../components/wrapper";
import Products from "../components/products";
import { UIProvider } from "../ui/index";
import Promotions from "../components/promotions/index";
import SearchBox from "../components/search";
import { useEffect } from "react";

function Home({ history }) {
    useEffect(() => {
        document.title = "React Material UI - Home";
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
                        <Wrapper />
                        <Promotions />
                        <SearchBox />
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

export default Home;
