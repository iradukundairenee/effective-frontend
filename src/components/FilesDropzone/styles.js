import { colors } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {},
  dropZone: {
    border: `1px dashed ${theme.palette.divider}`,
    padding: theme.spacing(1),
    outline: "none",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    alignItems: "center",
    "&:hover": {
      backgroundColor: colors.grey[50],
      opacity: 0.5,
      cursor: "pointer",
    },
  },
  dragActive: {
    backgroundColor: colors.grey[50],
    opacity: 0.5,
  },
  image: {
    width: 130,
  },
  info: {
    marginTop: theme.spacing(1),
  },
  list: {
    maxHeight: 320,
  },
  actions: {
    marginTop: theme.spacing(2),
    display: "flex",
    justifyContent: "flex-end",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));
