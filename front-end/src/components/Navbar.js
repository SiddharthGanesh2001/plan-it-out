import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { alpha, Button, IconButton, InputBase, styled, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { CalendarToday, AddCircleOutline, Explore, People } from "@mui/icons-material";
import { AppBar as MUAppBar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./Navbar.scss";

// const auth = true;

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: theme.spacing(2),
    width: "40%",
    [theme.breakpoints.up("sm")]: {
        width: "30%",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        [theme.breakpoints.up("sm")]: {
            width: "15ch",
            "&:focus": {
                width: "20ch",
            },
        },
    },
}));

const activeLinkStyle = {
    borderBottom: "3px solid #C8321F",
    color: "#fff",
    fontWeight: "bold",
    borderRadius: 0,
};

const Navbar = () => {
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return;
        }
        setDrawerOpen(open);
    };

    return (
        <MUAppBar position="static" sx={{ backgroundColor: "#1C1917" }}>
            <Toolbar sx={{ justifyContent: "center" }}>
                <IconButton edge="start" color="inherit" aria-label="logo" onClick={() => navigate("/discover-events")} sx={{ ml: 2 }}>
                    <svg width="51" height="34" viewBox="0 0 90 60" aria-hidden="true">
                        <rect x="3" y="6" width="84" height="48" rx="6" fill="#efe9dd" />
                        <line x1="64" y1="12" x2="64" y2="48" stroke="#1c1917" strokeWidth="2" strokeDasharray="3 4" />
                        <text x="33" y="43" textAnchor="middle" fontFamily="'Bebas Neue', sans-serif" fontSize="40" fill="#1c1917">P</text>
                        <path d="M76 22 l2.4 4.9 l5.4 .8 l-3.9 3.8 l.9 5.4 l-4.8 -2.5 l-4.8 2.5 l.9 -5.4 l-3.9 -3.8 l5.4 -.8 z" fill="#c8321f" />
                    </svg>
                </IconButton>
                <Typography variant="h6" component="div" sx={{ cursor: "pointer", fontFamily: '"Bebas Neue", sans-serif', fontWeight: 400, fontSize: "1.7rem", letterSpacing: "0.06em" }} onClick={() => navigate("/discover-events")}>
                    Plan-It-Out
                </Typography>

                <Search sx={{ ml: 5 }}>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search for events"
                        inputProps={{ "aria-label": "search" }}
                    />
                </Search>

                <div style={{ flexGrow: 1 }}></div>

                <div className="navbar-buttons">
                    <Button
                        component={NavLink}
                        to="/discover-events"
                        variant="text"
                        color="inherit"
                        startIcon={<Explore />} 
                        style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
                        className='nav-button'
                    >
                        Discover Events
                    </Button>
                    <Button
                        component={NavLink}
                        to="/create-event"
                        variant="text"
                        color="inherit"
                        startIcon={<AddCircleOutline />} 
                        sx={{ mx: 2 }}
                        style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
                        className='nav-button'
                    >
                        Create Event
                    </Button>
                    <Button
                        component={NavLink}
                        to="/my-events"
                        variant="text"
                        color="inherit"
                        startIcon={<CalendarToday />} 
                        sx={{ mr: 2 }} 
                        style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
                        className='nav-button'
                    >
                        My Events
                    </Button>
                </div>

                {/* {auth && (
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="profile-menu"
                        aria-haspopup="true"
                        color="inherit"
                        sx={{ ml: 10 }}
                    >
                        <AccountCircle />
                    </IconButton>
                )} */}

                <IconButton color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                    <MenuIcon />
                </IconButton>
                <Drawer
                    anchor="right"
                    open={drawerOpen}
                    onClose={toggleDrawer(false)}
                    sx={{
                        "& .MuiDrawer-paper": {
                            backgroundColor: "#1C1917", // Matches Navbar color
                            color: "white", // Text color
                            width: 250, // Width of the drawer
                        },
                    }}
                >
                    <List>
                        <ListItem 
                            button 
                            onClick={() => { navigate("/my-social"); setDrawerOpen(false); }}
                            sx={{ cursor: "pointer" }} // Adds the pointer cursor on hover
                        >
                            <ListItemIcon sx={{ color: "white" }}><People /></ListItemIcon>
                            <ListItemText primary="My Social" primaryTypographyProps={{ color: "white" }} />
                        </ListItem>
                    </List>
                </Drawer>
            </Toolbar>
        </MUAppBar>
    );
};

export { Navbar };
