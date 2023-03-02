import { makeStyles } from "@material-ui/core/styles";

export const useTableStyles = makeStyles((theme) => ({
  root: {
    borderRadius: "10px",
    boxShadow: "0px 0px 14px rgba(201, 215, 223, 0.2)",
    overflowX: "auto",
    overflowY: "hidden",
  },
  container: {
    height: "60vh",
    borderRadius: "10px 10px 0 0",
    boxShadow: "0px 0px 14px rgba(201, 215, 223, 0.2)",
    overflowX: "scroll",
    overflowY: "hidden",
    "&::-webkit-scrollbar": {
      height: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#8967FC",
      borderRadius: "10px",
      width: "20px",
    },
  },
  table: {
    width: "130%",
    overflow: "auto",
  },
  row: {
    height: "42px",
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(1),
  },
  spacer: {
    flexGrow: 1,
  },
  importButton: {
    marginRight: theme.spacing(1),
  },
  exportButton: {
    marginRight: theme.spacing(1),
  },
  searchInput: {
    marginRight: theme.spacing(1),
  },
  content: {
    marginTop: theme.spacing(2),
  },
  tableContent: {
    padding: 0,
    marginBottom: "50px",
  },
  inner: {},
  nameContainer: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  clientActions: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: "10px 0",
    borderRadius: "0 0 10px 10px",
    boxShadow: "0px 0px 14px rgba(201, 215, 223, 0.2)",
  },
  clientAction: {
    display: "flex",
    justifyContent: "flex-end",
    backgroundColor: "#fff",
    padding: "10px 0",
    borderRadius: "0 0 10px 10px",
    boxShadow: "0px 0px 14px rgba(201, 215, 223, 0.2)",
  },
  actions: {
    justifyContent: "flex-end",
  },
  addProject: {
    color: "#8967FC",
    fontFamily: "Poppins",
    fontWeight: "700",
    fontSize: "18px",
    textDecoration: "none",
  },
  addProjectDisabled: {
    pointerEvents: "none",
    color: "#",
    fontFamily: "Poppins",
    fontWeight: "700",
    fontSize: "18px",
    textDecoration: "none",
  },
}));
