import React from "react";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { AppbarContainer, AppbarHeader, MyList } from "../../styles/appbar";
import SearchIcon from "@mui/icons-material/Search";
import Actions from "./actions";
import { useUIContext } from "../../context/ui/index";
import { Link } from "react-router-dom";

const navLinkStyles = {
    color: "#6F6E6D",
    textDecoration: "none",
    margin: "0 30px",
};

const AppbarDesktop = ({ matches }) => {
    const { setShowSearchBox } = useUIContext();

    return (
        <AppbarContainer>
            <AppbarHeader variant="h4">Glazier.</AppbarHeader>
            <MyList type="row">
                <Link style={navLinkStyles} to="/">
                    <ListItemText primary="Home" />
                </Link>
                <Link style={navLinkStyles} to="/products">
                    <ListItemText primary="Products" />
                </Link>
                <Link style={navLinkStyles} to="/contact">
                    <ListItemText primary="Contact us" />
                </Link>
                <ListItemButton onClick={() => setShowSearchBox(true)}>
                    <ListItemIcon>
                        <SearchIcon />
                    </ListItemIcon>
                </ListItemButton>
            </MyList>
            <Actions matches={matches} />
        </AppbarContainer>
    );
};

export default React.memo(AppbarDesktop);
