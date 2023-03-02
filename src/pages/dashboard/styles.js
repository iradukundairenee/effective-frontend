import { makeStyles } from "@material-ui/core/styles";

export const styles = makeStyles(() => ({
  filter: {
    display: "flex",
    color: "#303030",
    marginTop: "25px",
    fontSize: "10px",
    gap: "3px",
    alignItems: "center",
    padding: "5px 15px",
    boxShadow: "0px 0px 14px rgba(201, 215, 223, 0.2)",
    borderRadius: "20px ",
  },
  filters: {
    display: "flex",
    flexDirection: "row",
    gap: "25px",
  },
}));
