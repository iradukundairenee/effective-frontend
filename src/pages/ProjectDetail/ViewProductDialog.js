import React from "react";
import { ProductViewPage } from "pages/ProductView";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@material-ui/core";

export const ViewProductDialog = ({ productId, open, setOpen }) => {
  const match = { params: { productId } };
  return (
    <Dialog
      open={open}
      keepMounted
      onClose={setOpen}
      maxWidth="lg"
      fullWidth
      aria-labelledby="view-product"
      aria-describedby="project-description"
    >
      <DialogTitle id="view-product">Asset View</DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <ProductViewPage
              match={match}
              styles={{ width: "100%", height: "70vh" }}
              addVisit={false}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={() => setOpen()}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
