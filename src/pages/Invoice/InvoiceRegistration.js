import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Typography,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Card,
  CardActions,
} from "@material-ui/core";
import { ComputerOutlined } from "@material-ui/icons";
import { Loading } from "components/loading.component";
import { useStyles } from "styles/formStyles";
import { updateInvoice } from "redux/actions/invoice";

const initialState = {
  amount: "",
  status: "pending",
};
const invoiceStatuses = ["pending", "paid"];
export const InvoiceRegistration = ({ action = "add", currentItem = null }) => {
  const classes = useStyles();
  const [values, setValues] = useState(initialState);
  const inviceState = useSelector((state) => state);

  const {
    invoiceEdit: { loading: updating, loaded: updated },
  } = inviceState;

  useEffect(() => {
    if (updated) {
      setValues(initialState);
    }
  }, [updated]);
  useEffect(() => {
    if (currentItem) {
      const { status, amount } = currentItem;
      setValues({ amount, status });
    }
  }, [currentItem]);
  const onHandleChange = (e) => {
    e.preventDefault();
    const {
      target: { name, value },
    } = e;
    setValues({ ...values, [name]: value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (action !== "add" && currentItem) {
      updateInvoice(values, currentItem._id);
    }
  };
  return (
    <Card component="main" className={classes.root}>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <ComputerOutlined />
        </Avatar>
        <Typography component="h1" variant="h4">
          Invoice
        </Typography>
        {updating && <Loading />}
        {currentItem ? (
          <form className={classes.form} onSubmit={submitHandler}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  className={classes.input}
                  name="amount"
                  variant="outlined"
                  fullWidth
                  label="Invoice amount"
                  onChange={onHandleChange}
                  value={values.amount}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="invoice-status">Status</InputLabel>
                  <Select
                    labelId="invoice-status"
                    value={values.status}
                    name="status"
                    onChange={onHandleChange}
                    disabled={action !== "change"}
                  >
                    <MenuItem value="">---</MenuItem>
                    {invoiceStatuses.map((status, choiceIdx) => (
                      <MenuItem value={status} key={choiceIdx}>
                        {status.toUpperCase()}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <CardActions>
              {action === "add" ? (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  className={classes.submit}
                >
                  Save
                </Button>
              ) : (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  className={classes.submit}
                  disabled={updating}
                >
                  Change invoice status
                </Button>
              )}
            </CardActions>
          </form>
        ) : (
          <Typography variant="caption">
            You can change a status of an invoice
          </Typography>
        )}
      </div>
    </Card>
  );
};
