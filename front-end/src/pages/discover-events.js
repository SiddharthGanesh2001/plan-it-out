import { useEffect, useState } from "react";
import {
    Button, Container, Grid2, Typography, Chip, Box
} from "@mui/material";
import { Card } from "../components/Card";
import { CATEGORIES, ConfigHolder, FETCH_URL } from "../core/constants";
import LoginIcon from "@mui/icons-material/Login";
import { useDialogs } from "@toolpad/core";
import { ConfirmDialog } from "../components/ConfirmDialog";

function DiscoverEvents() {
    const [events, setEvents] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [expandedEventId, setExpandedEventId] = useState(null);
    const dialogs = useDialogs();

    async function fetchDiscoverEvents() {
        const response = await fetch(`${FETCH_URL}/getEvents?userId=${ConfigHolder.userId}&mode=1`);
        setEvents(await response.json());
    }

    useEffect(() => {
        async function onLoad() {
            await fetchDiscoverEvents();
        }
        onLoad();
    }, []);

    useEffect(() => {
        async function filter() {
            if (selectedCategory === "All") {
                return fetchDiscoverEvents();
            }
            const response = await fetch(`${FETCH_URL}/getEvents?userId=${ConfigHolder.userId}&mode=1&filterId=1&filter=${selectedCategory}`);
            setEvents(await response.json());
        }
        filter();
    }, [selectedCategory]);

    async function handleJoin(event) {
        const response = await fetch(`${FETCH_URL}/joinEvent?eventId=${event.eventId}&userId=${ConfigHolder.userId}`, { method: "POST" });
        fetchDiscoverEvents();
        return response;
    }

    async function handleFollow(guest) {
        await fetch(`${FETCH_URL}/addFriend?userId=${ConfigHolder.userId}&friendId=${guest.userId}`, { method: "POST" });
        // const fol = await fetch(`${FETCH_URL}/following?userId=${ConfigHolder.userId}`);
        // dialogs.close(guestListPromise);
        window.location.reload();
        // if (guestListPromise) {
        //     await dialogs.close(guestListPromise);
        //     guestListPromise = null;
        // }
        fetchDiscoverEvents();
    }

    function renderGuestActionButtons(guest, following) {
        const followingEmail = following.map((fol) => fol.userEmail);
        if (followingEmail.includes(guest.userEmail)) {
            return (
                <Button 
                    // variant="outlined" 
                    sx={{ 
                        borderRadius: 20,
                        marginLeft: "10px"
                    }}
                >
                    Following
                </Button>
            );
        }

        if (guest.userId === ConfigHolder.userId) {
            return (
                <Button 
                    // variant="outlined" 
                    sx={{ 
                        borderRadius: 20,
                        marginLeft: "10px"
                    }}
                >
                    You
                </Button>
            );
        }

        return (
            <Button 
                // variant="outlined" 
                color="success"
                // startIcon={<PersonIcon />}
                sx={{ 
                    borderRadius: 20,
                    "&:hover": {
                        backgroundColor: "success.light",
                        color: "success.contrastText",
                    },
                    marginLeft: "10px"
                }}
                onClick={() => handleFollow(guest)}
            >
                Follow
            </Button>
        )
    }

    function renderGuestList(guestList, following) {
        // return (
        //     <Grid2 item xs={12} md={6}>
        //         <List disablePadding>
        //             {guestList.map((guest) => (
        //                 <ListItem
        //                     key={guest.userEmail}
        //                     disableGutters
        //                     secondaryAction={renderGuestActionButtons(guest, following)}
        //                 >
        //                     <ListItemText
        //                         primary={guest.userName}
        //                         secondary={guest.userEmail}
        //                     />
        //                 </ListItem>
        //             ))}
        //         </List>
        //     </Grid2>
        // );
        return (
            <ol>
                {guestList.map((guest) => (
                    <li key={guest.userId}>
                        {guest.userName}
                        {" "}
                        ({guest.userEmail})
                        {renderGuestActionButtons(guest, following)}
                    </li>
                ))}
            </ol>
        );
    }

    async function handleGuestListClick(event) {
        if (event.joinedCount === 0) {
            return;
        }

        const response = await fetch(`${FETCH_URL}/guestList?eventId=${event.eventId}`);
        const fol = await fetch(`${FETCH_URL}/following?userId=${ConfigHolder.userId}`);
        const guestList = await response.json();
        const following = await fol.json();
        // setGuestList(await response.json());
        // setFollowing(await fol.json());
        dialogs.open(ConfirmDialog, {
            title: "Guest List",
            content: renderGuestList(guestList, following),
            cancelButtonLabel: "Close"
        })
    }

    function renderActionButtons(event) {
        return (
            <Button variant="outlined" size="small" color="success" onClick={() => handleJoin(event)} startIcon={<LoginIcon />}>
                Join
            </Button>
        );
    }

    const handleExpand = (eventId) => {
        setExpandedEventId(eventId);
    };

    const handleClose = () => {
        setExpandedEventId(null);
    };

    // const filteredEvents = selectedCategory === "All"
    //     ? events
    //     : events.filter(event => event.category === selectedCategory);

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography
                variant="h3"
                component="h1"
                gutterBottom
                sx={{ fontWeight: "bold", color: "#333", mb: 3 }} // Dark font color and increased bottom margin
            >
                Discover Events
            </Typography>

            <Box sx={{
                mb: 4,
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                justifyContent: "flex-start", 
                overflowX: "auto", 
                "&::-webkit-scrollbar": { height: "8px" }, 
                "&::-webkit-scrollbar-thumb": { backgroundColor: "rgba(0,0,0,.2)", borderRadius: "4px" },
            }}>
                <Chip
                    label="All"
                    onClick={() => setSelectedCategory("All")}
                    color={selectedCategory === "All" ? "primary" : "default"}
                    sx={{ fontWeight: "bold", padding: "10px 20px", fontSize: "1rem", flexShrink: 0 }} 
                />
                {CATEGORIES.map((category) => (
                    <Chip
                        key={category}
                        label={category.charAt(0).toUpperCase() + category.slice(1)}
                        onClick={() => setSelectedCategory(category)}
                        color={selectedCategory === category ? "primary" : "default"}
                        sx={{ padding: "10px 20px", fontSize: "1rem", flexShrink: 0 }} 
                    />
                ))}
            </Box>

            <Grid2 container spacing={3}>
                {events.map((event) => (
                    <Grid2 item xs={12} sm={6} md={4} key={event.eventId}>
                        <Card
                            title={event.eventName}
                            desc={event.eventDescription}
                            category={event.category}
                            eventDetails={{
                                location: event.location,
                                dateTime: event.dateTime,
                                hostName: event.hostName
                            }}
                            joinedCount={event.joinedCount}
                            totalCount={event.totalCount}
                            actionButtons={() => renderActionButtons(event)}
                            isExpanded={expandedEventId === event.eventId}
                            onExpand={() => handleExpand(event.eventId)}
                            onGuestListClick={() => handleGuestListClick(event)}
                            onClose={handleClose}
                        />
                    </Grid2>
                ))}
            </Grid2>
        </Container>
    );
}

export { DiscoverEvents };
