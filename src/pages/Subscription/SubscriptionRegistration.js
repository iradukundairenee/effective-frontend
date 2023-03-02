import React, { useState, useEffect } from "react";
import { useStyles } from "styles/formStyles";
import { BsArrowLeft, BsChevronDown } from "react-icons/bs";
import { Link } from "react-router-dom";
import {
  addSubscriptions,
  editSubscription,
} from "redux/actions/subscriptionPlan";
import { useSelector } from "react-redux";
import { getSubscription } from "redux/actions/subscriptionPlan";
import { notifier } from "utils/notifier";
import { useParams } from "react-router";
import InputAdornment from "@mui/material/InputAdornment";
import { useHistory } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { FiXSquare } from "react-icons/fi";
import { FormHelperText } from "@mui/material";
import { cssStyle } from "./css";
import {
  Input,
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
  FormControlLabel,
  Switch,
  IconButton,
} from "@material-ui/core";
import Divider from "@mui/material/Divider";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";

const initialState = {
  TypeSubscriptionPlan: "click-Based",
  SubscriptionPlanName: "",
  subheader: "",
  billingCycle: [
    {
      monthly: "",
      yearly: "",
    },
  ],
  plandetailchecklist: [],
  Visibility: "",
  NumberofAssets: "",
  NumberofClicks: "",
  discountValue: 0,
  PayPerclick: "disable",
  PayPerClickCharge: 0,
  DiscountApplicable: "disable",
  DiscountType: null,
  CouponApplicable: "disable",
  RedemptionofPoints: "disable",
};

const subscribeCycles = ["monthly", "yearly", "OneTime"];
const visibilityCycles = ["Private", "Public"];
const subscriptionTypeCycles = ["asset-Based", "click-Based"];

