import React, { useState, useEffect } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { useSelector } from "react-redux";
import { Grid, FormControl, Select, MenuItem, Card } from "@material-ui/core";
import moment from "moment";
import { EditorState } from "draft-js";
import { stateFromHTML } from "draft-js-import-html";
import { addNewProject, updateProject } from "redux/actions/project";
import { useStyles } from "styles/formStyles";
import { getUsersList } from "redux/actions/user";
import { DraftEditor } from "components/DraftEditor";
import { initialState } from "./projectConstants";
import { toHtml } from "utils/helper";

export const ProjectList = ({ item = null }) => {
  const classes = useStyles();
  const [values, setValues] = useState(initialState);
  const [action, setAction] = useState("edit");
  const [managerUpdated, setManagerUpdated] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const projectState = useSelector((state) => state);
  const {
    projectAdd: { loaded: added },
    projectEdit: { loaded: updated },
    userList: { users },
    login: {
      userInfo: { user },
    },
  } = projectState;
  useEffect(() => {
    if (user.role !== "Client") getUsersList("Manager");
  }, [user]);
  useEffect(() => {
    if (added || updated) {
      let states = { ...initialState };
      setValues(states);
      setEditorState(EditorState.createEmpty());
    }
  }, [added, updated, user]);
  useEffect(() => {
    if (item && action !== "view") {
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
      } = item;
      const contentState = stateFromHTML(description);
      setValues({
        name,
        status,
        type,
        nOfItems,
        startDate: moment(startDate).format("DD MMM YYY"),
        dueDate: moment(dueDate).format("DD MMM YYY"),
        budget,
        managerId: manager,
      });
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, [item, action]);

  const onHandleChange = (e) => {
    e.preventDefault();
    const {
      target: { name, value },
    } = e;
    setValues({ ...values, [name]: value });
    setManagerUpdated(true);
  };

  useEffect(() => {
    if (managerUpdated) {
      updateProject(values, item._id);
    }
  }, [item._id, managerUpdated, values]);

  return (
    <Card
      component="main"
      style={{
        border: "none",
        boxShadow: "none",
      }}
    >
      {user.role === "Admin" && (
        <FormControl fullWidth>
          <Select
            labelId="project-manager"
            value={values.managerId}
            name="managerId"
            onChange={onHandleChange}
            disableUnderline
            style={{
              color: "#7D7D7D",
              fontFamily: "Poppins",
              fontWeight: "400",
              fontSize: "16px",
            }}
          >
            <MenuItem value="">---</MenuItem>
            {users.map(({ _id, fullName }, userIdx) => (
              <MenuItem
                value={_id}
                key={userIdx}
                style={{
                  color: "#7D7D7D",
                  fontFamily: "Poppins",
                  fontWeight: "400",
                  fontSize: "16px",
                }}
              >
                {fullName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </Card>
  );
};
