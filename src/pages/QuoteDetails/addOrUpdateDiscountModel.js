import React, { useState, useEffect } from "react";
import { useStyles } from "./styles";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { updateQuoteDiscount, getQuote } from "redux/actions/quote";
import { Dialog, DialogContent, Typography, Grid, TextField, IconButton, InputLabel, Select } from "@material-ui/core";

export const AddOrUpdateDiscountModel = ({
  addingDiscount,
  setAddingDiscount,
  quoteId,
  discountModelStatus,
  updateDiscountData,
}) => {
  const classes = useStyles();
  const [discount, setDiscount] = useState('');
  const [discountInputError, setDiscountInputError] = useState();
  const [discountType, setDiscountType] = useState('');

  useEffect(() => {
    if (updateDiscountData) {
      setDiscount(updateDiscountData.discount)
      setDiscountType(updateDiscountData.discountType)
    } else if (updateDiscountData === null) {
      setDiscount('')
      setDiscountType('')
    }
  }, [updateDiscountData])

  const addOrUpdateDiscount = async () => {
    setDiscountInputError(null)
    if (discount.length === 0) return setDiscountInputError("Discount is required")
    if (discountType.length === 0)
      return setDiscountInputError("Discount type is required")
    if (discountType === 'Percentage' && parseInt(discount) >= 100)
      return setDiscountInputError("Discount percentage can not be 100% or greater")

    updateQuoteDiscount(quoteId, { discount, discountType })

    setDiscount('')
    setDiscountType('')
    return setAddingDiscount(false)
  };

  return (

    <Dialog
      open={addingDiscount}
      maxWidth="sm"
      fullWidth
      onClose={() => setAddingDiscount(false)}
      aria-labelledby="add-discount-title"
      aria-describedby="add-discount-description"
    >
      <DialogContent id="add-discount-description">
        <p className={classes.taxDialogTitle}>{discountModelStatus === 'addDiscount' ? 'Add discount' : 'Update discount'}</p>
        <p
          className={discountInputError ? classes.taxDialogError : classes.hidden}
        >
          {discountInputError}
        </p>
        <form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <div className="custom-select-field">

                <FormControl fullWidth>
                  <InputLabel
                    style={{
                      fontSize: "1rem",
                      lineHeight: "1rem",
                      marginBottom: "3%",
                    }}>Discount Type</InputLabel>
                  <Select
                    className={classes.input}
                    variant="outlined"
                    value={discountType}
                    onChange={e => setDiscountType(e.target.value)}
                  >
                    <MenuItem value='Percentage'>Percentage</MenuItem>
                    <MenuItem value='Flat'>Flat</MenuItem>
                  </Select>

                </FormControl>
              </div>
            </Grid>
            <Grid item md={6} xs={12}>
              <div className="custom-select-field">
                <Typography
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1rem",
                    marginBottom: "3%",
                  }}
                >
                  Amount
                </Typography>

                <TextField
                  className={classes.input}
                  variant="outlined"
                  type="number"
                  fullWidth
                  name="discount"
                  label="Ex: 10"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </div>
            </Grid>
          </Grid>

          <Grid style={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton
              variant="outlined"
              className={classes.itemActionBtn}
              style={{ borderRadius: "1rem", margin: "3% 0" }}
              onClick={() => {
                setDiscount('')
                setDiscountType('')
                setDiscountInputError(null)
                return setAddingDiscount(false)
              }}
            >
              Cancel
            </IconButton>
            <IconButton
              variant="outlined"
              className={classes.addItemBtn}
              style={{ margin: "3% 0 3% 3%", borderRadius: "1rem" }}
              onClick={() => addOrUpdateDiscount()}
            >
              {discountModelStatus === 'addDiscount' ? 'Add discount' : 'Update discount'}
            </IconButton>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};
