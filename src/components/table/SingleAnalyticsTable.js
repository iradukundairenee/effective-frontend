import React, { useState, useMemo, useEffect } from "react";
import _ from "lodash";
import { useTableStyles } from "./styles";
import { Link } from "react-router-dom";
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
  Divider,
  Collapse,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { useParams } from "react-router";
import Pagination from "../Pagination/Pagination";
import { Typography, Avatar } from "@material-ui/core";
import { NoDisplayData } from "../NoDisplayData";
import { Loading } from "../loading.component";
import { getSingleAnalytic } from "redux/actions/product";

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
    tableBody: {
      "& > :not(:last-child)": {
        borderBottom: "25px solid red",
      },
    },
  },
}))(TableRow);

const PageSize = 6;

export const SingleAnalyticsTable = ({
  data = [],
  columns = [],
  selectedData = [],
  loading = false,
  size = "small",
  open,
}) => {
  const classes = useTableStyles();
  const [currentPage, setCurrentPage] = useState(1);
  const { analyticId } = useParams();
  const appState = useSelector((state) => state);

  useEffect(() => {
    getSingleAnalytic(analyticId);
  }, [analyticId]);

  const {
    productDuplicates: { duplicates },
    analyticsGet: { analytics },
    getSingleAnalytic: { singleAnalytic },
    productDuplicatesAnalytics: { duplicatesAnalytics },
    login: {
      userInfo: { user },
    },
  } = appState;
  const renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };
  const currentData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, data]);
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
      <Card className={classes.root}>
        <Card className={classes.container}>
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
                        <StyledTableCell>
                          <Avatar style={{ marginRight: "5px" }}></Avatar>
                          <Typography style={{ marginTop: "7px" }}>
                            {singleAnalytic[0].product.name}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell>S.NO.</StyledTableCell>
                        <StyledTableCell>A R Users</StyledTableCell>
                        <StyledTableCell>Devices</StyledTableCell>
                        <StyledTableCell>Duration</StyledTableCell>
                        <StyledTableCell>Date And Time</StyledTableCell>
                        <StyledTableCell>City, State</StyledTableCell>
                      </StyledTableRow>
                    </TableHead>
                    <TableBody>
                      {currentData.map((item, itemIdx) => (
                        <>
                          <StyledTableRow
                            Style={{
                              height: "30px",
                              paddingBottom: 10,
                            }}
                            className={classes.tableRow}
                            hover
                            key={itemIdx}
                            selected={selectedData.indexOf(item.id) !== -1}
                          >
                            {columns.map((cellColumn, cellColumnIdx) => (
                              <StyledTableCell
                                key={cellColumnIdx}
                                style={{
                                  height: 50,
                                  border: "none",
                                  color: "#7D7D7D",
                                  fontWeight: 400,
                                  fontSize: "16px",
                                  fontFamily: "Poppins",
                                }}
                              >
                                {renderCell(item, cellColumn)}
                              </StyledTableCell>
                            ))}
                          </StyledTableRow>
                        </>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <NoDisplayData />
              )}
            </CardContent>
          </div>
        </Card>
        {productActions()}
      </Card>
    </>
  );
};
