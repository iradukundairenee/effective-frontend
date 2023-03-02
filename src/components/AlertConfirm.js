import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
export const AlertConfirm = ({
  open,
  setOpen,
  onConfirmYes,
  loading = false,
  message = "",
}) => {
  return (
    <Dialog aria-labelledby="dialog-title" onClose={setOpen} open={open}>
      <DialogTitle id="dialog-title">Confirm action</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={setOpen}>
          Cancel
        </Button>
        <Button color="primary" disabled={loading} onClick={onConfirmYes}>
          {loading ? "Loading,..." : "Yes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
