import {
  Card,
  Grid,
  Button,
  TextField,
  Typography,
  CardActions,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useEditModelStyles } from "./styles";
import { BsChevronDown } from "react-icons/bs";
import { getAllCurrency } from "../../redux/actions/currency";
import { getItems, addItem, updateItem } from "redux/actions/item";

export const CreateItem = ({ item, isOpen, action, setIsOpen }) => {
  const classes = useEditModelStyles();
  const [price, setPrice] = useState();
  const [newItem, setNewItem] = useState("");
  const [currency, setCurrency] = useState(null);

  useEffect(() => {
    if (action === "edit" && item) {
      setNewItem(item.item);
      setPrice(item.price);
      setCurrency(JSON.stringify(item.currency));
    }
  }, [action, item]);

  const appState = useSelector((state) => state);

  const {
    getCurrencies: { currencies },
  } = appState;

  useEffect(() => {
    getAllCurrency();
  }, []);

  const createUpdateItem = async (e) => {
    e.preventDefault();

    const currencyValue = JSON.parse(currency)

    if (action === "edit") {
      await updateItem({ item: newItem, price, currency: currencyValue }, item._id,);
    } else await addItem({ item: newItem, price, currency: currencyValue });

    setNewItem("");
    setPrice("");
    setCurrency(null);
    await getItems();
    return setIsOpen(false);
  };

  return (
    <div className={isOpen ? classes.createItemContainer : classes.hidden}>
      <div
        className={classes.editModel}
        onClick={() => {
          setPrice();
          setNewItem("");
          setCurrency("");
          return setIsOpen(false);
        }}
      ></div>
      <Card component="main" className={classes.main}>
        <div className={classes.paper}>
          <form>
            <Grid container spacing={2} className={classes.nameInputContainer}>
              <Grid>
                <Typography className={classes.inputTitle}>Name</Typography>
                <TextField
                  required
                  value={newItem}
                  className={classes.currInput}
                  name="item"
                  onChange={(e) => setNewItem(e.target.value)}
                  autoFocus
                  fullWidth
                  InputProps={{ disableUnderline: true }}
                  placeholder="Item name"
                />
              </Grid>

              <Grid>
                <Typography className={classes.inputTitle}>Price</Typography>
                <TextField
                  required
                  value={price}
                  className={classes.currInput}
                  name="item"
                  type="number"
                  onChange={(e) => setPrice(e.target.value)}
                  autoFocus
                  fullWidth
                  InputProps={{ disableUnderline: true }}
                  placeholder="012345"
                />
              </Grid>

              <Grid>
                <Typography className={classes.inputTitle}>currency</Typography>
                <select
                  required
                  defaultValue={currency}
                  placeholder="$"
                  className={classes.selectInput}
                  name="couponType"
                  onChange={(e) => setCurrency(e.target.value)}
                  disableUnderline={true}
                  IconComponent={() => <BsChevronDown color="#7D7D7D" />}
                >
                  <option value={item.currency && item.currency._id} key={-1}>
                    {item.currency ? item.currency.currencyCode : "Select"}
                  </option>
                  {currencies.map((currency, index) => {
                    const { _id, currencyName, currencyCode, icon, taxName, taxPercentage } = currency
                    return (
                      <option value={`{ "_id": "${_id}", "currencyName": "${currencyName}", "currencyCode": "${currencyCode}", "icon": "${icon}", "taxName": "${taxName}", "taxPercentage": "${taxPercentage}" }`} key={index}>
                        {currency.currencyName}
                      </option>
                    )
                  })}
                </select>
              </Grid>
            </Grid>

            <CardActions>
              <Grid container spacing={2} className={classes.actions}>
                <Grid item>
                  <Button
                    type="cancel"
                    variant="contained"
                    className={classes.cancel}
                    onClick={() => {
                      setPrice();
                      setNewItem("");
                      setCurrency("");
                      return setIsOpen(false);
                    }}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item>
                  {action === "add" ? (
                    <Button
                      type="submit"
                      variant="contained"
                      className={classes.submit}
                      onClick={createUpdateItem}
                    >
                      Submit
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant="contained"
                      className={classes.submit}
                      onClick={createUpdateItem}
                    >
                      Update
                    </Button>
                  )}
                </Grid>
              </Grid>
            </CardActions>
          </form>
        </div>
      </Card >
    </div >
  );
};
