import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
} from "@material-ui/core";
import { useParams } from "react-router";
import Pagination from "../../components/Pagination/Pagination";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import {
  getSubscription,
  getUserPrivateSubscriptionPlans,
} from "redux/actions/subscriptionPlan";
import "../ProjectDetail/styles.css";
import checkIcon from "../../assets/black-check-icon.svg";
import privateCheckIcon from "../../assets/white-check-icon.svg";
import { useStyles } from "./styles";
import {
  getCurrentSubscription,
  subscribeOrChangeSubcriptionPlan,
} from "redux/actions/subscription";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { getCurrencyByUser } from "../../redux/actions/currency";
import PaymentModal from "pages/payments/paymentModal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "3px",
};

export const ViewPublicSubscription = () => {
  const [open, setOpen] = useState(false);
  const [mouseOver, setMouseOver] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [action, setAction] = useState(null);
  const [openPayModal, setOpenPayModal] = useState(false);
  const handleOpen = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };
  const handleClose = () => {
    setSelectedItem(null);
    setOpen(false);
  };
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState(0);
  const { subscriptionId } = useParams();
  const handleOpenPayModal = () => {
    if (open) setOpen(false);
    setOpenPayModal(true);
  };
  const handleClosePayModal = () => {
    setSelectedItem(null);
    setOpenPayModal(false);
    setAction(null);
  };

  const tabs = ["Current Plan", "Available Plan", "Public Plan"];
  const changeTab = (idx) => {
    setActiveTab(idx);
  };

  const subscriptionsState = useSelector((state) => state);

  const {
    allSubscriptions: { allSubscriptions },
    currentSubscription: { subscription },
    subscriptionGet: { subscription: subscriptionDetail },
    subscriptionsGet: { subscriptions },
    getCurrencyByUser: { userCurrency },
    changeSubscription: { loaded, changeSubscription },
    login: {
      userInfo: { user },
    },
  } = subscriptionsState;

  let subScriptionPlans = [];
  allSubscriptions.map((sub) => {
    if (subscription?.subscriptionPlanId?._id !== sub?._id) {
      subScriptionPlans.push(sub);
    }
  });
  const plansPerPage = 3;
  const pagesVisited = (pageNumber - 1) * plansPerPage;
  useEffect(() => {
    getCurrencyByUser(user._id);
  }, [user]);

  useEffect(() => {
    getCurrentSubscription();
    getUserPrivateSubscriptionPlans();
  }, []);

  useEffect(() => {
    if (subscriptionId) {
      getSubscription(subscriptionId);
    }
  }, [subscriptionId]);

  const handleChangeSubscription = (item) => {
    if (
      selectedItem.billingCycle &&
      selectedItem.billingCycle[0]?.monthly === 0 &&
      selectedItem._id
    ) {
      subscribeOrChangeSubcriptionPlan(selectedItem._id, {
        billingCycle: "Monthly",
      });
    } else {
      setSelectedItem(item);
      handleOpenPayModal();
    }
  };

  const handleNewSubscribtion = (item) => {
    if (item.billingCycle && item.billingCycle[0]?.monthly === 0 && item._id) {
      subscribeOrChangeSubcriptionPlan(item._id, { billingCycle: "Monthly" });
    } else {
      setSelectedItem(item);
      handleOpenPayModal();
    }
  };

  if (loaded && changeSubscription) {
    window.location.reload(true);
  }

  return (
    <div className={classes.screenContainer}>
      {user.role !== "Client" && (
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
      <div className={"w-full border-box"}>
        <div className="ar-tab grid">
          {user.role === "Client" ? (
            <>
              {tabs.slice(0, 2).map((tab, idx) => (
                <div
                  key={idx}
                  onClick={() => changeTab(idx)}
                  className={activeTab === idx ? "active" : ""}
                >
                  {tab}
                </div>
              ))}
            </>
          ) : (
            <div className="active">{tabs[2]}</div>
          )}
        </div>
        <div className="w-full tab-content">
          {user.role !== "Client" && subscriptionDetail && (
            <Grid className={classes.subscriptionContainer}>
              <Card className={classes.subscriptionCard}>
                <CardContent>
                  <Typography className={classes.subscriptionCardTitle}>
                    {subscriptionDetail.SubscriptionPlanName}
                  </Typography>
                  <Typography className={classes.subscriptionPriceSection}>
                    {userCurrency &&
                      userCurrency[0]?.currency &&
                      userCurrency[0]?.currency.icon}
                    <span className={classes.subscriptionPrice}>
                      {subscriptionDetail.billingCycle &&
                        subscriptionDetail.billingCycle[0].monthly}
                    </span>
                    /month
                  </Typography>
                  <Typography className={classes.subscriptionSubTitle}>
                    {subscriptionDetail.subheader}
                  </Typography>
                  <Divider fullWidth />
                  <List className={classes.checkListContainer}>
                    {subscriptionDetail.plandetailchecklist?.map((item) => {
                      return (
                        <ListItem className={classes.checkListItem}>
                          <img src={checkIcon} alt="check icon" />
                          <ListItemText className={classes.checkListText}>
                            {item}
                          </ListItemText>
                        </ListItem>
                      );
                    })}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          )}
          {activeTab === 0 && user.role === "Client" && (
            <Grid className={classes.subscriptionContainer}>
              {subscription && (
                <>
                  <Card
                    className={
                      subscription.subscriptionPlanId.Visibility.toLowerCase() ===
                      "private"
                        ? classes.privateSubscriptionCard
                        : classes.subscriptionCard
                    }
                  >
                    <CardContent>
                      <Typography
                        className={
                          subscription.subscriptionPlanId.Visibility.toLowerCase() ===
                          "private"
                            ? classes.privateSubscriptionCardTitle
                            : classes.subscriptionCardTitle
                        }
                      >
                        {subscription.subscriptionPlanId.SubscriptionPlanName}
                      </Typography>
                      <Typography className={classes.subscriptionPriceSection}>
                        $
                        <span className={classes.subscriptionPrice}>
                          {
                            subscription.subscriptionPlanId.billingCycle[0]
                              .monthly
                          }
                        </span>
                        /month
                      </Typography>
                      <Typography
                        className={
                          subscription.subscriptionPlanId.Visibility.toLowerCase() ===
                          "private"
                            ? classes.privateSubscriptionSubTitle
                            : classes.subscriptionSubTitle
                        }
                      >
                        {subscription.subscriptionPlanId.subheader}
                      </Typography>
                      {subscription.subscriptionPlanId.Visibility.toLowerCase() ===
                        "public" && <Divider />}
                      <List className={classes.checkListContainer}>
                        {subscription.subscriptionPlanId.plandetailchecklist?.map(
                          (litem) => {
                            return (
                              <ListItem className={classes.checkListItem}>
                                {subscription.subscriptionPlanId.Visibility.toLowerCase() ===
                                "private" ? (
                                  <img
                                    src={privateCheckIcon}
                                    alt="check icon"
                                    color="#fff"
                                  />
                                ) : (
                                  <img src={checkIcon} alt="check icon" />
                                )}
                                {subscription.subscriptionPlanId.Visibility.toLowerCase() ===
                                "private" ? (
                                  <ListItemText
                                    primary={
                                      <Typography
                                        className={classes.privateCheckListText}
                                      >
                                        {litem}
                                      </Typography>
                                    }
                                  />
                                ) : (
                                  <ListItemText
                                    className={classes.checkListText}
                                  >
                                    {litem}
                                  </ListItemText>
                                )}
                              </ListItem>
                            );
                          }
                        )}
                      </List>
                      <Button
                        className={classes.subscriptionButton}
                        style={{
                          pointerEvents: "none",
                        }}
                      >
                        Subscribed
                      </Button>
                    </CardContent>
                  </Card>
                  <div>
                    <Typography className={classes.subscriptionDetailsTitle}>
                      Subcription Details
                    </Typography>
                    <Card className={classes.subscriptionDetailsCard}>
                      <Grid className={classes.SubcriptionDetail}>
                        <Typography className={classes.SubcriptionDetailTitle}>
                          Subscription Name
                        </Typography>
                        <Typography className={classes.SubcriptionDetailText}>
                          {subscription.subscriptionPlanId.SubscriptionPlanName}
                        </Typography>
                      </Grid>
                      <Grid className={classes.SubcriptionDetail}>
                        <Typography className={classes.SubcriptionDetailTitle}>
                          Type
                        </Typography>
                        <Typography className={classes.SubcriptionDetailText}>
                          {subscription.subscriptionPlanId.TypeSubscriptionPlan}
                        </Typography>
                      </Grid>
                      <Grid className={classes.SubcriptionDetail}>
                        <Typography className={classes.SubcriptionDetailTitle}>
                          Start Date
                        </Typography>
                        <Typography className={classes.SubcriptionDetailText}>
                          {subscription.startDate &&
                            subscription.startDate.slice(0, 10)}
                        </Typography>
                      </Grid>
                      <Grid className={classes.SubcriptionDetail}>
                        <Typography className={classes.SubcriptionDetailTitle}>
                          Renewal Date
                        </Typography>
                        <Typography className={classes.SubcriptionDetailText}>
                          {subscription.endDate &&
                            subscription.endDate.slice(0, 10)}
                        </Typography>
                      </Grid>
                      <Grid className={classes.SubcriptionDetail}>
                        <Typography className={classes.SubcriptionDetailTitle}>
                          Usage
                        </Typography>
                        <Typography className={classes.SubcriptionDetailText}>
                          Winter Special
                        </Typography>
                      </Grid>
                      <Grid className={classes.SubcriptionDetail}>
                        <Typography className={classes.SubcriptionDetailTitle}>
                          Billing Cycle
                        </Typography>
                        <Typography className={classes.SubcriptionDetailText}>
                          {subscription.billingCycle}
                        </Typography>
                      </Grid>
                      <Grid className={classes.SubcriptionDetail}>
                        <Typography className={classes.SubcriptionDetailTitle}>
                          Price
                        </Typography>
                        <Typography className={classes.SubcriptionDetailText}>
                          $
                          {
                            subscription.subscriptionPlanId.billingCycle[0]
                              .monthly
                          }
                        </Typography>
                      </Grid>
                    </Card>
                  </div>
                </>
              )}
            </Grid>
          )}

          {activeTab === 1 && subscriptions && user.role === "Client" && (
            <Grid>
              <Typography
                style={{
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: 700,
                  fontSize: "16px",
                  color: "#303030",
                  marginBottom: "35px",
                  textAlign: "center",
                }}
              >
                Display Plans
              </Typography>
              <Grid
                style={{
                  display: "flex",
                  width: "100%",
                }}
              >
                {subScriptionPlans
                  .slice(pagesVisited, pagesVisited + plansPerPage)
                  .map((item) => {
                    return (
                      <Grid className={classes.subscriptionContainer}>
                        <Card
                          className={
                            item.Visibility.toLowerCase() === "private"
                              ? classes.privateSubscriptionCard
                              : classes.subscriptionCard
                          }
                        >
                          <CardContent>
                            {item?.DiscountApplicable === "enable" && (
                              <Grid
                                className={
                                  item.Visibility.toLowerCase() === "private"
                                    ? classes.discount
                                    : classes.publicDiscount
                                }
                              >
                                {item.DiscountType === "percentage"
                                  ? `Save $ ${
                                      (item.billingCycle[0].monthly *
                                        item?.discountValue) /
                                      100
                                    }`
                                  : `Save $ ${item?.discountValue}`}
                              </Grid>
                            )}
                            <Typography
                              className={
                                item.Visibility.toLowerCase() === "private"
                                  ? classes.privateSubscriptionCardTitle
                                  : classes.subscriptionCardTitle
                              }
                            >
                              {item.SubscriptionPlanName}
                            </Typography>
                            <Typography
                              className={classes.subscriptionPriceSection}
                            >
                              $
                              <span className={classes.subscriptionPrice}>
                                {item.billingCycle[0].monthly}
                              </span>
                              /month
                            </Typography>
                            <Typography
                              className={
                                item.Visibility.toLowerCase() === "private"
                                  ? classes.privateSubscriptionSubTitle
                                  : classes.subscriptionSubTitle
                              }
                            >
                              {item.subheader}
                            </Typography>
                            {item.Visibility.toLowerCase() === "public" && (
                              <Divider />
                            )}
                            <List className={classes.checkListContainer}>
                              {item.plandetailchecklist?.map((litem) => {
                                return (
                                  <ListItem className={classes.checkListItem}>
                                    {item.Visibility.toLowerCase() ===
                                    "private" ? (
                                      <img
                                        src={privateCheckIcon}
                                        alt="check icon"
                                        color="#fff"
                                      />
                                    ) : (
                                      <img src={checkIcon} alt="check icon" />
                                    )}
                                    {item.Visibility.toLowerCase() ===
                                    "private" ? (
                                      <ListItemText
                                        primary={
                                          <Typography
                                            className={
                                              classes.privateCheckListText
                                            }
                                          >
                                            {litem}
                                          </Typography>
                                        }
                                      />
                                    ) : (
                                      <ListItemText
                                        className={classes.checkListText}
                                      >
                                        {litem}
                                      </ListItemText>
                                    )}
                                  </ListItem>
                                );
                              })}
                            </List>
                            <Button
                              className={classes.subscriptionButton}
                              onClick={() => {
                                setSelectedItem(null);
                                !subscription
                                  ? handleNewSubscribtion(item)
                                  : handleOpen(item);
                              }}
                              disabled={
                                user?.user?.role.toLowerCase() === "admin"
                                  ? true
                                  : false
                              }
                            >
                              Subscribe
                            </Button>
                          </CardContent>
                        </Card>

                        <Modal
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={style}>
                            <Box sx={{ p: 3, backgroundColor: "#8967FC" }}>
                              <Typography
                                style={{
                                  color: "white",
                                  textAlign: "center",
                                  fontWeight: "bold",
                                  fontSize: "30px",
                                }}
                                variant="h4"
                                noWrap
                              >
                                Change Plan
                              </Typography>
                            </Box>
                            <Box sx={{ p: 4 }}>
                              <Typography
                                id="modal-modal-description"
                                sx={{ mt: 2 }}
                                style={{ fontWeight: "bold", fontSize: "20px" }}
                              >
                                Are you sure you want to Change this plan?
                              </Typography>
                              <Typography style={{ color: "gray", mt: 2 }}>
                                Warning Here simply dummy text of the printing
                                and typesetting industry.
                              </Typography>

                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  mt: 2,
                                  justifyContent: "space-around",
                                }}
                              >
                                <Button
                                  variant="outlined"
                                  className={classes.itemActionBtn}
                                  style={{
                                    width: "40%",
                                    borderRadius: "81px",
                                    border: "1px solid #8967FC",
                                    color: "#8967FC",
                                  }}
                                  onClick={handleClose}
                                >
                                  No
                                </Button>
                                <Button
                                  type="submit"
                                  className={`${classes.addItemBtn} ${
                                    mouseOver === true &&
                                    classes.addItemBtnHover
                                  }`}
                                  onMouseOver={() => setMouseOver(true)}
                                  onMouseLeave={() => setMouseOver(false)}
                                  style={{
                                    width: "40%",
                                    backgroundColor: "#8967FC",
                                    color: "white",
                                    borderRadius: "81px",
                                  }}
                                  onClick={() => {
                                    handleChangeSubscription();
                                  }}
                                >
                                  Yes
                                </Button>
                              </Box>
                            </Box>
                          </Box>
                        </Modal>
                      </Grid>
                    );
                  })}
              </Grid>
              <div className={classes.paginationContainer}>
                <Pagination
                  currentPage={pageNumber}
                  totalCount={subScriptionPlans.length}
                  pageSize={plansPerPage}
                  onPageChange={(page) => setPageNumber(page)}
                />
              </div>
            </Grid>
          )}
        </div>
      </div>
      <PaymentModal
        open={openPayModal}
        handleClose={handleClosePayModal}
        item={selectedItem}
        action={action}
        mode="subscription"
      />
    </div>
  );
};