export const SubscriptionRegistration = ({
  action = "add" || "edit",
  currentItem = null,
}) => {
  const subscriptionState = useSelector((state) => state);
  const [checklist, setCheckList] = useState("");
  const [disable, setDisable] = React.useState("disable");
  const { subscriptionId } = useParams();
  const [values, setValues] = useState(initialState);
  const [checkListInputError, setCheckListInputError] = useState();
  const [checkdiscountValueError, setCheckDiscountValueError] = useState();
  const [errors, setErrors] = useState();
  const {
    subscriptionsAdd: { loading: adding, loaded: added },
    subscriptionEdit: { loading: updating, loaded: updated },
    login: {
      userInfo: { user },
    },
  } = subscriptionState;

  const handleChange = (e) => {
    e.preventDefault();
    const {
      target: { name, value },
    } = e;
    if (name === "PayPerClickCharge") {
      setValues({ ...values, [name]: parseFloat(value) });
    }
    if (name === "discountValue" && values.DiscountType != "flat") {
      if (parseInt(value) >= 100) {
        setCheckDiscountValueError("percentage can not be 100% or greater");
      } else {
        setCheckDiscountValueError("");
      }
    }
    setValues({ ...values, [name]: value });
  };
  useEffect(() => {
    if (action === "edit" && currentItem) {
      const {
        TypeSubscriptionPlan,
        SubscriptionPlanName,
        subheader,
        billingCycle,
        Validity,
        Visibility,
        plandetailchecklist,
        NumberofAssets,
        NumberofClicks,
        discountValue,
        PayPerclick,
        PayPerClickCharge,
        DiscountApplicable,
        DiscountType,
        CouponApplicable,
        RedemptionofPoints,
      } = currentItem;

      setValues({
        TypeSubscriptionPlan,
        SubscriptionPlanName,
        subheader,
        billingCycle,
        Validity,
        Visibility,
        NumberofAssets,
        NumberofClicks,
        plandetailchecklist,
        discountValue,
        PayPerclick,
        PayPerClickCharge,
        DiscountApplicable,
        DiscountType,
        CouponApplicable,
        RedemptionofPoints,
      });
    }
  }, [currentItem]);

  const onCheckListChange = (e) => {
    setCheckList(e.target.value);
  };

  const changeDetails = async (e) => {
    e.preventDefault();
    if (checklist !== "") {
      await setValues({
        ...values,
        plandetailchecklist: [...values.plandetailchecklist, checklist],
      });
      setCheckList("");
    }
  };

  const handleBillingClicle = (e) => {
    e.preventDefault();
    setValues({
      ...values,
      billingCycle: [
        { ...values.billingCycle[0], [e.target.name]: e.target.value },
      ],
    });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (parseInt(values.discountValue) >= 100) setCheckDiscountValueError("");
    if (action != "add") {
      await editSubscription(subscriptionId, values);
      notifier.success("update success");
      return history.push("/dashboard/subscriptions");
    }

    if (action != "edit") {
      await addSubscriptions(values);
      notifier.success("create success");
      return history.push("/dashboard/subscriptions");
    }
  };
  const classes = useStyles();

  const history = useHistory();
  const onDelete = (checklist) => {
    setValues({
      ...values,
      plandetailchecklist: values.plandetailchecklist.filter((item) => {
        return item !== checklist;
      }),
    });
  };
  return (
    <Card component="main" className={classes.root}>
      <Grid className={classes.paper}>
        <Link to="/dashboard/subscriptions" className={classes.avatar}>
          <BsArrowLeft />
        </Link>

        <Typography className={classes.title}>
          {currentItem && action === "edit"
            ? `Update "${currentItem?.SubscriptionPlanName?.toUpperCase()}"`
            : "Add New Subscription"}
        </Typography>
      </Grid>
      <div className={classes.paper}>
        <form className={classes.form} onSubmit={submitHandler}>
          {(action === "add" || action === "edit") && (
            <Grid
              container
              spacing={2}
              style={{ marginTop: "25px", justifyContent: "space-around" }}
            >
              <FormControl className={classes.nameInputContainer}>
                <Typography className={classes.inputTitle}>
                  Type of Subscription
                </Typography>
                <Select
                  required
                  className={classes.input}
                  name="TypeSubscriptionPlan"
                  onChange={handleChange}
                  defaultValue={currentItem && currentItem.TypeSubscriptionPlan}
                  disableUnderline={true}
                  IconComponent={() => <BsChevronDown color="#7D7D7D" />}
                >
                  {subscriptionTypeCycles.map((cyle, choiceIdx) => (
                    <MenuItem value={cyle} key={choiceIdx}>
                      {cyle.toUpperCase()}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Grid className={classes.nameInputContainer}>
                <Typography className={classes.inputTitle}>
                  Subscription Name
                </Typography>
                <TextField
                  required
                  className={classes.input}
                  name="SubscriptionPlanName"
                  onChange={handleChange}
                  defaultValue={currentItem && currentItem.SubscriptionPlanName}
                  autoFocus
                  fullWidth
                  InputProps={{ disableUnderline: true }}
                  placeholder="Bussiness"
                />
              </Grid>
            </Grid>
          )}
          {(action == "add" || action === "edit") && (
            <Grid
              container
              spacing={2}
              style={{ marginTop: "25px", justifyContent: "space-around" }}
            >
              <FormControl className={classes.nameInputContainer}>
                <Typography className={classes.inputTitle}>
                  Visibility
                </Typography>
                <Select
                  required
                  className={classes.input}
                  defaultValue={currentItem && currentItem.Visibility}
                  name="Visibility"
                  onChange={handleChange}
                  disableUnderline={true}
                  IconComponent={() => <BsChevronDown color="#7D7D7D" />}
                >
                  <MenuItem value={values.Visibility}>---</MenuItem>
                  {visibilityCycles.map((cyle, choiceIdx) => (
                    <MenuItem value={cyle} key={choiceIdx}>
                      {cyle.toUpperCase()}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Grid className={classes.nameInputContainer}>
                <Typography className={classes.inputTitle}>
                  Sub Header
                </Typography>
                <TextField
                  required
                  className={classes.input}
                  name="subheader"
                  onChange={handleChange}
                  defaultValue={currentItem && currentItem.subheader}
                  autoFocus
                  fullWidth
                  InputProps={{ disableUnderline: true }}
                  placeholder="Ready For Comercial use"
                />
              </Grid>
            </Grid>
          )}
          {(action === "add" || action === "edit") && (
            <Grid
              container
              spacing={2}
              style={{ marginTop: "25px", justifyContent: "space-around" }}
            >
              <Grid className={classes.nameInputContainer}>
                <Typography className={classes.inputTitle}>
                  Cost per monthly
                </Typography>
                <TextField
                  required
                  type="number"
                  className={classes.input}
                  name="monthly"
                  onChange={handleBillingClicle}
                  defaultValue={
                    currentItem && currentItem.billingCycle[0].monthly
                  }
                  autoFocus
                  fullWidth
                  InputProps={{ disableUnderline: true }}
                  placeholder="Enter Cost"
                />
              </Grid>
              <Grid
                className={classes.nameInputContainer}
                style={{
                  visibility:
                    values?.TypeSubscriptionPlan === "click-Based"
                      ? "hidden"
                      : "visible",
                }}
              >
                <Typography className={classes.inputTitle}>
                  Cost per year
                </Typography>
                <TextField
                  required={
                    values?.TypeSubscriptionPlan === "click-Based"
                      ? false
                      : true
                  }
                  type="number"
                  className={classes.input}
                  name="yearly"
                  onChange={handleBillingClicle}
                  defaultValue={
                    currentItem && currentItem.billingCycle[0].yearly
                  }
                  autoFocus
                  fullWidth
                  InputProps={{ disableUnderline: true }}
                  placeholder="Enter Cost"
                />
              </Grid>
            </Grid>
          )}

          {(action === "add" || action === "edit") && (
            <Grid
              style={{ marginTop: "25px", width: "98%", paddingLeft: "10px" }}
            >
              <Typography className={classes.inputTitle}>
                Plan Details checklist
              </Typography>
              <Grid>
                <TextField
                  className={classes.input}
                  name="plandetailchecklist"
                  onChange={onCheckListChange}
                  defaultValue={checklist}
                  value={checklist}
                  autoFocus
                  fullWidth
                  placeholder="Enter Click"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button
                          edge="end"
                          color="primary"
                          sx={{ fontWeight: "bold" }}
                          onClick={changeDetails}
                        >
                          <AddIcon />
                        </Button>
                      </InputAdornment>
                    ),
                    disableUnderline: true,
                  }}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      changeDetails(e);
                    }
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    maxWidth: "100%",
                    flexWrap: "wrap",
                  }}
                >
                  {values &&
                    values.plandetailchecklist.length !== 0 &&
                    values.plandetailchecklist?.map((item) => {
                      return (
                        <div
                          style={{
                            display: "flex",
                            gap: "5px",
                            flexGrow: "initial",
                          }}
                        >
                          <Typography
                            style={{
                              color: "#7D7D7D",
                              fontFamily: "Poppins",
                              fontWeight: "400",
                              fontSize: "14px",
                            }}
                          >
                            {item}
                          </Typography>
                          <IconButton
                            style={{
                              color: "#7D7D7D",
                              fontFamily: "Poppins",
                              fontWeight: "400",
                              fontSize: "14px",
                              marginTop: "-5px",
                            }}
                            onClick={() => {
                              onDelete(item);
                            }}
                          >
                            <FiXSquare />
                          </IconButton>
                        </div>
                      );
                    })}
                </div>
              </Grid>
              <div
                className={
                  checkListInputError ? classes.taxDialogError : classes.hidden
                }
                style={{ color: "red" }}
              >
                {checkListInputError}
              </div>
            </Grid>
          )}
          <Grid
            container
            spacing={2}
            style={{ marginTop: "25px", justifyContent: "space-around" }}
          >
            {((action === "add" &&
              values.TypeSubscriptionPlan === "asset-Based") ||
              (action === "edit" &&
                values.TypeSubscriptionPlan === "asset-Based")) && (
              <Grid className={classes.nameInputContainer}>
                <Typography className={classes.inputTitle}>
                  Number of Assets
                </Typography>
                <TextField
                  required
                  className={classes.input}
                  name="NumberofAssets"
                  onChange={handleChange}
                  type="number"
                  defaultValue={currentItem && currentItem.NumberofAssets}
                  disable={true}
                  autoFocus
                  fullWidth
                  InputProps={{ disableUnderline: true }}
                  placeholder="Enter Assets"
                />
              </Grid>
            )}
            {((action === "add" &&
              values.TypeSubscriptionPlan === "click-Based") ||
              (action === "edit" &&
                values.TypeSubscriptionPlan === "click-Based")) && (
              <Grid className={classes.nameInputContainer}>
                <Typography className={classes.inputTitle}>
                  Number of Clicks
                </Typography>
                <TextField
                  required
                  type="number"
                  className={classes.input}
                  name="NumberofClicks"
                  onChange={handleChange}
                  defaultValue={currentItem && currentItem.NumberofClicks}
                  autoFocus
                  fullWidth
                  InputProps={{ disableUnderline: true }}
                  placeholder="Enter clicks"
                />
              </Grid>
            )}
            {values.TypeSubscriptionPlan === "asset-Based" ||
            values.TypeSubscriptionPlan === "click-Based" ? (
              <FormControl
                className={classes.typeInputContainer}
                style={{ paddingLeft: "20px" }}
              >
                <Typography className={classes.inputTitle}>Validity</Typography>
                <Select
                  required
                  className={classes.input}
                  defaultValue={currentItem && currentItem.Validity}
                  name="Validity"
                  onChange={handleChange}
                  disableUnderline={true}
                  disabled={action === "change"}
                  IconComponent={() => <BsChevronDown color="#7D7D7D" />}
                >
                  <MenuItem value={values.Validity}>---</MenuItem>
                  {subscribeCycles.map((cyle, choiceIdx) => (
                    <MenuItem value={cyle} key={choiceIdx}>
                      {cyle.toUpperCase()}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <FormControl
                className={classes.typeInputContainer}
                style={{ width: "100%" }}
              >
                <Typography className={classes.inputTitle}>Validity</Typography>
                <Select
                  required
                  className={classes.input}
                  defaultValue={currentItem && currentItem.Validity}
                  name="Validity"
                  onChange={handleChange}
                  disableUnderline={true}
                  disabled={action === "change"}
                  IconComponent={() => <BsChevronDown color="#7D7D7D" />}
                >
                  <MenuItem value={values.Validity}>---</MenuItem>
                  {subscribeCycles.map((cyle, choiceIdx) => (
                    <MenuItem value={cyle} key={choiceIdx}>
                      {cyle.toUpperCase()}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Grid>

          <Divider style={{ marginTop: "30px" }} variant="inset" />

          <Typography className={classes.title} style={{ marginTop: "30px" }}>
            Pay Per click
          </Typography>

          <Grid
            container
            spacing={2}
            style={{
              marginTop: "30px",
              justifyContent: "flex-start",
              gap: "10px",
            }}
          >
            <FormControl className={classes.typeInputContainer}>
              <Typography className={classes.inputTitle}>
                Pay Per click
              </Typography>
              <Select
                required
                className={classes.input}
                defaultValue={
                  (currentItem && currentItem.PayPerclick) || "disable"
                }
                name="PayPerclick"
                onChange={handleChange}
                disableUnderline={true}
                IconComponent={() => <BsChevronDown color="#7D7D7D" />}
              >
                <MenuItem value="enable">Enable</MenuItem>
                <MenuItem value="disable">disable</MenuItem>
              </Select>
            </FormControl>
            {((action === "add" && values.PayPerclick === "enable") ||
              (action === "edit" && values.PayPerclick === "enable")) && (
              <Grid className={classes.nameInputContainer}>
                <Typography className={classes.inputTitle}>
                  Pay Per Click Charge
                </Typography>
                <CurrencyTextField
                  required
                  variant="standard"
                  currencySymbol="$"
                  className={classes.input}
                  name="PayPerClickCharge"
                  fullWidth
                  defaultValue={currentItem && currentItem.PayPerClickCharge}
                  decimalCharacter="."
                  decimalPlaces={6}
                  digitGroupSeparator=","
                  InputProps={{ disableUnderline: true }}
                  onChange={handleChange}
                />
              </Grid>
            )}
          </Grid>
          <Divider style={{ marginTop: "30px" }} variant="inset" fullWidth />
          <Typography className={classes.title} style={{ marginTop: "30px" }}>
            Discount Applicable
          </Typography>

          <Grid
            container
            spacing={1}
            style={{
              marginTop: "30px",
              justifyContent: "flex-start",
              gap: "10px",
            }}
          >
            <FormControl style={{ width: "30%" }}>
              <Typography className={classes.inputTitle}>
                Discount Applicable
              </Typography>
              <Select
                className={classes.input}
                defaultValue={
                  (currentItem && currentItem.DiscountApplicable) || "disable"
                }
                width="30%"
                name="DiscountApplicable"
                onChange={handleChange}
                disableUnderline={true}
                IconComponent={() => <BsChevronDown color="#7D7D7D" />}
              >
                <MenuItem value="enable">Enable</MenuItem>
                <MenuItem value="disable">disable</MenuItem>
              </Select>
            </FormControl>

            {((action === "add" && values.DiscountApplicable === "enable") ||
              (action === "edit" &&
                values.DiscountApplicable === "enable")) && (
              <FormControl style={{ width: "30%" }}>
                <Typography className={classes.inputTitle}>
                  Discount Type
                </Typography>
                <Select
                  required
                  className={classes.input}
                  defaultValue={currentItem && currentItem.DiscountType}
                  name="DiscountType"
                  onChange={handleChange}
                  disableUnderline={true}
                  IconComponent={() => <BsChevronDown color="#7D7D7D" />}
                >
                  <MenuItem value="percentage">percentage</MenuItem>
                  <MenuItem value="flat">flat</MenuItem>
                </Select>
              </FormControl>
            )}
            {((action === "add" && values.DiscountApplicable === "enable") ||
              (action === "edit" &&
                values.DiscountApplicable === "enable")) && (
              <Grid style={{ width: "30%" }}>
                <Typography className={classes.inputTitle}>
                  Discount Value
                </Typography>
                <TextField
                  required
                  type="number"
                  className={classes.input}
                  name="discountValue"
                  onChange={handleChange}
                  defaultValue={currentItem && currentItem.discountValue}
                  autoFocus
                  fullWidth
                  InputProps={{ disableUnderline: true }}
                  placeholder="Number"
                />
                <div
                  className={
                    checkdiscountValueError
                      ? classes.taxDialogError
                      : classes.hidden
                  }
                  style={{ color: "red", marginLeft: "6%", fontSize: "0.8rem" }}
                >
                  {checkdiscountValueError}
                </div>
              </Grid>
            )}
          </Grid>
          <Divider style={{ marginTop: "30px" }} variant="inset" />
          <Typography className={classes.title} style={{ marginTop: "30px" }}>
            Coupon & Redemption
          </Typography>

          <Grid container spacing={1} style={{ marginTop: "30px" }}>
            <FormControl style={{ width: "47%", margin: "0 1.5%" }}>
              <Typography className={classes.inputTitle}>
                Coupon Applicable
              </Typography>
              <Select
                required
                className={classes.input}
                defaultValue={
                  (currentItem && currentItem.CouponApplicable) || "disable"
                }
                name="CouponApplicable"
                onChange={handleChange}
                disableUnderline={true}
                IconComponent={() => <BsChevronDown color="#7D7D7D" />}
              >
                <MenuItem value="disable">disable</MenuItem>
                <MenuItem value="enable">enable</MenuItem>
              </Select>
            </FormControl>
            <FormControl style={{ width: "47%", margin: "0 1.5%" }}>
              <Typography className={classes.inputTitle}>
                Redemption of Points
              </Typography>
              <Select
                required
                className={classes.input}
                defaultValue={
                  (currentItem && currentItem.RedemptionofPoints) || "disable"
                }
                name="RedemptionofPoints"
                onChange={handleChange}
                disableUnderline={true}
                IconComponent={() => <BsChevronDown color="#7D7D7D" />}
              >
                <MenuItem value="disable">disable</MenuItem>
                <MenuItem value="enable">enable</MenuItem>
              </Select>
            </FormControl>
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
                    disabled={adding}
                  >
                    Submit
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    className={classes.submit}
                    disabled={updating}
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
