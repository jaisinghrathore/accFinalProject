import React from "react";
import styled from "@emotion/styled";
import {
    Grid,
    List,
    ListItemText,
    Typography,
    Button,
    Stack,
    Container,
} from "@mui/material";
import { Box } from "@mui/system";
import { Colors } from "../../styles/theme";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { SubscribeTf, FooterTitle } from "../../styles/footer";
import SendIcon from "@mui/icons-material/Send";
import { useHistory } from "react-router-dom";

function Footer() {
    const history = useHistory();
    return (
        <Box
            sx={{
                mt: 5,
                background: Colors.secondary,
                borderRadius: "50px",
                color: Colors.primary,
                p: { xs: 4, md: 10 },
                pt: 12,
                pb: 12,
                fontSize: { xs: "12px", md: "14px" },
            }}>
            <Grid container spacing={2} justifyContent="center">
                <Grid item md={6} lg={4}>
                    <FooterTitle variant="body1">About us</FooterTitle>
                    <Typography variant="caption2">
                        It is said that a logo, products, or services represent
                        a brand - true, but it is certainly much more than that.
                        In addition to other intangible and emotional factors, a
                        brand is the result of the time, knowledge, and
                        experience of each person who is part of it. And we are
                        well aware of that.
                    </Typography>
                    <Box
                        sx={{
                            mt: 4,
                            color: Colors.primary,
                        }}>
                        <FacebookIcon sx={{ mr: 1 }} />
                        <TwitterIcon sx={{ mr: 1 }} />
                        <InstagramIcon />
                    </Box>
                </Grid>
                <Grid item md={6} lg={2}>
                    <FooterTitle variant="body1">information</FooterTitle>
                    <List>
                        <ListItemText>
                            <Typography lineHeight={2} variant="caption2">
                                About Us
                            </Typography>
                        </ListItemText>
                        <ListItemText>
                            <Typography lineHeight={2} variant="caption2">
                                Order Tracking
                            </Typography>
                        </ListItemText>
                        <ListItemText>
                            <Typography lineHeight={2} variant="caption2">
                                Privacy &amp; Policy
                            </Typography>
                        </ListItemText>
                        <ListItemText>
                            <Typography lineHeight={2} variant="caption2">
                                Terms &amp; Conditions
                            </Typography>
                        </ListItemText>
                    </List>
                </Grid>
                <Grid item md={6} lg={2}>
                    <FooterTitle variant="body1">My account</FooterTitle>
                    <List>
                        <ListItemText>
                            <Typography lineHeight={2} variant="caption2">
                                Login
                            </Typography>
                        </ListItemText>
                        <ListItemText>
                            <Typography lineHeight={2} variant="caption2">
                                My Cart
                            </Typography>
                        </ListItemText>
                        <ListItemText>
                            <Typography lineHeight={2} variant="caption2">
                                My Account
                            </Typography>
                        </ListItemText>
                        <ListItemText>
                            <Typography lineHeight={2} variant="caption2">
                                Wishlist
                            </Typography>
                        </ListItemText>
                    </List>
                </Grid>
                <Grid item md={6} lg={4}>
                    <FooterTitle variant="body1">Get on the list</FooterTitle>
                    <FooterTitle variant="p">
                        WHAT'S INSIDE? NEW ARRIVALS, EXCLUSIVE SALES,
                        INSPIRATION AND MUCH MORE
                    </FooterTitle>
                    <Stack>
                        <Button
                            onClick={()=>history.push("/contact")}
                            startIcon={
                                <SendIcon sx={{ color: Colors.white }} />
                            }
                            sx={{ mt: 4, mb: 4, backgroundColor: "#67645E" }}
                            variant="contained">
                            Contact Us
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
}

export default React.memo(Footer);
