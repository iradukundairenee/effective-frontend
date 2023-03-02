import React from "react";
import { MenuItem, Menu } from "@material-ui/core";
import { AccountCircle, ExitToApp } from '@material-ui/icons';
import { Link } from "react-router-dom";
import { signout } from "redux/actions/user";
export const menuId = "primary-search-account-menu";

export const NavigationMenu = ({
  anchorEl,
  isMenuOpen,
  handleMenuClose,
}) => {
  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      style={{ marginTop: "40px" }}
    >
      <MenuItem
        onClick={handleMenuClose}
        component={Link}
        to={`/dashboard/view-profile`}
        style={{ color: "#8967FC" }}
      >
        <AccountCircle style={{ marginRight: "10px" }} />
        My Profile
      </MenuItem>

      <MenuItem component={Link}
        to={`/`}
        onClick={() => {
          signout()
        }} style={{ color: "#7D7D7D" }}>
        <ExitToApp style={{ marginRight: "10px" }} />
        Sign Out
      </MenuItem>
    </Menu>
  );
};
