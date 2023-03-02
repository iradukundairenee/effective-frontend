import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/Style.css";
import Pagination from "../Pagination/Pagination";
import { NoDisplayData } from "../NoDisplayData";
import { Loading } from "../loading.component";
import _ from "lodash";
import { Typography, Button } from "@material-ui/core";
import Box from "@mui/material/Box";
import { getSingleProjectListDetails } from "../../redux/actions/project";
import { useStyles } from "styles/headerStyles";
import Modal from "@mui/material/Modal";

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
  Grid,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { useTableStyles } from "./styles";
import { id } from "date-fns/esm/locale";
import moment from "moment";
import { useParams } from "react-router-dom";
import { getProjectListDetails } from "redux/actions/project";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#fff",
    fontSize: 16,
    fontFamily: "Poppins",
    padding: "10px 5px",
  },
  body: {
    fontSize: 16,
    padding: "5px 10px",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:hover,&:focus": {
      background: "#DFE6EC",
      color: "red",
      textDecoration: "none",
    },
  },
}))(TableRow);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "3px",
};
export const CrmSubscriptionTable = ({
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
          <div className={classes.table}>
            <div className={classes.tableContent}>
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
                    {currentData.length &&
                      currentData.map((item, itemIdx) => {
                        return (
                          <StyledTableRow
                            key={itemIdx}
                            selected={selectedData.indexOf(item.id) !== -1}
                          >
                            {columns.map((cellColumn, cellColumnIdx) => (
                              <StyledTableCell
                                key={cellColumnIdx}
                                style={{
                                  border: "none",
                                  color: "#7D7D7D",
                                  margin: "2px",
                                  cursor: "pointer",
                                }}
                              >
                                {renderCell(item, cellColumn)}
                              </StyledTableCell>
                            ))}
                          </StyledTableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              ) : (
                <NoDisplayData />
              )}
            </div>
          </div>
        </div>
        <Divider />
        {
          <Pagination
            currentPage={currentPage}
            totalCount={data.length}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        }
      </div>
    </>
  );
};
