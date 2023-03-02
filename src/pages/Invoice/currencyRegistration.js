import {
  Card,
  Grid,
  Typography,
  FormControl,
  TextField,
  Button,
  CardActions,
} from "@material-ui/core";
import PhoneInput from "react-phone-input-2";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { useStyles } from "styles/formStyles";
import { useHistory } from "react-router-dom";
import {
  createCurrency as newCurrency,
  updateCurrency,
} from "redux/actions/currency";
import { notifier } from "utils/notifier";
import { useSelector } from "react-redux";
import { City, State } from "country-state-city";

const initialState = {
  currencyName: "CANADIAN Dollar",
  currencyCode: "CAD",
  icon: "C$",
  companyName: "",
  companyUrl: "",
  taxName: "",
  email: "",
  phone: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  country: "",
  postalCode: "",
};
const currencyCode = [
  { name: "CAD", symbol: "C$" },
  { name: "USD", symbol: "$" },
  { name: "INR", symbol: "₹" },
];

export const CreateCurrency = ({
  action = "add" || "edit",
  currentItem = null,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const [values, setValues] = useState(initialState);
  const [countryCode, setCountryCode] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [states, setStates] = useState();
  const [cities, setCities] = useState();
  const [gotStates, setGotStates] = useState(false);
  const [numberChanged, setNumberChanged] = useState(null);
  const { currencyId } = useParams();

  const currencyState = useSelector((state) => state);
  const {
    createCurrency: { loaded },
    updateCurrency: { loaded: updatedLoaded },
  } = currencyState;

  useEffect(() => {
    if (action === "edit") {
      const {
        currencyName,
        currencyCode,
        icon,
        companyName,
        companyUrl,
        taxName,
        taxPercentage,
        email,
        phone,
        address1,
        address2,
        city,
        state,
        country,
        postalCode,
      } = currentItem;
      setValues({
        currencyName,
        currencyCode,
        icon,
        companyName,
        companyUrl,
        taxName,
        taxPercentage,
        email,
        phone,
        address1,
        address2,
        city,
        state,
        country,
        postalCode,
      });
    }
  }, [action, currentItem]);

  useEffect(() => {
    if (countryCode) {
      setStates(State.getStatesOfCountry(countryCode.toUpperCase()));
      setGotStates(true);
      setNumberChanged(Math.random());
    }
  }, [countryCode]);

  useEffect(() => {
    if (gotStates !== null && states) {
      setCities(
        City.getCitiesOfState(
          countryCode.toUpperCase(),
          states[0]?.isoCode.toUpperCase()
        )
      );
      setValues({
        ...values,
        state: states[0]?.name,
      });
    }
  }, [gotStates, states, countryCode]);

  useEffect(() => {
    if (cities && states && numberChanged !== null) {
      setValues({
        ...values,
        state: states[0]?.name,
        city: cities[0]?.name,
      });
    }
  }, [numberChanged]);

  const handleChange = (e) => {
    e.preventDefault();
    const {
      target: { name, value },
    } = e;
    setValues({ ...values, [name]: value });
  };

  const onCurrencyCodeChange = (e) => {
    if (action) {
      setValues({
        ...values,
        currencyCode: e.target.value,
        icon: currencyCode?.filter((curr) => curr.name === e.target.value)[0]
          .symbol,
      });
    }
  };

  const onPhoneChange = (value, country) => {
    if (action) {
      setValues({
        ...values,
        phone: "+" + value,
        country: country.name,
      });
      setCountryCode(country.countryCode);
    }
  };

  const onStateChange = (e) => {
    setValues({
      ...values,
      state: states.filter((state) => state?.isoCode === e.target.value)[0]
        .name,
    });
    setStateCode(e.target.value);
    setCities(
      City.getCitiesOfState(
        countryCode.toUpperCase(),
        e.target.value.toUpperCase()
      )
    );
  };

  useEffect(() => {
    if (cities) {
      setValues({
        ...values,
        city: cities[0]?.name,
      });
    }
  }, [cities]);

  const submitHandler = async (e) => {
    if (action === "add") {
      e.preventDefault();
      await newCurrency(values);
    }
    if (action === "edit") {
      e.preventDefault();
      await updateCurrency(currencyId, values);
    }
  };

  if (updatedLoaded) {
    notifier.success("Updated success");
    history.push("/dashboard/currencies");
  }
  if (loaded) {
    notifier.success("Create success");
    history.push("/dashboard/currencies");
  }

  return (
    <Card component="main" className={classes.root}>
      <Grid className={classes.paper}>
        <Link to="/dashboard/currencies" className={classes.avatar}>
          <BsArrowLeft />
        </Link>

        <Typography className={classes.title}>
          {action === "edit"
            ? `Update "${currentItem?.currencyName}"`
            : "Create currency"}
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
                Currency Name
              </Typography>
              <TextField
                required
                defaultValue={currentItem?.currencyName}
                className={classes.currInput}
                name="currencyName"
                onChange={handleChange}
                autoFocus
                fullWidth
                InputProps={{ disableUnderline: true }}
                placeholder="US Dollar"
              />
            </Grid>

            <Grid
              style={{
                width: "45%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <FormControl style={{ width: "88%" }}>
                <Typography className={classes.inputTitle}>
                  Currency code
                </Typography>
                <select
                  name="currencyCode"
                  onChange={onCurrencyCodeChange}
                  style={{
                    padding: "15px 15px",
                    backgroundColor: "#fff",
                  }}
                  className={classes.currInput}
                >
                  {currentItem?.currencyCode && (
                    <option value={currentItem?.currencyCode} hidden>
                      {currentItem?.currencyCode}
                    </option>
                  )}
                  {currencyCode?.map((curr, idx) => (
                    <option value={curr.name} key={idx}>
                      {curr?.name}
                    </option>
                  ))}
                </select>
              </FormControl>

              <FormControl style={{ width: "7%" }}>
                <Typography className={classes.inputTitle}>Icon</Typography>
                {values.currencyCode ? (
                  currencyCode.map((curr) => {
                    return (
                      curr.name === values.currencyCode && (
                        <TextField
                          required
                          defaultValue={currentItem?.icon}
                          className={classes.currInput}
                          name="icon"
                          onChange={handleChange}
                          fullWidth
                          InputProps={{ disableUnderline: true }}
                          value={curr.symbol}
                          disabled
                        />
                      )
                    );
                  })
                ) : (
                  <TextField
                    required
                    defaultValue={
                      currentItem?.icon ||
                      (currencyCode && currencyCode[0]?.symbol)
                    }
                    className={classes.currInput}
                    name="icon"
                    onChange={handleChange}
                    fullWidth
                    InputProps={{ disableUnderline: true }}
                    disabled
                  />
                )}
              </FormControl>
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
                Company Name
              </Typography>
              <TextField
                required
                defaultValue={currentItem?.companyName}
                className={classes.currInput}
                name="companyName"
                onChange={handleChange}
                fullWidth
                InputProps={{ disableUnderline: true }}
                placeholder="Brand X Inc."
              />
            </Grid>

            <FormControl className={classes.nameInputContainer}>
              <Typography className={classes.inputTitle}>
                Company url
              </Typography>
              <TextField
                required
                defaultValue={currentItem?.companyUrl}
                className={classes.currInput}
                name="companyUrl"
                onChange={handleChange}
                fullWidth
                InputProps={{ disableUnderline: true }}
                placeholder="www.yourbrandx19.com"
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
            <Grid className={classes.nameInputContainer}>
              <Typography className={classes.inputTitle}>Tax Name</Typography>
              <TextField
                required
                defaultValue={currentItem?.taxName}
                className={classes.currInput}
                name="taxName"
                onChange={handleChange}
                fullWidth
                InputProps={{ disableUnderline: true }}
                placeholder="TVA"
              />
            </Grid>

            <FormControl className={classes.nameInputContainer}>
              <Typography className={classes.inputTitle}>
                Tax Percentage
              </Typography>
              <TextField
                required
                type="number"
                defaultValue={currentItem?.taxPercentage}
                className={classes.currInput}
                name="taxPercentage"
                onChange={handleChange}
                fullWidth
                InputProps={{ disableUnderline: true }}
                placeholder="18"
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
            <Grid className={classes.nameInputContainer}>
              <Typography className={classes.inputTitle}>
                Email Address
              </Typography>
              <TextField
                required
                defaultValue={currentItem?.email}
                className={classes.currInput}
                name="email"
                onChange={handleChange}
                fullWidth
                InputProps={{ disableUnderline: true }}
                placeholder="yourbrandx19@gmail.com"
              />
            </Grid>

            <FormControl className={classes.nameInputContainer}>
              <Typography className={classes.inputTitle}>
                Phone Number
              </Typography>
              <PhoneInput
                value={currentItem?.phone}
                containerStyle={{ width: "95%" }}
                inputStyle={{ marginLeft: "10%" }}
                onChange={onPhoneChange}
                country={"ca"}
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
            <FormControl
              className={classes.nameInputContainer}
              style={{ width: "95%" }}
            >
              <Typography className={classes.inputTitle}>
                Your Address
              </Typography>
              <TextField
                required
                defaultValue={currentItem?.address1}
                style={{ marginBottom: "15px" }}
                className={classes.currInput}
                name="address1"
                onChange={handleChange}
                fullWidth
                InputProps={{ disableUnderline: true }}
                placeholder="Add1"
              />
              <TextField
                defaultValue={currentItem?.address2}
                className={classes.currInput}
                name="address2"
                onChange={handleChange}
                fullWidth
                InputProps={{ disableUnderline: true }}
                placeholder="Add2"
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
            <FormControl style={{ width: "20%" }}>
              <Typography className={classes.inputTitle}>State</Typography>
              <select
                name="state"
                onChange={onStateChange}
                style={{
                  padding: "15px 15px",
                  backgroundColor: "#fff",
                }}
                className={classes.currInput}
              >
                {gotStates ? null : (
                  <option value={values.state} hidden>
                    {values.state}
                  </option>
                )}
                {states &&
                  states.map((state, idx) => (
                    <option value={state.isoCode} key={idx}>
                      {state.name}
                    </option>
                  ))}
              </select>
            </FormControl>

            <FormControl
              className={classes.nameInputContainer}
              style={{ width: "20%" }}
            >
              <Typography className={classes.inputTitle}>City</Typography>
              <select
                name="city"
                onChange={handleChange}
                style={{
                  padding: "15px 15px",
                  backgroundColor: "#fff",
                }}
                defaultValue={currentItem?.city}
                className={classes.currInput}
              >
                <option value={values.city} hidden>
                  {values.city}
                </option>
                {cities?.map((city, idx) => (
                  <option value={city.name} key={idx}>
                    {city.name}
                  </option>
                ))}
              </select>
            </FormControl>
            <Grid
              className={classes.nameInputContainer}
              style={{ width: "20%" }}
            >
              <Typography className={classes.inputTitle}>
                Postal code
              </Typography>
              <TextField
                defaultValue={currentItem?.postalCode}
                className={classes.currInput}
                name="postalCode"
                onChange={handleChange}
                fullWidth
                InputProps={{ disableUnderline: true }}
                placeholder="78711"
              />
            </Grid>

            <FormControl style={{ width: "20%" }}>
              <Typography className={classes.inputTitle}>Country</Typography>
              <TextField
                className={classes.currInput}
                InputProps={{ disableUnderline: true }}
                fullWidth
                name="country"
                margin="dense"
                autoComplete="country"
                value={values.country || "Canada"}
              />
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
