import React from "react";
import { IconButton, Slide, TextField } from "@mui/material";
import { Box, styled } from "@mui/system";
import { Colors } from "../../styles/theme";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useUIContext } from "../../context/ui";
import Debounce from "./Debounce";

const SearchBoxContainer = styled(Box)(({ theme }) => ({
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: Colors.primary,
    zIndex: 9999999,
    opacity: 0.9,
}));

const SearchField = styled(TextField)(({ theme }) => ({
    ".MuiInputLabel-root": {
        color: Colors.secondary,
    },
    ".MuiInput-root": {
        fontSize: "1rem",
        [theme.breakpoints.up("md")]: {
            fontSize: "2rem",
        },
        color: Colors.secondary,
    },
    ".MuiInput-root::before": {
        borderBottom: `1px solid ${Colors.secondary}`,
    },
    padding: "0 0 0 40px",
}));

export default function SearchBox() {
    const { showSearchBox, setShowSearchBox } = useUIContext();
    const [searchValue, setSearchValue] = React.useState("");

    let timeout;
    const changeHandler = (e) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            setSearchValue(e.target.value);
        }, 700);
    };

    const KeyPressHandler = (event) => {
        if (event.key === "Enter") {
            navigate(`products?search=${event.target.value}`);
            event.target.value = "";
        }
    };

    const closeBox = () => {
        setSearchValue("");
    };
    return (
        <Slide direction="down" in={showSearchBox} timeout={500}>
            <SearchBoxContainer>
                <SearchField
                    variant="standard"
                    fullWidth
                    placeholder="search..."
                    onChange={changeHandler}
                    onKeyPress={KeyPressHandler}
                />
                <IconButton>
                    <SearchIcon
                        sx={{
                            fontSize: { xs: "2rem", md: "3rem" },
                            color: "white",
                        }}
                    />
                </IconButton>
                <Debounce value={searchValue} closeBox={closeBox} />

                <IconButton
                    onClick={() => setShowSearchBox(false)}
                    sx={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                    }}>
                    <CloseIcon sx={{ fontSize: "2rem", color: "white" }} />
                </IconButton>
            </SearchBoxContainer>
        </Slide>
    );
}
