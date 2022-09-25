import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Colors } from "../../styles/theme";
import {
    Divider,
    ListItemButton,
    ListItemIcon,
    Box,
    Badge,
    Typography,
    Modal,
    Paper,
    Button,
} from "@mui/material";
import {
    ActionIconsContainerDesktop,
    ActionIconsContainerMobile,
    MyList,
} from "../../styles/appbar";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../utils/Redux/actions/getUserAction";
import Cookies from "js-cookie";

const Actions = ({ matches }) => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useHistory();
    const userToken = useSelector((state) => state.GlazierToken);
    const dispatch = useDispatch();
    const OpenCart = () => {
        setcartWidth("340px");
    };

    function signOut() {
        dispatch(getUser());
        Cookies.remove("GlazierToken");
        navigate.push("/auth/removeUser");
    }

    const hideCart = () => {
        setcartWidth("0px");
    };

    const Component = matches
        ? ActionIconsContainerMobile
        : ActionIconsContainerDesktop;

    const isAdmin = userToken?.isAdmin;
    const username = userToken?.username;
    return (
        <Component>
            <MyList type="row">
                <ListItemButton
                    sx={{
                        justifyContent: "center",
                    }}>
                    <ListItemIcon
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            color: matches && Colors.secondary,
                        }}>
                        <Box sx={{ position: "relative", right: "10px" }}>
                            <Badge badgeContent="32" color="primary">
                                <ShoppingCartIcon onClick={OpenCart} />
                            </Badge>
                        </Box>
                    </ListItemIcon>
                </ListItemButton>
                <Divider orientation="vertical" flexItem />
                <ListItemButton
                    sx={{
                        justifyContent: "center",
                    }}>
                    <ListItemIcon
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            color: matches && Colors.secondary,
                        }}>
                        <FavoriteIcon />
                    </ListItemIcon>
                </ListItemButton>
                <Divider orientation="vertical" flexItem />
                <ListItemButton
                    sx={{
                        justifyContent: "center",
                    }}>
                    <ListItemIcon
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            color: matches && Colors.secondary,
                        }}>
                        <PersonIcon />
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
                                {userToken && (
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
                                )}
                            </Box>
                        </Modal>
                        {username ? (
                            <Typography
                                onClick={handleOpen}
                                variant="p"
                                sx={{
                                    fontSize: "1.2rem",
                                    fontWeight: "bold",
                                    margin: "0 30px",
                                    marginLeft: "6px",
                                    cursor: "pointer",
                                }}>
                                {username.split("@")[0].slice(0, 5)}...
                            </Typography>
                        ) : (
                            <Typography
                                variant="p"
                                sx={{
                                    fontSize: "1.2rem",
                                    fontWeight: "bold",
                                    margin: "0 30px",
                                    marginLeft: "6px",
                                    cursor: "pointer",
                                }}
                                onClick={() => navigate.push("/auth")}>
                                Log In
                            </Typography>
                        )}
                    </ListItemIcon>
                </ListItemButton>
                <Divider orientation="vertical" flexItem />
            </MyList>
        </Component>
    );
};

export default React.memo(Actions);