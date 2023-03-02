import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import { AccountProfile } from "./AccountProfile";
import { AccountDetails } from "./AccountDetails";
import { useSelector } from "react-redux";
import { USER_INFO } from "utils/constants";
import { notifier } from "utils/notifier";
import { TextField, Button } from "./AccountDetails";
import { changePassword } from "redux/actions/user";
import { useHistory } from "react-router-dom";
import { getSingleUser, resetUpdateProfile } from "redux/actions/user";
import { signin } from "redux/actions/user";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
}));

export const EditProfile = () => {
  const classes = useStyles();
  const history = useHistory();
  const {
    login: { userInfo },
    profileEdit: { loading, loaded, userInfo: updatedInfo },
    profileImgAdd: { loaded: profileUpdated, fileName },
    profileImgRm: { loaded: rmLoaded },
    changePassword: { passwordChanged, ...others },
    getSingleUser: { user },
    profileEdit: { loaded: userUpdated },
  } = useSelector((state) => state);

  useEffect(() => {
    if (userInfo) {
      getSingleUser(userInfo.user._id);
    }
  }, [userInfo]);

  useEffect(() => {
    if (passwordChanged) {
      notifier.success("Password changed successfully");
    }
    if (loaded || profileUpdated || rmLoaded) {
      if (updatedInfo) {
        localStorage.setItem(USER_INFO, JSON.stringify(updatedInfo));
        getSingleUser(userInfo.user._id);
      }
      if (profileUpdated || rmLoaded) {
        const currentInfo = { ...userInfo };
        currentInfo.user.profileImage = fileName || "";
        localStorage.setItem(USER_INFO, JSON.stringify(currentInfo));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, profileUpdated, rmLoaded, updatedInfo, passwordChanged]);

  const [activeTab, setActiveTab] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const tabs = ["Edit Profile", "Change Password"];
  const changeTab = (idx) => {
    setActiveTab(idx);
  };
  const [newPassword, setNewPassword] = useState({});
  const handleChange = (e) => {
    setNewPassword({ ...newPassword, [e.target.name]: e.target.value });
  };
  const updatePassword = async () => {
    setDisabled(true);
    changePassword(newPassword, setDisabled);
  };
  return (
    <div className={classes.root}>
      <div className={"w-full border-box"}>
        <div className="ar-tab grid">
          {tabs.map((tab, idx) => (
            <div
              onClick={() => changeTab(idx)}
              className={activeTab == idx ? "active" : ""}
            >
              {tab}
            </div>
          ))}
        </div>
        {/*  */}

        <div className="w-full tab-content">
          {activeTab == 0 && (
            <Grid container spacing={1} columns={1}>
              <Grid item xs={12}>
                <AccountProfile user={user} />
              </Grid>
              <Grid xs={12}>
                <AccountDetails user={user} loading={loading} />
              </Grid>
            </Grid>
          )}

          {activeTab == 1 && (
            <div className="w-full password-change-container">
              <Grid container>
                <Grid item md={6} xs={12}>
                  <TextField
                    label="Old password"
                    type="password"
                    name="oldPassword"
                    onChange={handleChange}
                  />
                  <TextField
                    label="New password"
                    type="password"
                    name="newPassword"
                    onChange={handleChange}
                  />
                  <TextField
                    label="Confirm password"
                    type="password"
                    name="confirmPassword"
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <Grid container>
                <div item className="profile-btn-group password-btn-group">
                  <Button
                    className={"btn-rounded-sm btn-outlined"}
                    text={"Cancel"}
                    onClick={() => history.goBack()}
                  />
                  <Button
                    onClick={updatePassword}
                    disabled={others.loading}
                    className={"btn-rounded-sm btn-contained ml-5"}
                    text={others.loading ? "Updating ..." : "Update Password"}
                  />
                </div>
              </Grid>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
