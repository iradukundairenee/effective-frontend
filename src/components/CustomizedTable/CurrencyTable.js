import React, { useState, useMemo } from "react";
import "../../styles/Style.css";
import Pagination from "../Pagination/Pagination";
import { NoDisplayData } from "../NoDisplayData";
import { Loading } from "../loading.component";
import _ from "lodash";
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
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { useTableStyles } from "./styles";

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
    padding: "0 10px",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export const CurrencyTable = ({
  data = [],
  columns = [],
  selectedData = [],
  loading = false,
  size = "small",
  user,
}) => {
  const classes = useTableStyles();
  const [currentPage, setCurrentPage] = useState(1);

  const renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };

  const PageSize = 9;

  const currentData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, data]);

  const actions = () => {
    if (user.role !== "Client") {
      return (
        <CardActions className={classes.clientActions}>
          <Link
            to="/dashboard/currencies/createCurrency"
            className={classes.addProject}
          >
            + Add Currency
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
        <div className={classes.container} style={{ width: "100%" }}>
          <CardContent
            className={classes.tableContent}
            style={{
              height: "55vh",
            }}
          >
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
                      >
                        {label}
                      </StyledTableCell>
                    ))}
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {currentData.map((item, itemIdx) => (
                    <StyledTableRow
                      hover
                      key={itemIdx}
                      selected={selectedData.indexOf(item.id) !== -1}
                    >
                      {columns.map((cellColumn, cellColumnIdx) => (
                        <StyledTableCell
                          key={cellColumnIdx}
                          style={{ border: "none", color: "#7D7D7D" }}
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
        <Divider />
        {actions()}
      </div>
    </>
  );
};
