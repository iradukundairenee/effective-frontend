import {
  Card,
  Grid,
  Typography,
  FormControl,
  TextField,
  Select,
  MenuItem,
  Button,
  CardActions,
  styled,
  Switch,
  FormControlLabel,
  FormGroup,
} from "@material-ui/core";
import moment from "moment";
import DateFnsUtils from "@date-io/date-fns";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BsArrowLeft, BsChevronDown } from "react-icons/bs";
import { useStyles } from "styles/formStyles";
import { useHistory } from "react-router-dom";
import { getAllCurrency } from "redux/actions/currency";
import { notifier } from "utils/notifier";
import { useSelector } from "react-redux";
import {
  addLoyaltyPoints,
  updateLoyaltyPoint,
} from "redux/actions/loyaltyPoints";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

const initialState = {
  name: "",
  code: "",
  currencyType: "",
  rule: { points: "", value: "" },
  generatedPoints: "",
  purchasedAmount: "",
  slabPoints: "",
  slab: "Disabled",
  startDate: moment().format("YYYY-MM-DD"),
  slabAmount: "",
  validity: moment().format("YYYY-MM-DD"),
};

const SwitchButton = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 40,
  height: 16,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(20px)",
      color: "#219653",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#EFF0F6" : "#EFF0F6",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #219653",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color: theme.palette.mode === "light" ? "#EFF0F6" : "#EFF0F6",
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? "#EFF0F6" : "#EFF0F6",
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 15,
    height: 12,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#EFF0F6" : "#EFF0F6",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

