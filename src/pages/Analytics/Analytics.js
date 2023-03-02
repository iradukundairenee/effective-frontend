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
  IconButton,
} from "@material-ui/core";
import { SideBarFilter } from "../../components/SideBar/SideBarFilter";
import { TableRow, TableBody, Table, TableHead } from "@material-ui/core";
import { AnalyticsTable } from "components/table/analyticsTable";
import { AnalyticsColumns } from "components/columns";
import { useSelector } from "react-redux";
import { getProjects } from "redux/actions/project";
import { initialPaginate, paginate } from "utils/paginate";
import {
  getProdAnalytics,
  getDuplicatesAnalytics,
  getCountries,
} from "redux/actions/product";
import { withStyles } from "@material-ui/core/styles";
import filterIcon from "../../assets/filter-icon-1.svg";
import { getUsersList } from "redux/actions/user";
import DateRangeIcon from "@mui/icons-material/DateRange";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { ImagePreview } from "../Product/ImagePreview";
import { useParams } from "react-router";

const initialOptions = { project: "", time: "allTime" };
const dateFilters = [
  { id: 1, name: "All time", value: "alltime" },
  { id: 2, name: "Today", value: "today" },
  { id: 3, name: "Last 7 days", value: "week" },
  { id: 4, name: "Last 30 days", value: "month" },
];

const deviceFilters = [
  { id: 1, name: "Android", value: "Android" },
  { id: 2, name: "Ios", value: "Ios" },
  { id: 3, name: "Desktop", value: "Desktop" },
];

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

