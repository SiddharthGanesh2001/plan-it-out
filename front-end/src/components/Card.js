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
                    maxWidth: "100%",
                    display: "flex",
                    position: "relative",
                    overflow: "visible",
                    bgcolor: "background.paper",
                    border: "1px solid",
                    borderColor: "divider",
                    boxShadow: "2px 3px 0 rgba(28,25,23,0.12)"
                }}
            >
                {/* left: duotone image panel (placement B) */}
                <Box sx={{ position: "relative", width: 150, flexShrink: 0, overflow: "hidden" }}>
                    <CardMedia
                        component="img"
                        image={IMG[category] || img}
                        alt="category image"
                        sx={{ height: "100%", width: "100%", objectFit: "cover", filter: "grayscale(1) contrast(1.05)" }}
                    />
                    <Box sx={{ position: "absolute", inset: 0, bgcolor: "primary.main", mixBlendMode: "multiply", opacity: 0.55 }} />
                </Box>

                {/* middle: content */}
                <Box sx={{ flex: 1, minWidth: 0, p: 2 }}>
                    {category && (
                        <Box sx={{
                            display: "inline-block",
                            border: "1.5px solid", borderColor: "secondary.main",
                            bgcolor: "secondary.main", color: "#fff",
                            fontFamily: '"Bebas Neue", sans-serif', letterSpacing: "0.1em",
                            fontSize: "0.85rem", lineHeight: 1.4, px: 1,
                            transform: "rotate(-3deg)"
                        }}>
                            {category}
                        </Box>
                    )}
                    <Typography sx={{
                        fontFamily: '"Bebas Neue", sans-serif', textTransform: "uppercase",
                        fontSize: "1.7rem", lineHeight: 1, letterSpacing: "0.01em", mt: 1
                    }}>
                        {title}
                    </Typography>
                    {eventDetails?.hostName && (
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
                            Hosted by {eventDetails.hostName}
                        </Typography>
                    )}
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        {desc}
                    </Typography>
                </Box>

                {/* vertical perforation */}
                <Box sx={{ position: "relative", borderLeft: "2px dashed", borderColor: "divider" }}>
                    <Box sx={{ position: "absolute", top: -9, left: -9, width: 16, height: 16, borderRadius: "50%", bgcolor: "background.default", border: "1px solid", borderColor: "divider" }} />
                    <Box sx={{ position: "absolute", bottom: -9, left: -9, width: 16, height: 16, borderRadius: "50%", bgcolor: "background.default", border: "1px solid", borderColor: "divider" }} />
                </Box>

                {/* right: stub */}
                <Box sx={{ width: 104, flexShrink: 0, p: 1.5, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", gap: 1, textAlign: "center" }}>
                    <Box sx={{ cursor: "pointer" }} onClick={onGuestListClick}>
                        <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: "0.6rem", letterSpacing: "0.1em", color: "text.secondary" }}>
                            GOING
                        </Typography>
                        <Typography sx={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: "1.6rem", lineHeight: 1, color: "primary.main" }}>
                            {joinedCount}/{totalCount}
                        </Typography>
                    </Box>
                    {actionButtons()}
                    <Button size="small" variant="text" onClick={onExpand} startIcon={<InfoIcon />} sx={{ minWidth: 0 }}>
                        Details
                    </Button>
                </Box>
            </MUCard>
        </>
    );
}

export { Card };
