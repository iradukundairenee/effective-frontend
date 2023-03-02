import React, { useEffect, useState } from "react";
import HtmlParser from "react-html-parser";
import {
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import {
  EditRounded as EditIcon,
  Delete as DeleteIcon,
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from "@material-ui/icons";
import { NoDisplayData } from "components/NoDisplayData";
import { updateQuote } from "redux/actions/quote";
import { INVOICE_ROUTE } from "utils/constants";

const initialItem = { name: "", quantity: "", price: "", total: "" };
const aggregateInit = { subtotal: 0, tax: 0, discount: 0, total: 0 };

const calculateAggregate = (items = [], { taxes, discount, isFixed }) => {
  const grandTotal = Number(items.reduce((sum, item) => sum + item.total, 0));
  const totDiscount = isFixed ? discount : (grandTotal * discount) / 100;
  const subTotal = grandTotal - totDiscount;
  const tax = taxes.reduce((a, b) => a + b.amount, 0);
  const totTax = (subTotal * tax) / 100;
  const aggreg = {
    subtotal: grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 }),
    tax: totTax.toLocaleString(undefined, { minimumFractionDigits: 2 }),
    discount: totDiscount.toLocaleString(undefined, { minimumFractionDigits: 2 }),
    total: (subTotal + totTax).toLocaleString(undefined, { minimumFractionDigits: 2 }),
  };
  return aggreg;
};
const hasExpired = (aDate) => {
  const today = new Date();
  const theDate = new Date(aDate);
  return today.getTime() < theDate.getTime();
};
export const QuoteItemsDialog = ({
  open,
  setOpen,
  quote,
  loading = false,
  user = {},
}) => {
  const [item, setItem] = useState(initialItem);
  const [aggregate, setAggregate] = useState(aggregateInit);
  const [items, setItems] = useState([]);
  useEffect(() => {
    if (quote && quote.items) {
      setItems(quote?.items || []);
      setAggregate(quote?.amounts || {});
    }
  }, [quote]);
  const onHandleChange = ({ target: { name, value } }) => {
    setItem((prev) => ({ ...prev, [name]: value }));
  };
  const onHandleCommentChange = ({ target: { value } }) => {
    quote.comment = value;
  };
  const updateItems = (newItems) => {
    const aggregs = calculateAggregate(newItems, quote);
    setItems(newItems);
    setAggregate(aggregs);
    setItem(initialItem);
    quote.items = newItems;
    quote.amounts = aggregs;
  };
  const onAdd = () => {
    const theItems = [...items];
    const index = theItems.findIndex((i) => i.name === item.name);
    item.total = item.price * item.quantity;
    if (index < 0) {
      theItems.push(item);
    } else {
      theItems[index].price = item.price;
      theItems[index].quantity = item.quantity;
      theItems[index].total = item.total;
    }
    updateItems(theItems);
  };
  const onRemove = (itemName) => {
    const newItems = items.filter((i) => i.name !== itemName);
    updateItems(newItems);
  };
  const onQuoteUpdate = (status = "Draft") => {
    const { project, user, updatedAt, createdAt, _id, __v, ...rest } = quote;
    rest.projectId = project._id;
    rest.status = status;
    updateQuote(rest, _id);
  };
  return (
    <Dialog
      open={open}
      keepMounted
      onClose={setOpen}
      maxWidth="lg"
      fullWidth
      aria-labelledby="quote-items-title"
      aria-describedby="quote-items-description"
    >
      <DialogTitle id="quote-items-title">Manage proposal items</DialogTitle>
      <DialogContent>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={7} lg={7}>
            <Grid item xs={12}>
              <Typography variant="h4">Proposal text</Typography>
              <hr />
              {HtmlParser(quote?.propasalText)}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4">Customer note</Typography>
              <hr />
              {HtmlParser(quote?.customerNote)}
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={5} lg={5}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <TextField
                  name="name"
                  variant="outlined"
                  fullWidth
                  label="Name"
                  onChange={onHandleChange}
                  value={item.name}
                  size="small"
                  disabled={
                    user.role === "Client" ||
                    (quote?.status !== "Draft" && quote?.status !== "Pending")
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3}>
                <TextField
                  name="price"
                  variant="outlined"
                  fullWidth
                  label="Price"
                  type="number"
                  onChange={onHandleChange}
                  value={item.price}
                  size="small"
                  disabled={item.name === ""}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3}>
                <TextField
                  name="quantity"
                  variant="outlined"
                  fullWidth
                  label="Quantity"
                  type="number"
                  onChange={onHandleChange}
                  value={item.quantity}
                  size="small"
                  disabled={item.price <= 0}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={2} lg={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => onAdd()}
                  disabled={item.quantity <= 0}
                >
                  Add
                </Button>
              </Grid>
              <Grid item xs={12}>
                <TableContainer component={Paper}>
                  {items.length > 0 ? (
                    <Table aria-label="item-table" size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center" colSpan={3}>
                            Item details
                          </TableCell>
                          <TableCell align="right">Item price</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell align="right">Qty.</TableCell>
                          <TableCell align="right">Price</TableCell>
                          <TableCell align="right">Total</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {items.map((item, itemIdx) => (
                          <TableRow key={itemIdx}>
                            <TableCell>
                              {item.name}
                              {user.role !== "Client" && (
                                <>
                                  <IconButton
                                    size="small"
                                    onClick={() =>
                                      setItem((prev) => ({ ...prev, ...item }))
                                    }
                                  >
                                    <EditIcon />
                                  </IconButton>
                                  <IconButton
                                    size="small"
                                    onClick={() => onRemove(item.name)}
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </>
                              )}
                            </TableCell>
                            <TableCell align="right">{item.quantity}</TableCell>
                            <TableCell align="right">
                              ${item.price?.toLocaleString("en-US")}
                            </TableCell>
                            <TableCell align="right">
                              ${item.total?.toLocaleString("en-US")}
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow>
                          <TableCell rowSpan={4} />
                          <TableCell colSpan={2}>Subtotal</TableCell>
                          <TableCell align="right">
                            ${aggregate.subtotal?.toLocaleString("en-US")}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Taxes</TableCell>
                          <TableCell align="right">
                            {quote?.taxes?.reduce(
                              (a, b) => a + `${b.amount}%, `,
                              ""
                            )}
                          </TableCell>
                          <TableCell align="right">
                            ${aggregate.tax?.toLocaleString("en-US")}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Discount</TableCell>
                          <TableCell align="right">
                            {quote?.isFixed
                              ? `${quote?.discount.toLocaleString("en-US")}`
                              : `${quote?.discount}%`}
                          </TableCell>
                          <TableCell align="right">
                            ${aggregate.discount?.toLocaleString("en-US")}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={2}>Total</TableCell>
                          <TableCell align="right">
                            ${aggregate.total?.toLocaleString("en-US")}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  ) : (
                    <NoDisplayData message="Not items added yet" />
                  )}
                </TableContainer>
              </Grid>
              {user.role === "Client" && (
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="comment"
                    label="Add comment"
                    value={quote?.comment}
                    disabled={quote?.status !== "Pending"}
                    onChange={onHandleCommentChange}
                  />
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          color="default"
          variant="contained"
          component="a"
          aria-label="Print invoice"
          rel="noreferrer"
          href={`${INVOICE_ROUTE}/${quote?._id}?downloadType=proposal`}
          target="_blank"
        >
          Download PDF
        </Button>
        {(quote?.status === "Pending" ||
          quote?.status === "Draft" ||
          hasExpired(quote?.expiryDate)) && (
            <ButtonGroup variant="outlined" color="primary">
              {user.role !== "Client" ? (
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => onQuoteUpdate()}
                  disabled={loading}
                >
                  <SaveIcon />
                  {loading ? "Saving,..." : "Save"}
                </Button>
              ) : (
                quote?.status === "Pending" && (
                  <>
                    <Button
                      aria-label="Change status"
                      color="primary"
                      disabled={loading}
                      onClick={() => onQuoteUpdate("Accepted")}
                    >
                      <ThumbUpIcon />
                      {loading ? "Saving,..." : "Accept"}
                    </Button>
                    <Button
                      aria-label="Change status"
                      color="secondary"
                      disabled={loading}
                      onClick={() => onQuoteUpdate("Declined")}
                    >
                      <ThumbDownIcon />
                      {loading ? "Saving,..." : "Decline"}
                    </Button>
                  </>
                )
              )}
            </ButtonGroup>
          )}
        <Button color="default" variant="contained" onClick={() => setOpen()}>
          <CancelIcon />
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
