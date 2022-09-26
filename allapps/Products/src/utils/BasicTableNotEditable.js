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
import { Link } from "react-router-dom";
import { contextAuthStore } from "./store";

function BasicTableNotEditable({ order }) {
    return (
        <TableContainer component={Paper}>
            <Typography
                variant="body1"
                sx={{
                    padding: "10px 0 0 20px",
                    marginBottom: "4px",
                    fontWeight: "bold",
                }}>
                Order Items
            </Typography>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {order?.orderItems.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}>
                            <TableCell component="th" scope="row">
                                <Link to={`/product/${row.id}`}>
                                    <img
                                        src={row.image}
                                        alt={row.name}
                                        width={50}
                                        height={50}></img>
                                </Link>
                            </TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>
                                {/* select */}
                                <Typography>{row.quantity}</Typography>
                            </TableCell>
                            <TableCell>${row.price}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default React.memo(BasicTableNotEditable);
