import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Avatar,
} from "@material-ui/core";
import {
  ExpandMore as ExpandMoreIcon,
} from "@material-ui/icons";
import { useStyles } from "styles/headerStyles";
import { menuId, NavigationMenu } from "./NavigationMenu";
import { MobileMenu, mobileMenuId } from "./MobileMenu";
import { useSelector } from "react-redux";
import { NotificationsMenu, notificationsMenuId } from "./NotificationsMenu";
import { getNotifications } from "redux/actions/dashboard";
import NotificationIcon from "../../assets/Vector.svg";
import Logo from "../../assets/ari_cube.png";

export const AppHeader = ({ children }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [notifAnchorEl, setNotifAnchorEl] = React.useState(null);

  const appState = useSelector((state) => state);
  const {
    login: {
      userInfo: { user },
    },
    notifsCount: { count },
  } = appState;

  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    getNotifications("count");
  }, []);
  useEffect(() => {
    if (user?.profileImage) {
      setProfileImage(user.profileImage);
    }
  }, [user]);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleNavMenuOpen = (event) => {
    setMobileMoreAnchorEl(null);
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const showNotifications = ({ currentTarget }) => {
    setNotifAnchorEl(currentTarget);
    getNotifications();
  };
  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <img className={"dashboard-logo"} src={Logo} alt="logo" />
          <Typography
            className={classes.title}
            variant="h4"
            color="inherit"
            noWrap
          >
            Augmented Reality Innovations
          </Typography>
          <div className={classes.grow} />
          <div id="search-box">
            <input
              className={"search-field"}
              type="text"
              placeholder="Search"
            />
          </div>
          {Boolean(user?.fullName) && (
            <div className={classes.sectionDesktop}>
              <IconButton
                aria-label={`show ${count} new notifications`}
                color="inherit"
                aria-controls={notificationsMenuId}
                aria-haspopup="true"
                onClick={showNotifications}
              >
                <Badge badgeContent={count} color="secondary">
                  <Avatar className={classes.notification}>
                    <img src={NotificationIcon} alt="notification" />
                  </Avatar>
                </Badge>
              </IconButton>

              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleNavMenuOpen}
                color="inherit"
              >
                <Avatar src={profileImage} className={classes.avatar} />
                <Typography
                  className={classes.title}
                  variant="h4"
                  color="inherit"
                  noWrap
                >
                  {user.firstName}
                </Typography>

                <ExpandMoreIcon />
              </IconButton>
            </div>
          )}
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <Avatar src={profileImage} className={classes.avatar} />
              <ExpandMoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <NavigationMenu
        anchorEl={anchorEl}
        isMenuOpen={isMenuOpen}
        handleMenuClose={handleMenuClose}
        user={user}
      />
      <MobileMenu
        mobileMoreAnchorEl={mobileMoreAnchorEl}
        isMobileMenuOpen={isMobileMenuOpen}
        handleMobileMenuClose={handleMobileMenuClose}
        handleNavMenuOpen={handleNavMenuOpen}
        user={user}
        notificationsCount={count}
      />
      <NotificationsMenu
        anchorEl={notifAnchorEl}
        onClose={() => setNotifAnchorEl(null)}
        user={user}
      />
      {children}
    </div>
  );
};
