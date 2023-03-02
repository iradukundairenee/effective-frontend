import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingBox from "components/loading.component";
import Logo from "assets/ari_cube.png";
import { sendLink, signin } from "redux/actions/user";
import { USER_INFO } from "utils/constants";
import { Link } from "@material-ui/core";
import { EmailDialog } from "./EmailDialog";
import { notifier } from "utils/notifier";

const initialState = { email: "", password: "" };
export const OldLoginPage = (props) => {
  const [logins, setLogins] = useState(initialState);
  const [openDialog, setOpenDialog] = useState(false);

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "dashboard/home";
  const signState = useSelector((state) => state);
  const {
    login: { userInfo, loading },
    linkSend: { loaded, loading: sending },
  } = signState;
  useEffect(() => {
    if (userInfo.user.fullName) {
      localStorage.setItem(USER_INFO, JSON.stringify(userInfo));
      window.location.href = redirect;
      setLogins(initialState);
    }
  }, [props.history, redirect, userInfo]);
  useEffect(() => {
    if (loaded) {
      setOpenDialog(false);
      notifier.success("Email was sent to your mail box");
      setLogins(initialState);
    }
  }, [loaded]);
  const onHandleChange = (e) => {
    e.preventDefault();
    const {
      target: { name, value },
    } = e;
    setLogins({ ...logins, [name]: value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    signin(logins);
  };
  return (
    <div className="login-page">
      <EmailDialog
        open={openDialog}
        setOpen={() => setOpenDialog(false)}
        userInfo={logins}
        onChange={onHandleChange}
        onConfirm={() => sendLink(logins.email)}
        loading={sending}
      />
      <form className="form" onSubmit={submitHandler}>
        <div>
          <img src={Logo} alt="#" className="logo" />
        </div>
        <div>
          <h1>Sign In to ARI CUBE</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        <div>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            required
            onChange={onHandleChange}
            value={logins.email}
            className="login-input"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            required
            onChange={onHandleChange}
            value={logins.password}
            className="login-input"
          />
        </div>
        <div>
          <button className="login-input btn-login primary" type="submit">
            Login
          </button>
          <Link
            component="button"
            variant="body2"
            onClick={() => setOpenDialog(true)}
          >
            Forget password?
          </Link>
        </div>
      </form>
    </div>
  );
};
