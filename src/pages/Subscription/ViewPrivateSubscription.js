import React, { useState, useEffect } from "react";
import "../ProjectDetail/styles.css";
import { useStyles } from "./styles";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { BsArrowLeft } from "react-icons/bs";
import { AddCustomer } from "./AddCustomerModal";
import { getUsersList } from "redux/actions/user";
import { withStyles } from "@material-ui/core/styles";
import { Loading } from "../../components/loading.component";
import Pagination from "../../components/Pagination/Pagination";
import privateCheckIcon from "../../assets/white-check-icon.svg";
import { getCurrencyByUser } from "../../redux/actions/currency";

import {
  Grid,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Avatar,
} from "@material-ui/core";

import {
  getSubscription,
  getSubscriptionsCustomers,
} from "redux/actions/subscriptionPlan";

const StyledTableCell = withStyles((theme) => ({
  root: {
    borderBottom: "none",
  },
  head: {
    backgroundColor: "#fff",
    fontSize: 16,
    fontFamily: "Poppins",
    padding: "10px 5px",
  },
  body: {
    backgroundColor: "#fff",
    padding: "15px 15px",
    fontFamily: "Poppins",
    fontWeight: 500,
    fontSize: "14px",
    color: "#7D7D7D",
  },
}))(TableCell);

export const ViewPrivateSubscription = () => {
  const classes = useStyles();
  const { subscriptionId } = useParams();
  const [activeTab, setActiveTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  const subscriptionState = useSelector((state) => state);
  const {
    subscriptionGet: { loaded, subscription },
    userList: { users },
    subscriptionCustomersGet: { customers },
    getCurrencyByUser: { userCurrency },
    login: {
      userInfo: { user },
    },
  } = subscriptionState;

  const tabs = ["Private Plan"];
  const changeTab = (idx) => {
    setActiveTab(idx);
  };

  useEffect(() => {
    getCurrencyByUser(user._id);
  }, [user]);

  useEffect(() => {
    getSubscription(subscriptionId);
  }, [subscriptionId]);

  useEffect(() => {
    getUsersList("Client");
  }, []);

  useEffect(() => {
    if (searchKey === "") {
      setFilteredUsers([]);
    }
  }, [searchKey]);

  useEffect(() => {
    getSubscriptionsCustomers(subscriptionId);
  }, [subscriptionId]);

  const searchByCompany = (e) => {
    const matchedUserByCompanies = users.filter((key) => {
      return `${key.companyName}`
        .toUpperCase()
        .includes(e.target.value.toUpperCase());
    });
    setFilteredUsers(matchedUserByCompanies);
    setSearchKey(e.target.value);
  };

  return (
    <div className={classes.screenContainer}>
      {user.role === "Admin" && (
        <div className={classes.titleContainer}>
          <Link
            to="/dashboard/subscriptions"
            className={classes.backArrowTitle}
          >
            <BsArrowLeft />
          </Link>
          <span className={classes.screenTitle}>Subscriptions</span>
        </div>
      )}
      <div className={"w-full border-box mt-1"}>
        <div className="ar-tab grid">
          {tabs.map((tab, idx) => (
            <div
              onClick={() => changeTab(idx)}
              className={activeTab === idx ? "active" : ""}
            >
              {tab}
            </div>
          ))}
        </div>
        <div className="w-full tab-content">
          {activeTab === 0 &&
            (!loaded ? (
              <Loading />
            ) : (
              <Grid
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "25px",
                }}
              >
                <Grid className={classes.subscriptionContainer}>
                  <Card className={classes.privateSubscriptionCardAdmin}>
                    <CardContent>
                      <div style={{ display: "flex" }}>
                        <Grid>
                          <Typography
                            className={classes.privateSubscriptionCardTitle}
                          >
                            {subscription.SubscriptionPlanName}
                          </Typography>
                          <Typography
                            className={classes.subscriptionPriceSection}
                          >
                            {userCurrency &&
                              userCurrency[0]?.currency &&
                              userCurrency[0]?.currency.icon}
                            <span className={classes.subscriptionPrice}>
                              {subscription.billingCycle[0].monthly}
                            </span>
                            /month
                          </Typography>
                        </Grid>
                        {subscription?.DiscountApplicable === "enable" && (
                          <Grid className={classes.discount}>
                            {subscription?.DiscountType === "percentage"
                              ? `Save ${subscription?.discountValue}%`
                              : `Save ${subscription?.discountValue}$`}
                          </Grid>
                        )}
                      </div>
                      <Typography
                        className={classes.privateSubscriptionSubTitle}
                      >
                        {subscription.subheader}
                      </Typography>
                      <List className={classes.checkListContainer}>
                        {subscription.plandetailchecklist?.map((litem) => (
                          <ListItem className={classes.checkListItem}>
                            <img
                              src={privateCheckIcon}
                              alt="check icon"
                              color="#fff"
                            />
                            <ListItemText
                              primary={
                                <Typography
                                  className={classes.privateCheckListText}
                                >
                                  {litem}
                                </Typography>
                              }
                            />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid style={{ width: "900px" }}>
                  <Typography className={classes.subscriptionDetailsTitle}>
                    Customer Assigned
                  </Typography>
                  <Card style={{ height: "70vh" }}>
                    <Table
                      className={classes.privateSubscriptionDetailsCard}
                      aria-label="simple table"
                    >
                      <TableHead>
                        <TableRow>
                          <StyledTableCell align="center">Name</StyledTableCell>
                          <StyledTableCell align="center">
                            Email
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Phone No
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Company Name
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {customers.length === 0 ? (
                          <Typography
                            style={{
                              marginTop: "10px",
                              marginLeft: "20px",
                              fontFamily: "Poppins",
                              fontWeight: 500,
                              fontSize: "14px",
                              color: "#7D7D7D",
                            }}
                          >
                            {" "}
                            No Customers Assigned
                          </Typography>
                        ) : (
                          customers.map((customer) => (
                            <TableRow key={customer.user._id}>
                              <StyledTableCell
                                component="th"
                                scope="row"
                                style={{
                                  display: "flex",
                                }}
                              >
                                <Avatar
                                  alt="Customer"
                                  src={customer.user.profileImage}
                                />
                                <Typography
                                  style={{
                                    marginTop: "10px",
                                    marginLeft: "20px",
                                    fontFamily: "Poppins",
                                    fontWeight: 500,
                                    fontSize: "14px",
                                    color: "#7D7D7D",
                                  }}
                                >
                                  {customer.user.fullName}
                                </Typography>
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {customer.user.email}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {customer.user.phoneNumber}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {customer.user.companyName}
                              </StyledTableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                    <AddCustomer
                      open={open}
                      handleClose={handleClose}
                      searchByCompany={searchByCompany}
                      searchKey={searchKey}
                      users={filteredUsers}
                      customers={customers}
                    />
                    <Grid className={classes.tableActions}>
                      <Link
                        className={classes.addCustomer}
                        onClick={handleOpen}
                      >
                        + Add New Customer
                      </Link>
                      <Pagination
                        currentPage={currentPage}
                        totalCount={customers.length}
                        pageSize={3}
                        onPageChange={(page) => setCurrentPage(page)}
                      />
                    </Grid>
                  </Card>
                </Grid>
              </Grid>
            ))}
        </div>
      </div>
    </div>
  );
};
