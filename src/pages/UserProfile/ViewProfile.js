import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Card, CardContent, Typography, Divider } from "@material-ui/core";
import { GiCancel } from "react-icons/gi";
import { AiOutlinePlus } from "react-icons/ai";
import { AccountProfile } from "./AccountProfile";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import points from "./icons/points.svg";
import pencil from "./icons/pencil.svg";
import couponIcon from "./icons/coupon.svg";
import expandIcon from "./icons/expand.svg";
import { notifier } from "utils/notifier";
import { USER_INFO } from "utils/constants";
import { getDomainNames, addDomainNames } from "../../redux/actions/user";
import { FormControl, Select, MenuItem } from "@material-ui/core";
import { display, width } from "@mui/system";
import { getCurrencyByUser } from "redux/actions/currency";
import { getSingleUser, resetUpdateProfile } from "../../redux/actions/user";
import { getAssets } from "redux/actions/dashboard";
import { getClientCoupons } from "redux/actions/coupons";

const useStyles = makeStyles(() => ({
  container: {
    "@media (max-width: 768px)": {
      marginTop: "10%",
    },
  },
  root: {
    boxShadow: "0px 0px 14px #e0e0e0",
    borderRadius: "10px",
    margin: "10px 0",
    fontFamily: "sans-serif",
    "@media (max-width: 768px)": {
      width: "96%",
    },
  },
  title: {
    color: "#303030",
    fontSize: "24px",
    fontFamily: "sans-serif",
    fontWeight: "700",
  },
  name: {
    color: "#303030",
    fontSize: "30px",
    fontFamily: "sans-serif",
    fontWeight: "700",
  },
  details: {
    display: "flex",
    justifyContent: "space-between",
    "@media (max-width: 768px)": {
      display: "block",
    },
  },
  flex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  avatar: {
    height: 110,
    width: 110,
    marginRight: "20px",
    marginBottom: "40px",
  },
  companyName: {
    color: "#7D7D7D",
  },
  contactInfo: {
    display: "grid",
    gridTemplateColumns: "33% 33% 33%",
    marginLeft: "10px",
    "@media (max-width: 768px)": {
      gridTemplateColumns: "45% 45%",
    },
  },
  cardDescription: {
    display: "grid",
    gridTemplateColumns: "33% 33% 33%",
    marginLeft: "10px",
    "@media (max-width: 768px)": {
      gridTemplateColumns: "100%",
    },
  },
  domainDescription: {
    display: "grid",
    gridTemplateColumns: "22% 22% 22% 22%",
    marginLeft: "10px",
    "@media (max-width: 768px)": {
      gridTemplateColumns: "auto auto",
    },
  },
  loyaltyPointsTitle: {
    marginLeft: "30px",
  },
  loyaltyPoints: {
    background: "#DFE6EC",
    display: "flex",
    alignItems: "center",
    borderRadius: "20px",
    paddingLeft: "10px",
    marginRight: "5px",
    marginBottom: "15px",
    width: "300px",
    "@media (max-width: 768px)": {
      width: "98%",
    },
    height: "87px",
  },
  couponItems: {
    background: "#DFE6EC",
    display: "flex",
    alignItems: "center",
    borderRadius: "20px",
    paddingLeft: "10px",
    paddingRight: "10px",
    marginRight: "5px",
    marginBottom: "15px",
    width: "290px",
    "@media (max-width: 768px)": {
      width: "96%",
    },
    height: "87px",
    justifyContent: "space-between",
  },

  DomainItems: {
    background: "#DFE6EC",
    display: "flex",
    alignItems: "center",
    borderRadius: "5px",
    padding: "7px 10px",
    margin: "0 3% 15px 0",
    width: "fit",
    "@media (max-width: 768px)": {
      width: "96%",
    },
  },

  domainInput: {
    width: "100%",
    height: "27px",
    border: "2px solid",
    borderColor: "#DFE6EC",
    borderRadius: "5px 0 0 5px",
    "&:focus": {
      border: "2px solid",
      borderColor: "red",
    },
  },

  domainInputAddIconC: {
    width: "12%",
    height: "33px",
    background: "#DFE6EC",
    borderRadius: "0 5px 5px 0",
    "&:hover": {
      background: "#8967FC",
    },
  },

  domainInputAddIcon: {
    width: "20px",
    height: "30px",
    color: "#8967FC",
    marginLeft: "3px",
    "&:hover": {
      color: "white",
    },
  },

  removeDomainIcon: {
    color: "#8967FC",
    "&:hover": {
      color: "red",
    },
  },
  loyaltyPointsDesc: {
    background: "#8967FC",
    border: "1px solid #8967FC",
    borderRadius: "50%",
    width: "56px",
    height: "56px",
    display: "flex",
    justifyContent: "center",
  },
}));

