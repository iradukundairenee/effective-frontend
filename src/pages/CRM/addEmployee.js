import {
  Card,
  Grid,
  Typography,
  FormControl,
  TextField,
  Button,
  CardActions,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { useStyles } from "styles/formStyles";
import { useHistory } from "react-router-dom";
import { getAllCurrency } from "redux/actions/currency";
import { notifier } from "utils/notifier";
import { useSelector } from "react-redux";
import { registerUser } from "redux/actions/user";
import PhoneInput from "react-phone-input-2";
import { City, State } from "country-state-city";

const initialState = {
  firstName: "",
  lastName: "",
  companyName: "",
  companyUrl: "",
  email: "",
  phoneNumber: "",
  currencyCode: "",
  address: "",
  role: "Manager",
  city: "",
  state: "",
  country: "",
  postalCode: "",
};

export const RegisterEmployee = () => {
  const classes = useStyles();
  const history = useHistory();
  const [states, setStates] = useState();
  const [cities, setCities] = useState();
  const [notify, setNotify] = useState(false);
  const [stateCode, setStateCode] = useState("");
  const [gotStates, setGotStates] = useState(false);
  const [values, setValues] = useState(initialState);
  const [countryCode, setCountryCode] = useState("");
  const [numberChanged, setNumberChanged] = useState(null);

  const currencyState = useSelector((state) => state);
  const userState = useSelector((state) => state);

  const {
    register: { loading: registering, loaded: registered },
  } = userState;

  useEffect(() => {
    getAllCurrency();
  }, []);

  useEffect(() => {
    if (countryCode) {
      setStates(State.getStatesOfCountry(countryCode.toUpperCase()));
      setGotStates(true);
      setNumberChanged(Math.random());
    }
  }, [countryCode]);

  useEffect(() => {
    if (gotStates) {
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

  const onPhoneChange = (value, country) => {
    setValues({
      ...values,
      phoneNumber: "+" + value,
      country: country.name,
    });
    setCountryCode(country.countryCode);
    setNumberChanged(Math.random());
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
    e.preventDefault();
    await registerUser(values);
    return setNotify(true);
  };

  if (registered && notify) {
    history.goBack();
    notifier.success("Manager created successfully");
    return setNotify(false);
  }

  return (
    <Card component="main" className={classes.root}>
      <Grid className={classes.paper}>
        <Link to="/dashboard/crm" className={classes.avatar}>
          <BsArrowLeft />
        </Link>

        <Typography className={classes.title}>Register Manager</Typography>
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
              <Typography className={classes.inputTitle}>First Name</Typography>
              <TextField
                required
                className={classes.input}
                name="firstName"
                onChange={handleChange}
                autoFocus
                fullWidth
                InputProps={{ disableUnderline: true }}
                placeholder="Lauren"
              />
            </Grid>

            <Grid className={classes.nameInputContainer}>
              <Typography className={classes.inputTitle}>Last Name</Typography>
              <TextField
                required
                className={classes.input}
                name="lastName"
                onChange={handleChange}
                autoFocus
                fullWidth
                InputProps={{ disableUnderline: true }}
                placeholder="Weightman"
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
            <Grid className={classes.nameInputContainer}>
              <Typography className={classes.inputTitle}>
                Company Name
              </Typography>
              <TextField
                required
                className={classes.input}
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
                className={classes.input}
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
              <Typography className={classes.inputTitle}>
                Email Address
              </Typography>
              <TextField
                required
                className={classes.input}
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
                containerStyle={{
                  width: "95%",
                }}
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
            <Grid className={classes.nameInputContainer}>
              <Typography className={classes.inputTitle}>
                Your Address
              </Typography>
              <TextField
                required
                style={{ marginBottom: "15px" }}
                className={classes.input}
                name="address"
                onChange={handleChange}
                fullWidth
                InputProps={{ disableUnderline: true }}
                placeholder="3240 Trinity St."
              />
            </Grid>

            <FormControl className={classes.nameInputContainer}>
              <Typography className={classes.inputTitle}>Address 2</Typography>
              <TextField
                style={{ marginBottom: "15px" }}
                className={classes.input}
                name="address"
                onChange={handleChange}
                fullWidth
                InputProps={{ disableUnderline: true }}
                placeholder="3241 Trinity St."
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
                className={classes.input}
              >
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
                className={classes.input}
              >
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
                className={classes.input}
                name="postalCode"
                onChange={handleChange}
                fullWidth
                InputProps={{ disableUnderline: true }}
                placeholder="78711"
              />
            </Grid>

            <FormControl
              style={{ width: "20%" }}
              className={classes.nameInputContainer}
            >
              <Typography className={classes.inputTitle}>Country</Typography>
              <TextField
                className={classes.input}
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
                <Button
                  type="submit"
                  variant="contained"
                  className={classes.submit}
                  disabled={registering}
                >
                  Save user
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </form>
      </div>
    </Card>
  );
};
