import { useState, useEffect } from "react";
import {
    TextField, Tooltip, MenuItem, Typography, Container, Snackbar,
    LinearProgress, Box, Paper, InputAdornment
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { CATEGORIES, FETCH_URL } from "../core/constants";
import EventIcon from "@mui/icons-material/Event";
import DescriptionIcon from "@mui/icons-material/Description";
import CategoryIcon from "@mui/icons-material/Category";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GroupIcon from "@mui/icons-material/Group";
import LocationOnIcon from "@mui/icons-material/LocationOn";

function CreateEvent() {
    const [eventName, setEventName] = useState("");
    const [eventNameError, setEventNameError] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [category, setCategory] = useState("");
    const [categoryError, setCategoryError] = useState("");
    const [dateTime, setDateTime] = useState("");
    const [dateTimeError, setDateTimeError] = useState("");
    const [totalCount, setTotalCount] = useState("");
    const [totalCountError, setTotalCountError] = useState("");
    const [customCategory, setCustomCategory] = useState("");
    const [customCategoryError, setCustomCategoryError] = useState("");
    const [location, setLocation] = useState("");
    const [locationError, setLocationError] = useState("");

    const [showSnackbar, setShowSnackbar] = useState(false);
    const [progress, setProgress] = useState(100);
    const navigate = useNavigate();

    useEffect(() => {
        if (showSnackbar) {
            const interval = setInterval(() => {
                setProgress((prevProgress) => (prevProgress > 0 ? prevProgress - 2 : 0));
            }, 100);

            const timer = setTimeout(() => {
                setShowSnackbar(false);
                navigate("/my-events");
            }, 1000);

            return () => {
                clearInterval(interval);
                clearTimeout(timer);
            };
        }
    }, [showSnackbar, navigate]);

    function handleSubmit() {
        setEventNameError(eventName ? "" : "Enter a name");
        setCategoryError(category ? "" : "Select a category");
        setCustomCategoryError((category === "custom" && customCategory === "") ? "Enter custom category" : "");
        setDateTimeError(dateTime ? "" : "Select a date-time");
        setTotalCountError(totalCount ? "" : "Enter total count");
        setLocationError(location ? "" : "Enter a location");
        if (!eventName || !category || !dateTime || !totalCount || !location) {
            return;
        }
        const params = new URLSearchParams({
            hostId: 2,
            eventName,
            eventDescription,
            eventCategory: category,
            dateTime,
            totalCount,
            location
        });

        return fetch(`${FETCH_URL}/createEvent?${params.toString()}`, {
            method: "POST"
        }).then((response) => {
            setShowSnackbar(true);
            setProgress(10);
            return response.json();
        });
    }

    const handleTotalCountChange = (e) => {
        const value = Number(e.target.value);
        if (value >= 0) {
            setTotalCount(value);
        } else {
            setTotalCount(0);
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: "bold", color: "text.primary" }}>
                Create Your Own Event
            </Typography>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2, backgroundColor: "#f5f5f5", minHeight: "70vh" }}>
                <TextField
                    error={eventNameError}
                    helperText={eventNameError}
                    fullWidth
                    label="Event Name"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    margin="normal"
                    required
                    variant="outlined"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <EventIcon color="primary" />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    fullWidth
                    label="Event Description"
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                    margin="normal"
                    multiline
                    rows={4}
                    variant="outlined"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <DescriptionIcon color="primary" />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    error={categoryError}
                    helperText={categoryError}
                    fullWidth
                    label="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    margin="normal"
                    required
                    select
                    variant="outlined"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <CategoryIcon color="primary" />
                            </InputAdornment>
                        ),
                    }}
                >
                    {CATEGORIES.map((category) => (
                        <MenuItem key={category} value={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</MenuItem>
                    ))}
                </TextField>
                {category === "custom" && (
                    <TextField
                        error={customCategoryError}
                        helperText={customCategoryError}
                        fullWidth
                        label="Custom Category"
                        value={customCategory}
                        onChange={(e) => setCustomCategory(e.target.value)}
                        margin="normal"
                        required
                        variant="outlined"
                    />
                )}
                <TextField
                    error={dateTimeError}
                    helperText={dateTimeError}
                    fullWidth
                    label="Date & Time"
                    type="datetime-local"
                    InputLabelProps={{ shrink: true }}
                    value={dateTime}
                    onChange={(e) => setDateTime(e.target.value)}
                    margin="normal"
                    inputProps={{
                        min: new Date().toISOString().slice(0, 16),
                        max: "2099-12-31T23:59",
                    }}
                    required
                    variant="outlined"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccessTimeIcon color="primary" />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    error={totalCountError}
                    helperText={totalCountError}
                    fullWidth
                    label="Total Count"
                    value={totalCount}
                    onChange={handleTotalCountChange}
                    margin="normal"
                    required
                    variant="outlined"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <GroupIcon color="primary" />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    error={locationError}
                    helperText={locationError}
                    fullWidth
                    label="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    margin="normal"
                    required
                    variant="outlined"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LocationOnIcon color="primary" />
                            </InputAdornment>
                        ),
                    }}
                />

                <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
                    <Tooltip title="Create Event">
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={handleSubmit}
                            sx={{
                                mt: 2,
                                backgroundColor: "primary.main", 
                                color: "white",
                                fontFamily: "'Roboto', sans-serif", 
                                "&:hover": {
                                    backgroundColor: "primary.dark",
                                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
                                },
                                width: "auto",
                                padding: "10px 20px",
                            }}
                        >
                            Create Event
                        </Button>
                    </Tooltip>
                </Box>
            </Paper>

            <Snackbar
                open={showSnackbar}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                sx={{
                    top: 20,
                    right: 20,
                    width: 300
                }}
            >
                <Box sx={{
                    width: "100%",
                    padding: 2,
                    backgroundColor: "grey",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}>
                    <Typography variant="body2" color="white">
                        Event Created
                    </Typography>
                    <Box sx={{ width: "100%", marginTop: 1 }}>
                        <LinearProgress
                            variant="determinate"
                            value={progress}
                            sx={{
                                height: 5,
                                backgroundColor: "lightgrey",
                                "& .MuiLinearProgress-bar": {
                                    backgroundColor: "blue",
                                },
                            }}
                        />
                    </Box>
                </Box>
            </Snackbar>
        </Container>
    );
}

export { CreateEvent };
