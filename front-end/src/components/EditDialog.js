import { useState } from "react";
import { ConfirmDialog } from "./ConfirmDialog";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { TextField } from "@mui/material";
import { FETCH_URL } from "../core/constants";

function EditDialog({
    open,
    onClose,
    payload
}) {
    const { event } = payload;
    const [eventDescription, setEventDescription] = useState(event.eventDescription);
    const [totalCount, setTotalCount] = useState(event.totalCount);
    const [totalCountError, setTotalCountError] = useState("");
    const [location, setLocation] = useState(event.location);
    const [locationError, setLocationError] = useState("");

    function renderEditContent() {
        return (
            <>
                <TextField
                    style={{ marginRight: 10 }}
                    label="Event Description"
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                    margin="normal"
                />
                <TextField
                    label="Total Count"
                    error={totalCountError}
                    helperText={totalCountError}
                    value={totalCount}
                    onChange={(e) => {
                        if (Number(e.target.value !== 0)) {
                            setTotalCount(Number(e.target.value))
                        }
                    }}
                    margin="normal"
                />
                <TextField
                    label="Location"
                    error={locationError}
                    helperText={locationError}
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    margin="normal"
                />
            </>
        );
    }
    
    return (
        <ConfirmDialog
            open={open}
            onClose={onClose}
            payload={{ title: "Edit Event" ,
                content: renderEditContent(),
                actionButtonIcon: <ModeEditIcon />,
                actionButtonLabel: "Edit",
                onAction: async () => {
                    if (totalCount < event.joinedCount || !location) {
                        setTotalCountError(totalCount < event.joinedCount ? "Total count cannot be less than joined count" : "");
                        setLocationError(!location ? "Location cannot be empty" : "");
                        return;
                    }
                    const params = new URLSearchParams({
                        eventDescription: eventDescription,
                        totalCount: totalCount,
                        location: location
                    });
                    await fetch(`${FETCH_URL}/updateEvent?eventId=${event.eventId}&${params.toString()}`, { method: "POST" });
                    window.location.reload();
                }
            }}
        />
    );
}

export { EditDialog };
