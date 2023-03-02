import React, { useState, useEffect } from "react";
import { useStyles } from "./styles";
import { getQuote } from "redux/actions/quote";
import { addQuoteTax, updateQuoteTax } from "redux/actions/quote";
import {
  Dialog,
  DialogContent,
  Typography,
  Grid,
  TextField,
  IconButton,
} from "@material-ui/core";

export const AddOrUpdateTaxModel = ({
  addingTax,
  setAddingTax,
  quoteId,
  taxModelStatus,
  updateTaxData,
}) => {
  const classes = useStyles();
  const [tax, setTax] = useState("");
  const [taxInputError, setTaxInputError] = useState();
  const [taxPercentage, setTaxPercentage] = useState("");

  useEffect(() => {
    if (updateTaxData) {
      setTax(updateTaxData.title);
      setTaxPercentage(updateTaxData.amount);
    } else if (updateTaxData === null) {
      setTax("");
      setTaxPercentage("");
    }
  }, [updateTaxData]);

  const addOrUpdateTax = async () => {
    setTaxInputError(null);
    if (tax.length === 0) return setTaxInputError("Tax is required");
    if (taxPercentage.length === 0)
      return setTaxInputError("Tax percentage is required");
    if (parseInt(taxPercentage) >= 100)
      return setTaxInputError("Tax percentage can not be 100% or greater");

    //  check model status
    if (taxModelStatus === "addTax")
      addQuoteTax(quoteId, { title: tax, amount: taxPercentage });

    if (taxModelStatus === "updateTax")
      updateQuoteTax(quoteId, updateTaxData._id, {
        title: tax,
        amount: taxPercentage,
      });

    getQuote(quoteId);
    setTax("");
    setTaxPercentage("");
    return setAddingTax(false);
  };

  return (
    <Dialog
      open={addingTax}
      maxWidth="sm"
      fullWidth
      onClose={() => setAddingTax(false)}
      aria-labelledby="add-tax-title"
      aria-describedby="add-tax-description"
    >
      <DialogContent id="add-tax-description">
        <p className={classes.taxDialogTtitle}>
          {taxModelStatus === "addTax" ? "Add Tax" : "Update Tax"}
        </p>
        <form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <div className="custom-select-field">
                <Typography
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1rem",
                    marginBottom: "3%",
                  }}
                >
                  Tax name
                </Typography>

                <TextField
                  className={classes.input}
                  variant="outlined"
                  fullWidth
                  name="comment"
                  label="Ex: VAT"
                  value={tax}
                  onChange={(e) => setTax(e.target.value)}
                />
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
                  Percentage
                </Typography>

                <TextField
                  className={classes.input}
                  variant="outlined"
                  type="number"
                  fullWidth
                  name="Tax"
                  label="Ex: 10"
                  value={taxPercentage}
                  onChange={(e) => setTaxPercentage(e.target.value)}
                />
              </div>
            </Grid>
          </Grid>
          <p
            className={taxInputError ? classes.taxDialogError : classes.hidden}
          >
            {taxInputError}
          </p>

          <Grid style={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton
              variant="outlined"
              className={classes.itemActionBtn}
              style={{ borderRadius: "1rem", margin: "3% 0" }}
              onClick={() => {
                setTax("");
                setTaxPercentage("");
                setTaxInputError(null);
                return setAddingTax(false);
              }}
            >
              Cancel
            </IconButton>
            <IconButton
              variant="outlined"
              className={classes.addItemBtn}
              style={{ margin: "3% 0 3% 3%", borderRadius: "1rem" }}
              onClick={() => addOrUpdateTax()}
            >
              {taxModelStatus === "addTax" ? "Add Tax" : "Update Tax"}
            </IconButton>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};
