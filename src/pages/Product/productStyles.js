import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    // backgroundColor: theme.palette.background.paper,
    // display: "flex",
    height: 450,
    overflowY: "auto",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  editor: {
    backgroundColor: theme.palette.background.default,
    height: 500,
  },
}));
