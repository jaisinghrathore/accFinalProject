import React, { useEffect, useContext, useReducer } from "react";
import { Link, useHistory } from "react-router-dom";
import DashboardNav from "../../components/DashboardNav";
import {
    CircularProgress,
    Grid,
    List,
    ListItem,
    Typography,
    Container,
    Card,
    Button,
    ListItemText,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from "@mui/material";
import { contextAuthStore } from "../../utils/store";
import axios from "axios";

function reducer(state, action) {
    switch (action.type) {
        case "FETCH_REQUEST":
            return { ...state, loading: true, error: "" };
        case "FETCH_SUCCESS":
            return {
                ...state,
                loading: false,
                userQueries: action.payload,
                error: "",
            };
        case "FETCH_FAIL":
            return { ...state, loading: false, error: action.payload };
        default:
            state;
    }
}

const UserQueries = () => {
    const router = useHistory();
    const { state } = contextAuthStore();

    const [{ loading, error, userQueries }, dispatch] = useReducer(reducer, {
        loading: false,
        userQueries: [],
        error: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({ type: "FETCH_REQUEST" });
                const { data } = await axios.get(
                    `http://localhost:8000/message/contact`,
                    {
                        headers: {
                            authorization: `Bearer ${state.GlazierToken.token}`,
                        },
                    }
                );
                dispatch({ type: "FETCH_SUCCESS", payload: data });
            } catch (err) {
                console.log(err);
                dispatch({ type: "FETCH_FAIL", payload: err });
            }
        };

        fetchData();
    }, []);

    return (
        <Container>
            <Grid container spacing={1} mt={3}>
                <Grid item md={3} xs={12}>
                    <DashboardNav active="userQueries" />
                </Grid>
                <Grid item md={9} xs={12}>
                    <Card>
                        <List>
                            <ListItem>
                                <Typography component="h3" variant="h4">
                                    USER QUERIES
                                </Typography>
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
                                                    <TableCell>NAME</TableCell>
                                                    <TableCell>EMAIL</TableCell>
                                                    <TableCell>
                                                        SUBJECT
                                                    </TableCell>
                                                    <TableCell>
                                                        MESSAGE
                                                    </TableCell>
                                                    <TableCell>
                                                        CREATED_AT
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {userQueries.map((order) => (
                                                    <TableRow key={order.name}>
                                                        <TableCell>
                                                            {order.name}
                                                        </TableCell>
                                                        <TableCell>
                                                            {order.email}
                                                        </TableCell>
                                                        <TableCell>
                                                            {order.subject}
                                                        </TableCell>
                                                        <TableCell>
                                                            ${order.message}
                                                        </TableCell>
                                                        <TableCell>
                                                            {order.createdAt}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
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
};

export default React.memo(UserQueries);
