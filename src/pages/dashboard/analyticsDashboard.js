import {
  Box,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import { Chart } from "components/dashboard/chart";
import { Overview } from "components/dashboard/overview";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAssets } from "redux/actions/dashboard";
import { getUsersList } from "redux/actions/user";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { styles } from "./styles";

const dateFilters = [
  { id: 1, name: "All time", value: "allTime" },
  { id: 2, name: "Today", value: "today" },
  { id: 3, name: "Last 7 days", value: "week" },
  { id: 4, name: "Last 30 days", value: "month" },
];

const initialFilters = {
  company: "",
  project: "",
  time: "",
};

export const AnalyticsDashboard = () => {
  const assetsState = useSelector((state) => state);
  const classes = styles();
  const [filters, setFilters] = useState(initialFilters);

  const {
    login: {
      userInfo: { user },
    },
    getAssets: {
      assets: { counts, views, projects },
    },
    userList: { users },
  } = assetsState;
  const companies = Array.from(
    new Set(users && users.map((user) => user.companyName))
  );

  useEffect(() => {
    getUsersList();
  }, []);
  useEffect(() => {
    if (filters) getAssets(filters);
  }, [filters]);
  return (
    <Grid>
      <Overview user={user} counts={counts} />
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
        <div className={classes.filters}>
          {user && user.role !== "Client" && (
            <Grid className={classes.filter}>
              <ListAltIcon />
              <Box sx={{ minWidth: 80 }}>
                <FormControl fullWidth>
                  <Select
                    required
                    onChange={(e) => {
                      e.preventDefault();
                      setFilters({ ...filters, company: e.target.value });
                    }}
                    disableUnderline={true}
                    defaultValue={"allCompanies"}
                  >
                    <MenuItem value="allCompanies">All companies</MenuItem>
                    {companies.map((company, companyIdx) => (
                      <MenuItem value={company} key={companyIdx}>
                        {company}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
          )}
          <Grid className={classes.filter}>
            <ListAltIcon />
            <Box sx={{ minWidth: 80 }}>
              <FormControl fullWidth>
                <Select
                  required
                  onChange={(e) => {
                    e.preventDefault();
                    setFilters({ ...filters, project: e.target.value });
                  }}
                  disableUnderline={true}
                  defaultValue={"allProjects"}
                >
                  <MenuItem value="allProjects">All projects</MenuItem>
                  {projects &&
                    projects.map((project, idx) => (
                      <MenuItem value={project} key={idx}>
                        {project}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid className={classes.filter}>
            <DateRangeIcon />
            <Box sx={{ minWidth: 80 }}>
              <FormControl fullWidth>
                <Select
                  required
                  onChange={(e) => {
                    e.preventDefault();
                    setFilters({ ...filters, time: e.target.value });
                  }}
                  disableUnderline={true}
                  defaultValue={"allTime"}
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
        </div>
      </Grid>
      <Chart user={user} views={views} />
    </Grid>
  );
};
