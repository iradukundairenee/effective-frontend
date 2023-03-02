import React, { forwardRef, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Slide,
  TextField,
} from "@material-ui/core";
import { useStyles } from "styles/formStyles";
import { useSelector } from "react-redux";
import { addProjectProd } from "redux/actions/project";
import { getProducts } from "redux/actions/product";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const AddProductDialog = ({
  open,
  setOpen,
  values,
  setValues,
  projectId,
}) => {
  const classes = useStyles();
  const {
    productsGet: { products },
    projectAddProd: { loading },
  } = useSelector((state) => state);

  useEffect(() => {
    getProducts({ projectId });
  }, [projectId]);
  const onHandleChange = ({ target: { name, value } }) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };
  const onHandleSubmit = (e) => {
    e.preventDefault();
    addProjectProd(values);
  };
  return (
    <Dialog
      open={open}
      keepMounted
      onClose={setOpen}
      TransitionComponent={Transition}
      aria-labelledby="add-product"
      aria-describedby="project-description"
    >
      <DialogTitle id="add-product">
        Add a new product to the project
      </DialogTitle>
      <DialogContent>
        <form className={classes.form} onSubmit={onHandleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="product-id">Select product</InputLabel>
                <Select
                  labelId="product-id"
                  name="product"
                  value={values.product}
                  onChange={onHandleChange}
                >
                  <MenuItem value="">---</MenuItem>
                  {products.map((product, productIdx) => (
                    <MenuItem value={product._id} key={productIdx}>
                      {product.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.input}
                name="website"
                value={values.website}
                fullWidth
                label="Enter the Website"
                onChange={onHandleChange}
                autoFocus
              />
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              disabled={loading}
            >
              {loading ? "Saving,..." : "Save"}
            </Button>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={setOpen} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
