import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import PhoneInput from "material-ui-phone-number";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import LoadingBox from "../loading.component";
import { getUsersList, registerUser } from "../../redux/actions/user";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#8967fc",
  },
  input: {
    fontSize: 16,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(2),
    color: "black",
    fontSize: 16,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#8967fc",
    borderRadius: 5,
    float: "left",
    maxWidth: "100%",
    color: "white",
    fontSize: 16,
    "&:hover": {
      backgroundColor: "#8967fc",
      color: "#FFFFFF",
    },
  },
}));

const initialState = {
  fullName: "",
  email: "",
  phoneNumber: "",
  role: "client",
  companyName: "",
  address: "",
  country: "",
  city: "",
};
const userRoles = ["Client", "Manager"];
const steps = [
  "Select campaign settings",
  "Create an ad group",
  "Create an ad",
];
const getStepContent = (step) => {
  const stepsContent = [
    "Step 1: Select campaign settings...",
    "Step 2: What is an ad group anyways?",
    "Step 3: This is the bit I really care about!",
  ];
  return stepsContent[step];
};
const Registration = () => {
  const classes = useStyles();
  const [userInfo, setUserInfo] = useState(initialState);
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState(new Set());
  const [skipped, setSkipped] = React.useState(new Set());

  const userRegister = useSelector((state) => state.register);
  const { loading: registering, loaded: registered } = userRegister;

  useEffect(() => {
    if (registered) {
      getUsersList();
      setUserInfo(initialState);
    }
  }, [registered]);
  const onHandleChange = (e) => {
    e.preventDefault();
    const {
      target: { name, value },
    } = e;
    setUserInfo({ ...userInfo, [name]: value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    registerUser(userInfo);
  };
  const onPhoneChange = (value, country) => {
    setUserInfo({ ...userInfo, phoneNumber: value, country: country.name });
  };
  const totalSteps = () => steps.length;

  const isStepOptional = (step) => step === 1;

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };
  return (
    <Container component="main">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          REGISTER CUSTOMER
        </Typography>
        {registering && <LoadingBox></LoadingBox>}
        <form className={classes.form} onSubmit={submitHandler}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                className={classes.input}
                autoComplete="fname"
                name="fullName"
                variant="outlined"
                fullWidth
                id="fullName"
                label="Full Name"
                onChange={onHandleChange}
                value={userInfo.fullName}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={userInfo.email}
                onChange={onHandleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item lg={6} md={6} xl={6} xs={12}>
                  <PhoneInput
                    variant="outlined"
                    fullWidth
                    autoComplete="phone number"
                    label="Phone Number"
                    defaultCountry="rw"
                    countryCodeEditable={false}
                    value={userInfo.phoneNumber}
                    onChange={onPhoneChange}
                  />
                </Grid>
                <Grid item lg={6} md={6} xl={6} xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="country"
                    autoComplete="country"
                    value={userInfo.country}
                    disabled
                    onChange={onHandleChange}
                  />
                </Grid>
                <Grid item lg={6} md={6} xl={6} xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="City"
                    name="city"
                    autoComplete="city"
                    value={userInfo.city}
                    onChange={onHandleChange}
                  />
                </Grid>
                <Grid item lg={6} md={6} xl={6} xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="State"
                    name="state"
                    autoComplete="state"
                    value={userInfo.state}
                    onChange={onHandleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Postal code"
                    name="postalCode"
                    autoComplete="postalCode"
                    value={userInfo.postalCode}
                    onChange={onHandleChange}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="user-role">Role</InputLabel>
                <Select
                  labelId="user-role"
                  value={userInfo.role}
                  name="role"
                  onChange={onHandleChange}
                >
                  <MenuItem value="">---</MenuItem>
                  {userRoles.map((role, roleIdx) => (
                    <MenuItem value={role} key={roleIdx}>
                      {role.toUpperCase()}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="companyName"
                label="Company Name"
                type="companyName"
                id="companyName"
                autoComplete="Company Name"
                value={userInfo.companyName}
                onChange={onHandleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="address"
                label="Your Address"
                type="address"
                id="address"
                autoComplete="address"
                value={userInfo.address}
                onChange={onHandleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            disabled={registering}
          >
            SUBMIT
          </Button>
        </form>
      </div>
    </Container>
  );
};
export default Registration;
