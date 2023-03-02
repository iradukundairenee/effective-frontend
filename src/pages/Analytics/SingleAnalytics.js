import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Avatar,
  Typography,
} from "@material-ui/core";
import NativeSelect from '@mui/material/NativeSelect';
import {
  TableRow,
  TableBody,
  Table,
  TableHead

} from "@material-ui/core";
import { SingleAnalyticsTable } from "components/table/SingleAnalyticsTable";
import { SingleAnalyticsColumns } from "components/columns";
import { useSelector } from "react-redux";
import { getProjects } from "redux/actions/project";
import { initialPaginate, paginate } from "utils/paginate";
import { getProdAnalytics, getDuplicatesAnalytics } from "redux/actions/product";
import { withStyles } from "@material-ui/core/styles";
import { ViewProductDialog } from "pages/ProjectDetail/ViewProductDialog";
import filterIcon from "../../assets/filter-icon-1.svg";
import dropdown from "../../assets/dropdown.png";
import company from "../../assets/company.png";
import calender from "../../assets/calender.png";
import summer from "../../assets/summer.png";
import { ProductPage } from "pages/Product";
import { getUsersList } from "redux/actions/user";
import DateRangeIcon from "@mui/icons-material/DateRange";
import ListAltIcon from "@mui/icons-material/ListAlt";


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

export const SingleAnalyticsPage = () => {

  const [currentItem, setCurrentItem] = useState(null);
  const appState = useSelector((state) => state);


  const {
    productsGet: { products },
    getAssets: {
      assets: { views },
    },
    getSingleAnalytic: { singleAnalytic },
    analyticsGet: { analytics, loading },
    userList: { users },
    login: { userInfo: user }
  } = appState;
  const onClickItem = (item) => {
    setCurrentItem(item);
  };
  const country = Array.from(new Set(singleAnalytic.map((item) => (item.country))));

  return (
    <div>
      <Grid
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "15px",
        }}
      >
        <Typography
          style={{
            fontSize: "24px",
            fontWeight: "700",
            fontFamily: "Poppins",
            color: "#303030",
            marginTop: "30px",
          }}
        >
          Analytics
        </Typography>
        <Typography
          style={{
            fontSize: "24px",
            fontWeight: "700",
            fontFamily: "Poppins",
            color: "#303030",
            marginTop: "30px",
          }}
        >
        {country}
        </Typography>
        <FormControl style={{ marginTop: "30px", }}>
          <img src={filterIcon} alt="filter icon" />
        </FormControl>
      </Grid>
      < SingleAnalyticsTable
       columns={SingleAnalyticsColumns(
        onClickItem,
      )}
        data={singleAnalytic}
      />
    </div>
  );
};
