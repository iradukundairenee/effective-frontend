import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
  root: {},
  rootContent: {
    boxShadow: "0px 0px 14px rgba(201, 215, 223, 0.2)",
    borderRadius: "10px",
    marginTop: "25px",
  },
  content: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  cardContent: {
    backgroundColor: "#FAFBFC",
    borderRadius: "20px",
    width: "300px",
    height: "80px",
    padding: "10px 20px",
    display: "flex",
    alignItems: "center",
  },
  chart: {
    boxShadow: "0px 0px 14px rgba(201, 215, 223, 0.2)",
    marginTop: "25px",
    marginBottom: "25px",
    borderRadius: "10px",
    padding: "20px 0px",
  },
}));
