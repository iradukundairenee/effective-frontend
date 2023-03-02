import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import PhoneInput from "react-phone-input-2";
import { City, State } from "country-state-city";
import "react-phone-input-2/lib/style.css";
import { Grid, Typography, FormControl } from "@material-ui/core";
import { ConfirmUpdate } from "./ConfirmUpdate";
import { updateProfile, updateUserProfile } from "redux/actions/user";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { USER_INFO } from "utils/constants";
import { getAllCurrency, getCurrencyByUser } from "redux/actions/currency";

const useStyles = makeStyles(() => ({
  root: {},
  input: {
    border: "0.75px solid #EFF0F6",
    boxShadow: "0px 3px 16.5px rgba(8, 15, 52, 0.03)",
    borderRadius: "10px",
    padding: "10px",
    "@media (max-width: 768px)": {
      width: "100%",
    },
  },
  inputTitle: {
    fontFamily: "Poppins",
    fontWeight: 400,
    fontSize: "16px",
    color: "#303030",
    paddingBottom: "5px",
  },
  nameInputContainer: {
    width: "45%",
    "@media (max-width: 768px)": {
      display: "block",
      width: "95%",
    },
  },
}));

const initialState = {
  firstName: "",
  lastName: "",
  companyName: "",
  companyUrl: "",
  email: "",
  phoneNumber: "",
  address: "",
  country: "",
  state: "",
  city: "",
  password: "",
  currency: "",
  postalCode: "",
  role: "client",
  token: "",
};

