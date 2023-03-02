import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Avatar,
  Tooltip,
  IconButton,
} from "@material-ui/core";
import Pagination from "../../components/Pagination/Pagination";
import { withStyles } from "@material-ui/core/styles";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { getUsersList } from "redux/actions/user";
import "../ProjectDetail/styles.css";
import customerIcon from "../../assets/user-image1.svg";
import { useStyles } from "pages/Subscription/styles";
import { AddCustomer } from "pages/Subscription/AddCustomerModal";
import { Link } from "react-router-dom";
import { Loading } from "../../components/loading.component";
import {
  deleteCouponOnCustomer,
  getCoupon,
  getCouponCustomers,
  updateCoupon,
} from "redux/actions/coupons";
import moment from "moment";
import { FiXSquare } from "react-icons/fi";
import { getCurrencyByUser } from "redux/actions/currency";

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

export const ViewCoupon = () => {
  const classes = useStyles();
  const { couponId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [statusChanged, setStatusChanged] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [values, setValues] = useState({});
  const [searchKey, setSearchKey] = useState("");
  const [usersCurrency, setUsersCurrency] = useState("");
  const tabs = ["Coupon"];

  const couponState = useSelector((state) => state);
  const {
    getCoupon: { loaded, coupon },
    userList: { users },
    getCouponCustomers: { customers },
    getCurrencyByUser: { userCurrency },
  } = couponState;

  useEffect(() => {
    if (coupon) {
      const { startDate, validity, maxCap, couponName, couponType, enable } =
        coupon;
      setValues({
        startDate,
        validity,
        maxCap,
        couponName,
        couponType,
        enable,
      });
    }
  }, [coupon]);

  const enable = () => {
    setValues({ ...values, enable: true });
    setStatusChanged(true);
  };

  const disable = () => {
    setValues({ ...values, enable: false });
    setStatusChanged(true);
  };

  useEffect(() => {
    getUsersList("Client");
    getCurrencyByUser();
  }, []);

  useEffect(() => {
    if (couponId) {
      getCoupon(couponId);
      getCouponCustomers(couponId);
    }
  }, [couponId]);

  useEffect(() => {
    if (searchKey === "") {
      setFilteredUsers([]);
    }
  }, [searchKey]);

  const searchUsers = (e) => {
    const searchedUsers = usersCurrency.filter((key) => {
      return `${key.fullName}`.includes(e.target.value);
    });
    setFilteredUsers(searchedUsers);
    setSearchKey(e.target.value);
  };

  useEffect(() => {
    if (userCurrency && coupon) {
      setUsersCurrency(
        userCurrency
          .filter((user) => {
            return user.currency?._id === coupon?.currencyType?._id;
          })
          .map((user) => user.user)
      );
    }
  }, [coupon, userCurrency]);
  useEffect(() => {
    if (statusChanged) {
      updateCoupon(couponId, values);
    }
  }, [couponId, statusChanged, values]);
  const deleteCustomer = (coupon, userId) => {
    deleteCouponOnCustomer(coupon, userId);
    window.location.reload(true);
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <div className={"w-full border-box"}>
        <div className="ar-tab grid">
          {tabs.map((tab, idx) => (
            <div key={idx} className={"active"}>
              {tab}
            </div>
          ))}
        </div>
        <div className="w-full tab-content">
          {tabs[0] &&
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
                            {coupon && coupon.couponName}
                          </Typography>
                          <Typography
                            className={classes.subscriptionPriceSection}
                          >
                            Discount
                            {coupon && coupon.couponType === "Flat" ? (
                              <span className={classes.subscriptionPrice}>
                                {" "}
                                {coupon &&
                                  coupon.currencyType &&
                                  coupon.currencyType.icon}
                                {coupon && coupon.discountAmount}{" "}
                              </span>
                            ) : (
                              <span className={classes.subscriptionPrice}>
                                {" "}
                                {coupon && coupon.percentageValue}
                                {"% "}
                              </span>
                            )}
                            Off
                          </Typography>
                        </Grid>
                      </div>
                      <Typography
                        className={classes.privateSubscriptionSubTitle}
                      >
                        {coupon && coupon.couponCode}
                      </Typography>
                      <List
                        className={classes.checkListContainer}
                        style={{ display: "flex", flexDirection: "row" }}
                      >
                        <ListItem className={classes.couponListItem}>
                          <ListItemText
                            primary={
                              <Typography
                                className={classes.privateCheckListText}
                              >
                                Start date
                              </Typography>
                            }
                          />
                          <ListItemText
                            primary={
                              <Typography
                                className={classes.privateCheckListText}
                              >
                                Validity
                              </Typography>
                            }
                          />
                          <ListItemText
                            primary={
                              <Typography
                                className={classes.privateCheckListText}
                              >
                                Applicability
                              </Typography>
                            }
                          />
                          <ListItemText
                            primary={
                              <Typography
                                className={classes.privateCheckListText}
                              >
                                Max Cap
                              </Typography>
                            }
                          />
                          <ListItemText
                            primary={
                              <Typography
                                className={classes.privateCheckListText}
                              >
                                Type
                              </Typography>
                            }
                          />
                          <ListItemText
                            primary={
                              <Typography
                                className={classes.privateCheckListText}
                              >
                                Currency
                              </Typography>
                            }
                          />
                        </ListItem>
                        <ListItem className={classes.couponListItem}>
                          <ListItemText
                            primary={
                              <Typography
                                className={classes.privateCheckListText}
                              >
                                {coupon &&
                                  moment(coupon.startDate).format(
                                    "DD MMM YYYY"
                                  )}
                              </Typography>
                            }
                          />
                          <ListItemText
                            primary={
                              <Typography
                                className={classes.privateCheckListText}
                              >
                                {coupon &&
                                  moment(coupon.validity).format("DD MMM YYYY")}
                              </Typography>
                            }
                          />
                          <ListItemText
                            primary={
                              <Typography
                                className={classes.privateCheckListText}
                              >
                                {coupon &&
                                coupon.applicability &&
                                coupon.applicability.length > 0
                                  ? coupon.applicability
                                  : "Not set"}
                              </Typography>
                            }
                          />
                          <ListItemText
                            primary={
                              <Typography
                                className={classes.privateCheckListText}
                              >
                                {coupon && coupon.maxCap
                                  ? coupon.maxCap
                                  : "none"}
                              </Typography>
                            }
                          />
                          <ListItemText
                            primary={
                              <Typography
                                className={classes.privateCheckListText}
                              >
                                {coupon && coupon.couponType}
                              </Typography>
                            }
                          />
                          <ListItemText
                            primary={
                              <Typography
                                className={classes.privateCheckListText}
                              >
                                {coupon &&
                                  coupon.currencyType &&
                                  coupon.currencyType.currencyCode}
                              </Typography>
                            }
                          />
                        </ListItem>
                      </List>
                      <Button
                        className={classes.subscriptionButton}
                        onClick={() => {
                          values.enable ? disable() : enable();
                        }}
                      >
                        {values.enable ? "Disable" : "Enable"}
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid style={{ width: "900px" }}>
                  <Typography className={classes.subscriptionDetailsTitle}>
                    Redeemed list
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
                            Company
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Redeemed
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Amount
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Receipt #
                          </StyledTableCell>
                          {/* <StyledTableCell align="center">
                            Action
                          </StyledTableCell> */}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {customers && customers.length === 0 ? (
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
                          customers &&
                          customers.map((customer) => (
                            <TableRow key={customer.user._id}>
                              <StyledTableCell
                                component="th"
                                scope="row"
                                style={{
                                  display: "flex",
                                }}
                              >
                                <Avatar alt="Customer" src={customerIcon} />
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
                                {customer.user.companyName}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                21 apr 2022
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                $ 100.38
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                Receipt number
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                <Tooltip title="Delete this customer">
                                  <IconButton
                                    aria-label="Delete"
                                    onClick={() =>
                                      deleteCustomer(
                                        couponId,
                                        customer.user._id
                                      )
                                    }
                                    style={{
                                      color: "#7D7D7D",
                                      fontFamily: "Poppins",
                                      fontWeight: "400",
                                      fontSize: "16px",
                                    }}
                                  >
                                    <FiXSquare />
                                  </IconButton>
                                  {/* <Link
                                    className={classes.addCustomer}
                                    onClick={handleOpen}
                                  >
                                    + Add New Customer
                                  </Link> */}
                                </Tooltip>
                              </StyledTableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                    <AddCustomer
                      action="coupon"
                      open={open}
                      handleClose={handleClose}
                      searchByCompany={searchUsers}
                      searchKey={searchKey}
                      users={filteredUsers}
                      customers={customers && customers}
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
                        totalCount={customers && customers.length}
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
