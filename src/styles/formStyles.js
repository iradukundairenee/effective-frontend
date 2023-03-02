import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  paper: {
    display: "flex",
    "@media (max-width: 768px)": {
      marginTop: "50px",
    },
  },
  avatar: {
    color: "#8967fc",
    backgroundColor: "#fff",
    fontSize: "24px",
  },
  flex: {
    display: "flex",
    justifyContent: "space-between",
    "@media (max-width: 768px)": {
      display: "block",
    },
  },
  nameInputContainer: {
    width: "45%",
    "@media (max-width: 768px)": {
      display: "block",
      width: "95%",
    },
  },
  typeInputContainer: {
    width: "50%",
    "@media (max-width: 768px)": {
      display: "block",
      marginTop: "10px",
      width: "100%",
    },
  },
  dateStatusContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    "@media (max-width: 768px)": {
      display: "block",
      width: "100%",
    },
  },
  dateInputContainer: {
    width: "45%",
    "@media (max-width: 768px)": {
      display: "block",
      marginBottom: "10px",
      width: "96%",
    },
  },
  statusInputContainer: {
    width: "40%",
    "@media (max-width: 768px)": {
      width: "100%",
    },
  },
  itemsInputContainer: {
    width: "47%",
    marginRight: "20px",
    "@media (max-width: 768px)": {
      width: "95%",
    },
  },
  input: {
    border: "0.75px solid #EFF0F6",
    boxShadow: "0px 3px 16.5px rgba(8, 15, 52, 0.03)",
    borderRadius: "10px",
    padding: "10px",
    "@media (max-width: 768px)": {
      width: "100%",
    },
  },
  currInput: {
    border: "0.75px solid #EFF0F6",
    boxShadow: "0px 3px 16.5px rgba(8, 15, 52, 0.03)",
    borderRadius: "10px",
    padding: "10px",
    "@media (max-width: 768px)": {
      width: "100%",
    },
  },
  inputTitle: {
    fontFamily: "Poppins",
    fontWeight: 400,
    fontSize: "16px",
    color: "#303030",
    paddingBottom: "5px",
  },
  title: {
    fontFamily: "Poppins",
    fontWeight: 700,
    fontSize: "24px",
    color: "#303030",
    marginLeft: "2px",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(2),
    color: "black",
    fontSize: 16,
    paddingRight: "20px",
  },
  submit: {
    margin: theme.spacing(3, 0),
    backgroundColor: "#8967fc",
    borderRadius: "100px",
    float: "left",
    maxWidth: "100%",
    width: "200px",
    color: "#fff",
    height: "50px",
    fontSize: 16,
    "@media (max-width: 768px)": {
      width: "100px",
      height: "50px",
    },
  },
  cancel: {
    margin: theme.spacing(3, 0),
    backgroundColor: "#fff",
    borderRadius: "100px",
    maxWidth: "100%",
    height: "50px",
    width: "200px",
    color: "#8967fc",
    border: "1px solid #8967fc",
    "@media (max-width: 768px)": {
      width: "100px",
      height: "50px",
    },
  },
  inline: {
    display: "inline",
  },
  actions: {
    justifyContent: "flex-end",
    "@media (max-width: 768px)": {
      display: "flex",
      justifyContent: "space-between",
    },
  },
  disabled: {
    pointerEvents: "none",
    opacity: 0.5,
  },
  card: {
    border: "0.75px solid #EFF0F6",
    margin: "0px 5px",
    boxShadow: "0px 3px 16.5px rgba(8, 15, 52, 0.03)",
    borderRadius: "10px",
    padding: "10px",
    "@media (max-width: 768px)": {
      width: "100%",
    },
  },
  cardTitle: {
    fontFamily: "Poppins",
    fontWeight: 600,
    fontSize: "16px",
    color: "#303030",
    padding: "5px 15px",
  },
  cardContent: {
    fontFamily: "Poppins",
    fontSize: "14px",
    color: "#7D7D7D",
    padding: "5px 15px",
  },
}));
