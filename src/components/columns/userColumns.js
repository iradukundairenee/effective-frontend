import React from "react";
import { Avatar, Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

export const userColumns = (onUserClick) => [
  {
    content: (item) => (
      <Grid
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Avatar
          src={item.profileImage ? item.profileImage : ""}
          style={{ width: "35px", height: "35px" }}
        />
      </Grid>
    ),
  },
  {
    content: (item) => (
      <Link
        underline="none"
        onClick={() => onUserClick(item, "view")}
        style={{
          color: "#7D7D7D",
          fontFamily: "Poppins",
          fontWeight: "400",
          display: "flex",
        }}
      >
        <Typography
          style={{
            color: "#7D7D7D",
            fontFamily: "Poppins",
            fontWeight: "400",
            fontSize: "16px",
          }}
        >
          {item.firstName} {item.lastName}
        </Typography>
      </Link>
    ),
    label: "Name",
  },
  { path: "email", label: "Email" },
  { path: "phoneNumber", label: "Phone No" },
  { path: "companyName", label: "Company" },
  {
    content: (item) => (
      <Typography
        component={item.projects && item.projects.length > 0 ? Link : ""}
        sx={{ textAlign: "center" }}
        to={`/dashboard/crm/projects/user/${item._id}`}
      >
        <Typography
          style={{
            color: "#7D7D7D",
            fontFamily: "Poppins",
            fontWeight: "400",
            fontSize: "16px",
            textAlign: "center",
          }}
        >
          {`${item.projects && item.projects.length}`}
          {`(${item.pendingProjects && item.pendingProjects.length})`}
        </Typography>
      </Typography>
    ),
    label: "Project(Pending)",
  },
  { path: "subscription", label: "Subscription" },
  { path: "products", label: "3D Assets" },
  { path: "loyaltyProgram", label: "Loyalty Program" },
  {
    content: (item) => (
      <Link
        underline="none"
        to={`/dashboard/crm/userSessions/${item._id}`}
        // onClick={() => onUserClick(item, "view")}
        style={{
          color: "#7D7D7D",
          fontFamily: "Poppins",
          fontWeight: "400",
          display: "flex",
        }}
      >
        <Typography
          style={{
            color: "#7D7D7D",
            fontFamily: "Poppins",
            fontWeight: "400",
            fontSize: "16px",
          }}
        >
          {item.sessions}
        </Typography>
      </Link>
    ),
    label: "Sessions",
  },
];
