import React, { useState, useMemo } from "react";
import _ from "lodash";
import { useTableStyles } from "./styles";
import { Link } from "react-router-dom";
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
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Pagination from "../Pagination/Pagination";
import { NoDisplayData } from "../NoDisplayData";
import { Loading } from "../loading.component";
import { useHistory } from "react-router-dom";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#fff",
    fontSize: 16,
    fontFamily: "Poppins",
    padding: "10px 5px",
  },
  body: {
    fontSize: 16,
    backgroundColor: "#fff",
    padding: "10px 5px",
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

export const UserTable = ({
  data = [],
  columns = [],
  selectedData = [],
  loading = false,
  size = "medium",
  user,
}) => {
  const history = useHistory();
  const classes = useTableStyles();
  const [currentPage, setCurrentPage] = useState(1);

  const renderCell = (item, column) => {
    if (column.content) {
      return column.content(item);
    }
    if (column.path === "subscription") {
      return (
        <Typography
          style={{
            color: "#7D7D7D",
            fontFamily: "Poppins",
            fontWeight: "400",
            fontSize: "16px",
            textAlign: "center",
          }}
          component={Link}
          onClick={() => {
            if (item.subscription.length > 0)
              return history.push(`/dashboard/crm/subscription/${item._id}`);
          }}
        >
          {item.subscription.length > 0 ? "Yes" : "No"}
        </Typography>
      );
    }
    if (column.path === "products") {
      return (
        <Typography
          style={{
            color: "#7D7D7D",
            fontFamily: "Poppins",
            fontWeight: "400",
            fontSize: "16px",
          }}
        >
          {item.products && item.products.length}
        </Typography>
      );
    }
    if (column.path === "loyaltyProgram") {
      return (
        <Typography
          style={{
            color: "#7D7D7D",
            fontFamily: "Poppins",
            fontWeight: "400",
            fontSize: "16px",
          }}
        >
          <strong>{item.coupons?.length}</strong> coupouns &{" "}
          <strong>
            {item.loyaltyPoints?.accruedPoints > 0
              ? item.loyaltyPoints?.accruedPoints
              : 0}
          </strong>{" "}
          points
        </Typography>
      );
    }
    if (column.path === "sessions") {
      return (
        <Typography
          style={{
            color: "#7D7D7D",
            fontFamily: "Poppins",
            fontWeight: "400",
            fontSize: "16px",
          }}
        >
          21
        </Typography>
      );
    }
    return _.get(item, column.path);
  };

  const currentData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, data]);

  const actions = () => {
    if (user.role !== "Client") {
      return (
        <CardActions className={classes.clientActions}>
          <Link to="/dashboard/crm/createUser" className={classes.addProject}>
            + Register New Customer
          </Link>
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
                <Table size={size}>
                  <TableHead>
                    <StyledTableRow>
                      {columns.map(({ label }, columnIdx) => (
                        <StyledTableCell
                          style={{
                            color: "#303030",
                            fontSize: "18px",
                            fontWeight: "500",
                            fontFamily: "Poppins",
                          }}
                          key={columnIdx}
                        >
                          {label}
                        </StyledTableCell>
                      ))}
                    </StyledTableRow>
                  </TableHead>
                  <TableBody>
                    {currentData.map((item, itemIdx) => (
                      <StyledTableRow
                        className={classes.tableRow}
                        hover
                        key={itemIdx}
                        selected={selectedData.indexOf(item.id) !== -1}
                      >
                        {columns.map((cellColumn, cellColumnIdx) => (
                          <StyledTableCell
                            key={cellColumnIdx}
                            style={{
                              border: "none",
                              color: "#7D7D7D",
                            }}
                          >
                            {renderCell(item, cellColumn)}
                          </StyledTableCell>
                        ))}
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <NoDisplayData />
              )}
            </CardContent>
          </div>
        </div>
        <Divider />
        {actions()}
      </div>
    </>
  );
};
