import React, { useState, useMemo } from "react";
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
import Pagination from "../Pagination/Pagination";
import { NoDisplayData } from "../NoDisplayData";
import { Loading } from "../loading.component";

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
    padding: "0 15px",
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

export const ProductTable = ({
  data = [],
  columns = [],
  selectedData = [],
  loading = false,
  size = "small",
  open,
}) => {
  const classes = useTableStyles();
  const [currentPage, setCurrentPage] = useState(1);

  const appState = useSelector((state) => state);

  const {
    productDuplicates: { duplicates },
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
          <Link to="/dashboard/add-product" className={classes.addProject}>
            + Add 3D Assets
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
                        <>
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
                                  fontWeight: 400,
                                  fontSize: "16px",
                                  fontFamily: "Poppins",
                                }}
                              >
                                {renderCell(item, cellColumn)}
                              </StyledTableCell>
                            ))}
                          </StyledTableRow>
                          <StyledTableRow className={classes.tableRow} hover>
                            <StyledTableCell
                              style={{
                                border: "none",
                                color: "#7D7D7D",
                                fontWeight: 400,
                                fontSize: "16px",
                                fontFamily: "Poppins",
                              }}
                              colSpan={8}
                            >
                              <Collapse in={open} timeout="auto" unmountOnExit>
                                <Table size={size}>
                                  <TableBody>
                                    {duplicates.map((dups, dupsIdx) => (
                                      <StyledTableRow
                                        className={classes.tableRow}
                                        hover
                                        key={dupsIdx}
                                        selected={
                                          selectedData.indexOf(dups.id) !== -1
                                        }
                                      >
                                        {item._id === dups.parentId &&
                                          columns.map(
                                            (cellColumn, cellColumnIdx) => (
                                              <StyledTableCell
                                                key={cellColumnIdx}
                                                style={{
                                                  border: "none",
                                                  color: "#7D7D7D",
                                                  fontWeight: 400,
                                                  fontSize: "16px",
                                                  fontFamily: "Poppins",
                                                }}
                                              >
                                                {renderCell(dups, cellColumn)}
                                              </StyledTableCell>
                                            )
                                          )}
                                      </StyledTableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </Collapse>
                            </StyledTableCell>
                          </StyledTableRow>
                        </>
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
        {productActions()}
      </div>
    </>
  );
};