export const ViewProfile = () => {
  const classes = useStyles();
  const [domainName, setDomainName] = useState("");
  const {
    login: { userInfo: loggedInUser },
    profileEdit: { loaded, userInfo: updatedInfo },
    profileImgAdd: { loaded: profileUpdated, fileName },
    profileImgRm: { loaded: rmLoaded },
    getUserDomainNames: { domains },
    getUserDomainNames: { loaded: domainLoaded },
    getCurrencyByUser: { userCurrency },
    clientCoupon: { coupons },
    getAssets: {
      assets: { counts },
    },
    getSingleUser: { user: userInfo },
    profileEdit: { loaded: userUpdated },
  } = useSelector((state) => state);

  useEffect(() => {
    if (userUpdated) {
      getSingleUser(loggedInUser.user._id);
      notifier.success("Your account has been successfully updated.");
      resetUpdateProfile();
    }
  }, [userUpdated]);

  useEffect(() => {
    if (loggedInUser) {
      getSingleUser(loggedInUser.user._id);
    }
  }, [loggedInUser]);

  //  get user's domain names
  useEffect(() => {
    if (loggedInUser.user) {
      getDomainNames(loggedInUser.user._id);
      getCurrencyByUser(loggedInUser?.user?._id);
      getAssets();
      getClientCoupons();
    }
  }, [loggedInUser.user]);

  // add domainName
  const addDomainName = async () => {
    if (!domainName.length) return;
    const domainNames = [...domains, domainName];
    setDomainName("");
    await addDomainNames(loggedInUser.user._id, { domainNames });
    return getDomainNames(loggedInUser.user._id);
  };

  // delete domainName
  const deleteDomainName = async (domain) => {
    if (!domain) return;
    const domainNames = domains.filter((item) => item !== domain);
    if (domainNames.length === 0)
      return notifier.error("You need atleast one domain");
    await addDomainNames(loggedInUser.user._id, { domainNames });
    return getDomainNames(loggedInUser.user._id);
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>View Profile</h1>
      <Card className={classes.root}>
        <CardContent>
          <div className={classes.flex}>
            <div className={classes.details}>
              <div className={classes.avatar}>
                <AccountProfile user={userInfo} />
              </div>
              <div style={{ marginTop: "35px" }}>
                <Typography gutterBottom className={classes.name} variant="h3">
                  {userInfo.firstName} {userInfo.lastName}
                </Typography>
                <Typography className={classes.companyName} variant="body1">
                  {userInfo.companyName}
                </Typography>
              </div>
            </div>
            <FormControl
              style={{
                marginTop: "35px",
                fontSize: "18px",
                fontWeight: "400",
                color: "#7D7D7D",
              }}
            >
              <Typography
                style={{
                  marginTop: "35px",
                  fontSize: "18px",
                  fontWeight: "400",
                  color: "#7D7D7D",
                }}
              >
                Currency Code
              </Typography>
              <Typography color="textSecondary">
                {userCurrency && userCurrency[0]?.currency?.icon}
                {"\t\t"}
                {userCurrency && userCurrency[0]?.currency?.currencyCode}
              </Typography>
            </FormControl>
            <Link to="/dashboard/editprofile">
              <img src={pencil} alt="pencil" />
            </Link>
          </div>
        </CardContent>
        <Divider />
        <CardContent className={classes.contactInfo}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            style={{ fontSize: "20px", fontWeight: "600" }}
          >
            Contact
            <Typography color="textSecondary">
              {userInfo.phoneNumber}
            </Typography>
          </Typography>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            style={{ fontSize: "20px", fontWeight: "600" }}
          >
            Email
            <Typography color="textSecondary">{userInfo.email}</Typography>
          </Typography>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            style={{ fontSize: "20px", fontWeight: "600" }}
          >
            Address
            <Typography color="textSecondary">{userInfo.address}</Typography>
          </Typography>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            style={{ fontSize: "20px", fontWeight: "600" }}
          >
            Number of Items
            <Typography color="textSecondary">
              {counts?.products?.length}
            </Typography>
          </Typography>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            style={{ fontSize: "20px", fontWeight: "600" }}
          >
            Website
            <Typography color="textSecondary">{userInfo.companyUrl}</Typography>
          </Typography>
        </CardContent>
      </Card>
      {userInfo.role === "Client" && (
        <>
          <Card className={classes.root}>
            <Typography className={classes.loyaltyPointsTitle}>
              <h3 className={classes.title}>Monthly loyal Points</h3>
            </Typography>
            <CardContent className={classes.cardDescription}>
              {userInfo?.user?.loyaltyPoints && (
                <div className={classes.loyaltyPoints}>
                  <div className={classes.loyaltyPointsDesc}>
                    <img src={points} alt="point" width="25px" />
                  </div>
                  <div style={{ marginLeft: "20px", marginTop: "10px" }}>
                    <Typography style={{ fontSize: "22px", fontWeight: "800" }}>
                      {userInfo?.user?.loyaltyPoints?.accruedPoints
                        ? userInfo?.user?.loyaltyPoints?.accruedPoints
                        : 0}
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "18px",
                        fontWeight: "400",
                        color: "#7D7D7D",
                      }}
                    >
                      Accrued Points
                    </Typography>
                  </div>
                </div>
              )}
              {userInfo?.user?.loyaltyPoints && (
                <div className={classes.loyaltyPoints}>
                  <div className={classes.loyaltyPointsDesc}>
                    <img src={points} alt="point" width="25px" />
                  </div>
                  <div style={{ marginLeft: "20px", marginTop: "10px" }}>
                    <Typography style={{ fontSize: "22px", fontWeight: "800" }}>
                      {userInfo?.user?.loyaltyPoints?.redeemedPoints
                        ? userInfo?.user?.loyaltyPoints?.redeemedPoints
                        : 0}
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "18px",
                        fontWeight: "400",
                        color: "#7D7D7D",
                      }}
                    >
                      Redeemed Points
                    </Typography>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className={classes.root}>
            <Typography className={classes.loyaltyPointsTitle}>
              <h3 className={classes.title}>Coupons</h3>
            </Typography>
            <CardContent className={classes.cardDescription}>
              {coupons && (
                <div className={classes.couponItems}>
                  <div style={{ display: "flex" }}>
                    <div className={classes.loyaltyPointsDesc}>
                      <img src={couponIcon} alt="coupon icon" width="25px" />
                    </div>
                    <div style={{ marginLeft: "20px", marginTop: "10px" }}>
                      <Typography
                        style={{ fontSize: "22px", fontWeight: "800" }}
                      >
                        {coupons && coupons.length}
                      </Typography>
                      <Typography
                        style={{
                          fontSize: "18px",
                          fontWeight: "400",
                          color: "#7D7D7D",
                        }}
                      >
                        Active Coupons
                      </Typography>
                    </div>
                  </div>
                  <div>
                    <img src={expandIcon} alt="expand icon" width="11px" />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className={classes.root}>
            <Typography className={classes.loyaltyPointsTitle}>
              <h3 className={classes.title}>Domains</h3>
            </Typography>
            <CardContent className={classes.domainDescription}>
              {domains &&
                domains.map((domain, index) => (
                  <div className={classes.DomainItems} key={index}>
                    <div style={{ display: "flex", width: "95%" }}>
                      <div>
                        <Typography
                          style={{
                            fontSize: "18px",
                            fontWeight: "400",
                          }}
                        >
                          {domain}
                        </Typography>
                      </div>
                    </div>
                    <div style={{ display: "flex" }}>
                      <GiCancel
                        width="1rem"
                        className={classes.removeDomainIcon}
                        onClick={() => deleteDomainName(domain)}
                      />
                    </div>
                  </div>
                ))}

              <div style={{ display: "flex" }}>
                <div style={{ width: "88%", display: "flex" }}>
                  <input
                    type="text"
                    value={domainName}
                    className={classes.domainInput}
                    onChange={(e) => setDomainName(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addDomainName();
                      }
                    }}
                  />
                </div>
                <div className={classes.domainInputAddIconC}>
                  <AiOutlinePlus
                    className={classes.domainInputAddIcon}
                    onClick={() => addDomainName()}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};