export const AccountDetails = ({
  user,
  loading = false,
  action,
  setOpenView,
}) => {
  const [userInfo, setUserInfo] = useState(initialState);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [values, setValues] = useState({});
  const [countryCode, setCountryCode] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [states, setStates] = useState();
  const [cities, setCities] = useState();
  const [numberChanged, setNumberChanged] = useState(null);
  const classes = useStyles();
  const history = useHistory();
  const currencyState = useSelector((state) => state);
  const authState = useSelector((state) => state);
  const [gotStates, setGotStates] = useState(false);
  let userToken = JSON.parse(localStorage.getItem(USER_INFO)).token;

  const {
    login: {
      userInfo: { user: loggedInUser },
    },
  } = authState;
  const {
    // getCurrencyByUser: { userCurrency },
    getCurrencies: { currencies },
  } = currencyState;
  const {
    profileEdit: { loaded },
  } = useSelector((state) => state);

  useEffect(() => {
    if (user.role) {
      if (action) {
        setValues({
          firstName: user.firstName,
          lastName: user.lastName,
          companyName: user.companyName,
          companyUrl: user.companyUrl,
          email: user.email,
          phoneNumber: user.phoneNumber,
          address: user.address,
          country: user.country,
          state: user.state,
          city: user.city,
          postalCode: user.postalCode,
          _id: user?._id,
          currency: user?.currency || "",
        });
      }
      setUserInfo({
        firstName: user.firstName,
        lastName: user.lastName,
        companyName: user.companyName,
        companyUrl: user.companyUrl,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address,
        country: user.country,
        state: user.state,
        city: user.city,
        postalCode: user.postalCode,
        _id: user?._id,
        currency: user?.currency || "",
        token: userToken,
      });
    }
  }, [action, user]);

  useEffect(() => {
    if (user) {
      getCurrencyByUser(user._id);
    }
    if (loggedInUser.role !== "Client") getAllCurrency();
  }, [loggedInUser, user]);

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
      setUserInfo({
        ...userInfo,
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
      setUserInfo({
        ...userInfo,
        state: states[0]?.name,
        city: cities[0]?.name,
      });
    }
  }, [numberChanged]);


  const handleChange = ({ target: { name, value } }) => {
    if (name !== "currency") {
      if (action) {
        setValues({ ...values, [name]: value });
      }
      setUserInfo({ ...userInfo, [name]: value });
    } else {
      const currencyValue = JSON.parse(value);

      if (action) {
        setValues({ ...values, currency: currencyValue });
      }
      setUserInfo({ ...userInfo, currency: currencyValue });
    }
  };

  const onPhoneChange = (value, country) => {
    setValues({
      ...values,
      phoneNumber: "+" + value,
      country: country.name,
    });
    setUserInfo({
      ...userInfo,
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
    setUserInfo({
      ...userInfo,
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
      setUserInfo({
        ...userInfo,
        city: cities[0]?.name,
      });
    }
  }, [cities]);

  return (
    <div className={"w-full"}>
      <form autoComplete="off" noValidate>
        <ConfirmUpdate
          open={openConfirm}
          setOpen={() => setOpenConfirm(false)}
          userInfo={userInfo}
          onChange={handleChange}
          onConfirm={(e) => {
            e.preventDefault();
            updateProfile(userInfo);
            setOpenConfirm(false);
          }}
        />
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <Typography className={classes.inputTitle}>First name</Typography>
            <TextField
              className={classes.input}
              fullWidth
              helperText="Please specify the first name"
              margin="dense"
              name="firstName"
              onChange={handleChange}
              required
              value={userInfo.firstName}
              variant="outlined"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography className={classes.inputTitle}>Last name</Typography>
            <TextField
              className={classes.input}
              fullWidth
              margin="dense"
              name="lastName"
              onChange={handleChange}
              required
              value={userInfo.lastName}
              variant="outlined"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography className={classes.inputTitle}>Company name</Typography>
            <TextField
              className={classes.input}
              fullWidth
              margin="dense"
              name="companyName"
              onChange={handleChange}
              required
              value={userInfo.companyName}
              variant="outlined"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography className={classes.inputTitle}>Company URL</Typography>
            <TextField
              className={classes.input}
              fullWidth
              margin="dense"
              name="companyUrl"
              onChange={handleChange}
              required
              defaultValue={userInfo.companyUrl}
              variant="outlined"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography className={classes.inputTitle}>
              Email Address
            </Typography>
            <TextField
              className={classes.input}
              fullWidth
              margin="dense"
              name="email"
              value={userInfo.email}
              variant="outlined"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography className={classes.inputTitle}>Phone Number</Typography>
            <PhoneInput
              containerStyle={{
                width: "90%",
              }}
              inputStyle={{ marginLeft: "10%" }}
              onChange={onPhoneChange}
              value={userInfo.phoneNumber}
              country={"us"}
              label="Phone Number"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.inputTitle}>Your address</Typography>
            <TextField
              className={classes.input}
              variant="outlined"
              fullWidth
              name="address"
              autoComplete="address"
              value={userInfo.address}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.inputTitle}>Currency</Typography>
            <select
              name="currency"
              onChange={handleChange}
              className={classes.input}
              style={{
                width: "100%",
                padding: "15px 5px",
                borderRadius: "5px",
                borderColor: "#7D7D7D",
                opacity: "0.5",
              }}
            >
              {user && user.currency?.currencyName && (
                <option value={user && user.currency?._id} hidden>
                  {user && user.currency?.currencyName}
                </option>
              )}
              {currencies.map((curr, idx) => {
                const {
                  _id,
                  currencyName,
                  currencyCode,
                  icon,
                  taxName,
                  taxPercentage,
                } = curr;
                return (
                  <option
                    value={`{ "_id": "${_id}", "currencyName": "${currencyName}", "currencyCode": "${currencyCode}", "icon": "${icon}", "taxName": "${taxName}", "taxPercentage": "${taxPercentage}" }`}
                    key={idx}
                  >
                    {curr.currencyName && curr.currencyName}
                  </option>
                );
              })}
            </select>
          </Grid>
          <Grid
            container
            spacing={12}
            style={{
              width: "100%",
              justifyContent: "space-between",
              padding: "15px 10px",
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
                {gotStates ? null : (
                  <>
                    {values.state && (
                      <option value={values.state} hidden>
                        {values.state}
                      </option>
                    )}
                    {userInfo.state && (
                      <option value={userInfo.state} hidden>
                        {userInfo.state}
                      </option>
                    )}
                  </>
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
                className={classes.input}
              >
                {values.city && (
                  <option value={values.city} hidden>
                    {values.city}
                  </option>
                )}
                {userInfo.city && (
                  <option value={userInfo.city} hidden>
                    {userInfo.city}
                  </option>
                )}
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
                value={userInfo.postalCode}
              />
            </Grid>
            <FormControl
              className={classes.nameInputContainer}
              style={{ width: "20%" }}
            >
              <Typography className={classes.inputTitle}>Country</Typography>
              <TextField
                className={classes.input}
                InputProps={{ disableUnderline: true }}
                fullWidth
                name="country"
                margin="dense"
                autoComplete="country"
                value={userInfo.country || "Canada"}
              />
            </FormControl>
          </Grid>
        </Grid>

        <div item className="profile-btn-group">
          {action ? (
            <>
              <Button
                className={"btn-rounded-sm btn-outlined"}
                text={"Cancel"}
                onClick={action}
              />
              <Button
                className={"btn-rounded-sm btn-contained ml-5"}
                // disabled={loading}
                onClick={(e) => {
                  e.preventDefault();
                  updateUserProfile(values);
                  setOpenView(false);
                }}
                text={loading ? "Updating" : "Save information"}
              />
            </>
          ) : (
            <>
              <Button
                className={"btn-rounded-sm btn-outlined"}
                text={"Cancel"}
                onClick={() => history.push("/dashboard/view-profile")}
              />
              <Button
                className={"btn-rounded-sm btn-contained ml-5"}
                disabled={loading}
                onClick={(e) => {
                  e.preventDefault();
                  updateProfile(userInfo);
                  history.goBack();
                }}
                text={loading ? "Updating" : "Save information"}
              />
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export const TextField = (props) => {
  return (
    <>
      <div className="text-field">
        <label>{props?.label}</label>
        <input {...props} />
      </div>
    </>
  );
};
export const Button = (props) => {
  return (
    <>
      <button {...props}>{props.text}</button>
    </>
  );
};
