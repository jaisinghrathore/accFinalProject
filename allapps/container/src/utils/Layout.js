import React from "react";
import { Box, Paper, Container } from "@mui/material";
import { useHistory } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import Appbar from "../components/appbar";
import Footer from "../components/footer";
import SearchBox from "../components/search/index";

const items = [
    {
        image: "https://www.tanishq.co.in/wps/wcm/connect/tanishqrt/4c914caf-0bee-4fa1-adfe-6547791cfd53/desktop/Stunning-Every-Ear-1920x768.jpg?MOD=AJPERES&amp;CACHEID=ROOTWORKSPACE.Z18_90IA1H80O0T6206GQH590V3000-4c914caf-0bee-4fa1-adfe-6547791cfd53-desktop-ocShN4N&amp;impolicy=pqmed",
    },
    {
        image: "https://www.tanishq.co.in/wps/wcm/connect/tanishqrt/a932caae-301f-40ef-bcec-2301f6158616/desktop/Rhythms-of-rain-1920x768.jpg?MOD=AJPERES&amp;CACHEID=ROOTWORKSPACE.Z18_90IA1H80O0T6206GQH590V3000-a932caae-301f-40ef-bcec-2301f6158616-desktop-ocSihQ0&amp;impolicy=pqmed",
    },
    {
        image: "https://www.tanishq.co.in/wps/wcm/connect/tanishqrt/ee33c4c9-e246-4f4d-bf49-960a549e6ba4/desktop/Lilac-1920x768.jpg?MOD=AJPERES&amp;CACHEID=ROOTWORKSPACE.Z18_90IA1H80O0T6206GQH590V3000-ee33c4c9-e246-4f4d-bf49-960a549e6ba4-desktop-ocShDOy&amp;impolicy=pqmed",
    },
];

const Layout = ({ children }) => {
    React.useEffect(() => {
        window.scrollTo(0, 500);
    }, []);

    return (
        <>
            <Box>
                <Appbar />
                <SearchBox />
                <Container mb={3}>
                    {/* <Carousel
                        sx={{ mt: 4, borderRadius: "6px" }}
                        autoPlay
                        animation="slide"
                        IndicatorIcon={<></>}
                        interval={3000}>
                        {items.map((item, i) => (
                            <Paper key={i}>
                                <img
                                    height="400px"
                                    width="100%"
                                    src={item.image}
                                />
                            </Paper>
                        ))}
                    </Carousel> */}
                    {/* All Pages */}
                    {children}
                </Container>
                <Footer />
            </Box>
        </>
    );
};

export default React.memo(Layout);
