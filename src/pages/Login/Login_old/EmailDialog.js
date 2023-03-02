import React from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@material-ui/core";

export const EmailDialog = ({
  open,
  setOpen,
  userInfo,
  onChange,
  onConfirm,
  loading = false,
}) => {
  return (
    <Dialog
      open={open}
      maxWidth="md"
      onClose={setOpen}
      aria-labelledby="confirm-dialog"
    >
      <DialogTitle id="confirm-dialog">Email Dialog</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To reset your password, please enter your email address here.
        </DialogContentText>
        <Typography color="secondary">
          WE WILL SEND YOU A LINK TO HELP YOU RESET YOUR PASSWORD
        </Typography>
        <TextField
          autoFocus
          margin="dense"
          name="email"
          value={userInfo.email}
          label="Enter your email"
          type="email"
          fullWidth
          onChange={onChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={setOpen} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="primary" disabled={loading}>
          {loading ? "Loading,..." : "Send the link"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
