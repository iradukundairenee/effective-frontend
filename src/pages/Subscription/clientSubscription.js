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
import { useSelector } from "react-redux";
import {
  getSubscription,
  getSubscriptions,
  getSubscriptionsCustomers,
} from "redux/actions/subscriptionPlan";
import "../ProjectDetail/styles.css";
import checkIcon from "../../assets/black-check-icon.svg";
import privateCheckIcon from "../../assets/white-check-icon.svg";
import { useStyles } from "./styles";
import { getCurrentSubscription, Subscribe } from "redux/actions/subscription";

export const ClientSubscription = () => {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState(0);
  //   const { subscriptionId } = useParams();
  const tabs = ["Current Plan", "Available Plan"];
  const changeTab = (idx) => {
    setActiveTab(idx);
  };
  const subscriptionsState = useSelector((state) => state);

  const {
    currentSubscription: { subscription },
    // subscriptionGet: { subscription: subscriptionDetail },
    subscriptionsGet: { subscriptions },
    login: { userInfo },
    subscriptionCustomersGet: { customers },
  } = subscriptionsState;
  useEffect(() => {
    getCurrentSubscription();
    getSubscriptions();
  }, []);

  useEffect(() => {
    if (subscriptions.length > 0) {
      const privateSubscriptions = subscriptions.filter(
        (sub) => sub.Visibility === "Private"
      );
      privateSubscriptions.forEach((subscription) => {
        getSubscriptionsCustomers(subscription._id);
      });
    }
  }, [subscriptions]);
  const handleSubscribe = () => {
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <div className={"w-full border-box"}>
        <div className="ar-tab grid">
          {tabs.slice(0, 2).map((tab, idx) => (
            <div
              onClick={() => changeTab(idx)}
              className={activeTab === idx ? "active" : ""}
            >
              {tab}
            </div>
          ))}
        </div>
        <div className="w-full tab-content">
          {activeTab === 0 && userInfo.user.role === "Client" && (
            <Grid className={classes.subscriptionContainer}>
              {subscription && (
                <>
                  <Card className={classes.subscriptionCard}>
                    <CardContent>
                      <Typography className={classes.subscriptionCardTitle}>
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
                      <Typography className={classes.subscriptionSubTitle}>
                        {subscription.subscriptionPlanId.subheader}
                      </Typography>
                      <Divider fullWidth />
                      <List>
                        {subscription.subscriptionPlanId.plandetailchecklist?.map(
                          (item) => {
                            return (
                              <ListItem className={classes.checkListItem}>
                                <img src={checkIcon} alt="check icon" />
                                <ListItemText className={classes.checkListText}>
                                  {item}
                                </ListItemText>
                              </ListItem>
                            );
                          }
                        )}
                      </List>
                      <Button className={classes.subscriptionButton}>
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
                          {subscription.subscriptionPlanId.Visibility}
                        </Typography>
                      </Grid>
                      <Grid className={classes.SubcriptionDetail}>
                        <Typography className={classes.SubcriptionDetailTitle}>
                          Start Date
                        </Typography>
                        <Typography className={classes.SubcriptionDetailText}>
                          {subscription.startDate.slice(0, 10)}
                        </Typography>
                      </Grid>
                      <Grid className={classes.SubcriptionDetail}>
                        <Typography className={classes.SubcriptionDetailTitle}>
                          Renewal Date
                        </Typography>
                        <Typography className={classes.SubcriptionDetailText}>
                          {subscription.endDate.slice(0, 10)}
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

          {activeTab === 1 && subscriptions && userInfo.user.role === "Client" && (
            <Grid
              style={{
                marginBottom: "35px",
              }}
            >
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
              <Grid style={{ display: "flex", width: "100%" }}>
                {subscriptions.map((item) => {
                  if (item.Visibility.toLowerCase() === "public") {
                    return (
                      <Grid className={classes.subscriptionContainer}>
                        <Card className={classes.subscriptionCard}>
                          <CardContent>
                            <Typography
                              className={classes.subscriptionCardTitle}
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
                              className={classes.subscriptionSubTitle}
                            >
                              {item.subheader}
                            </Typography>
                            <Divider />
                            <List>
                              {item.plandetailchecklist?.map((litem) => {
                                return (
                                  <ListItem className={classes.checkListItem}>
                                    <img src={checkIcon} alt="check icon" />
                                    <ListItemText
                                      className={classes.checkListText}
                                    >
                                      {litem}
                                    </ListItemText>
                                  </ListItem>
                                );
                              })}
                            </List>
                            <Button
                              className={classes.subscriptionButton}
                              onClick={handleSubscribe}
                              disabled={
                                userInfo?.user.role.toLowerCase() === "admin"
                                  ? true
                                  : false
                              }
                            >
                              Subscribe
                            </Button>
                          </CardContent>
                        </Card>
                      </Grid>
                    );
                  }
                  const assignedCustomer = customers.filter(
                    (customer) =>
                      customer.user._id === userInfo.user._id &&
                      customer.subscriptionPlanId === item._id
                  );
                  if (
                    item.Visibility.toLowerCase() === "private" &&
                    assignedCustomer.length > 0
                  ) {
                    return (
                      <Grid className={classes.subscriptionContainer}>
                        <Card className={classes.privateSubscriptionCard}>
                          <CardContent>
                            <div style={{ display: "flex" }}>
                              <Grid>
                                <Typography
                                  className={
                                    classes.privateSubscriptionCardTitle
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
                              </Grid>
                              <Grid className={classes.discount}>
                                Save ${item.discount}
                              </Grid>
                            </div>
                            <Typography
                              className={classes.privateSubscriptionSubTitle}
                            >
                              {item.subheader}
                            </Typography>
                            <List>
                              {item.plandetailchecklist?.map((litem) => {
                                return (
                                  <ListItem className={classes.checkListItem}>
                                    <img
                                      src={privateCheckIcon}
                                      alt="check icon"
                                      color="#fff"
                                    />
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
                                  </ListItem>
                                );
                              })}
                            </List>
                            <Button
                              className={classes.subscriptionButton}
                              onClick={handleSubscribe}
                              disabled={
                                userInfo?.user.role.toLowerCase() === "admin"
                                  ? true
                                  : false
                              }
                            >
                              Subscribe
                            </Button>
                          </CardContent>
                        </Card>
                      </Grid>
                    );
                  }
                })}
              </Grid>
            </Grid>
          )}
        </div>
      </div>
    </div>
  );
};
