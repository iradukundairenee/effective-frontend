import React, { useState, useEffect } from "react";
import moment from "moment";
import { EditorState } from "draft-js";
import { Card, Grid, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  completeProject,
  getProjectDetails,
  getProjectHistories,
  getProjectProds,
} from "redux/actions/project";
import { useSelector } from "react-redux";
import { projectTypes } from "pages/Project/projectConstants";
import { useStyles } from "./styles";
import { BsArrowLeft } from "react-icons/bs";
import cubeImage from "../../assets/cube.svg";
import { ProjectTabs } from "./ViewProjectTabs";
import { notifier } from "utils/notifier";

const logInitialState = { title: "", description: "" };
export const ProjectDetailPage = ({ match }) => {
  const classes = useStyles();

  const [projectType, setProjectType] = useState({});
  const [newLog, setNewLog] = useState(logInitialState);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const { projectId } = match.params;

  const appState = useSelector((state) => state);
  const {
    projectGet: { loaded, project },
    logAdd: { loading: adding, loaded: done },
    commpleteProject: { loading: completingProject, loaded: completed },
    login: {
      userInfo: { user },
    },
  } = appState;
  useEffect(() => {
    if (projectId) {
      // Fetch the project
      getProjectDetails(projectId);
      getProjectProds(projectId);
    }
  }, [projectId]);
  useEffect(() => {
    if (projectId && loaded) {
      getProjectHistories(projectId);
      const currentPType = projectTypes.find((e) => e.name === project.type);
      setProjectType(currentPType);
    }
  }, [projectId, loaded, project.type]);
  useEffect(() => {
    if (done) {
      getProjectHistories(projectId);
      setNewLog(logInitialState);
      setEditorState(EditorState.createEmpty());
    }
  }, [done, projectId]);

  if (completed) {
    notifier.success("Project Completed successfully");
  }

  return (
    <Grid
      container
      spacing={2}
      sx={{
        py: 3,
      }}
      item
    >
      <Grid className={classes.paper}>
        <Link to="/dashboard/projects" className={classes.avatar}>
          <BsArrowLeft />
        </Link>
        <Typography className={classes.title}>
          View {project.name?.toUpperCase()} Project
        </Typography>
      </Grid>
      <Card
        aria-labelledby="project-name"
        aria-describedby="project-description"
        className={classes.projectHeader}
      >
        <Grid className={classes.projectHeaderContent}>
          <Grid className={classes.imageContainer}>
            <img src={cubeImage} width="100" alt="cube" />
          </Grid>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid item xs={2} sm={4} md={3}>
              <Typography className={classes.cardTitle}>
                Project Name
              </Typography>
              <Typography className={classes.cardSubTitle}>
                {project.name?.toUpperCase()}
              </Typography>
            </Grid>
            <Grid item xs={2} sm={4} md={3}>
              <Typography className={classes.cardTitle}>Created By</Typography>
              <Typography className={classes.cardSubTitle}>
                {project.user?.fullName}
              </Typography>
            </Grid>
            <Grid item xs={2} sm={4} md={3}>
              <Typography className={classes.cardTitle}>Start Date</Typography>
              <Typography className={classes.cardSubTitle}>
                {moment(project.startDate).format("YYYY-MM-DD")}
              </Typography>
            </Grid>
            <Grid item xs={2} sm={4} md={3}>
              <Typography className={classes.cardTitle}>Due Date</Typography>
              <Typography className={classes.cardSubTitle}>
                {moment(project.dueDate).format("YYYY-MM-DD")}
              </Typography>
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <Typography className={classes.cardTitle}>
                Project Type
              </Typography>
              <Typography className={classes.cardSubTitle}>
                {projectType.name}
              </Typography>
              <Typography className={classes.cardSubTitle}>
                {projectType.description}
              </Typography>
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <Typography className={classes.cardTitle}>
                Number of Items
              </Typography>
              <Typography className={classes.cardSubTitle}>
                {project.nOfItems} Items
              </Typography>
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <Typography className={classes.cardTitle}>Budget</Typography>
              <Typography className={classes.cardSubTitle}>
                {project.budget?.toLocaleString("en-US") || 0}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {project.status !== "pending" && user.role === "Admin" && (
          <Button
            className={classes.submit}
            variant="contained"
            disabled={completingProject}
            onClick={() => {
              if (project.status !== "completed") completeProject(projectId);
              // return createLogs();
            }}
          >
            {project.status === "completed"
              ? "Project Completed"
              : "Complete Project"}
          </Button>
        )}
      </Card>
      <ProjectTabs project={project} />
    </Grid>
  );
};
