import React, { useState, useMemo } from "react";
import _ from "lodash";
import { useTableStyles } from "./styles";
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

const PageSize = 6;

export const AnalyticsTable = ({
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
    if (column.subHeader) return column.subHeader(item);
    return _.get(item, column.path);
  };

  const currentData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, data]);

  return (
    <div className={classes.root}>
      <Card className={classes.table}>
        <CardContent className={classes.tableContent}>
          {loading ? (
            <Loading />
          ) : currentData.length ? (
              <Table size={size}>
                <TableHead>
                  <StyledTableRow>
                    {columns.map(({ label, subheader }, columnIdx) => (
                      <StyledTableCell
                        style={{
                          color: "#303030",
                          fontSize: "18px",
                          fontWeight: "500",
                          fontFamily: "Poppins",
                        }}
                        key={columnIdx}
                      >
                        <div>{label}</div>
                        {subheader}
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
                            fontWeight: 400,
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
        <CardActions className={classes.clientActions}>
          <Pagination
            currentPage={currentPage}
            totalCount={data.length}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </CardActions>
      </Card>
    </div>
  );
};
