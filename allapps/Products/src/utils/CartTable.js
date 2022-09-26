import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Select,
    MenuItem,
    Typography,
} from "@mui/material";
import { contextAuthStore } from "./store";
import { Link } from "react-router-dom";

function BasicTable({ cartData }) {
    const { state, dispatch } = contextAuthStore();
    const updateCartHandler = (item, quantity) => {
        dispatch({ type: "ADD_TO_CART", payload: { ...item, quantity } });
    };

    const deleteCartHandle = (item) => {
        dispatch({ type: "DELETE_ADD_ITEM", payload: item });
    };

    return (
        <TableContainer component={Paper}>
            <Typography variant="h5" sx={{ padding: "10px" }}>
                Cart Items.
            </Typography>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cartData.map((row) => (
                        <TableRow
                            key={row._id}
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}>
                            <TableCell component="th" scope="row">
                                <Link to={`/product/${row._id}`}>
                                    <img
                                        src={row.image}
                                        alt={row.name}
                                        width={50}
                                        height={50}></img>
                                </Link>
                            </TableCell>
                            <TableCell>{row.category}</TableCell>
                            <TableCell>
                                {/* select */}
                                <Select
                                    value={row.quantity}
                                    onChange={(e) =>
                                        updateCartHandler(row, e.target.value)
                                    }>
                                    {[...Array(row.countInStock).keys()].map(
                                        (x) => (
                                            <MenuItem key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </MenuItem>
                                        )
                                    )}
                                </Select>
                            </TableCell>
                            <TableCell>{row.price}$</TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => deleteCartHandle(row)}>
                                    x
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default React.memo(BasicTable);
