import React from "react";
import Routers from "./utils/Routers";
import { Router } from "react-router-dom";
import "./styles/App.css";
import { Container, Typography, Box, Stack } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import theme from "./styles/theme";
import Wrapper from "./components/wrapper";
import Products from "./components/products";
import { UIProvider } from "./ui/index";
import Promotions from "./components/promotions";
import SearchBox from "./components/search";
import { useEffect } from "react";

function App({ history }) {
    useEffect(() => {
        document.title = "React Material UI - Home";
    }, []);
    return (
        <Router history={history}>
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
                                <Typography variant="h4">
                                    Our Products
                                </Typography>
                            </Box>
                            <Products />
                        </UIProvider>
                    </Stack>
                </Container>
            </ThemeProvider>
        </Router>
    );
}

export default App;
