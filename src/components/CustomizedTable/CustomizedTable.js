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
    padding: "0 10px",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  "&:hover,&:focus": {
    backgroundColor: "#F5F5F5",
    textDecoration: "none",
  },
}))(TableRow);

const PageSize = 6;

export const CustomisedTable = ({
  data = [],
  columns = [],
  selectedData = [],
  loading = false,
  size = "small",
  user,
}) => {
  const classes = useTableStyles();
  const history = useHistory();
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

  const actions = () => {
    if (user.role === "Client") {
      return (
        <CardActions className={classes.clientActions}>
          <Link to="/dashboard/add-project" className={classes.addProject}>
            {" "}
            + Add Project
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
          <Link to="#" className={classes.addProject}></Link>
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
                    <StyledTableRow hover={false}>
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
                        hover={true}
                        style={{
                          cursor: "pointer",
                        }}
                        key={itemIdx}
                        selected={selectedData.indexOf(item.id) !== -1}
                      >
                        {columns.map((cellColumn, cellColumnIdx) => (
                          <StyledTableCell
                            key={cellColumnIdx}
                            onClick={
                              cellColumn.label !== "Actions" &&
                              cellColumn.label !== "Status" &&
                              cellColumn.label !== "Assign To"
                                ? () =>
                                    history.push(
                                      `/dashboard/projects/${item._id}`
                                    )
                                : null
                            }
                            style={{
                              border: "none",
                              color: "#7D7D7D",
                              fontWeight: 400,
                              backgroundColor: "transparent",
                              fontSize: "16px",
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
