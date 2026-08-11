import { useEffect, useState } from "react";
import { 
    Button, Container, Grid2, Typography, Chip, Box, Divider
} from "@mui/material";
import { Card } from "../components/Card";
import { CATEGORIES, ConfigHolder, FETCH_URL } from "../core/constants";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from "@mui/icons-material/Logout";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { useDialogs } from "@toolpad/core/useDialogs";
import { EditDialog } from "../components/EditDialog";

const MyEvents = () => {
    const [events, setEvents] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [expandedEventId, setExpandedEventId] = useState(null);
    const [friends, setFriends] = useState([]);
    const dialogs = useDialogs();

    async function fetchMyEvents() {
        const response = await fetch(`${FETCH_URL}/getEvents?userId=${ConfigHolder.userId}&mode=2`);
        setEvents(await response.json());
    }

    useEffect(() => {
        async function onLoad() {
            await fetchMyEvents();
        }
        onLoad();
    }, []);

    useEffect(() => {
        async function filter() {
            if (selectedCategory === "All") {
                return fetchMyEvents();
            }
            const response = await fetch(`${FETCH_URL}/getEvents?userId=${ConfigHolder.userId}&mode=2&filterId=1&filter=${selectedCategory}`);
            setEvents(await response.json());
        }
        filter();
    }, [selectedCategory])

    async function handleDeleteEvent(event) {
        await fetch(`${FETCH_URL}/deleteEvent?eventId=${event.eventId}&userId=${ConfigHolder.userId}`, { method: "DELETE" });
        fetchMyEvents();
    }

    function handleEditEvent(event) {
        dialogs.open(EditDialog, { event: event });
    }

    async function handleLeaveEvent(event) {
        await fetch(`${FETCH_URL}/unenrollEvent?userId=${ConfigHolder.userId}&eventId=${event.eventId}`, { method: "POST" });
        fetchMyEvents();
    }

    function handleOpenDeleteConfirmation(event) {
        return dialogs.open(ConfirmDialog, {
            title: "Delete Event",
            content: "Are you sure you want to delete this event?",
            actionButtonLabel: "Delete",
            actionButtonIcon: <DeleteIcon />,
            onAction: () => handleDeleteEvent(event)
        });
    }

    function handleOpenLeaveConfirmation(event) {
        return dialogs.open(ConfirmDialog, {
            title: "Leave Event",
            content: "Are you sure you want to un-enroll from this event?",
            actionButtonLabel: "Leave",
            actionButtonIcon: <LogoutIcon />,
            onAction: () => handleLeaveEvent(event)
        })
    }

    async function handleFollow(guest) {
        await fetch(`${FETCH_URL}/addFriend?userId=${ConfigHolder.userId}&friendId=${guest.userId}`, { method: "POST" });
        const fol = await fetch(`${FETCH_URL}/following?userId=${ConfigHolder.userId}`);
        const following = await fol.json();
        setFriends(await following);
        // dialogs.close(guestListPromise);
        window.location.reload();
        // if (guestListPromise) {
        //     await dialogs.close(guestListPromise);
        //     guestListPromise = null;
        // }
        fetchMyEvents();
    }

    function renderGuestActionButtons(guest, following) {
        const followingEmail = (friends.length ? friends : following).map((fol) => fol.userEmail);
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
                l
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
                    <li key={guest.userEmail}>
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
        const response = await fetch(`${FETCH_URL}/guestList?eventId=${event.eventId}`);
        const fol = await fetch(`${FETCH_URL}/following?userId=${ConfigHolder.userId}`);
        const guestList = await response.json();
        const following = await fol.json();
        setFriends(following);
        // setGuestList(await response.json());
        // setFollowing(await fol.json());
        dialogs.open(ConfirmDialog, {
            title: "Guest List",
            content: renderGuestList(guestList, following),
            cancelButtonLabel: "Close"
        })
    }

    function renderActionButtons(event) {
        if (ConfigHolder.userId === event.hostId) {
            return (
                <Button variant="outlined" size="small" color="error" onClick={() => handleOpenDeleteConfirmation(event)} startIcon={<DeleteIcon />}>
                    Delete
                </Button>
            );
        }
        return (
            <Button variant="outlined" size="small" color="warning" onClick={() => handleOpenLeaveConfirmation(event)} startIcon={<LogoutIcon />}>
                Leave
            </Button>
        );
    }

    const handleExpand = (eventId) => {
        setExpandedEventId(eventId);
    };

    const handleClose = () => {
        setExpandedEventId(null);
    };

    const hostedEvents = events.filter(event => event.hostId === ConfigHolder.userId);
    const joinedEvents = events.filter(event => event.hostId !== ConfigHolder.userId);


    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography 
                variant="h3" 
                component="h1" 
                gutterBottom 
                sx={{ fontWeight: "bold", color: "#333", mb: 3 }}
            >
                My Events
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
            <Divider sx={{ mb: 4, borderBottomWidth: 2 }} />

            <Typography 
                variant="h5" 
                component="h2" 
                gutterBottom 
                sx={{ fontWeight: "bold", color: "#333", mt: 3, mb: 2, fontSize: "1.5rem", textAlign: "left" }}
            >
                Hosted by You
            </Typography>
            <Grid2 container spacing={3}>
                {hostedEvents.map((event) => (
                    <Grid2 item xs={12} sm={6} md={4} key={event.eventId}>
                        <Card
                            title={event.eventName}
                            desc={event.eventDescription}
                            category={event.category}
                            eventDetails={{
                                location: event.location,
                                dateTime: event.dateTime,
                                hostName: event.hostName,
                                hostId: event.hostId
                            }}
                            joinedCount={event.joinedCount}
                            totalCount={event.totalCount}
                            actionButtons={() => renderActionButtons(event)}
                            isExpanded={expandedEventId === event.eventId}
                            onExpand={() => handleExpand(event.eventId)}
                            onGuestListClick={() => handleGuestListClick(event)}
                            onClose={handleClose}
                            onEdit={() => handleEditEvent(event)}
                        />
                    </Grid2>
                ))}
            </Grid2>
            <Typography 
                variant="h5" 
                component="h2" 
                gutterBottom 
                sx={{ fontWeight: "bold", color: "#333", mt: 5, mb: 2, fontSize: "1.5rem", textAlign: "left" }}
            >
                Events Joined
            </Typography>
            <Grid2 container spacing={3}>
                {joinedEvents.map((event) => (
                    <Grid2 item xs={12} sm={6} md={4} key={event.eventId}>
                        <Card
                            title={event.eventName}
                            desc={event.eventDescription}
                            category={event.category}
                            eventDetails={{
                                location: event.location,
                                dateTime: event.dateTime,
                                hostName: event.hostName,
                                hostId: event.hostId
                            }}
                            joinedCount={event.joinedCount}
                            totalCount={event.totalCount}
                            actionButtons={() => renderActionButtons(event)}
                            isExpanded={expandedEventId === event.eventId}
                            onExpand={() => handleExpand(event.eventId)}
                            onGuestListClick={() => handleGuestListClick(event)}
                            onClose={handleClose}
                            onEdit={() => handleEditEvent(event)}
                        />
                    </Grid2>
                ))}
            </Grid2>
        </Container>
    );
};

export { MyEvents };
