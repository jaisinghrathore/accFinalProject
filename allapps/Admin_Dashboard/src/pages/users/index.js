import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import React, { useEffect, useContext, useReducer } from "react";
import {
    CircularProgress,
    Grid,
    List,
    ListItem,
    Typography,
    Card,
    Button,
    ListItemText,
    TableContainer,
    Container,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from "@mui/material";
import DashboardNav from "../../components/DashboardNav";

function reducer(state, action) {
    switch (action.type) {
        case "FETCH_REQUEST":
            return { ...state, loading: true, error: "" };
        case "FETCH_SUCCESS":
            return {
                ...state,
                loading: false,
                users: action.payload,
                error: "",
            };
        case "FETCH_FAIL":
            return { ...state, loading: false, error: action.payload };

        case "DELETE_REQUEST":
            return { ...state, loadingDelete: true };
        case "DELETE_SUCCESS":
            return { ...state, loadingDelete: false, successDelete: true };
        case "DELETE_FAIL":
            return { ...state, loadingDelete: false };
        case "DELETE_RESET":
            return { ...state, loadingDelete: false, successDelete: false };
        default:
            state;
    }
}

function AdminUsers() {
    const router = useHistory();

    const [{ loading, error, users, successDelete, loadingDelete }, dispatch] =
        useReducer(reducer, {
            loading: false,
            users: [
                {
                    _id: "3fsdfsdfsdfsdffwerr5345345retetret4tr",
                    name: "jai",
                    email: "jairqthore@gmail.com",
                },
            ],
            error: "",
        });

    const deleteHandler = () => {};

    // React.useEffect(() => {
    //     if (!userInfo) {
    //         router.push("/login");
    //     }
    //     if (userInfo?.isAdmin == "false") {
    //         router.push("/");
    //     }
    // }, [userInfo]);

    return (
        <Container>
            <Grid container spacing={1} mt={3}>
                <Grid item md={3} xs={12}>
                    <DashboardNav />
                </Grid>
                <Grid item md={9} xs={12}>
                    <Card>
                        <List>
                            <ListItem>
                                <Typography component="h3" variant="h4">
                                    Users
                                </Typography>
                                {loadingDelete && <CircularProgress />}
                            </ListItem>

                            <ListItem>
                                {loading ? (
                                    <CircularProgress />
                                ) : error ? (
                                    <Typography>{error}</Typography>
                                ) : (
                                    <TableContainer>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>ID</TableCell>
                                                    <TableCell>NAME</TableCell>
                                                    <TableCell>EMAIL</TableCell>
                                                    <TableCell>
                                                        ISADMIN
                                                    </TableCell>
                                                    <TableCell>
                                                        ACTIONS
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {users.map((user) => {
                                                    return (
                                                        <TableRow
                                                            key={user._id}>
                                                            <TableCell>
                                                                {user._id.substring(
                                                                    20,
                                                                    24
                                                                )}
                                                            </TableCell>
                                                            <TableCell>
                                                                {user.name}
                                                            </TableCell>
                                                            <TableCell>
                                                                {user.email}
                                                            </TableCell>
                                                            <TableCell>
                                                                {user.isAdmin ==
                                                                "true"
                                                                    ? "YES"
                                                                    : "NO"}
                                                            </TableCell>
                                                            <TableCell>
                                                                <Link
                                                                    to={`/admin/user/${user._id}`}>
                                                                    <Button
                                                                        size="small"
                                                                        variant="contained">
                                                                        Edit
                                                                    </Button>
                                                                </Link>{" "}
                                                                <Button
                                                                    onClick={() =>
                                                                        deleteHandler(
                                                                            user._id
                                                                        )
                                                                    }
                                                                    size="small"
                                                                    sx={{
                                                                        backgroundColor:
                                                                            "red",
                                                                    }}
                                                                    variant="contained">
                                                                    Delete
                                                                </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                })}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                )}
                            </ListItem>
                        </List>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}

export default React.memo(AdminUsers);
