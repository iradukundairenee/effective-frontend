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
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import { FiXSquare } from "react-icons/fi";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BsArrowLeft, BsChevronDown } from "react-icons/bs";
import { useStyles } from "styles/formStyles";
import { useHistory } from "react-router-dom";
import { getAllCurrency } from "redux/actions/currency";
import { notifier } from "utils/notifier";
import { useSelector } from "react-redux";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { createCoupon, updateCoupon } from "redux/actions/coupons";
import { getUsersList } from "redux/actions/user";
import moment from "moment";

const initialState = {
  couponName: "",
  couponCode: "",
  couponType: "",
  discountAmount: "",
  currencyType: null,
  percentageValue: "",
  maxCap: "",
  startDate: moment().format("YYYY-MM-DD"),
  validity: moment().format("YYYY-MM-DD"),
  applicability: "",
  customerList: [],
  enable: true,
};

export const CreateCoupon = ({
  action = "add" || "edit",
  currentItem = null,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const { couponId } = useParams();
  const [values, setValues] = useState(initialState);
  const [currCurrency, setCurrCurrency] = useState();
  const [checklist, setChecklist] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  const typeCoupons = ["Flat", "Percentage"];
  const applicability = ["Subscription", "Assets order"];

  const currencyState = useSelector((state) => state);
  const subscriptionState = useSelector((state) => state);
  const {
    getCurrencies: { currencies },
    createCoupon: { loaded: couponCreated },
    updateCoupon: { loaded: updated },
  } = currencyState;

  const {
    userList: { users },
  } = subscriptionState;

  useEffect(() => {
    if (searchKey === "") {
      setFilteredUsers([]);
    }
  }, [searchKey]);

  const searchUsers = (e) => {
    const searchedUsers = users.filter((key) => {
      return `${key.fullName}`.includes(e.target.value);
    });
    setFilteredUsers(searchedUsers);
    setSearchKey(e.target.value);
  };

  useEffect(() => {
    getAllCurrency();
    getUsersList("Client");
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    const {
      target: { name, value },
    } = e;
    setValues({ ...values, [name]: value });
  };
  const changeStartDate = (value) => {
    setValues({ ...values, startDate: value });
  };
  const changeValidation = (value) => {
    setValues({ ...values, validity: value });
  };
  const changeEnable = (e) => {
    setValues({ ...values, enable: e.target.checked });
  };

  const changeDetails = (e) => {
    setValues({
      ...values,
      customerList: [...values.customerList, e],
    });
    setChecklist([...checklist, e]);
  };

  useEffect(() => {
    if (action === "edit") {
      if (currentItem) {
        setValues({
          ...currentItem,
          currencyType: currentItem.currencyType._id,
        });
      }
      setCurrCurrency(currentItem.currencyType);
    }
  }, [action, currentItem]);

  const submitHandler = async (e) => {
    if (action === "add") {
      e.preventDefault();
      await createCoupon(values);
    }
    if (action === "edit") {
      e.preventDefault();
      await updateCoupon(couponId, values);
    }
  };

  if (couponCreated) {
    notifier.success("Coupon created");
    history.push("/dashboard/coupons");
  }
  if (updated) {
    notifier.success("Coupon update");
    history.push("/dashboard/coupons");
  }

  const removeItem = (item) => {
    setValues({
      ...values,
      customerList: values.customerList.filter((it) => {
        return it !== item;
      }),
    });
  };

  return (
    <Card component="main" className={classes.root}>
      <Grid className={classes.paper}>
        <Link to="/dashboard/coupons" className={classes.avatar}>
          <BsArrowLeft />
        </Link>

        <Typography className={classes.title}>
          {currentItem && action === "edit"
            ? `Update ${currentItem?.couponName}`
            : "Create Coupon"}
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
                Coupon Name
              </Typography>
              <TextField
                required
                defaultValue={currentItem && currentItem.couponName}
                className={classes.input}
                name="couponName"
                onChange={handleChange}
                autoFocus
                fullWidth
                InputProps={{ disableUnderline: true }}
                placeholder="Summer Off"
              />
            </Grid>
            <Grid className={classes.nameInputContainer}>
              <Typography className={classes.inputTitle}>
                Coupon Code
              </Typography>
              <TextField
                required
                defaultValue={currentItem && currentItem.couponCode}
                className={classes.input}
                name="couponCode"
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
              justifyContent: "space-around",
              marginBottom: "25px",
            }}
          >
            <FormControl style={{ width: "30%" }}>
              <Typography className={classes.inputTitle}>
                Type of Coupon
              </Typography>
              <Select
                required
                value={values && values.couponType}
                // defaultValue={currentItem && currentItem.couponType}
                className={classes.input}
                name="couponType"
                onChange={handleChange}
                disableUnderline={true}
                IconComponent={() => <BsChevronDown color="#7D7D7D" />}
              >
                {typeCoupons.map((cyle, choiceIdx) => (
                  <MenuItem value={cyle} key={choiceIdx}>
                    {cyle.toUpperCase()}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl
              style={{ width: "30%" }}
              className={values.couponType !== "Flat" && classes.disabled}
            >
              <Typography className={classes.inputTitle}>
                Discount Amount
              </Typography>
              <TextField
                className={classes.input}
                defaultValue={currentItem && currentItem.discountAmount}
                name="discountAmount"
                onChange={handleChange}
                fullWidth
                InputProps={{ disableUnderline: true }}
                placeholder="Enter Amount"
              />
            </FormControl>

            <FormControl style={{ width: "30%" }}>
              <Typography className={classes.inputTitle}>
                Type of Currency
              </Typography>
              <select
                name="currencyType"
                onChange={handleChange}
                style={{
                  padding: "15px 5px",
                  backgroundColor: "#fff",
                }}
                className={classes.input}
              >
                {action === "edit" && currCurrency && (
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
          </Grid>

          <Grid
            container
            spacing={2}
            style={{
              marginTop: "25px",
              justifyContent: "space-around",
              marginBottom: "25px",
            }}
            className={values.couponType !== "Percentage" && classes.disabled}
          >
            <Grid className={classes.nameInputContainer}>
              <Typography className={classes.inputTitle}>
                Percentage Value
              </Typography>
              <TextField
                className={classes.input}
                defaultValue={currentItem && currentItem.percentageValue}
                name="percentageValue"
                onChange={handleChange}
                fullWidth
                InputProps={{ disableUnderline: true }}
                placeholder="Enter Percentage"
              />
            </Grid>

            <FormControl className={classes.nameInputContainer}>
              <Typography className={classes.inputTitle}>Max Cap</Typography>
              <TextField
                className={classes.input}
                defaultValue={currentItem && currentItem.maxCap}
                name="maxCap"
                onChange={handleChange}
                fullWidth
                InputProps={{ disableUnderline: true }}
                placeholder="Enter Max Cap"
              />
            </FormControl>
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
            <Grid className={classes.dateInputContainer}>
              <Typography className={classes.inputTitle}>Start Date</Typography>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  style={{ width: "100%" }}
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

            <Grid className={classes.dateInputContainer}>
              <Typography className={classes.inputTitle}>Validity</Typography>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  style={{ width: "100%" }}
                  value={values.validity}
                  InputAdornmentProps={{ position: "end" }}
                  format="yyyy-MM-dd"
                  views={["year", "month", "date"]}
                  onChange={changeValidation}
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
              marginBottom: "15px",
            }}
          >
            <FormControl style={{ width: "45%" }}>
              <Typography className={classes.inputTitle}>
                Applicability
              </Typography>
              <Select
                required
                defaultValue={
                  (currentItem && currentItem.applicability) || applicability[0]
                }
                className={classes.input}
                name="applicability"
                onChange={handleChange}
                disableUnderline={true}
                IconComponent={() => <BsChevronDown color="#7D7D7D" />}
              >
                {applicability.map((cyle, idx) => (
                  <MenuItem value={cyle} key={idx}>
                    {cyle.toUpperCase()}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {action !== "edit" ? (
              <Grid style={{ width: "45%" }}>
                <Typography className={classes.inputTitle}>
                  Customer List
                </Typography>
                <Grid>
                  <input
                    type="text"
                    placeholder="Seach user"
                    name="name"
                    value={searchKey}
                    style={{
                      width: "100%",
                      height: "30px",
                      marginBottom: "10px",
                    }}
                    onChange={searchUsers}
                    className={classes.input}
                  />
                  <div style={{ display: "flex", gap: "20px" }}>
                    {values &&
                      values.customerList &&
                      values.customerList.length !== 0 &&
                      values.customerList.map((item) => {
                        return (
                          <div style={{ display: "flex", gap: "5px" }}>
                            <Typography
                              style={{
                                color: "#7D7D7D",
                                fontFamily: "Poppins",
                                fontWeight: "400",
                                fontSize: "14px",
                              }}
                            >
                              {item.fullName}
                            </Typography>
                            {item && (
                              <FiXSquare onClick={() => removeItem(item)} />
                            )}
                          </div>
                        );
                      })}
                  </div>
                  {filteredUsers.map((user, userIdx) => (
                    <Grid key={userIdx}>
                      <Grid
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "5px 60px",
                          marginBottom: "20px",
                        }}
                      >
                        <Typography
                          style={{
                            marginTop: "10px",
                            fontFamily: "Poppins",
                            fontWeight: 500,
                            fontSize: "14px",
                            color: "#7D7D7D",
                            marginLeft: "15px",
                          }}
                        >
                          {user.fullName}
                        </Typography>
                        <Button
                          className={classes.addUserBtn}
                          onClick={() => changeDetails(user)}
                        >
                          + Add
                        </Button>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            ) : (
              <Grid style={{ width: "45%" }} />
            )}
          </Grid>
          <Grid
            container
            spacing={2}
            style={{
              marginTop: "15px",
              marginBottom: "25px",
              marginLeft: "25px",
            }}
          >
            <FormControlLabel
              control={
                <Switch checked={values.enable} onChange={changeEnable} />
              }
              label="Enable"
            />
          </Grid>

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
                  >
                    Submit
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    className={classes.submit}
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
