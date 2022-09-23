import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Modal, Paper, Button } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useHistory } from "react-router-dom";
import Badge from "@mui/material/Badge";
import Carousel from "react-material-ui-carousel";
import LayoutTypoNav from "../components/LayoutTypo";
import SlidingCart from "../components/SlidingCart";

const items = [
    {
        image: "https://images.unsplash.com/photo-1444080748397-f442aa95c3e5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzN8fGxhbmRzY2FwZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60",
    },
    {
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDl8fGxhbmRzY2FwZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60",
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
                <SlidingCart hideCart={hideCart} cartWidt={cartWidth} />

                <Carousel
                    sx={{ postion: "absolute", top: "0" }}
                    autoPlay
                    animation="slide"
                    IndicatorIcon={<></>}
                    interval={3000}>
                    {items.map((item, i) => (
                        <Paper key={i}>
                            <img height="340" width="100%" src={item.image} />
                        </Paper>
                    ))}
                </Carousel>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        paddingTop: "30px",
                        position: "absolute",
                        top: 0,
                        overflow: "hidden",
                        width: "100%",
                        zIndex: 10,
                        backgroundColor: "red",
                        height: "310px",
                        background: "rgba(89, 97, 249, 0.30)",
                    }}>
                    <Box
                        sx={{
                            width: 75,
                            height: 75,
                            backgroundColor: "black",
                            borderRadius: "50%",
                            display: "grid",
                            placeItems: "center",
                            color: "white",
                            fontSize: "30px",
                            fontWeight: "bold",
                        }}>
                        UA
                    </Box>

                    <Box
                        sx={{
                            height: "1px",
                            backgroundColor: "white",
                            width: "200px",
                            margin: "13px 0 6px 0",
                        }}
                    />

                    <p style={{ color: "white" }}>the urban art store</p>

                    {/* NavBars */}

                    <Box sx={{ margin: "50px 0" }}>
                        <LayoutTypoNav href="/">Home.</LayoutTypoNav>
                        <LayoutTypoNav href="/about">About.</LayoutTypoNav>
                        <LayoutTypoNav href="/artwork">Artworks.</LayoutTypoNav>
                        <LayoutTypoNav href="/contact">Contact.</LayoutTypoNav>
                    </Box>

                    {/* top vala cart */}

                    <Box
                        sx={{
                            zIndex: 1,
                            width: 195,
                            height: 70,
                            backgroundColor: "black",
                            position: "fixed",
                            top: 0,
                            right: 0,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            boxShadow: "-3px 3px 3px 3px rgba(1,1,1,0.1)",
                        }}>
                        <AccountCircleIcon sx={{ color: "white" }} />
                        {/* modal */}
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description">
                            <Box
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    cursor: "pointer",
                                    justifyContent: "space-evenly",
                                    position: "absolute",
                                    top: "10px",
                                    right: "70px",
                                    width: "100px",
                                    minHeight: "110px",
                                    backgroundColor: "white",
                                    border: "none",
                                    outline: "none",
                                    borderRadius: "4px",
                                    padding: "5px",
                                }}>
                                <Typography
                                    className="ProfileItems"
                                    variant="p"
                                    my={1.4}
                                    sx={{
                                        fontSize: "13px",
                                        fontWeight: "bold",
                                    }}
                                    onClick={() => {
                                        handleClose();
                                        navigate.push("/profile");
                                    }}>
                                    Profile
                                </Typography>
                                <Typography
                                    className="ProfileItems"
                                    variant="p"
                                    my={1.4}
                                    sx={{
                                        fontSize: "13px",
                                        fontWeight: "bold",
                                    }}
                                    onClick={() => {
                                        handleClose();
                                        navigate.push("/order-history");
                                    }}>
                                    Order History
                                </Typography>
                                {isAdmin && (
                                    <Typography
                                        className="ProfileItems"
                                        variant="p"
                                        my={1.4}
                                        sx={{
                                            fontSize: "13px",
                                            fontWeight: "bold",
                                        }}
                                        onClick={() => {
                                            handleClose();
                                            navigate.push("/admin/dashboard");
                                        }}>
                                        Admin Dashboard
                                    </Typography>
                                )}
                                {/* {state.userInfo && ( */}
                                <Typography
                                    className="ProfileItems"
                                    variant="p"
                                    my={1.4}
                                    sx={{
                                        fontSize: "13px",
                                        fontWeight: "bold",
                                    }}
                                    onClick={() => {
                                        signOut();
                                        handleClose();
                                    }}>
                                    Logout
                                </Typography>
                                {/* )} */}
                            </Box>
                        </Modal>
                        {email ? (
                            <Typography
                                onClick={handleOpen}
                                variant="p"
                                sx={{
                                    fontSize: "1.2rem",
                                    fontWeight: "bold",
                                    margin: "0 30px",
                                    color: "white",
                                    marginLeft: "6px",
                                    cursor: "pointer",
                                    color: "white",
                                }}>
                                {email.split("@")[0].slice(0, 5)}...
                            </Typography>
                        ) : (
                            <Typography
                                variant="p"
                                sx={{
                                    fontSize: "1.2rem",
                                    fontWeight: "bold",
                                    margin: "0 30px",
                                    color: "white",
                                    marginLeft: "6px",
                                    cursor: "pointer",
                                }}
                                onClick={() => navigate.push("/auth")}>
                                Log In
                            </Typography>
                        )}

                        <Box sx={{ position: "relative", right: "10px" }}>
                            <Badge badgeContent={cartNumber} color="primary">
                                <ShoppingCartIcon
                                    onClick={OpenCart}
                                    sx={{ color: "white" }}
                                />
                            </Badge>
                        </Box>
                    </Box>

                    {/* upper Arrow */}
                    <Box
                        onClick={() => {
                            window.scrollTo(0, 0);
                        }}
                        sx={{
                            width: 80,
                            height: 70,
                            backgroundColor: "black",
                            position: "fixed",
                            bottom: 0,
                            right: 0,
                            display: "flex",
                            zIndex: "1",
                            justifyContent: "center",
                            alignItems: "center",
                            boxShadow: "-3px 3px 3px 3px rgba(1,1,1,0.1)",
                        }}>
                        <ArrowUpwardIcon
                            sx={{ color: "white", fontSize: "44px" }}
                        />
                    </Box>
                </Box>

                {/* All Pages */}
                {children}
            </Box>
        </>
    );
};

export default React.memo(Layout);
