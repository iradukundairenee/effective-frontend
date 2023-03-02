import React, { forwardRef, useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Typography,
  Avatar,
  Grid,
} from "@material-ui/core";
import { useStyles } from "./styles";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const CustomerModel = ({
  open = false,
  setOpen,
  currentItem = null,
}) => {
  const classes = useStyles();
  const [customer, setCustomer] = useState({});
  useEffect(() => {
    if (currentItem) {
      setCustomer(currentItem);
    }
  }, [currentItem]);
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={setOpen}
      aria-labelledby="customer-name"
      aria-describedby="customer-description"
      maxWidth="lg"
    >
      <DialogTitle id="customer-name">
        {`Customer names: ${customer.firstName}`}
      </DialogTitle>
      <DialogContent>
        <Avatar className={classes.avatar} src={customer.avatar} />
        <Typography className={classes.name} gutterBottom variant="h3">
          {customer.firstName} {customer.lastName}({customer.role})
        </Typography>
        <Grid container>
          <Grid item xs={12} sm={6} md={8} lg={8} className={classes.userInfo}>
            <Typography color="textSecondary" variant="body1">
              {customer.city}, {customer.state}, {customer.country}
            </Typography>
            <Typography color="textSecondary" variant="body1">
              {customer.phoneNumber}
            </Typography>
            <Typography color="textSecondary" variant="body1">
              {customer.email}
            </Typography>
            <Typography color="textSecondary" variant="body2">
              Postal code: {customer.postalCode}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4} className={classes.companyInfo}>
            <Typography color="textSecondary" variant="body1">
              Company: {customer.companyName}
              <br />
              Company URL:{customer.companyUrl}
              <br />
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={setOpen} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
