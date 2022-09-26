import React, { useEffect, useReducer } from "react";
import { Link, useHistory } from "react-router-dom";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import {
    CircularProgress,
    Grid,
    List,
    ListItem,
    Typography,
    Card,
    Button,
    CardContent,
    CardActions,
    Container,
} from "@mui/material";
import DashboardNav from "../../components/DashboardNav";
import { Bar } from "react-chartjs-2";
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
                summary: action.payload, // use this in graph
                error: "",
            };
        case "FETCH_FAIL":
            return { ...state, loading: false, error: action.payload };
        default:
            state;
    }
}

const Dashboard = () => {
    const { state } = contextAuthStore();
    const [{ loading, error, summary }, dispatch] = useReducer(reducer, {
        loading: false,
        summary: { salesData: [] },
        error: "",
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({ type: "FETCH_REQUEST" });
                const { data } = await axios.get(
                    `http://localhost:8000/admin/summary`,
                    {
                        headers: {
                            authorization: `Bearer ${state.GlazierToken.token}`,
                        },
                    }
                );
                dispatch({ type: "FETCH_SUCCESS", payload: data });
            } catch (err) {
                dispatch({ type: "FETCH_FAIL", payload: err });
            }
        };
        fetchData();
    }, []);

    const router = useHistory();
    Chart.register(CategoryScale);
    return (
        <>
            <Container>
                <Grid container spacing={1} mt={3}>
                    <Grid item md={3} xs={12}>
                        <DashboardNav active="dashboard" />
                    </Grid>
                    <Grid item md={9} xs={12}>
                        <Card>
                            <List>
                                <ListItem>
                                    {loading ? (
                                        <CircularProgress />
                                    ) : error ? (
                                        <Typography>{error}</Typography>
                                    ) : (
                                        <Grid container spacing={5}>
                                            <Grid item md={3}>
                                                <Card raised>
                                                    <CardContent>
                                                        <Typography variant="h5">
                                                            $
                                                            {
                                                                summary.ordersPrice
                                                            }
                                                            {/* summary.ordersPrice */}
                                                        </Typography>
                                                        <Typography>
                                                            Sales
                                                        </Typography>
                                                    </CardContent>
                                                    <CardActions>
                                                        <Link to="/admin/orders">
                                                            <Button
                                                                size="small"
                                                                color="primary">
                                                                View sales
                                                            </Button>
                                                        </Link>
                                                    </CardActions>
                                                </Card>
                                            </Grid>
                                            <Grid item md={3}>
                                                <Card raised>
                                                    <CardContent>
                                                        <Typography variant="h5">
                                                            {
                                                                summary.ordersCount
                                                            }
                                                        </Typography>
                                                        <Typography>
                                                            Orders
                                                        </Typography>
                                                    </CardContent>
                                                    <CardActions>
                                                        <Link to="/admin/orders">
                                                            <Button
                                                                size="small"
                                                                color="primary">
                                                                View orders
                                                            </Button>
                                                        </Link>
                                                    </CardActions>
                                                </Card>
                                            </Grid>
                                            <Grid item md={3}>
                                                <Card raised>
                                                    <CardContent>
                                                        <Typography variant="h5">
                                                            {
                                                                summary.productsCount
                                                            }
                                                        </Typography>
                                                        <Typography>
                                                            Products
                                                        </Typography>
                                                    </CardContent>
                                                    <CardActions>
                                                        <Link to="/admin/products">
                                                            <Button
                                                                size="small"
                                                                color="primary">
                                                                View products
                                                            </Button>
                                                        </Link>
                                                    </CardActions>
                                                </Card>
                                            </Grid>
                                            <Grid item md={3}>
                                                <Card raised>
                                                    <CardContent>
                                                        <Typography variant="h5">
                                                            {summary.usersCount}
                                                        </Typography>
                                                        <Typography>
                                                            Users
                                                        </Typography>
                                                    </CardContent>
                                                    <CardActions>
                                                        <Link to="/admin/users">
                                                            <Button
                                                                size="small"
                                                                color="primary">
                                                                View users
                                                            </Button>
                                                        </Link>
                                                    </CardActions>
                                                </Card>
                                            </Grid>
                                        </Grid>
                                    )}
                                </ListItem>
                                <ListItem>
                                    <Typography
                                        component="h3"
                                        variant="h5"
                                        mt={3}>
                                        Sales Chart For The Admin.
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <Bar
                                        data={{
                                            labels: summary.salesData.map(
                                                (x) => x._id
                                            ),
                                            datasets: [
                                                {
                                                    label: "Sales",
                                                    backgroundColor:
                                                        "rgba(162, 222, 208, 1)",
                                                    data: summary.salesData.map(
                                                        (x) => x.totalSales
                                                    ),
                                                },
                                            ],
                                        }}
                                        options={{
                                            legend: {
                                                display: true,
                                                position: "right",
                                            },
                                        }}></Bar>
                                </ListItem>
                            </List>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default React.memo(Dashboard);
