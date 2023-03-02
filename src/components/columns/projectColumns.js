import React, { useState, useEffect } from "react";
import {
  ButtonGroup,
  IconButton,
  Tooltip,
  Typography,
  Grid,
  Avatar,
} from "@material-ui/core";
import moment from "moment";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { FiEye, FiXSquare } from "react-icons/fi";
import { BiPencil } from "react-icons/bi";
import { ProjectList } from "pages/Project/ProjectList";
import { initialState } from "pages/Project/projectConstants";
import {
  getProjectDetails,
  getProjects,
  archiveProject,
} from "redux/actions/project";
import { notifier } from "utils/notifier";

export const projectOwnerCol = (user = {}) => {
  return user.role !== "Client"
    ? [
        {
          content: (item) => (
            <Typography
              style={{
                color: "#7D7D7D",
                fontFamily: "Poppins",
                fontWeight: "400",
                fontSize: "15px",
              }}
            >
              {item?.user?.fullName}
            </Typography>
          ),
          label: "Project Owner",
        },
      ]
    : [];
};

const projectAssignCol = (user = {}) => {
  if (user.role === "Admin") {
    return {
      label: "Assign To",
    };
  }
};

export const ProjectColumns = () => {
  const history = useHistory();
  const projectState = useSelector((state) => state);
  const [currentItem, setCurrentItem] = useState(initialState);
  const [action, setAction] = useState("add");
  const {
    projectsGet: { projects },
    projectAdd: { loaded: added },
    projectEdit: { loaded: updated },
    archiveProject: { loaded: archived, message },
    login: {
      userInfo: { user },
    },
  } = projectState;

  useEffect(() => {
    if (added || updated) {
      setAction("add");
    }
    getProjects({});
  }, [added, updated]);

  useEffect(() => {
    projects.forEach((project, index) => (project.serial = index + 1));
  }, [projects]);

  const onEditClick = (project) => {
    history.push(`/dashboard/editproject/${project._id}`);
    getProjectDetails(project._id);
  };

  const onProjectClick = (project) => {
    archiveProject(project?._id);
  };

  useEffect(() => {
    if (archived) {
      notifier.success("Project deleted successfully");
      getProjects({});
    }
  }, [archived]);

  return [
    {
      content: (item) => (
        <Typography
          style={{
            color: "#7D7D7D",
            fontFamily: "Poppins",
            fontWeight: "400",
            fontSize: "15px",
          }}
        >
          0{item.serial}
        </Typography>
      ),
      label: "S.No",
    },
    {
      content: (item) => (
        <Typography
          style={{
            color: "#7D7D7D",
            fontFamily: "Poppins",
            fontWeight: "400",
            fontSize: "15px",
          }}
        >
          {item.name}
        </Typography>
      ),
      label: "Project",
    },
    user.role !== "Client"
      ? {
          content: (item) => (
            <Grid
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 0px",
              }}
            >
              <Avatar
                style={{
                  width: "30px",
                  height: "30px",
                }}
                src={item?.user?.profileImage ? item?.user?.profileImage : ""}
                alt="profile"
              />
              <Typography
                style={{
                  color: "#7D7D7D",
                  fontFamily: "Poppins",
                  fontWeight: "400",
                  fontSize: "15px",
                  paddingLeft: "10px",
                }}
              >
                {item.user?.fullName}
              </Typography>
            </Grid>
          ),
          label: "Name",
        }
      : { nullable: true },
    user.role !== "Client"
      ? {
          content: (item) => (
            <Typography
              style={{
                color: "#7D7D7D",
                fontFamily: "Poppins",
                fontWeight: "400",
                fontSize: "15px",
              }}
            >
              {item.user?.companyName}
            </Typography>
          ),
          label: "Company Name",
        }
      : { nullable: true },
    {
      content: (item) => (
        <Typography
          style={{
            color: "#7D7D7D",
            fontFamily: "Poppins",
            fontWeight: "400",
            fontSize: "15px",
          }}
        >
          {item.type}
        </Typography>
      ),
      label: "Type",
    },
    {
      content: (item) => (
        <Typography
          style={{
            color: "#7D7D7D",
            fontFamily: "Poppins",
            fontWeight: "400",
            fontSize: "15px",
          }}
        >
          {moment(item.startDate).format("DD MMM YYYY")}
        </Typography>
      ),
      label: "Start Date",
    },
    {
      content: (item) => (
        <Typography
          style={{
            color: "#7D7D7D",
            fontFamily: "Poppins",
            fontWeight: "400",
            fontSize: "15px",
          }}
        >
          {moment(item.dueDate).format("DD MMM YYYY")}
        </Typography>
      ),
      label: "Due Date",
    },
    {
      content: (item) => (
        <Typography
          style={{
            color: "#7D7D7D",
            fontFamily: "Poppins",
            fontWeight: "400",
            fontSize: "15px",
          }}
        >
          {item.budget?.toLocaleString("en-GB")}
        </Typography>
      ),
      label: "Budget",
    },
    {
      content: (item) => <ProjectList item={item} />,
      ...projectAssignCol(user),
    },
    {
      content: (item) => (
        <Typography
          style={
            item.status === "approved"
              ? {
                  background: "rgba(47, 186, 86, 0.2)",
                  color: "#2FBA56",
                  padding: "1px 10px",
                  borderRadius: "15px",
                  textAlign: "center",
                }
              : item.status === "completed"
              ? {
                  background: "rgba(47, 186, 86, 0.2)",
                  color: "#2FBA56",
                  padding: "1px 10px",
                  borderRadius: "15px",
                  textAlign: "center",
                }
              : {
                  background: "rgba(254, 183, 0, 0.2)",
                  borderRadius: "15px",
                  padding: "1px 10px",
                  textAlign: "center",
                  color: "#FEB700",
                }
          }
        >
          {item.status}
        </Typography>
      ),
      label: "Status",
    },
    {
      content: (item) => (
        <ButtonGroup variant="outlined" size="small">
          {user.role !== "Manager" && (
            <>
              <Tooltip title="Edit">
                <IconButton
                  aria-label="Edit"
                  onClick={() => onEditClick(item, "edit")}
                  disabled={item.status === "approved"}
                  style={{
                    color: "#7D7D7D",
                    fontFamily: "Poppins",
                    fontWeight: "400",
                    fontSize: "15px",
                  }}
                >
                  <BiPencil />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton
                  aria-label="Delete"
                  onClick={() => onProjectClick(item)}
                  style={{
                    color: "#7D7D7D",
                    fontFamily: "Poppins",
                    fontWeight: "400",
                    fontSize: "15px",
                  }}
                >
                  <FiXSquare />
                </IconButton>
              </Tooltip>
            </>
          )}
          <Tooltip title="View">
            <IconButton
              aria-label="View"
              component={Link}
              to={`/dashboard/projects/${item._id}`}
              style={{
                color: "#7D7D7D",
                fontFamily: "Poppins",
                fontWeight: "400",
                fontSize: "15px",
              }}
            >
              <FiEye />
            </IconButton>
          </Tooltip>
        </ButtonGroup>
      ),
      label: "Actions",
    },
  ];
};
