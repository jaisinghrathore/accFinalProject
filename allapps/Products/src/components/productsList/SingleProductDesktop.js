import React, { useEffect, useState } from "react";
import {
    ExtraActionsWrapper,
    Product,
    ProductActionButton,
    ProductActionsWrapper,
    ProductAddToCart,
    ProductFavButton,
    ProductImage,
    ProductMetaWrapper,
} from "../../styles/product";
import { Stack, Tooltip, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import FitScreenIcon from "@mui/icons-material/FitScreen";
import useDialogModal from "../../hooks/useDialogModal";
import ProductDetail from "../productdetail";
import { contextAuthStore } from "../../utils/store";
import ProductMeta from "./ProductMeta";
import { useHistory } from "react-router-dom";

export default function SingleProductDesktop({ product, matches }) {
    const [ProductDetailDialog, showProductDetailDialog, closeProductDialog] =
        useDialogModal(ProductDetail);

    const [showOptions, setShowOptions] = useState(false);
    const { state, dispatch } = contextAuthStore();
    const history = useHistory();

    const addToCart = () => {
        const existItem = state.cart.cartItems.find(
            (x) => x._id === product._id
        );
        const quantity = existItem ? existItem.quantity + 1 : 1;
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

    const handleMouseEnter = () => {
        setShowOptions(true);
    };
    const handleMouseLeave = () => {
        setShowOptions(false);
    };
    return (
        <>
            <Product
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                <ProductImage src={product.image} />
                <ProductFavButton isfav={0}>
                    <FavoriteIcon />
                </ProductFavButton>
                {(showOptions || matches) && (
                    <ProductAddToCart
                        onClick={addToCart}
                        show={showOptions}
                        variant="contained">
                        Add to cart
                    </ProductAddToCart>
                )}
                <ProductActionsWrapper show={showOptions || matches}>
                    <Stack direction={matches ? "row" : "column"}>
                        <ProductActionButton>
                            <Tooltip
                                placement="left"
                                title="share this product">
                                <ShareIcon color="primary" />
                            </Tooltip>
                        </ProductActionButton>
                        <ProductActionButton
                            onClick={() => showProductDetailDialog()}>
                            <Tooltip placement="left" title="Full view">
                                <FitScreenIcon color="primary" />
                            </Tooltip>
                        </ProductActionButton>
                    </Stack>
                </ProductActionsWrapper>
            </Product>
            <ProductMeta product={product} />
            <ProductDetailDialog product={product} />
        </>
    );
}
