import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Avatar,
  Button,
  CssBaseline,
  Grid,
  Typography,
  Container,
  Stepper,
  Step,
  StepButton,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import LoadingBox from "components/loading.component";
import { getUsersList, registerUser, updateUser } from "redux/actions/user";
import { useStyles } from "./styles";
import {
  CustomerInfo,
  ContactInfo,
  LocationInfo,
  RoleInfo,
} from "./RegistrationSteps";

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
  postalCode: "",
  role: "client",
};
const steps = ["User information", "Contact", "Location", "Permission"];

export const Registration = ({ action = "add", currentItem = null }) => {
  const classes = useStyles();
  const [userInfo, setUserInfo] = useState(initialState);
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState(new Set([0]));

  const userRegisterState = useSelector((state) => state);
  const {
    register: { loading: registering, loaded: registered },
    userEdit: { loading: updating, loaded: updated },
  } = userRegisterState;

  useEffect(() => {
    if (registered || updated) {
      getUsersList();
      setUserInfo(initialState);
      setActiveStep(0);
      setCompleted(new Set([0]));
    }
  }, [registered, updated]);
  useEffect(() => {
    if (currentItem && action === "edit") {
      setUserInfo(currentItem);
      setActiveStep(0);
      setCompleted(new Set([0]));
    }
  }, [currentItem, action]);
  const onHandleChange = (e) => {
    e.preventDefault();
    const {
      target: { name, value },
    } = e;
    setUserInfo({ ...userInfo, [name]: value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (action === "add") {
      registerUser(userInfo);
    }
    if (action === "edit") {
      updateUser(userInfo);
    }
  };
  const onPhoneChange = (value, country) => {
    setUserInfo({ ...userInfo, phoneNumber: value, country: country.name });
  };
  const totalSteps = () => steps.length;

  const completedSteps = () => completed.size;

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const isLastStep = () => activeStep === totalSteps() - 1;

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !completed.has(i))
        : activeStep + 1;

    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
    setCompleted((prevCompleted) => {
      const newCompleted = new Set(prevCompleted);
      newCompleted.add(step);
      return newCompleted;
    });
  };

  const isStepComplete = (step) => completed.has(step);
  const getStepContent = (step) => {
    const stepsContent = [
      {
        label: "Step 1: Fill customer information",
        component: (
          <CustomerInfo userInfo={userInfo} onHandleChange={onHandleChange} />
        ),
      },
      {
        label: "Step 2: Customer contacts",
        component: (
          <ContactInfo
            userInfo={userInfo}
            onHandleChange={onHandleChange}
            onPhoneChange={onPhoneChange}
          />
        ),
      },
      {
        label: "Step 3: Location",
        component: (
          <LocationInfo userInfo={userInfo} onHandleChange={onHandleChange} />
        ),
      },
      {
        label: "Step 4: Customer role",
        component: (
          <RoleInfo userInfo={userInfo} onHandleChange={onHandleChange} />
        ),
      },
    ];
    return stepsContent[step];
  };
  return (
    <Container component="main">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          {currentItem ? `Update ${currentItem.firstName}` : "REGISTER USER"}
        </Typography>
        <Stepper alternativeLabel nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepButton
                onClick={handleStep(index)}
                completed={isStepComplete(index)}
              >
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        {registering && <LoadingBox></LoadingBox>}
        <form className={classes.form}>
          <div>
            <Grid className={classes.instructions}>
              {getStepContent(activeStep).component}
            </Grid>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                Next
              </Button>
              {action === "add" && (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  className={classes.submit}
                  disabled={registering}
                  onClick={submitHandler}
                >
                  Save
                </Button>
              )}
              {action === "edit" && (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  className={classes.submit}
                  disabled={updating}
                  onClick={submitHandler}
                >
                  {currentItem ? `Update ${currentItem.firstName}` : "Update"}
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </Container>
  );
};
