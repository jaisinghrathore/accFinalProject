import React from "react";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import AppbarDesktop from "./appbarDesktop";
import AppbarMobile from "./appbarMobile";

const Appbar = () => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));
    return (
        <>
            {matches ? (
                <AppbarMobile matches={matches} />
            ) : (
                <AppbarDesktop matches={matches} />
            )}
        </>
    );
};
export default React.memo(Appbar);
