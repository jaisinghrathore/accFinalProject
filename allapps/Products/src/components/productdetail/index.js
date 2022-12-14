import {
    Dialog,
    DialogTitle,
    Slide,
    Box,
    IconButton,
    DialogContent,
    Typography,
    Button,
    Stack,
} from "@mui/material";
import React, { useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Colors } from "../../styles/theme";
import styled from "@emotion/styled";
import { Product, ProductImage } from "../../styles/product";
import IncDec from "../ui/incdec";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { contextAuthStore } from "../../utils/store";
import { useHistory } from "react-router-dom";

function SlideTransition(props) {
    return <Slide direction="down" {...props} />;
}

const ProductDetailWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    padding: theme.spacing(4),
}));

const ProductDetailInfoWrapper = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    maxWidth: 500,
    lineHeight: 1.5,
}));

export default function ProductDetail({ open, onClose, product }) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));
    const [value, setValue] = React.useState(1);

    const getQuantity = (e) => {
        setValue(e);
    };

    const { state, dispatch } = contextAuthStore();
    const history = useHistory();

    const addToCart = () => {
        const existItem = state.cart.cartItems.find(
            (x) => x._id === product._id
        );
        const quantity = existItem ? existItem.quantity + 1 : value;
        if (product?.countInStock < quantity) {
            alert("Product out of Stock.");
            return;
        }

        dispatch({
            type: "ADD_TO_CART",
            payload: { ...product, quantity },
        });
        history.push("/cart");
    };

    return (
        <Dialog
            TransitionComponent={SlideTransition}
            variant="permanant"
            open={open}
            fullScreen>
            <DialogTitle
                sx={{
                    background: Colors.secondary,
                }}>
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent={"space-between"}>
                    {product.name.toUpperCase()}
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent>
                <ProductDetailWrapper
                    display={"flex"}
                    flexDirection={matches ? "column" : "row"}>
                    <Product sx={{ mr: 4 }}>
                        <ProductImage src={product.image} />
                    </Product>
                    <ProductDetailInfoWrapper>
                        <Typography variant="subtitle">
                            SKU: {product._id.slice(-6)}
                        </Typography>
                        <Typography variant="subtitle">
                            Availability: {product.countInStock} in stock
                        </Typography>
                        <Typography sx={{ lineHeight: 2 }} variant="h4">
                            {product.category}
                        </Typography>
                        <Typography variant="body">
                            {product.description}
                        </Typography>
                        <Box
                            sx={{ mt: 4 }}
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between">
                            <IncDec getQuantity={getQuantity} />
                            <Button variant="contained" onClick={addToCart}>
                                Add to Cart
                            </Button>
                        </Box>
                        <Box
                            display="flex"
                            alignItems="center"
                            sx={{ mt: 4, color: Colors.light }}>
                            <FavoriteIcon sx={{ mr: 2 }} />
                            Add to wishlist
                        </Box>
                        <Box
                            sx={{
                                mt: 4,
                                color: Colors.dove_gray,
                            }}>
                            <FacebookIcon />
                            <TwitterIcon sx={{ pl: 2 }} />
                            <InstagramIcon sx={{ pl: 2 }} />
                        </Box>
                    </ProductDetailInfoWrapper>
                </ProductDetailWrapper>
            </DialogContent>
        </Dialog>
    );
}
