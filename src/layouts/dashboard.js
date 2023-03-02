import React, { useEffect } from "react";
import { renderRoutes } from "react-router-config";
import { Container } from "@material-ui/core";
import { useSelector } from "react-redux";
import { USER_INFO } from "../utils/constants";
import { getDashboardCounts } from "redux/actions/project";
import { AppHeader } from "components/AppHeader";
import SideBar from "components/SideBar/SideBar";

export const DashboardLayout = ({ route, history }) => {
  const dashboardState = useSelector((state) => state);
  const {
    login: {
      userInfo: { user },
    },
  } = dashboardState;

  useEffect(() => {
    if (!user.fullName) {
      localStorage.removeItem(USER_INFO);
      history.replace("/");
    }
  }, [user, history]);

  useEffect(() => {
    getDashboardCounts();
  }, []);

  return (
    <AppHeader>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <SideBar />
        <Container style={{ marginLeft: "15%", marginTop: "5%" }}>
          {renderRoutes(route.routes)}
        </Container>
      </div>
    </AppHeader>
  );
};
