import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingBox from "components/loading.component";
import Logo from "assets/ari_cube.png";
import { sendLink, signin } from "redux/actions/user";
import { USER_INFO } from "utils/constants";
import { Link, withStyles } from "@material-ui/core";
import { EmailDialog } from "./EmailDialog";
import { notifier } from "utils/notifier";
import "./login.css";
import logo from '../../assets/ari_cube.png';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import { TextField, Typography, Grid } from "@material-ui/core";
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import LockRoundedIcon from '@mui/icons-material/LockRounded';

export const LoginPage = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [isPasswordField, setIsPasswordField] = useState(true);

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
      setEmail('')
      setPassword('')
    }
  }, [props.history, redirect, userInfo]);

  useEffect(() => {
    if (loaded) {
      setOpenDialog(false);
      notifier.success("Email was sent to your mail box");
      setEmail('')
      setPassword('')
    }
  }, [loaded]);

  const login = (e) => {
    e.preventDefault();
    signin({ email, password });
  };

  const GreenCheckbox = withStyles({
    root: {
      '&$checked': {
        color: "#8967FC",
      },

    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

  return (
    <div className="login-page">
      <EmailDialog
        open={openDialog}
        setOpen={() => setOpenDialog(false)}
        userInfo={{ email, password }}
        onChange={e => setEmail(e.target.value)}
        onConfirm={() => sendLink(email)}
        loading={sending}
      />
      <section className="form-wrapper">
        <div className="bg">

        </div>
        <div className="form-container">
          <div className="logo-container">
            <div className="logo-image">
              <img src={logo} style={{ width: '60px', height: '60px' }} />
            </div>
          </div>
          <div className="welcome-text">
            <p className="title">Welcome</p>
          </div>
          <form className="login-form">
            <Grid className="form-group email-icon">
              <Typography className="label">Email</Typography>
              <TextField name="email"
                required
                onChange={e => setEmail(e.target.value)}
                value={email} placeholder="alma.lawson@example.com" type="text" className="form-control"

                InputProps={{
                  disableUnderline: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon style={{ color: '#8967fc' }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid className="form-group password-icon">
              <Typography className="label">Password</Typography>
              <TextField required
                onChange={e => setPassword(e.target.value)}
                value={password} name="password" placeholder="*********" type={isPasswordField ? "password" : "text"} className="form-control"

                InputProps={{
                  disableUnderline: true,
                  startAdornment: (
                    <InputAdornment position="start" >
                      <LockRoundedIcon style={{ color: '#8967fc' }} />
                    </InputAdornment>
                  ),
                }}
              />
              <i onClick={() => setIsPasswordField(!isPasswordField)} className="fa fa-eye" id="show-password"></i>
            </Grid>
            <Grid className="form-group remember-wrapper">
              <Grid>
                <FormControlLabel
                  control={<GreenCheckbox />}
                  label="Remember me"
                />
              </Grid>
              <Link
                component="p"
                variant="body2"
                onClick={() => setOpenDialog(true)}
              >
                <span className="text-primary forgot-password-link">Forget password?</span>
              </Link>
            </Grid>
            <Grid className="form-group"
              onClick={login}
            >
              <button className="text-bold form-control bg-primary text-white">
                {loading ? <CircularProgress
                  style={{ color: 'white', height: '1.5rem', width: '1.5rem', marginTop: '-5px' }} /> : 'Login now'}
              </button>
            </Grid>
          </form>
        </div>
      </section>
    </div>
  );
};
