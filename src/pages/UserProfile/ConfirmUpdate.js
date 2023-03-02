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

export const ConfirmUpdate = ({
  open,
  setOpen,
  userInfo,
  onChange,
  onConfirm,
}) => {
  return (
    <Dialog
      open={open}
      maxWidth="md"
      onClose={setOpen}
      aria-labelledby="confirm-dialog"
    >
      <DialogTitle id="confirm-dialog">Confirm update</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To update your information to this website, please enter your password
          address here.
        </DialogContentText>
        <Typography color="error">
          AFTER UPDATING YOUR INFORMATION THE SYSTEM WILL LOG YOU OUT
        </Typography>
        <TextField
          autoFocus
          margin="dense"
          name="password"
          value={userInfo.password}
          label="Enter your password"
          type="password"
          fullWidth
          onChange={onChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={setOpen} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="primary">
          Confirm update
        </Button>
      </DialogActions>
    </Dialog>
  );
};
