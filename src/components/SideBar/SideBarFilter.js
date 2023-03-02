import React, { useState } from "react";
import { IconButton, Menu, Typography, Button, Grid, ListItemIcon, MenuItem, ListItemText, FormControlLabel, } from "@material-ui/core";
import { AccountCircle, CheckBox, ExitToApp, SettingsInputAntenna } from '@material-ui/icons';
import { Checkbox } from '@mui/material';
import { useStyles } from "./styles";
export const menuId = "primary-search-account-menu";

export const SideBarFilter = ({
    anchorEl,
    isMenuOpen,
    handleMenuClose,
    deviceChecked,
    handleFilter,
    handleDeviceChecked,
    data,
    handleChecked,
    deviceFilters,
    checkedCountries,
    defaultChecked,
    checked,
    countryByUser
}) => {
    const classes = useStyles();
    const countriesNames = Array.from(new Set(countryByUser.map((country) => (country.name))))
    return (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={isMenuOpen}
            onClose={handleMenuClose}
            style={{ marginTop: "100px" }}
        >
            <div style={{ width: "300px", display: "flex-wrap" }}>

                <Typography
                    style={{
                        fontSize: "15px",
                        fontWeight: "700",
                        color: "#303030",
                        marginLeft: "10px"
                    }}
                >
                    Device By Users
                </Typography>
                {deviceFilters.map((device, idx) => {
                    return <div style={{
                        display: 'flex',
                        color: "#303030",
                        alignItems: "center",
                        marginLeft: "10px"
                    }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    key={idx}
                                    value={device.name}
                                    onChange={handleDeviceChecked}
                                    defaultChecked={device.name ==="Desktop"  ? defaultChecked : !defaultChecked}
                                />
                            }
                        />
                        <Typography style={{ color: '#888888', textTransform: 'none' }}>
                            {device.name}
                        </Typography>
                    </div>
                })}
            </div>
            <div>
                <Typography
                    style={{
                        fontSize: "15px",
                        fontWeight: "700",
                        color: "#303030",
                        marginTop: "30px",
                        marginLeft: "10px"
                    }}
                >
                    Country By Users
                </Typography>
                {countriesNames.map((item, itemx) => {
                     return <div style={{
                        display: 'flex',
                        color: "#303030",
                        alignItems: "center",
                        marginLeft: "10px"
                    }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    key={itemx}
                                    value={item}
                                    onChange={handleChecked}
                                    defaultChecked={defaultChecked}
                                />
                            }
                        />
                       
                        <Typography style={{ color: '#888888', textTransform: 'none' }}>
                           {item}
                        </Typography>
                    </div>
                })}
            </div>
            <center>
                <IconButton
                    variant="outlined"
                    className={classes.itemActionBtn}
                    onClick={handleMenuClose}
                >
                    Cancel
                </IconButton>
                <IconButton
                    variant="outlined"
                    className={classes.addItemBtn}
                    onClick={handleFilter}
                >
                    Filter
                </IconButton>
            </center>
        </Menu>
    );
};
