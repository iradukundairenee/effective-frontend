import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { Avatar, Grid, Typography } from "@material-ui/core";

export const  EmployeeColumns = (onUserClick) => {
  return [
    {
      content: (item) => (
        <Grid
          style={{
            display: "flex",
            padding: "10px 0px",
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
    {
      content: (item) => (
        <Typography
          style={{
            color: "#7D7D7D",
            fontFamily: "Poppins",
            fontWeight: "400",
            fontSize: "16px",
          }}
        >
          {item.email}
        </Typography>
      ),
      label: "Email",
    },
    {
      content: (item) => (
        <Typography
          style={{
            color: "#7D7D7D",
            fontFamily: "Poppins",
            fontWeight: "400",
            fontSize: "16px",
          }}
        >
          {item.phoneNumber}
        </Typography>
      ),
      label: "Phone No",
    },
    {
      content: (item) => (
        <Typography
          component={item.projects && item.projects.length > 0 ? Link : ""}
          to={`/dashboard/crm/projects/manager/${item._id}`}
          style={{
            color: "#7D7D7D",
            fontFamily: "Poppins",
            fontWeight: "400",
            fontSize: "16px",
          }}
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
    {
      content: (item) => (
        <Typography
          style={{
            color: "#7D7D7D",
            fontFamily: "Poppins",
            fontWeight: "400",
            fontSize: "16px",
            textAlign: "center",
          }}
        >
          12
        </Typography>
      ),
      label: "No. of 3D assets",
    },
    {
      content: (item) => (
        <Typography
          style={{
            color: "#7D7D7D",
            fontFamily: "Poppins",
            fontWeight: "400",
            fontSize: "16px",
            textAlign: "center",
          }}
        >
          {item.sessions}
        </Typography>
      ),
      label: "Sessions",
    },
    {
      content: (item) => (
        <Typography
          style={{
            color: "#7D7D7D",
            fontFamily: "Poppins",
            fontWeight: "400",
            fontSize: "16px",
          }}
        >
          {moment(item.createdAt).format("DD MMM YYYY")}
        </Typography>
      ),
      label: "Start Date",
    },
  ];
};
