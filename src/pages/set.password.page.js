import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingBox from "../components/loading.component";
import Logo from "../assets/ari_cube.png";
import {
  resetPassword,
  setPassword,
  validateToken,
} from "../redux/actions/user";
import { notifier } from "../utils/notifier";

const initialState = { password: "", confirmPassword: "" };
const SetPassword = ({ history, match }) => {
  const [credentials, setCredentials] = useState(initialState);

  const {
    passwordSet: { loaded, loading },
    pwdReset: { loaded: set, loading: setting },
    validateResetToken: { loaded: validated, message },
  } = useSelector((state) => state);

  useEffect(() => {
    validateToken(match.params.token);
  }, [match.params.token]);

  useEffect(() => {
    if (loaded || set) {
      notifier.success("The password has been set");
      setTimeout(() => {
        history.replace("/");
      }, 3000);
    }
  }, [history, loaded, set]);
  const onHandleChange = (e) => {
    e.preventDefault();
    const {
      target: { name, value },
    } = e;
    setCredentials({ ...credentials, [name]: value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    delete credentials.confirmPassword;
    credentials.token = match.params.token;
    if (match.params.action === "reset") {
      resetPassword(credentials);
    } else {
      setPassword(credentials);
    }
  };
  if (validated && message === "Token valid") {
    return (
      <div>
        <form className="form" onSubmit={submitHandler}>
          <div>
            <img src={Logo} alt="#" className="logo" />
          </div>
          <div>
            <h1>Set a new password</h1>
          </div>
          {(loading || setting) && <LoadingBox></LoadingBox>}
          <div>
            <label htmlFor="pasword">New Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="login-input"
              placeholder="Enter password"
              required
              onChange={onHandleChange}
              value={credentials.password}
            ></input>
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className="login-input"
              placeholder="Confirm password"
              required
              onChange={onHandleChange}
              value={credentials.confirmPassword}
            ></input>
          </div>
          <div>
            <label />
            <button
              className="login-input btn-login primary"
              type="submit"
              disabled={loading}
            >
              Set password
            </button>
          </div>
        </form>
      </div>
    );
  } else if (message === "Token not valid") {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          // justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <img src={Logo} alt="#" className="logo" />
        </div>
        <h1
          style={{
            color: "#8967fc",
            textAlign: "center",
          }}
          className="text-font"
        >
          This password reset link has expired
        </h1>
        <p
          style={{
            fontSize: "1.2rem",
            marginBottom: "5rem",
            textAlign: "center",
          }}
          className="text-font"
        >
          Click the link below to go to the login page and login or choose
          forgot password if you want to change your password again.
        </p>
        <button
          className="login-input btn-login primary"
          onClick={() => history.replace("/")}
        >
          Go to login 
        </button>
      </div>
    );
  } else {
    return null;
  }
};
export default SetPassword;
