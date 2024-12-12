import { Button, CardActions, CardMedia, Typography, IconButton, Box } from "@mui/material";
import { default as MUCard } from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import PeopleIcon from "@mui/icons-material/People";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { ConfigHolder } from "../core/constants";

const IMG = {
    party: "/party.jpg",
    sports: "/sports.jpg",
    hackathon: "/hackathon.jpg",
    concert: "/concert.jpg",
    workshop: "/workshop.jpg",
    seminar: "/seminar.jpg",
    conference: "/conference.jpg"
};

function Card({
    img = "/party.jpg",
    category,
    title,
    desc,
    eventDetails,
    joinedCount,
    totalCount,
    maxWidth = 540,
    actionButtons,
    isExpanded,
    onExpand,
    onClose,
    onGuestListClick,
    onEdit
}) 
{
    return (
        <>
            {isExpanded && (
                <Box
                    sx={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backdropFilter: "blur(5px)",
                        zIndex: 999,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    onClick={onClose}
                >
                    <MUCard
                        sx={{
                            width: "75%",
                            height: "75%",
                            maxWidth: "none",
                            position: "relative",
                            overflow: "auto",
                            transition: "all 0.3s ease-in-out"
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <CardMedia
                            component="img"
                            image={IMG[category] || img}
                            alt="category image"
                            height={400}
                            sx={{
                                objectFit: "cover",
                                transition: "all 0.3s ease-in-out"
                            }}
                        />

                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {title}
                            </Typography>
                            <Typography variant="body2">
                                {desc}
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 2 }}>
                                <strong>Location:</strong> {eventDetails.location}
                            </Typography>
                            <Typography variant="body2">
                                <strong>Date & Time:</strong> {new Date(eventDetails.dateTime).toLocaleString()}
                            </Typography>
                            <Typography variant="body2">
                                <strong>Host:</strong> {eventDetails.hostName}
                            </Typography>
                        </CardContent>

                        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
                            {actionButtons()}
                            <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                                <IconButton onClick={onGuestListClick}>
                                    <PeopleIcon />
                                </IconButton>
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                    {joinedCount}/{totalCount}
                                </Typography>
                            </Box>
                            <Button
                                size="small"
                                variant="contained"
                                onClick={onClose}
                                startIcon={<CloseIcon />}
                            >
                                Close
                            </Button>
                        </CardActions>
                        <IconButton
                            sx={{
                                position: "absolute",
                                top: 16,
                                right: 16,
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                                color: "white",
                                "&:hover": {
                                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                                },
                            }}
                            onClick={onClose}
                        >
                            <CloseIcon fontSize="large" />
                        </IconButton>
                        {ConfigHolder.userId === eventDetails.hostId && (<IconButton
                            sx={{
                                position: "absolute",
                                top: 16,
                                left: 16,
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                                color: "white",
                                "&:hover": {
                                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                                },
                            }}
                            onClick={onEdit}
                        >
                            <ModeEditIcon fontSize="large" />
                        </IconButton>)}
                    </MUCard>
                </Box>
            )}

            <MUCard
                sx={{
                    width: maxWidth,
                    position: "relative",
                    overflow: "hidden",
                    transition: "all 0.3s ease-in-out"
                }}
            >
                <CardMedia
                    component="img"
                    image={IMG[category] || img}
                    alt="category image"
                    height={360}
                    sx={{
                        objectFit: "contain",
                        transition: "all 0.3s ease-in-out"
                    }}
                />

                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2">
                        {desc}
                    </Typography>
                </CardContent>
                <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
                    {actionButtons()}
                    <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                        <IconButton onClick={onGuestListClick}>
                            <PeopleIcon />
                        </IconButton>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            {joinedCount}/{totalCount}
                        </Typography>
                    </Box>
                    <Button
                        size="small"
                        variant="outlined"
                        onClick={onExpand}
                        startIcon={<InfoIcon />}
                    >
                        Details
                    </Button>
                </CardActions>

            </MUCard>
        </>
    );
}

export { Card };
