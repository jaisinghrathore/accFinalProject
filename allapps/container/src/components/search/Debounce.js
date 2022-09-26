import React from "react";
import { Box, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Debounce = ({ value, closeBox }) => {
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        const data = axios
            .get("http://localhost:8000/admin/products?select=category")
            .then((data) => {
                setData(data.data);
            });
    }, []);

    const navigate = useHistory();
    let category = data.map((val) => val.category.toLowerCase());

    const debouncedItems = [...category].filter((val) => {
        if (val.includes(value) && value.length > 0) {
            return val;
        }
    });

    function navigat(val) {
        navigate.push(`/products?search=${val}`);
        closeBox();
    }

    return (
        <Box
            sx={{
                width: "200px",
                minHeight: "100px",
                maxHeight: "300px",
                position: "absolute",
                top: "130px",
                right: "4px",
                boxShadow: "1px 1px 3px 1px silver",
                borderRadius: "4px",
                backgroundColor: "white",
                display: !value ? "none" : "block",
                overflowY: "auto",
                padding: "0 14px 10px 14px",
            }}>
            {debouncedItems.length > 0 ? (
                debouncedItems.map((val) => {
                    return (
                        <>
                            <Typography
                                variant="p"
                                component="div"
                                sx={{ color: "black", cursor: "pointer" }}
                                mt={3}
                                onClick={() => navigat(val)}>
                                {val}
                            </Typography>
                        </>
                    );
                })
            ) : (
                <Typography
                    variant="p"
                    component="div"
                    sx={{ color: "black", cursor: "pointer" }}
                    mt={3}>
                    No Such Product Exist.
                </Typography>
            )}
        </Box>
    );
};

export default React.memo(Debounce);
