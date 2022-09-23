import React from "react";
import { Box, Paper, Container } from "@mui/material";
import { useHistory } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import SlidingCart from "../components/SlidingCart";
import Appbar from "../components/appbar";
import Footer from "../components/footer";

const items = [
    {
        image: "https://images.unsplash.com/photo-1500964757637-c85e8a162699?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzh8fGxhbmRzY2FwZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60",
    },
    {
        image: "https://images.unsplash.com/photo-1434725039720-aaad6dd32dfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bGFuZHNjYXBlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
    },
];

const Layout = ({ children }) => {
    const navigate = useHistory();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [cartWidth, setcartWidth] = React.useState("");
    const [email, setEmail] = React.useState("jairqthore");
    const [cartNumber, setCartNumber] = React.useState(10);

    const OpenCart = () => {
        setcartWidth("340px");
    };

    const hideCart = () => {
        setcartWidth("0px");
    };

    function signOut() {}

    const isAdmin = true;

    React.useEffect(() => {
        window.scrollTo(0, 500);
    }, []);

    return (
        <>
            <Box>
                <Appbar />
                <SlidingCart hideCart={hideCart} cartWidt={cartWidth} />
                <Container>
                    <Carousel
                        sx={{ mt: 4, borderRadius: "6px" }}
                        autoPlay
                        animation="slide"
                        IndicatorIcon={<></>}
                        interval={3000}>
                        {items.map((item, i) => (
                            <Paper key={i}>
                                <img
                                    height="340"
                                    width="100%"
                                    src={item.image}
                                />
                            </Paper>
                        ))}
                    </Carousel>
                    {/* All Pages */}
                    {children}
                </Container>
                <Footer />
            </Box>
        </>
    );
};

export default React.memo(Layout);
