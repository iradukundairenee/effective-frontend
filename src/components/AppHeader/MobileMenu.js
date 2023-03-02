import React from "react";
import { IconButton, Badge, MenuItem, Menu } from "@material-ui/core";
import {
  AccountCircle,
  Notifications as NotificationsIcon,
  ExitToApp,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { signout } from "redux/actions/user";

export const mobileMenuId = "primary-search-account-menu-mobile";
export const MobileMenu = ({
  mobileMoreAnchorEl,
  isMobileMenuOpen,
  handleMobileMenuClose,
  handleNavMenuOpen,
  user,
  notificationsCount = 0,
}) => {
  return (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      style={{ marginTop: "50px" }}
    >
      <MenuItem
        onClick={handleMobileMenuClose}
        component={Link}
        to={`/dashboard/view-profile`}
        style={{ color: "#7D7D7D" }}
      >
        <IconButton
          aria-label="account of current user"
          aria-controls="profile-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        My Profile
      </MenuItem>
      <MenuItem style={{ color: "#7D7D7D" }}>
        <IconButton
          aria-label={`show ${notificationsCount} new notifications`}
          color="inherit"
          aria-controls="notifications-menu"
          aria-haspopup="true"
        >
          <Badge badgeContent={notificationsCount} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem
        component={Link}
        to={`/`}
        onClick={() => signout()}
        style={{ color: "#7D7D7D" }}
      >
        <IconButton
          aria-label="sign out the current user"
          aria-controls="signout-menu"
          color="inherit"
        >
          <ExitToApp />
        </IconButton>
        Sign Out
      </MenuItem>
    </Menu>
  );
};
