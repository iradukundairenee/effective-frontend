import React, { useState } from "react";
import { Box, Modal, Typography, Grid, Button } from "@material-ui/core";
import { addComment, getQuoteComments } from "redux/actions/Comment";
import { useStyles } from "./styles";
import TextareaAutosize from "@mui/material/TextareaAutosize";

export const AddComment = ({ open, quoteId, handleClose }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    comment: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  const saveComment = (e) => {
    e.preventDefault();
    addComment(values, quoteId);
    setValues({
      comment: "",
    });
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={classes.modal}>
        <form onSubmit={saveComment}>
          <Typography className={classes.modalTitle}>Add Comment</Typography>
          <TextareaAutosize
            minRows={2}
            placeholder="Comment here"
            value={values.comment}
            name="comment"
            onChange={handleChange}
            className={classes.inputName}
            required
            style={{ width: 600 }}
          />
          <Grid style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              className={classes.itemActionBtn}
              style={{ borderRadius: "1rem", margin: "3% 0" }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className={`${classes.addItemBtn}`}
              style={{
                borderRadius: "1rem",
                margin: "3% 20px",
                padding: "15px 20px",
              }}
            >
              Comment
            </Button>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};
