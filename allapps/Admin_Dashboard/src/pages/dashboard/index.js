import React, { useEffect, useContext, useReducer } from "react";
import { Link, useHistory } from "react-router-dom";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import "./index.css";
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
    const [{ loading, error, summary }, dispatch] = useReducer(reducer, {
        loading: false,
        summary: { salesData: [] },
        error: "",
    });

    const router = useHistory();
    Chart.register(CategoryScale);
    return (
        <>
            <Container>
                <Grid container spacing={1} mt={3}>
                    <Grid item md={3} xs={12}>
                        <DashboardNav />
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
                                                            $ 4334
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
                                                            4
                                                            {/* summary.ordersCount */}
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
                                                            34
                                                            {/* {
                                                                summary.productsCount
                                                            } */}
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
                                                            54
                                                            {/* {summary.usersCount} */}
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
                                        Sales Chart For the admin.
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <Bar
                                        data={{
                                            labels: [100, 200, 300, 400],
                                            datasets: [
                                                {
                                                    label: "Sales",
                                                    backgroundColor:
                                                        "rgba(162, 222, 208, 1)",
                                                    data: [120, 220, 320, 420],
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
