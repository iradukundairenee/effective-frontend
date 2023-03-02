import React, { useState, useMemo, useRef } from "react";
import _ from "lodash";
import { useTableStyles } from "./styles";
import { ICON_PATH } from "../../utils/constants";
import { useSelector } from "react-redux";
import {
  Card,
  CardActions,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Avatar,
  Divider,
  Collapse,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Pagination from "../Pagination/Pagination";
import { NoDisplayData } from "../NoDisplayData";
import { Loading } from "../loading.component";
import { getDuplicates } from "redux/actions/product";
import { getCode } from "country-list";
import { useHistory } from "react-router-dom";
import { BiPlusMedical } from "react-icons/bi";
import { Link } from "@material-ui/core";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "white",
    fontSize: 16,
    fontFamily: "Poppins",
  },
  body: {
    fontSize: 16,
    backgroundColor: "#fff",
    borderBottom: "none",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const PageSize = 6;

export const AnalyticsTable = ({
  onClickItem,
  getProductDuplicatesAnalytics,
  data = [],
  columns = [],
  selectedData = [],
  loading = false,
  size = "small",
  open,
  deviceChecked,
  deviceFilters,
  checkedCountries,
  isFiltering,
}) => {
  const classes = useTableStyles();
  const [currentPage, setCurrentPage] = useState(1);
  const history = useHistory();
  const appState = useSelector((state) => state);

  const {
    productDuplicates: { duplicates },
    analyticsGet: { analytics },
    productDuplicatesAnalytics: { duplicatesAnalytics },
    login: {
      userInfo: { user },
    },
  } = appState;
  const renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };
  const renderCountries = (item, column) => {
    if (column.countries) return column.countries(item);
    return _.get(item, column.path);
  };
  const currentData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, data]);
  let countriesNames = analytics.map((item) => {
    return item.analytics.map((innerItem) => {
      return innerItem.country;
    });
  });
  const uniqueCountries = Array.from(new Set(countriesNames.flat()));
  const countryCode = getCode(uniqueCountries.toString());
  // const countries = currentData.reduce(
  //   (acc, item) => [...acc, ...item.countries],
  //   []
  // );

  // const newCountries = currentData.map((asset) => {
  //   return countriesNames.map((countryName) => {
  //     let countryExist = asset.countries.find(
  //       (item) => item.name === countryName
  //     );
  //     if (countryExist) return countryExist.count;
  //     return 0;
  //   });
  // });

  const SingleAnalytics = (analytics) => {
    history.push(`/dashboard/SingleAnalytics/${analytics.product._id}`);
  };
  const modelViewRef = useRef(null);

  const productActions = () => {
    if (user.role !== "Client") {
      return (
        <CardActions className={classes.clientActions}>
          <div className={classes.addProject}></div>
          <Pagination
            currentPage={currentPage}
            totalCount={data.length}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </CardActions>
      );
    } else {
      return (
        <CardActions className={classes.actions}>
          <Pagination
            currentPage={currentPage}
            totalCount={data.length}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </CardActions>
      );
    }
  };
  return (
    <>
      <div className={classes.root}>
        <div className={classes.container}>
          <div
            className={
              loading ? null : currentData.length ? classes.table : null
            }
          >
            <CardContent className={classes.tableContent}>
              {loading ? (
                <Loading />
              ) : currentData.length ? (
                <div style={{ display: "flex" }}>
                  <Table size={size}>
                    <TableHead>
                      <StyledTableRow>
                        <StyledTableCell
                          style={{
                            color: "#303030",
                            fontSize: "18px",
                            fontWeight: "500",
                            fontFamily: "Poppins",
                          }}
                        >
                          3D assest
                        </StyledTableCell>
                        <StyledTableCell>Users</StyledTableCell>
                        <StyledTableCell>A R Users</StyledTableCell>
                        <StyledTableCell colSpan={3}>Devices</StyledTableCell>
                        <StyledTableCell colSpan={6}>Country</StyledTableCell>
                        <Divider></Divider>
                      </StyledTableRow>
                    </TableHead>
                    <TableBody>
                      <StyledTableRow>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell
                          style={{
                            border: "none",
                            fontWeight: 400,
                            fontSize: "16px",
                            fontFamily: "Poppins",
                            width: "25px",
                          }}
                        >
                          Ios
                        </StyledTableCell>
                        <StyledTableCell
                          style={{
                            border: "none",
                            fontWeight: 400,
                            fontSize: "16px",
                            fontFamily: "Poppins",
                            width: "25px",
                          }}
                        >
                          Androids
                        </StyledTableCell>
                        <StyledTableCell
                          style={{
                            border: "none",
                            fontWeight: 400,
                            fontSize: "16px",
                            fontFamily: "Poppins",
                            width: "25px",
                          }}
                        >
                          Desktop
                        </StyledTableCell>
                        <StyledTableCell
                          style={{
                            border: "none",
                            fontWeight: 400,
                            fontSize: "16px",
                            fontFamily: "Poppins",
                            width: "25px",
                          }}
                        >
                          {countryCode}
                        </StyledTableCell>

                        {/* {
                                  analytics?.analytics.map((item)=>{
                                    return <StyledTableCell
                                    style={{
                                      border: "none",
                                      fontWeight: 400,
                                      fontSize: "16px",
                                      fontFamily: "Poppins",
                                      width: "25px",
                                    }}
                                  >
                                    Rwanda
                                    </StyledTableCell>
                                  })
                                }
   */}

                        {/* {countriesNames.sort().map((item) => {
                          return (
                            <StyledTableCell
                              style={{
                                border: "none",
                                fontWeight: 400,
                                fontSize: "16px",
                                fontFamily: "Poppins",
                                width: "25px",
                              }}
                            >
                              {!isFiltering ? (
                                <>{getCode(item)}</>
                              ) : (
                                <>
                                  {checkedCountries.includes(item) && (
                                    <>{getCode(item)}</>
                                  )}
                                </>
                              )}
                            </StyledTableCell>
                          );
                        })} */}
                      </StyledTableRow>
                      {analytics.map((item) => {
                        return (
                          <>
                            <StyledTableRow>
                              <StyledTableCell style={{ display: "flex" }}>
                                <Link
                                  component="button"
                                  underline="none"
                                  onClick={() => {
                                    return onClickItem(
                                      item.product._id,
                                      "preview"
                                    );
                                  }}
                                >
                                  <Typography
                                    style={{
                                      color: "#7D7D7D",
                                      fontFamily: "Poppins",
                                      fontWeight: "400",
                                      fontSize: "16px",
                                      textDecoration: "underline",
                                      cursor: "pointer",
                                    }}
                                  >
                                    {item.product.name}
                                  </Typography>
                                </Link>

                                {item.product.duplicate > 1 ? (
                                  <BiPlusMedical
                                    onClick={() => {
                                      return getProductDuplicatesAnalytics(
                                        item.product._id
                                      );
                                    }}
                                    style={{
                                      color: "#8967FC",
                                      marginLeft: "5px",
                                      marginTop: "10px",
                                      cursor: "pointer",
                                    }}
                                  />
                                ) : (
                                  ""
                                )}
                              </StyledTableCell>
                              <StyledTableCell
                                style={{
                                  color: "#7D7D7D",
                                  fontFamily: "Poppins",
                                  fontWeight: "400",
                                  fontSize: "16px",
                                }}
                              >
                                {
                                  item.analytics.filter(
                                    (analytic) =>
                                      analytic.actionType === "visit"
                                  ).length
                                }
                              </StyledTableCell>
                              <StyledTableCell
                                style={{
                                  color: "#7D7D7D",
                                  fontFamily: "Poppins",
                                  fontWeight: "400",
                                  fontSize: "16px",
                                }}
                              >
                                {
                                  item.analytics.filter(
                                    (analytic) =>
                                      analytic.actionType === "click"
                                  ).length
                                }
                              </StyledTableCell>
                              <StyledTableCell
                                style={{
                                  color: "#7D7D7D",
                                  fontFamily: "Poppins",
                                  fontWeight: "400",
                                  fontSize: "16px",
                                  cursor: "pointer",
                                }}
                              >
                                {
                                  item.analytics.filter(
                                    (analytic) => analytic.device === " Ios"
                                  ).length
                                }
                              </StyledTableCell>
                              <StyledTableCell
                                style={{
                                  color: "#7D7D7D",
                                  fontFamily: "Poppins",
                                  fontWeight: "400",
                                  fontSize: "16px",
                                }}
                              >
                                {
                                  item.analytics.filter(
                                    (analytic) => analytic.device === "Androis"
                                  ).length
                                }
                              </StyledTableCell>
                              <StyledTableCell
                                style={{
                                  color: "#7D7D7D",
                                  fontFamily: "Poppins",
                                  fontWeight: "400",
                                  fontSize: "16px",
                                }}
                              >
                                {
                                  item.analytics.filter(
                                    (analytic) => analytic.device === "Desktop"
                                  ).length
                                }
                              </StyledTableCell>
                              <StyledTableCell
                                style={{
                                  color: "#7D7D7D",
                                  fontFamily: "Poppins",
                                  fontWeight: "400",
                                  fontSize: "16px",
                                }}
                              >
                                {
                                  item.analytics.filter(
                                    (analytic) =>
                                      analytic.country === analytic.country
                                  ).length
                                }
                              </StyledTableCell>
                            </StyledTableRow>
                            <>
                              {duplicatesAnalytics &&
                                duplicatesAnalytics.map((dups, dupsIdx) => {
                                  return (
                                    <StyledTableRow
                                      key={dupsIdx}
                                      selected={
                                        selectedData.indexOf(dups.id) !== -1
                                      }
                                    >
                                      <StyledTableCell
                                        key={dupsIdx}
                                        selected={
                                          selectedData.indexOf(item.id) !== -1
                                        }
                                        style={{
                                          border: "none",
                                          color: "#36454F",
                                          fontWeight: 400,
                                          fontSize: "16px",
                                          fontFamily: "Poppins",
                                        }}
                                      >
                                        <Collapse
                                          in={open}
                                          timeout="auto"
                                          unmountOnExit
                                        >
                                          {item.product._id ===
                                            dups.product.parentId &&
                                            dups.product.name}
                                        </Collapse>
                                      </StyledTableCell>
                                      <StyledTableCell
                                        key={dupsIdx}
                                        selected={
                                          selectedData.indexOf(item.id) !== -1
                                        }
                                        style={{
                                          border: "none",
                                          color: "#36454F",
                                          fontWeight: 400,
                                          fontSize: "16px",
                                          fontFamily: "Poppins",
                                        }}
                                      >
                                        <Collapse
                                          in={open}
                                          timeout="auto"
                                          unmountOnExit
                                        >
                                          {item.product._id ===
                                            dups.product.parentId &&
                                            currentData.map((item) => {
                                              return (
                                                <>
                                                  {item.product._id ===
                                                    dups.product.parentId &&
                                                    item.analytics.filter(
                                                      (analytic) =>
                                                        analytic.actionType ===
                                                        "visit"
                                                    ).length}
                                                </>
                                              );
                                            })}
                                        </Collapse>
                                      </StyledTableCell>
                                      <StyledTableCell
                                        key={dupsIdx}
                                        selected={
                                          selectedData.indexOf(item.id) !== -1
                                        }
                                        style={{
                                          border: "none",
                                          color: "#36454F",
                                          fontWeight: 400,
                                          fontSize: "16px",
                                          fontFamily: "Poppins",
                                        }}
                                      >
                                        <Collapse in={open}>
                                          {item.product._id ===
                                            dups.product.parentId &&
                                            currentData.map((item) => {
                                              return (
                                                <>
                                                  {item.product._id ===
                                                    dups.product.parentId &&
                                                    item.analytics.filter(
                                                      (analytic) =>
                                                        analytic.actionType ===
                                                        "click"
                                                    ).length}
                                                </>
                                              );
                                            })}
                                        </Collapse>
                                      </StyledTableCell>
                                      <StyledTableCell
                                        style={{
                                          border: "none",
                                          color: "#36454F",
                                          fontWeight: 400,
                                          fontSize: "16px",
                                          fontFamily: "Poppins",
                                        }}
                                      >
                                        {item.product._id ===
                                          dups.product.parentId &&
                                          currentData.map((item) => {
                                            return (
                                              <Collapse in={open}>
                                                {item.product._id ===
                                                  dups.product.parentId &&
                                                  item.analytics.filter(
                                                    (analytic) =>
                                                      analytic.ios === "Ios"
                                                  ).length}
                                              </Collapse>
                                            );
                                          })}
                                      </StyledTableCell>

                                      <StyledTableCell
                                        style={{
                                          border: "none",
                                          color: "#36454F",
                                          fontWeight: 400,
                                          fontSize: "16px",
                                          fontFamily: "Poppins",
                                        }}
                                      >
                                        {item.product._id ===
                                          dups.product.parentId &&
                                          currentData.map((item) => {
                                            return (
                                              <Collapse in={open}>
                                                {item.product._id ===
                                                  dups.product.parentId &&
                                                  item.analytics.filter(
                                                    (analytic) =>
                                                      analytic.androids ===
                                                      "Androis"
                                                  ).length}
                                              </Collapse>
                                            );
                                          })}
                                      </StyledTableCell>

                                      <StyledTableCell
                                        style={{
                                          border: "none",
                                          color: "#36454F",
                                          fontWeight: 400,
                                          fontSize: "16px",
                                          fontFamily: "Poppins",
                                        }}
                                      >
                                        {item.product._id ===
                                          dups.product.parentId &&
                                          currentData.map((item) => {
                                            return (
                                              <>
                                                {!isFiltering ? (
                                                  <Collapse in={open}>
                                                    {item.product._id ===
                                                      dups.product.parentId &&
                                                      item.analytics.filter(
                                                        (analytic) =>
                                                          analytic.desktops ===
                                                          "Desktops"
                                                      ).length}
                                                  </Collapse>
                                                ) : (
                                                  <Collapse in={open}>
                                                    {item.product._id ===
                                                      dups.product.parentId &&
                                                      item.analytics.filter(
                                                        (analytic) =>
                                                          analytic.desktops ===
                                                          "Desktops"
                                                      ).length}
                                                  </Collapse>
                                                )}
                                              </>
                                            );
                                          })}
                                      </StyledTableCell>
                                      {/* <>
                                        {item.product._id ===
                                          dups.product.parentId &&
                                          countriesNames.map((countryName) => {
                                            let countryExist =
                                              item.countries.find(
                                                (item) =>
                                                  item.name === countryName
                                              );
                                            return (
                                              <>
                                                {!isFiltering ? (
                                                  <StyledTableCell
                                                    style={{
                                                      color: "#36454F",
                                                      fontFamily: "Poppins",
                                                      fontWeight: "400",
                                                      fontSize: "16px",
                                                      width: "25px",
                                                    }}
                                                  >
                                                    <Collapse in={open}>
                                                      {" "}
                                                      {countryExist?.count || 0}
                                                    </Collapse>
                                                  </StyledTableCell>
                                                ) : (
                                                  <>
                                                    {checkedCountries.includes(
                                                      countryName
                                                    ) && (
                                                        <StyledTableCell
                                                          style={{
                                                            border: "none",
                                                            color: "#36454F",
                                                            fontWeight: 400,
                                                            fontSize: "16px",
                                                            fontFamily: "Poppins",
                                                            paddingLeft: "100px",
                                                          }}
                                                        >
                                                          <Collapse in={open}>
                                                            {" "}
                                                            {countryExist?.count ||
                                                              0}
                                                          </Collapse>
                                                        </StyledTableCell>
                                                      )}
                                                  </>
                                                )}
                                              </>
                                            );
                                          })}
                                      </> */}
                                    </StyledTableRow>
                                  );
                                })}
                            </>
                          </>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <NoDisplayData />
              )}
            </CardContent>
          </div>
        </div>
        {productActions()}
      </div>
    </>
  );
};
