import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Typography, Button, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useHistory } from "react-router-dom";

const SlidingCart = ({ cartWidt, hideCart }) => {
    const [showCancel, setShowCancel] = React.useState("none");
    const [init, upda] = React.useState(0);
    const [cartWidth, setcartWidth] = React.useState("0px");
    const [cartItems, setCartItems] = React.useState([]);
    const navigate = useHistory();
    // const { state, dispatch } = contextStore();
    // const { cart } = state;

    // React.useEffect(() => {
    //     setCartItems(cart.cartItems);
    // }, [cart.cartItems]);

    const Showhover = () => {
        setShowCancel("block");
    };

    const HideHover = () => {
        setShowCancel("none");
    };

    const add = () => {
        upda((pre) => pre + 1);
    };

    const substract = () => {
        if (init > 0) {
            upda((pre) => pre - 1);
        }
    };

    const updateCartHandler = (item, quantity) => {
        dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
    };

    const deleteCartHandle = (item) => {
        dispatch({ type: "DELETE_ADD_ITEM", payload: item });
    };

    React.useEffect(() => {
        setcartWidth(cartWidt);
    }, [cartWidt]);

    const changi = (e) => {
        if (e.target.value < 0) {
            alert("Only Positive No.");
        } else {
            upda(e.target.value);
        }
    };

    return (
        <Box
            sx={{
                height: "100vh",
                overflow: "auto",
                width: cartWidth,
                backgroundColor: "white",
                position: "fixed",
                top: "0",
                right: "0",
                zIndex: "200000",
                display: "flex",
                flexDirection: "column",
            }}>
            <Box
                sx={{
                    backgroundColor: "#2F2E2E",
                    flexGrow: 1,
                    display: "grid",
                    placeItems: "center",
                    position: "relative",
                    color: "white",
                }}>
                <ArrowForwardIosIcon
                    onClick={hideCart}
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "30px",
                        transform: "translate(0,-50%)",
                    }}
                />
                <Typography
                    variant="h4"
                    sx={{ color: "white", textAlign: "center" }}>
                    Cart
                </Typography>
            </Box>
            <Box
                onMouseOver={Showhover}
                onMouseOut={HideHover}
                sx={{
                    borderBottom: "1px solid rgba(1,1,1,0.1)",
                    flexGrow: 1,
                    padding: "0 20px 0 30px",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                }}>
                {/* cart Item */}
                {cartItems.map((cartItems) => {
                    return (
                        <Stack
                            direction="row"
                            key={cartItems._id}
                            spacing={2}
                            my={2}>
                            <Box>
                                <img
                                    src={`${cartItems.image}`}
                                    height="80"
                                    width="80"
                                />
                            </Box>
                            <Box>
                                <Typography
                                    variant="p"
                                    sx={{ fontSize: "20px" }}
                                    gutterBottom
                                    component="div">
                                    {cartItems.name}
                                </Typography>
                                <Typography
                                    variant="p"
                                    sx={{ fontSize: "20px" }}
                                    gutterBottom
                                    component="div">
                                    ${cartItems.price}
                                </Typography>
                                {/* Counter */}
                                <Box
                                    sx={{
                                        width: "72px",
                                        height: "24px",
                                        boxShadow: "1px 1px 1px 1px grey",
                                        display: "flex",
                                        padding: "0 0px",
                                    }}>
                                    <AddIcon
                                        onClick={add}
                                        sx={{
                                            flexGrow: "1",
                                            backgroundColor: "rgba(1,1,1,0.1)",
                                        }}
                                    />
                                    <input
                                        id="counter"
                                        type="text"
                                        onChange={changi}
                                        value={cartItems.quantity}
                                        style={{
                                            border: "none",
                                            flexGrow: "1",
                                            minWidth: "23px",
                                            textAlign: "center",
                                        }}></input>
                                    <RemoveIcon
                                        onClick={substract}
                                        sx={{
                                            flexGrow: "1",
                                            backgroundColor: "rgba(1,1,1,0.1)",
                                        }}
                                    />
                                </Box>
                                {/* Counter */}
                            </Box>
                            <Box>
                                <CloseIcon
                                    onClick={() => deleteCartHandle(cartItems)}
                                    sx={{
                                        display: showCancel,
                                        backgroundColor: "rgba(1,1,1,0.1)",
                                    }}
                                />
                            </Box>
                        </Stack>
                    );
                })}

                {/* cart Item */}
            </Box>
            <Box
                sx={{
                    borderBottom: "1px solid rgba(1,1,1,0.1)",
                    flexGrow: 1,
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "0 20px 0 30px",
                }}>
                <Typography
                    variant="p"
                    sx={{ fontSize: "30px" }}
                    gutterBottom
                    component="div">
                    Subtotal
                </Typography>
                <Typography
                    variant="p"
                    sx={{ fontSize: "30px" }}
                    component="div">
                    ${cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                </Typography>
            </Box>
            <Box
                sx={{
                    flexGrow: 1,
                    padding: "0 20px 0 30px",
                    display: "grid",
                    placeItems: "center",
                    marginBottom: "15px",
                }}>
                <Button
                    variant="contained"
                    color="error"
                    fullWidth
                    onClick={() => navigate.push("/cart")}>
                    View Cart
                </Button>
            </Box>
        </Box>
    );
};

export default React.memo(SlidingCart);
