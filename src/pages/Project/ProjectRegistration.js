import React, { useState, useEffect } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { useSelector } from "react-redux";
import {
  Button,
  TextField,
  Grid,
  Typography,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Card,
  CardActions,
} from "@material-ui/core";
import moment from "moment";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { BsArrowLeft, BsChevronDown } from "react-icons/bs";
import { addNewProject, updateProject } from "redux/actions/project";
import { Loading } from "components/loading.component";
import { useStyles } from "styles/formStyles";
import { getUsersList } from "redux/actions/user";
import { EditorState } from "draft-js";
import { stateFromHTML } from "draft-js-import-html";
import { DraftEditor } from "components/DraftEditor";
import { toHtml } from "utils/helper";
import {
  initialState,
  projectStatuses,
  projectTypes,
  projectBudgets,
} from "./projectConstants";
import { notifier } from "utils/notifier";

export const ProjectRegistration = ({ action = "add", currentItem = null }) => {
  const classes = useStyles();
  const [values, setValues] = useState(initialState);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const projectState = useSelector((state) => state);
  const {
    projectAdd: { loading: adding, loaded: added },
    projectEdit: { loading: updating, loaded: updated, message },
    userList: { users },
    login: {
      userInfo: { user },
    },
  } = projectState;
  const history = useHistory();

  useEffect(() => {
    getUsersList("Manager");
  }, []);

  useEffect(() => {
    if (added) {
      window.location.href = `/dashboard/projects/`;
    }
  }, [added]);

  useEffect(() => {
    if (message === "Success") {
      notifier.success("Project updated successfully");
      window.location.href = `/dashboard/projects/${currentItem._id}`;
    }
  }, [message]);

  useEffect(() => {
    if (added || updated) {
      let states = { ...initialState };
      setValues(states);
      setEditorState(EditorState.createEmpty());
    }
  }, [added, updated, user]);
  useEffect(() => {
    if (currentItem && action !== "view") {
      const {
        status,
        name,
        description,
        type,
        nOfItems,
        startDate,
        dueDate,
        budget,
        manager,
      } = currentItem;
      const contentState = stateFromHTML(description);
      setValues({
        name,
        status,
        type,
        nOfItems,
        startDate: moment(startDate).format("YYYY-MM-DD"),
        dueDate: moment(dueDate).format("YYYY-MM-DD"),
        budget,
        managerId: manager,
      });
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, [currentItem, action]);

  useEffect(() => {
    if (currentItem == null && action !== "view") {
      const date = new Date();
      date.setDate(date.getDate() + 1);
      setValues({
        ...values,
        budget: projectBudgets[0],
        type: projectTypes[0].name,
        startDate: moment(date).format("YYYY-MM-DD"),
        dueDate: moment(date).format("YYYY-MM-DD"),
      });
    }
  }, []);

  const onHandleChange = (e) => {
    e.preventDefault();
    const {
      target: { name, value },
    } = e;
    setValues({ ...values, [name]: value });
  };

  const changeStartDate = (value) => {
    setValues({ ...values, startDate: value });
  };

  const changeDueDate = (value) => {
    setValues({ ...values, dueDate: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    values.description = toHtml(editorState);
    if (currentItem && action === "edit") {
      return updateProject(values, currentItem._id);
    }
    addNewProject(values);
  };
  return (
    <Card component="main" className={classes.root}>
      <Grid className={classes.paper}>
        <Link to="/dashboard/projects" className={classes.avatar}>
          <BsArrowLeft />
        </Link>
        <Typography className={classes.title}>
          {currentItem && action === "edit"
            ? `Update "${currentItem?.name?.toUpperCase()}" project`
            : "Add New Project"}
        </Typography>
      </Grid>
      {(adding || updating) && <Loading />}
      <form className={classes.form} onSubmit={submitHandler}>
        <Grid container spacing={2}>
          <Grid item xs={12} className={classes.flex}>
            <Grid className={classes.nameInputContainer}>
              <Typography className={classes.inputTitle}>
                Project Name
              </Typography>
              <TextField
                className={classes.input}
                name="name"
                onChange={onHandleChange}
                value={values.name}
                autoFocus
                fullWidth
                InputProps={{ disableUnderline: true }}
                placeholder="New Summer Project"
                disabled={user.role !== "Client"}
              />
            </Grid>
            <FormControl className={classes.typeInputContainer}>
              <Typography className={classes.inputTitle}>
                Project Type
              </Typography>
              <select
                name="type"
                onChange={onHandleChange}
                style={{
                  padding: "15px 15px",
                  backgroundColor: "#fff",
                  cursor: "pointer",
                }}
                className={classes.input}
              >
                {projectTypes.map((type, typeIdx) => (
                  <option value={type.name} key={typeIdx}>
                    {`${type.name} - ${type.description}`}
                  </option>
                ))}
              </select>
            </FormControl>
          </Grid>
          <Grid item className={classes.dateStatusContainer}>
            <Grid className={classes.dateInputContainer}>
              <Typography className={classes.inputTitle}>Start Date</Typography>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  defaultValue={"2021-01-01"}
                  value={values.startDate}
                  InputAdornmentProps={{ position: "end" }}
                  initialFocusedDate={"2021-01-01"}
                  format="yyyy-MM-dd"
                  views={["year", "month", "date"]}
                  onChange={changeStartDate}
                  disabled={user.role !== "Client"}
                  className={classes.input}
                  InputProps={{ disableUnderline: true }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid className={classes.dateInputContainer}>
              <Typography className={classes.inputTitle}>Due Date</Typography>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  value={values.dueDate}
                  InputAdornmentProps={{ position: "end" }}
                  format="yyyy-MM-dd"
                  views={["year", "month", "date"]}
                  disabled={user.role !== "Client"}
                  onChange={changeDueDate}
                  className={classes.input}
                  InputProps={{ disableUnderline: true }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>
          {user.role === "Admin" && action === "changePm" && (
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="project-manager">Project manager</InputLabel>
                <Select
                  labelId="project-manager"
                  value={values.managerId}
                  name="managerId"
                  onChange={onHandleChange}
                >
                  {users.map(({ _id, fullName }, userIdx) => (
                    <MenuItem value={_id} key={userIdx}>
                      {fullName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}

          <Grid item className={classes.typeInputContainer}>
            <FormControl fullWidth>
              <Typography className={classes.inputTitle}>Budget</Typography>
              <select
                value={values.budget}
                name="budget"
                onChange={onHandleChange}
                style={{
                  padding: "15px 15px",
                  backgroundColor: "#fff",
                  cursor: "pointer",
                }}
                className={classes.input}
              >
                {projectBudgets.map((budget, budgetIdx) => (
                  <option value={budget} key={budgetIdx}>
                    {`${budget}`}
                  </option>
                ))}
              </select>
            </FormControl>
          </Grid>
          {user.role === "Client" && (
            <Grid item xs={12}>
              <Typography className={classes.inputTitle}>
                Description
              </Typography>
              <DraftEditor
                editorState={editorState}
                setEditorState={setEditorState}
              />
            </Grid>
          )}
        </Grid>
        <CardActions>
          {action === "add" ? (
            <Grid container spacing={2} className={classes.actions}>
              <Grid item>
                <Button
                  type="cancel"
                  variant="contained"
                  className={classes.cancel}
                  onClick={() => history.goBack()}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  type="submit"
                  variant="contained"
                  className={classes.submit}
                  disabled={adding}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
              style={{ width: "250px" }}
              disabled={updating}
            >
              Update the project
            </Button>
          )}
        </CardActions>
      </form>
    </Card>
  );
};
