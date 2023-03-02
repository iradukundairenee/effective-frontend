import React, { useState, useEffect } from "react";
import { useStyles } from "./styles";
import { useSelector } from "react-redux";
import { getQuote } from "redux/actions/quote";
import { Box, Modal, Typography, Grid, Button } from "@material-ui/core";
import {
  getUnAddedQuotesItems,
  addQuoteItem,
  editQuoteItem,
} from "redux/actions/quote";
import { notifier } from '../../utils/notifier';

export const UpdateOrAddItem = ({
  open,
  quoteId,
  handleClose,
  item,
  action,
  currency
}) => {
  const classes = useStyles();
  const state = useSelector((state) => state);

  const [data, setData] = useState({ item: null, quantity: 1 });

  const {
    quoteAddItem: { loaded },
    quoteUnAddItem: { loading, items },
    login: {
      userInfo: { user },
    },
  } = state;

  useEffect(() => {
    if (user.role !== "Client") {
      getUnAddedQuotesItems(quoteId);
    }
  }, [quoteId, user.role]);

  useEffect(() => {
    if (action === "edit") return setData(item)
    return setData({ item: null, quantity: 1 })
  }, [action, item])

  const addItem = async (e) => {
    if (data.quantity < 0) return notifier.error('quantity can not be 0 or less')

    if (action === 'add' && (!data.item || data.item?.item === 'Select')) return notifier.error('Please Select Item')

    e.preventDefault();
    if (action === "add") {
      await addQuoteItem(quoteId, data);
      await getUnAddedQuotesItems(quoteId);
    } else {
      await editQuoteItem(item?._id, quoteId, { quantity: data.quantity });
    }

    await getQuote(quoteId);
    setData({ item: null, quantity: 1 });
    return handleClose();
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={classes.modal}>
        <form>
          <Typography className={classes.modalTitle}>
            {action === "edit" ? "Edit Item Data" : "Add Item"}
          </Typography>
          <Grid
            container
            spacing={2}
            style={{ display: "flex", padding: "0 1%" }}
          >
            {action === "edit" ? (
              <div style={{ width: '50%', padding: '1%' }}>
                <p className={classes.inputLabel}>Item</p>
                <input
                  value={item?.item?.item}
                  className={classes.inputs}
                  style={{
                    backgroundColor: "#e6e6e6",
                    pointerEvents: "none",
                  }}
                />
              </div>
            ) : (
              <div style={{ width: '50%', padding: '1%' }}>
                <p className={classes.inputLabel}>Item</p>
                <select
                  required
                  placeholder="choose item"
                  className={classes.inputs}
                  name="couponType"
                  onChange={e => setData({ ...data, item: JSON.parse(e.target.value) })}
                  disableUnderline={true}
                >
                  <option value={JSON.stringify({ item: 'Select' })} key={-1}>
                    Select
                  </option>
                  {items.map((item, index) => {
                    const itemData = JSON.stringify(item)
                    return (
                      <option value={itemData} key={index}>
                        {item.item}
                      </option>
                    )
                  })}
                </select>
              </div>
            )}
            <div style={{ width: '26%', padding: '1%' }}>
              <p className={classes.inputLabel}>Price</p>
              <input
                value={data.item?.price ? `${currency ? currency : ''} ${(data.item?.price * data.quantity).toLocaleString()}` : 0}
                className={classes.inputs}
                style={{
                  backgroundColor: "#e6e6e6",
                  pointerEvents: "none",
                }}
              />
            </div>
            <div
              style={{ width: '15%', padding: '1%' }}
            >
              <p className={classes.inputLabel}>Qty</p>
              <input
                required
                type="number"
                name="data"
                placeholder='quantity'
                defaultValue={data.quantity}
                className={classes.inputs}
                onChange={e => setData({ ...data, quantity: +e.target.value })}
              />
            </div>
          </Grid>
          <Typography className={classes.cardContent}></Typography>
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
                padding: "10px 15px",
              }}
              onClick={addItem}
            >
              {action === "edit" ? "Update Item" : "Save Item"}
            </Button>
          </Grid>
        </form>
      </Box>
    </Modal >
  );
};
