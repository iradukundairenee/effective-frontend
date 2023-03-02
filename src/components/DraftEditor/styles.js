import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: theme.typography.fontFamily,
    border: " 0.75px solid #EFF0F6",
    height: "100%",
    paddingBottom: "5px",
    boxShadow: "0px 3px 16.5px rgba(8, 15, 52, 0.03)",
    borderRadius: "7.5px",
    "& .rdw-option-wrapper": {
      background: "transparent",
      border: "none",
      minWidth: 26,
      padding: 6,
      "&:hover": {
        boxShadow: "none",
        backgroundColor: theme.palette.action.hover,
      },
    },
    "& .rdw-option-active": {
      boxShadow: "none",
      backgroundColor: theme.palette.action.selected,
    },
    "& .rdw-dropdown-wrapper": {
      boxShadow: "none",
      border: "none",
      background: "transparent",
    },
    "& .rdw-dropdown-optionwrapper": {
      overflowY: "auto",
      boxShadow: theme.shadows[10],
      padding: theme.spacing(1),
    },
  },
  toolbarHidden: {
    display: "none",
  },
  toolbar: {
    marginBottom: 0,
    borderLeft: "none",
    borderTop: "none",
    borderRight: "none",
    borderBottom: `1px solid ${theme.palette.divider}`,
    background: "transparent",
  },
  editor: {
    padding: theme.spacing(2),
    height: 300,
    color: theme.palette.text.primary,
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey",
      borderRadius: "10px",
    },
  },
}));
