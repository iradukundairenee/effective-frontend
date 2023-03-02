import React, { useState, useMemo, useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
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
  Collapse,
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
export const CrmTable = ({
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
  isOpen,
}) => {
  const params = useParams();
  const { type, id } = params;
  const classes = useTableStyles();
  const [selectedProject, setSelectedProject] = useState();
  const appState = useSelector((state) => state);

  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    return setOpen(true);
  };
  const handleClose = () => setOpen(false);

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

  const actions = () => {
    if (user.role !== "Client") {
      return (
        <CardActions className={classes.clientActions}>
          <Link to="#" className={classes.addProject}>
            + Add project
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
          <div className={classes.table}>
            <CardContent className={classes.tableContent}>
              {loading ? (
                <Loading />
              ) : currentData.length ? (
                <PerfectScrollbar>
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
                      {currentData &&
                        currentData.map((item, itemIdx) => {
                          return (
                            <StyledTableRow
                              style={{
                                position: "relative",
                              }}
                              key={itemIdx}
                              selected={selectedData.indexOf(item.id) !== -1}
                            >
                              {columns.map((cellColumn, cellColumnIdx) => (
                                <StyledTableCell
                                  onClick={() => {
                                    if (cellColumn.label !== "Asset name") {
                                      setSelectedProject(item);
                                      return handleOpen();
                                    }
                                  }}
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
                  {selectedProject && (
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Box sx={{ p: 3, backgroundColor: "#8967FC" }}>
                          <Typography
                            style={{
                              color: "white",
                              textAlign: "center",
                              fontWeight: "bold",
                              fontSize: "25px",
                            }}
                            variant="h4"
                            noWrap
                          >
                            project Details
                          </Typography>
                        </Box>
                        <Box sx={{ p: 4 }}>
                          <Grid
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              paddingBottom: "7px",
                            }}
                          >
                            <Typography style={{ fontSize: "15px" }}>
                              project
                            </Typography>
                            <Typography
                              style={{ fontWeight: "bold", fontSize: "15px" }}
                            >
                              {selectedProject.name}
                            </Typography>
                          </Grid>
                          <Grid
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              paddingBottom: "7px",
                            }}
                          >
                            <Typography style={{ fontSize: "15px" }}>
                              Start Date
                            </Typography>
                            <Typography
                              style={{ fontWeight: "bold", fontSize: "15px" }}
                            >
                              {moment(selectedProject.startDate).format(
                                "DD MMM YYYY"
                              )}
                            </Typography>
                          </Grid>
                          <Grid
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              paddingBottom: "7px",
                            }}
                          >
                            <Typography style={{ fontSize: "15px" }}>
                              Due Date
                            </Typography>
                            <Typography
                              style={{ fontWeight: "bold", fontSize: "15px" }}
                            >
                              {moment(selectedProject.dueDate).format(
                                "DD MMM YYYY"
                              )}
                            </Typography>
                          </Grid>
                          <Grid
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              paddingBottom: "7px",
                            }}
                          >
                            <Typography style={{ fontSize: "15px" }}>
                              Actual End Date
                            </Typography>
                            <Typography
                              style={{ fontWeight: "bold", fontSize: "15px" }}
                            >
                              {moment(selectedProject.dueDate).format(
                                "DD MMM YYYY"
                              )}
                            </Typography>
                          </Grid>
                          <Grid
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              paddingBottom: "7px",
                            }}
                          >
                            <Typography style={{ fontSize: "15px" }}>
                              Assets Name
                            </Typography>
                            <Typography
                              style={{ fontWeight: "bold", fontSize: "15px" }}
                            >
                              {selectedProject.product &&
                                selectedProject.product.name}
                            </Typography>
                          </Grid>
                          <Grid
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              paddingBottom: "7px",
                            }}
                          >
                            <Typography style={{ fontSize: "15px" }}>
                              Budget
                            </Typography>
                            <Typography
                              style={{ fontWeight: "bold", fontSize: "15px" }}
                            >
                              {selectedProject.budget}
                            </Typography>
                          </Grid>
                          <Grid
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              paddingBottom: "7px",
                            }}
                          >
                            <Typography style={{ fontSize: "15px" }}>
                              Assinged to
                            </Typography>
                            <Typography
                              style={{ fontWeight: "bold", fontSize: "15px" }}
                            >
                              {selectedProject.manager &&
                                selectedProject.manager.fullName}
                            </Typography>
                          </Grid>
                          <Grid
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              paddingBottom: "7px",
                            }}
                          >
                            <Typography style={{ fontSize: "15px" }}>
                              Cost
                            </Typography>
                            <Typography
                              style={{ fontWeight: "bold", fontSize: "15px" }}
                            >
                              {selectedProject.product &&
                                selectedProject.product.price}
                            </Typography>
                          </Grid>
                          <Box
                            sx={{
                              alignItems: "center",
                              mt: 2,
                            }}
                          >
                            <Button
                              variant="outlined"
                              className={classes.itemActionBtn}
                              style={{
                                width: "100%",
                                borderRadius: "81px",
                                border: "1px solid #8967FC",
                                color: "#8967FC",
                              }}
                              onClick={handleClose}
                            >
                              CLOSE
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    </Modal>
                  )}
                </PerfectScrollbar>
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