export const AddLoyaltyPoints = ({
  action = "add" || "edit",
  currentItem = null,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const { pointsId } = useParams();
  const [values, setValues] = useState(initialState);
  const [currCurrency, setCurrCurrency] = useState();
  const [checked, setChecked] = useState(false);
  const [notify, setNotify] = useState(false);
  const LoyaltyPointsState = useSelector((state) => state);
  const {
    getCurrencies: { currencies },
    loyaltyPointsAdd: { loading, loaded },
    updateLoyaltyPoints: { loaded: updated },
  } = LoyaltyPointsState;

  useEffect(() => {
    getAllCurrency();
  }, []);

  useEffect(() => {
    if (action === "edit" && currentItem) {
      setValues({
        ...currentItem,
        currencyType: currentItem.currencyType._id,
      });
      setCurrCurrency(currentItem.currencyType);
      setChecked(currentItem.slab === "Enabled" ? true : false);
    }
  }, [action, currentItem]);

  useEffect(() => {
    if (loaded && notify) {
      notifier.success("loyalty point created successfully");
      history.goBack();
      return setNotify(false);
    }
    if (updated && notify) {
      notifier.success("loyalty point Updated successfully");
      history.goBack();
      return setNotify(false);
    }
  }, [history, loaded, notify, updated]);

  const handleChange = (e) => {
    e.preventDefault();
    const {
      target: { name, value },
    } = e;
    setValues({ ...values, [name]: value });
  };
  const handleChangeRule = (e) => {
    e.preventDefault();
    const {
      target: { name, value },
    } = e;
    setValues({ ...values, rule: { ...values.rule, [name]: value } });
  };

  const submitHandler = async (e) => {
    if (action === "add") {
      e.preventDefault();
      await addLoyaltyPoints(values);
      return setNotify(true);
    }
    if (action === "edit") {
      e.preventDefault();
      await updateLoyaltyPoint(pointsId, values);
      return setNotify(true);
    }
  };

  const onSwitch = (e) => {
    const { checked } = e.target;
    setChecked(checked);
    checked
      ? setValues({ ...values, slab: "Enabled" })
      : setValues({ ...values, slab: "Disabled" });
  };

  const changeStartDate = (value) => {
    setValues({ ...values, startDate: value });
  };

  const changeValidity = (value) => {
    setValues({ ...values, validity: value });
  };

  return (
    <Card component="main" className={classes.root}>
      <Grid className={classes.paper}>
        <Link to="/dashboard/loyaltypoints" className={classes.avatar}>
          <BsArrowLeft />
        </Link>
        <Typography className={classes.title}>
          {currentItem && action === "edit"
            ? `Update ${currentItem.name}`
            : "Create Loyalty Points"}
        </Typography>
      </Grid>
      <div className={classes.paper}>
        <form className={classes.form} onSubmit={submitHandler}>
          <Grid
            container
            spacing={2}
            style={{
              marginTop: "25px",
              justifyContent: "space-around",
              marginBottom: "25px",
            }}
          >
            <Grid className={classes.nameInputContainer}>
              <Typography className={classes.inputTitle}>
                Loyalty Name
              </Typography>
              <TextField
                required
                className={classes.input}
                name="name"
                defaultValue={currentItem && currentItem.name}
                onChange={handleChange}
                autoFocus
                fullWidth
                InputProps={{ disableUnderline: true }}
                placeholder="Summer Off"
              />
            </Grid>

            <Grid className={classes.nameInputContainer}>
              <Typography className={classes.inputTitle}>
                Loyalty Code
              </Typography>
              <TextField
                required
                className={classes.input}
                defaultValue={currentItem && currentItem.code}
                name="code"
                onChange={handleChange}
                autoFocus
                fullWidth
                InputProps={{ disableUnderline: true }}
                placeholder="SUM2113"
              />
            </Grid>
          </Grid>

          <Grid
            container
            spacing={2}
            style={{
              marginTop: "25px",
              justifyContent: "space-evenly",
              marginBottom: "25px",
            }}
          >
            <FormControl style={{ width: "47%" }}>
              <Typography className={classes.inputTitle}>
                Type of Currency
              </Typography>
              <select
                name="currencyType"
                onChange={handleChange}
                style={{
                  padding: "15px 15px",
                  backgroundColor: "#fff",
                }}
                className={classes.input}
              >
                {currCurrency && (
                  <option value={currCurrency._id} hidden>
                    {currCurrency.currencyCode}
                  </option>
                )}
                {currencies.map((curr, idx) => (
                  <option value={curr._id} key={idx}>
                    {curr.currencyCode && curr.currencyCode}
                  </option>
                ))}
              </select>
            </FormControl>
            <Grid
              className={classes.nameInputContainer}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Grid style={{ width: "45%" }}>
                <Typography className={classes.inputTitle}>Points</Typography>
                <TextField
                  required
                  className={classes.input}
                  defaultValue={
                    currentItem && currentItem.rule && currentItem.rule.points
                  }
                  name="points"
                  onChange={handleChangeRule}
                  fullWidth
                  InputProps={{ disableUnderline: true }}
                  placeholder="1point"
                />
              </Grid>
              <Grid style={{ width: "45%" }}>
                <Typography className={classes.inputTitle}>Value</Typography>
                <TextField
                  required
                  className={classes.input}
                  defaultValue={
                    currentItem && currentItem.rule && currentItem.rule.value
                  }
                  name="value"
                  onChange={handleChangeRule}
                  fullWidth
                  InputProps={{ disableUnderline: true }}
                  placeholder="0.05 USD."
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={2}
            style={{
              marginTop: "25px",
              justifyContent: "space-around",
              marginBottom: "25px",
            }}
          >
            <Grid className={classes.nameInputContainer}>
              <Typography className={classes.inputTitle}>
                Points Generated
              </Typography>
              <TextField
                required
                className={classes.input}
                defaultValue={currentItem && currentItem.generatedPoints}
                name="generatedPoints"
                onChange={handleChange}
                fullWidth
                InputProps={{ disableUnderline: true }}
                placeholder="Based on the purchase value points will be generate"
              />
            </Grid>

            <FormControl className={classes.nameInputContainer}>
              <Typography className={classes.inputTitle}>
                Purchase Value Amount
              </Typography>
              <TextField
                required
                className={classes.input}
                defaultValue={currentItem && currentItem.purchasedAmount}
                name="purchasedAmount"
                onChange={handleChange}
                fullWidth
                InputProps={{ disableUnderline: true }}
                placeholder="Enter amount"
              />
            </FormControl>
          </Grid>
          <Grid style={{ display: "flex", marginLeft: "30px" }}>
            <FormGroup style={{ width: "35px" }}>
              <FormControlLabel
                control={<SwitchButton checked={checked} onChange={onSwitch} />}
              />
            </FormGroup>
            <Typography>Points added based on Slab [Enable]</Typography>
          </Grid>
          {checked ? (
            <Grid>
              <Grid
                style={{
                  display: "grid",
                  gridTemplateColumns: "50% 50%",
                  marginLeft: "30px",
                  marginTop: "30px",
                  width: "100%",
                }}
              >
                <Grid>
                  <Typography className={classes.inputTitle}>
                    Slab Start Date
                  </Typography>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      defaultValue={currentItem && currentItem.startDate}
                      value={values.startDate}
                      InputAdornmentProps={{ position: "end" }}
                      format="yyyy-MM-dd"
                      views={["year", "month", "date"]}
                      onChange={changeStartDate}
                      className={classes.input}
                      InputProps={{ disableUnderline: true }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid>
                  <Typography className={classes.inputTitle}>
                    Slab Validity
                  </Typography>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      defaultValue={currentItem && currentItem.validity}
                      value={values.validity}
                      InputAdornmentProps={{ position: "end" }}
                      format="yyyy-MM-dd"
                      views={["year", "month", "date"]}
                      onChange={changeValidity}
                      className={classes.input}
                      InputProps={{ disableUnderline: true }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
              </Grid>
              <Grid
                container
                spacing={2}
                style={{
                  marginTop: "25px",
                  justifyContent: "space-around",
                  marginBottom: "25px",
                }}
              >
                <Grid className={classes.nameInputContainer}>
                  <Typography className={classes.inputTitle}>
                    Lump sum purchase amount
                  </Typography>
                  <TextField
                    required
                    className={classes.input}
                    defaultValue={currentItem && currentItem.slabAmount}
                    name="slabAmount"
                    onChange={handleChange}
                    fullWidth
                    InputProps={{ disableUnderline: true }}
                    placeholder="Enter Lump sum purchase amount"
                  />
                </Grid>

                <FormControl className={classes.nameInputContainer}>
                  <Typography className={classes.inputTitle}>
                    Lump sum points Generated
                  </Typography>
                  <TextField
                    required
                    className={classes.input}
                    defaultValue={currentItem && currentItem.slabPoints}
                    name="slabPoints"
                    onChange={handleChange}
                    fullWidth
                    InputProps={{ disableUnderline: true }}
                    placeholder="Enter points to be generate (Lump sum)"
                  />
                </FormControl>
              </Grid>
            </Grid>
          ) : (
            ""
          )}
          <CardActions>
            <Grid container spacing={2} className={classes.actions}>
              <Grid item>
                <Button
                  type="cancel"
                  variant="contained"
                  className={classes.cancel}
                  onClick={() => history.goBack()}
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
                    // disabled={adding}
                  >
                    Submit
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    className={classes.submit}
                    // disabled={adding}
                  >
                    Update
                  </Button>
                )}
              </Grid>
            </Grid>
          </CardActions>
        </form>
      </div>
    </Card>
  );
};