export const AnalyticsPage = () => {
  const appState = useSelector((state) => state);
  const {
    productsGet: { products },
    getAssets: {
      assets: { views },
    },
    getSingleAnalytic: { singleAnalytic },
    countriesGet: { fetchedCountries },
    analyticsGet: { analytics },
    projectsGet: { loading, projects },
    userList: { users },
    login: { userInfo: user },
  } = appState;
  const [openImgView, setOpenImgView] = useState(false);
  // const countries = analytics.reduce(
  //   (acc, item) => [...acc, ...item.countries],
  //   []
  // );
  // const countriesNames = Array.from(
  //   new Set(countries.map((country) => country.name))
  // );

  const [options, setOptions] = useState(initialOptions);
  const [tableTitle, setTableTitle] = useState("All");
  const { projectId } = useParams();
  const [paginator, setPaginator] = useState(initialPaginate());
  const [paginatedData, setPaginatedData] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  // const [selectdCompany, setSelectedCompany] = useState();
  const [selectedProject, setSelectedProject] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [open, setOpen] = useState(false);
  const [viewsByDate, setViewsByDate] = useState();

  const [anchorEl, setAnchorEl] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [deviceChecked, setDeviceChecked] = useState(["Desktop"]);
  //const [checkedCountries, setCheckedCountries] = useState(countriesNames);
  const [defaultChecked, setDefaultChecked] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);

  const [myProduct, setMyproduct] = useState(analytics);
  // const companies = Array.from(new Set(users.map((user) => user.companyName)));
  const projecties = Array.from(
    new Set(projects.map((project) => project.name))
  );
  const isMenuOpen = Boolean(anchorEl);
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleNavMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    setMyproduct(analytics);
  }, [analytics]);

  useEffect(() => {
    getUsersList();
  }, []);
  // const onHandleChange = (e) => {
  //   e.preventDefault();
  //   setSelectedCompany(e.target.value);
  // };

  const onHandleChecked = (e) => {
    e.preventDefault();

    // if (e.target.checked) {
    //   setDefaultChecked(!defaultChecked);
    //   setCheckedCountries([...checkedCountries, e.target.value]);
    // } else {
    //   setDefaultChecked(!defaultChecked);
    //   setCheckedCountries(
    //     checkedCountries.filter((item) => item !== e.target.value)
    //   );
    // }
  };
  const onHandleDeviceChecked = (e) => {
    e.preventDefault();
    if (e.target.checked) {
      setDeviceChecked([...deviceChecked, e.target.value]);
    } else {
      setDeviceChecked(deviceChecked.filter((item) => item !== e.target.value));
    }
  };

  useEffect(() => {
    if (projectId !== undefined) {
      setCurrentItem({
        _id: projectId,
      });
      setOpenImgView(true);
      return;
    }
  }, [projectId]);
  // useEffect(() => {
  //   if (selectdCompany === "Company") {
  //     setMyproduct(analytics);
  //   } else {
  //     setMyproduct(
  //       analytics.filter((product) => {
  //         return product.customer.companyName === selectdCompany;
  //       })
  //     );
  //   }
  // }, [selectdCompany]);

  // useEffect(() => {
  //   if (selectedProject === "projects") {
  //     setMyproduct(analytics);
  //   } else {
  //     setMyproduct(
  //       analytics.filter((product) => {
  //         return product.project.name === selectedProject;
  //       })
  //     );
  //   }
  // }, [selectedProject]);

  useEffect(() => {
    if (selectedDate === "alltime") {
      setMyproduct(analytics);
    }
    if (selectedDate === "today") {
      setMyproduct(
        analytics.filter((item) => {
          const today = new Date();
          const date = new Date(item.createdAt);
          return date === today;
        })
      );
    }
    if (selectedDate === "month") {
      setMyproduct(
        analytics.filter((item) => {
          const end = new Date();
          const start = new Date(end.getFullYear(), end.getMonth(), 1);
          const date = new Date(item.createdAt);
          return date >= start && date <= end;
        })
      );
    }
  }, [selectedDate]);

  useEffect(() => {
    getProdAnalytics({}, []);
    getProjects({});
    getCountries();
  }, []);

  const getProductDuplicatesAnalytics = (productId) => {
    getDuplicatesAnalytics(productId);
    setOpen(!open);
  };

  useEffect(() => {
    const { pageNumber, pageSize } = paginator;
    const paginatedData = paginate(analytics, pageNumber, pageSize);
    setPaginatedData(paginatedData);
  }, [analytics, paginator]);
  const onPageChange = ({ selected }) => {
    setPaginator({ ...paginator, pageNumber: selected + 1 });
  };
  const onClickItem = (item, action) => {
    setCurrentItem(item);
    if (action === "preview") {
      setOpenImgView(true);
      return;
    }
  };
  const handleFilter = (e) => {
    e.preventDefault();
    // setDeviceChecked([...deviceChecked], e.target.value);
    // setCheckedCountries([...checkedCountries], e.target.value);
    // getProdAnalytics(deviceChecked, checkedCountries);
    handleMenuClose();
    setIsFiltering(true);
  };

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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "25px",
            alignItems: "center",
          }}
        >
          {user.user.role !== "Client" && (
            <Grid
              style={{
                display: "flex",
                color: "#303030",
                marginTop: "25px",
                fontSize: "10px",
                gap: "3px",
                alignItems: "center",
                padding: "5px 15px",
                boxShadow: "0px 0px 14px rgba(201, 215, 223, 0.2)",
                borderRadius: "20px ",
              }}
            >
              <ListAltIcon />
              <Box sx={{ minWidth: 80 }}>
                <FormControl fullWidth>
                  <Select
                    style={{ marginLeft: "10px" }}
                    required
                    // onChange={onHandleChange}
                    disableUnderline={true}
                    defaultValue={"Company"}
                  >
                    <MenuItem value="Company">All Companies</MenuItem>
                    {/* {companies.map((company, companyIdx) => (
                      <MenuItem value={company} key={companyIdx}>
                        {company}
                      </MenuItem>
                    ))} */}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
          )}

          <Grid
            style={{
              display: "flex",
              color: "#303030",
              marginTop: "25px",
              fontSize: "10px",
              gap: "3px",
              alignItems: "center",
              padding: "5px 15px",
              boxShadow: "0px 0px 14px rgba(201, 215, 223, 0.2)",
              borderRadius: "20px ",
            }}
          >
            <ListAltIcon />
            <Box sx={{ minWidth: 80 }}>
              <FormControl fullWidth>
                <Select
                  required
                  onChange={(e) => {
                    e.preventDefault();
                    setSelectedProject(e.target.value);
                  }}
                  disableUnderline={true}
                  defaultValue={"projects"}
                >
                  <MenuItem value="projects">All projects</MenuItem>
                  {projecties.map((project, idx) => (
                    <MenuItem value={project} key={idx}>
                      {project}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid
            style={{
              display: "flex",
              color: "#303030",
              marginTop: "25px",
              fontSize: "10px",
              gap: "3px",
              alignItems: "center",
              padding: "5px 15px",
              boxShadow: "0px 0px 14px rgba(201, 215, 223, 0.2)",
              borderRadius: "20px ",
            }}
          >
            <DateRangeIcon />
            <Box sx={{ minWidth: 80 }}>
              <FormControl fullWidth>
                <Select
                  required
                  onChange={(e) => {
                    e.preventDefault();
                    setSelectedDate(e.target.value);
                  }}
                  disableUnderline={true}
                  defaultValue={"alltime"}
                >
                  {dateFilters.map((date, idx) => (
                    <MenuItem value={date.value} key={idx}>
                      {date.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <FormControl
            style={{
              marginTop: "30px",
              alignItems: "center",
              boxShadow: "0px 0px 14px rgba(201, 215, 223, 0.2)",
              borderRadius: "20px ",
            }}
          >
            <IconButton onClick={handleNavMenuOpen}>
              <img src={filterIcon} alt="filter icon" />
            </IconButton>
          </FormControl>
        </div>
      </Grid>
      <Grid>
        <SideBarFilter
          anchorEl={anchorEl}
          isMenuOpen={isMenuOpen}
          handleMenuClose={handleMenuClose}
          handleFilter={handleFilter}
          handleChecked={onHandleChecked}
          handleDeviceChecked={onHandleDeviceChecked}
          data={analytics}
          deviceChecked={deviceChecked}
          deviceFilters={deviceFilters}
          // checkedCountries={checkedCountries}
          defaultChecked={defaultChecked}
          countryByUser={fetchedCountries}
        />
      </Grid>
      <AnalyticsTable
        onClickItem={onClickItem}
        // checkedCountries={checkedCountries}
        deviceChecked={deviceChecked}
        deviceFilters={deviceFilters}
        getProductDuplicatesAnalytics={getProductDuplicatesAnalytics}
        data={myProduct}
        open={open}
        isFiltering={isFiltering}
      />
      <ImagePreview
        open={openImgView}
        setOpen={setOpenImgView}
        productId={currentItem}
      />
    </div>
  );
};
