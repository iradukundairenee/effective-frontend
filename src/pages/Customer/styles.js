import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#8967fc",
    height: 100,
    width: 100,
  },
  input: {
    fontSize: 16,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(2),
    color: "black",
    fontSize: 16,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#8967fc",
    borderRadius: 5,
    float: "left",
    maxWidth: "100%",
    color: "white",
    fontSize: 16,
  },
  button: {
    marginRight: theme.spacing(1),
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  completed: {
    display: "inline-block",
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  root: {},
  content: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    textAlgin: "center",
  },
  name: {
    marginTop: theme.spacing(1),
  },
  removeBotton: {
    width: "100%",
  },
  userInfo: {
    maxWidth: "50%",
  },
  companyInfo: {
    maxWidth: "40%",
  }
}));
