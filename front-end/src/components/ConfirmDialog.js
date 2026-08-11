import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

function ConfirmDialog({ open, onClose, payload }) {
    const { title, content, onAction, actionButtonLabel, actionButtonIcon, cancelButtonLabel = "Cancel" } = payload;
    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle style={{ cursor: "move" }}>
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={onClose}>
                    {cancelButtonLabel}
                </Button>
                {actionButtonLabel && (<Button 
                    onClick={() => {
                        onAction();
                        onClose();
                    }}
                    startIcon={actionButtonIcon}
                    color="error"
                >
                    {actionButtonLabel}
                </Button>)}
            </DialogActions>
        </Dialog>
    );
}

export { ConfirmDialog };
