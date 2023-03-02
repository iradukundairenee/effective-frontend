import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import "../../styles/Style.css";
import Pagination from "../Pagination/Pagination";
import { NoDisplayData } from "../NoDisplayData";
import { Loading } from "../loading.component";
import _ from "lodash";

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

export const NewComp = ({
  data = [],
  tableTitle = "",
  dataCount = 0,
  pageCount = 0,
  page,
  columns = [],
  selectedData = [],
  loading = false,
  withPagination = true,
  handlePageChange,
  size = "small",
  user,
}) => {
  const classes = useTableStyles();
  const [currentPage, setCurrentPage] = useState(1);

  const renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };

  const PageSize = 6;

  const currentData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, data]);

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
        </div>
        <Divider />
        {
          <div
            className={
              user.role !== "Client"
                ? classes.clientActions
                : classes.clientAction
            }
          >
            {user.role !== "Client" && (
              <Link to="/dashboard/addproposals" className={classes.addProject}>
                + Add Proposal
              </Link>
            )}
            <Pagination
              currentPage={currentPage}
              totalCount={data.length}
              pageSize={PageSize}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        }
      </div>
    </>
  );
};
