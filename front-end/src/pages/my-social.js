import { useEffect, useState } from "react";
import { Container, List, ListItem, ListItemAvatar, ListItemText, Avatar, Button, Typography, Grid2, Divider, Paper, Box } from "@mui/material";
import { ConfigHolder, FETCH_URL } from "../core/constants";
import PersonIcon from "@mui/icons-material/Person";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

function MySocial() {
    const [following, setFollowing] = useState([]);
    const [followers, setFollowers] = useState([]);

    async function fetchFriends() {
        try {
            const followers = await fetch(`${FETCH_URL}/followers?userId=${ConfigHolder.userId}`);
            const following = await fetch(`${FETCH_URL}/following?userId=${ConfigHolder.userId}`);
            setFollowers(await followers.json());
            setFollowing(await following.json());
        } catch (error) {
            // console.error("Error fetching friends list:", error);
            setFollowers([]);
            setFollowing([]);
        }
    }

    useEffect(() => {
        fetchFriends();
    }, []);

    async function handleUnfollow(friendId) {
        await fetch(`${FETCH_URL}/unfollow?friendId=${friendId}&userId=${ConfigHolder.userId}`, { method: "POST" });
        await fetchFriends();
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                <PersonIcon sx={{ fontSize: 40, mr: 2, color: "primary.main" }} />
                <Typography variant="h3" component="h1" sx={{ fontWeight: "bold", color: "text.primary" }}>
                    My Social
                </Typography>
                {/* <Chip 
                    label={`${followers.length} connections`} 
                    color="primary" 
                    sx={{ ml: 2 }}
                /> */}
            </Box>
            <Grid2 container spacing={3}>
                <Grid2 item xs={12} md={6}>
                    <Typography variant="h4" gutterBottom>Followers</Typography>
                    <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden", mb: 2 }}>
                        <List disablePadding>
                            {followers.map((friend) => (
                                <>
                                    <ListItem 
                                        sx={{
                                            "&:hover": {
                                                backgroundColor: "action.hover",
                                            },
                                        }}
                                    >
                                        <ListItemAvatar>
                                            <Avatar 
                                                src={friend.profileImage || "/default-avatar.png"}
                                                alt={friend.userName}
                                                sx={{ width: 60, height: 60, mr: 2 }}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={
                                                <Typography variant="h6" sx={{ fontWeight: "medium" }}>
                                                    {friend.userName}
                                                </Typography>
                                            }
                                            secondary={
                                                <Typography variant="body2" color="text.secondary">
                                                    {friend.userEmail}
                                                </Typography>
                                            }
                                        />
                                        {/* <Button 
                                            variant="outlined" 
                                            color="error"
                                            startIcon={<BlockIcon />}
                                            sx={{ 
                                                borderRadius: 20,
                                                "&:hover": {
                                                    backgroundColor: "error.light",
                                                    color: "error.contrastText",
                                                }
                                            }}
                                        >
                                            Remove
                                        </Button> */}
                                    </ListItem>
                                    <Divider />
                                </>
                            ))}
                        </List>
                    </Paper>
                </Grid2>
                <Grid2 item xs={12} md={6}>
                    <Typography variant="h4" gutterBottom>Following</Typography>
                    <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden", mb: 2 }}>
                        <List disablePadding>
                            {following.map((friend) => (
                                <>
                                    <ListItem 
                                        sx={{
                                            "&:hover": {
                                                backgroundColor: "action.hover",
                                            },
                                        }}
                                    >
                                        <ListItemAvatar>
                                            <Avatar 
                                                src={friend.profileImage || "/default-avatar.png"}
                                                alt={friend.userName}
                                                sx={{ width: 60, height: 60, mr: 2 }}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={
                                                <Typography variant="h6" sx={{ fontWeight: "medium" }}>
                                                    {friend.userName}
                                                </Typography>
                                            }
                                            secondary={
                                                <Typography variant="body2" color="text.secondary">
                                                    {friend.userEmail}
                                                </Typography>
                                            }
                                        />
                                        <Button 
                                            variant="outlined" 
                                            color="warning"
                                            startIcon={<PersonRemoveIcon />}
                                            sx={{ 
                                                borderRadius: 20,
                                                "&:hover": {
                                                    backgroundColor: "warning.light",
                                                    color: "warning.contrastText",
                                                },
                                                marginLeft: "10px"
                                            }}
                                            onClick={() => handleUnfollow(friend.userId)}
                                        >
                                            Unfollow
                                        </Button>
                                    </ListItem>
                                    <Divider />
                                </>
                            ))}
                        </List>
                    </Paper>
                </Grid2>
            </Grid2>
        </Container>
    );
}

export { MySocial };
