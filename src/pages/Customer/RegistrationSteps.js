import React from "react";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import PhoneInput from "material-ui-phone-number";

const userRoles = ["Client", "Manager"];
export const CustomerInfo = ({ userInfo = {}, onHandleChange }) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <TextField
          name="firstName"
          variant="outlined"
          fullWidth
          id="firstName"
          label="First Name"
          onChange={onHandleChange}
          value={userInfo.firstName}
          autoFocus
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="lastName"
          variant="outlined"
          fullWidth
          id="lastName"
          label="Last Name"
          onChange={onHandleChange}
          value={userInfo.lastName}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          fullWidth
          name="companyName"
          label="Company Name"
          autoComplete="Company Name"
          value={userInfo.companyName}
          onChange={onHandleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          fullWidth
          name="companyUrl"
          label="Company URL"
          value={userInfo.companyUrl}
          onChange={onHandleChange}
        />
      </Grid>
    </Grid>
  );
};
export const ContactInfo = ({
  userInfo = {},
  onHandleChange,
  onPhoneChange,
}) => {
  return (
    <Grid container spacing={1}>
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
    </Grid>
  );
};
export const LocationInfo = ({ userInfo = {}, onHandleChange }) => {
  return (
    <Grid container spacing={1}>
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
      <Grid item xs={12}>
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
          value={userInfo.postalCode}
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
  );
};
export const RoleInfo = ({ userInfo = {}, onHandleChange }) => {
  return (
    <Grid container spacing={1}>
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
  );
};
