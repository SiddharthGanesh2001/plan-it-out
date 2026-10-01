import { createTheme } from "@mui/material/styles";

// Bebas Neue is used only for titles/labels (all-caps). Body text stays Hanken.
const display = {
    fontFamily: '"Bebas Neue", "Hanken Grotesk", sans-serif',
    fontWeight: 400,
    letterSpacing: "0.02em",
    textTransform: "uppercase",
};

const boxOfficeTheme = createTheme({
    palette: {
        mode: "light",
        primary: { main: "#1D4ED8" },      // ink blue
        secondary: { main: "#C8321F" },    // stamp red
        background: {
            default: "#EFE9DD",            // ticket stock
            paper: "#FBF8F1",              // ticket paper
        },
        text: {
            primary: "#1C1917",            // print ink
            secondary: "#6B6258",          // muted (darkened for contrast)
        },
        divider: "#D9CDB8",
    },

    shape: {
        borderRadius: 2,                   // sharp, ticket-like corners
    },

    typography: {
        fontFamily: '"Hanken Grotesk", system-ui, sans-serif',
        h1: display,
        h2: display,
        h3: display,
        h4: display,
        button: {
            fontFamily: '"Hanken Grotesk", system-ui, sans-serif',
            fontWeight: 600,
            textTransform: "none",         // readable buttons, not shouty caps
        },
    },

    components: {
        MuiButton: {
            defaultProps: { disableElevation: true },
        },
    },
});

export default boxOfficeTheme;
