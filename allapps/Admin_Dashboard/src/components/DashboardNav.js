import React from "react";
import { Link } from "react-router-dom";
import { List, ListItem, Card, ListItemText } from "@mui/material";

const DashColor = {
    color: "black",
    textDecoration: "none",
};

const DashboardNav = ({ active }) => {
    
    return (
        <Card>
            <List>
                <Link style={DashColor} to="/admin/dashboard">
                    <ListItem button component="a">
                        <ListItemText primary="Admin Dashboard"></ListItemText>
                    </ListItem>
                </Link>
                <Link
                    style={DashColor}
                    to="/admin/orders"
                    {...(active == "orders" ? "selected" : "")}>
                    <ListItem button component="a">
                        <ListItemText primary="Orders"></ListItemText>
                    </ListItem>
                </Link>
                <Link style={DashColor} to="/admin/products">
                    <ListItem button component="a">
                        <ListItemText primary="Products"></ListItemText>
                    </ListItem>
                </Link>
                <Link style={DashColor} to="/admin/users">
                    <ListItem button component="a">
                        <ListItemText primary="Users"></ListItemText>
                    </ListItem>
                </Link>
                <Link style={DashColor} to="/admin/user-query">
                    <ListItem button component="a">
                        <ListItemText primary="User Query"></ListItemText>
                    </ListItem>
                </Link>
            </List>
        </Card>
    );
};

export default React.memo(DashboardNav);
