import React, { useState, useMemo } from "react";
import _ from "lodash";
import { useTableStyles } from "./styles";
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Divider,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { selectedSession } from "redux/actions/session";
import Pagination from "../Pagination/Pagination";
import { NoDisplayData } from "../NoDisplayData";
import { Loading } from "../loading.component";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#fff",
    fontSize: "18px",
    fontFamily: "Poppins",
    padding: "10px 5px",
  },
  body: {
    fontSize: "18px",
    backgroundColor: "#fff",
    color: "red",
    padding: "0 10px",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  "&:hover,&:focus": {
    backgroundColor: "#F5F5F5",
  },
}))(TableRow);

const PageSize = 10;

export const SessionsTable = ({
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

  const currentData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, data]);

  const sessions = useSelector((state) => state);

  const {
    selectedSession: { index },
  } = sessions;

  return (
    <>
      <div className={classes.root} style={{ width: "100%" }}>
        <div className={classes.table} style={{ width: "100%" }}>
          <div
            className={classes.tableContent}
            style={{
              height: "55vh",
            }}
          >
            {loading ? (
              <Loading />
            ) : currentData.length ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Table size={size}>
                  <TableHead>
                    <StyledTableRow>
                      {columns.map(({ label }, columnIdx) => (
                        <StyledTableCell>{label}</StyledTableCell>
                      ))}
                    </StyledTableRow>
                  </TableHead>
                  <TableBody>
                    {currentData.map((item, itemIdx) => (
                      <StyledTableRow
                        hover
                        className={classes.tableRow}
                        key={itemIdx}
                        selected={selectedData.indexOf(item.id) !== -1}
                      >
                        {columns.map((cellColumn, cellColumnIdx) => (
                          <StyledTableCell
                            key={cellColumnIdx}
                            style={{
                              border: "none",
                              fontWeight: "bold",
                              cursor: "pointer",
                              backgroundColor: "transparent",
                            }}
                          >
                            {renderCell(item, cellColumn)}
                          </StyledTableCell>
                        ))}
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
                <Table>
                  <TableHead>
                    <StyledTableRow>
                      <StyledTableCell>Selected Session Logs</StyledTableCell>
                    </StyledTableRow>
                  </TableHead>
                  <TableBody>
                    <div className={classes.sessionActivity}>
                      <StyledTableRow>
                        {currentData[index]?.activities?.length > 0 ? (
                          currentData[index]?.activities?.map(
                            (detail, index) => {
                              return (
                                <div
                                  style={{
                                    padding: "5px",
                                    color: "#7D7D7D",
                                    fontFamily: "Poppins",
                                    fontSize: "16px",
                                  }}
                                >
                                  - {detail.title}
                                </div>
                              );
                            }
                          )
                        ) : (
                          <div
                            style={{
                              padding: "5px",
                              color: "#7D7D7D",
                              fontFamily: "Poppins",
                              fontSize: "16px",
                            }}
                          >
                            No activities
                          </div>
                        )}
                      </StyledTableRow>
                    </div>
                  </TableBody>
                </Table>
              </div>
            ) : (
              <NoDisplayData />
            )}
          </div>
        </div>
        <Divider />
        <div className={classes.pagination}>
          <Pagination
            currentPage={currentPage}
            totalCount={data.length}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </>
  );
};
