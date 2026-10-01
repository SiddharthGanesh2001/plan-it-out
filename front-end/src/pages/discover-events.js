import { useEffect, useState } from "react";
import {
    Button, Container, Grid2, Typography, Chip, Box
} from "@mui/material";
import { Card } from "../components/Card";
import { CATEGORIES, ConfigHolder, FETCH_URL } from "../core/constants";
import LoginIcon from "@mui/icons-material/Login";
import { useDialogs } from "@toolpad/core";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { EventCollection } from "../core/event-collection";

const ticketTabSx = {
    borderRadius: 0,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    fontFamily: '"IBM Plex Mono", monospace',
    fontWeight: 500,
    fontSize: "0.78rem",
    padding: "8px 6px",
    flexShrink: 0,
};

function DiscoverEvents() {
    const [events, setEvents] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [expandedEventId, setExpandedEventId] = useState(null);
    const [loading, setLoading] = useState(true);
    const dialogs = useDialogs();

    async function fetchDiscoverEvents() {
        setLoading(true);
        const response = await fetch(`${FETCH_URL}/getEvents?userId=${ConfigHolder.userId}&mode=1`);
        setEvents(await response.json());
        setLoading(false);
    }

    useEffect(() => {
        async function onLoad() {
            await fetchDiscoverEvents();
            const response = await EventCollection.getInstance().fetchDiscoverEvents();
            console.log(response);
            console.log(response[0].category);
        }
        onLoad();
    }, []);

    useEffect(() => {
        async function filter() {
            if (selectedCategory === "All") {
                return fetchDiscoverEvents();
            }
            setLoading(true);
            const response = await fetch(`${FETCH_URL}/getEvents?userId=${ConfigHolder.userId}&mode=1&filterId=1&filter=${selectedCategory}`);
            setEvents(await response.json());
            setLoading(false);
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
            <Button variant="contained" size="small" onClick={() => handleJoin(event)} startIcon={<LoginIcon />} sx={{ bgcolor: "#EA580C", color: "#fff", "&:hover": { bgcolor: "#C2410C" } }}>
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
                    variant={selectedCategory === "All" ? "filled" : "outlined"}
                    sx={ticketTabSx}
                />
                {CATEGORIES.map((category) => (
                    <Chip
                        key={category}
                        label={category}
                        onClick={() => setSelectedCategory(category)}
                        color={selectedCategory === category ? "primary" : "default"}
                        variant={selectedCategory === category ? "filled" : "outlined"}
                        sx={ticketTabSx}
                    />
                ))}
            </Box>

            {loading ? (
                <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', color: "text.secondary", textAlign: "center", py: 8, letterSpacing: "0.05em" }}>
                    Loading the marquee…
                </Typography>
            ) : events.length === 0 ? (
                <Box sx={{
                    textAlign: "center",
                    py: 8,
                    px: 2,
                    border: "2px dashed",
                    borderColor: "divider",
                    bgcolor: "background.paper",
                    color: "text.secondary"
                }}>
                    <Typography sx={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: "2.6rem", lineHeight: 1, letterSpacing: "0.03em", color: "text.primary" }}>
                        No shows on the marquee
                    </Typography>
                    <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: "0.85rem", mt: 1.5, letterSpacing: "0.05em" }}>
                        {selectedCategory === "All"
                            ? "Nothing on sale right now — check back soon."
                            : `No ${selectedCategory} events yet — try another category.`}
                    </Typography>
                </Box>
            ) : (
                <Grid2 container spacing={3}>
                    {events.map((event) => (
                        <Grid2 size={{ xs: 12, md: 6 }} key={event.eventId}>
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
            )}
        </Container>
    );
}

export { DiscoverEvents };
