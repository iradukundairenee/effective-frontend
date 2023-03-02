import React, { useState, useEffect } from "react";
import moment from "moment";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import { BsArrowLeft, BsChevronDown } from "react-icons/bs";
import NumberFormat from "react-number-format";
import { DraftEditor } from "components/DraftEditor";
import { EditorState } from "draft-js";
import { stateFromHTML } from "draft-js-import-html";
import {
  Avatar,
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
  FormControlLabel,
  Switch,
  IconButton,
} from "@material-ui/core";
import {
  ComputerOutlined,
  Cancel as CancelIcon,
  Edit as EditIcon,
} from "@material-ui/icons";
import {
  addNewQuote,
  updateQuote,
  getLicenseAgreement,
} from "redux/actions/quote";
import { Loading } from "components/loading.component";
import { useStyles } from "styles/formStyles";
import { getProjects } from "redux/actions/project";
import { getUsersList } from "redux/actions/user";
import { toHtml } from "utils/helper";
import "../../styles/Style.css";
import { license } from "utils/licenseAgreement";

const initialState = {
  projectId: "",
  billingCycle: "Monthly",
  taxes: [],
  discount: "0",
  isFixed: false,
  expiryDate: moment().format("YYYY-MM-DD"),
  propasalText: "",
  customer: "",
};
const taxInitials = { title: "", amount: "" };
const quoteCycles = ["Monthly", "Yearly"];
const qStatuses = ["Accepted", "Declined", "Draft", "Expired", "Delivered"];
export const QuoteRegistration = ({ action = "add", currentItem = null }) => {
  const classes = useStyles();
  const [values, setValues] = useState(initialState);
  const [tax, setTax] = useState(taxInitials);
  const [propTextState, setPropTextState] = useState(EditorState.createEmpty());
  const [noteState, setNoteState] = useState(EditorState.createEmpty());
  const quoteState = useSelector((state) => state);

  const {
    quoteAdd: { loading: adding, loaded: added },
    quoteEdit: { loading: updating, loaded: updated },
    projectsGet: { projects },
    userList: { users },
    login: {
      userInfo: { user },
    },
    getLicenseAgreement: { license: licenseAgreement, loaded: gotLicense },
  } = quoteState;

  useEffect(() => {
    getUsersList("Client");
  }, []);

  useEffect(() => {
    getLicenseAgreement();
  }, []);

  useEffect(() => {
    if (values.customer) {
      getProjects({ clientId: values.customer });
    }
  }, [values.customer]);
  useEffect(() => {
    if (added || updated) {
      setValues(initialState);
      setPropTextState(EditorState.createEmpty());
      setNoteState(EditorState.createEmpty());
    }
  }, [added, updated]);
  useEffect(() => {
    if (currentItem) {
      const { project, user, updatedAt, createdAt, _id, __v, ...rest } =
        currentItem;
      const projectId = project._id;
      const customer = user._id;
      const expiryDate = moment(currentItem.expiryDate).format("YYYY-MM-DD");
      setValues({ ...rest, projectId, expiryDate, customer });
      const propasalText = stateFromHTML(rest.propasalText);
      const customerNote = stateFromHTML(rest.customerNote);
      setPropTextState(EditorState.createWithContent(propasalText));
      setNoteState(EditorState.createWithContent(customerNote));
    }
  }, [currentItem]);
  const onHandleChange = (e) => {
    e.preventDefault();
    const {
      target: { name, value },
    } = e;
    setValues((prev) => {
      const newValues = { ...prev, [name]: value };
      if (name === "customer") {
        newValues.projectId = "";
      }
      return newValues;
    });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    values.propasalText = toHtml(propTextState);
    // values.licenseText = toHtml(noteState);
    const { amount, customer, ...quoteValues } = values;
    if (action !== "add" && currentItem) {
      updateQuote(quoteValues, currentItem._id);
    } else {
      addNewQuote(quoteValues);
    }
  };
  const onSetSeen = (e) => {
    const {
      target: { checked },
    } = e;
    setValues({ ...values, status: checked ? "Pending" : "Draft" });
  };
  const onAddTax = () => {
    const taxes = [...values.taxes];
    const index = taxes.findIndex((i) => i.title === tax.title);
    if (index < 0) {
      taxes.push(tax);
    } else {
      taxes[index].title = tax.title;
      taxes[index].amount = tax.amount;
    }
    setValues((prev) => ({ ...prev, taxes }));
    setTax(taxInitials);
  };
  const onDeleteTax = (taxTitle) => {
    const newTaxes = values.taxes.filter((t) => t.title !== taxTitle);
    setValues((prev) => ({ ...prev, taxes: newTaxes }));
  };
  const onChangeTax = ({ target: { name, value } }) => {
    setTax((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <Card component="main" className={classes.root}>
      <Grid className={classes.paper}>
        <Link to="/dashboard/quotes" className={classes.avatar}>
          <BsArrowLeft />
        </Link>
        <Typography className={classes.title}>
          {currentItem
            ? `Update "${currentItem.project.name.toUpperCase()}" proposal`
            : "Add a new proposal"}
        </Typography>
      </Grid>
      <div className={classes.paper}>
        {(adding || updating) && <Loading />}
        {((currentItem && action !== "items") ||
          (action === "add" && user.role !== "Client")) && (
          <form className={classes.form} onSubmit={submitHandler}>
            {(action === "add" || action === "edit") && (
              <>
                <Grid container spacing={2}>
                  <Grid item md={6} xs={12}>
                    <div className="custom-select-field">
                      <Typography className={classes.inputTitle}>
                        Customer or company
                      </Typography>
                      <select
                        required
                        labelId="customer-or-comp"
                        value={values.customer}
                        name="customer"
                        onChange={onHandleChange}
                        disabled={user.role === "Client"}
                      >
                        <option value="">---</option>
                        {users.map((user, userIdx) => (
                          <option value={user._id} key={userIdx}>
                            {user.fullName}, {user.companyName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <div className="custom-select-field">
                      <Typography className={classes.inputTitle}>
                        Select project
                      </Typography>
                      <select
                        labelId="select-project"
                        value={values.projectId}
                        name="projectId"
                        onChange={onHandleChange}
                        disabled={!Boolean(values.customer)}
                      >
                        <option value="">---</option>
                        {projects
                          .filter((item) => item.status === "pending")
                          .map(({ _id, name, user }, choiceIdx) => (
                            <option value={_id} key={choiceIdx}>
                              {`${name} ---> ${user?.fullName}`}
                            </option>
                          ))}
                      </select>
                    </div>
                  </Grid>
                </Grid>
              </>
            )}
            <Grid container spacing={2}>
              {(action === "add" || action === "edit") && (
                <Grid item md={6} xs={12}>
                  <div className="custom-select-field">
                    <Typography className={classes.inputTitle}>
                      Billing cycle
                    </Typography>
                    <select
                      labelId="billing-cycle"
                      value={values.billingCycle}
                      name="billingCycle"
                      onChange={onHandleChange}
                      disabled={action === "change"}
                    >
                      <option value="">---</option>
                      {quoteCycles.map((cyle, choiceIdx) => (
                        <option value={cyle} key={choiceIdx}>
                          {cyle.toUpperCase()}
                        </option>
                      ))}
                    </select>
                  </div>
                </Grid>
              )}
              <Grid item md={6} xs={12}>
                <div className="text-field">
                  <Typography className={classes.inputTitle}>
                    Expiry Date
                  </Typography>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      style={{ width: "95%" }}
                      className={classes.input}
                      value={values.expiryDate}
                      InputAdornmentProps={{ position: "start" }}
                      format="yyyy-MM-dd"
                      views={["year", "month", "date"]}
                      InputProps={{ disableUnderline: true }}
                      onChange={(dateValue) =>
                        setValues((prev) => ({
                          ...prev,
                          expiryDate: dateValue,
                        }))
                      }
                      minDate={new Date()}
                    />
                  </MuiPickersUtilsProvider>
                </div>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              {(action === "add" || action === "edit") && (
                <>
                  <Grid
                    style={{
                      marginBottom: "3rem",
                    }}
                    item
                    md={12}
                    xs={12}
                  >
                    <Typography className={classes.inputTitle}>
                      Proposal text
                    </Typography>
                    <DraftEditor
                      editorState={propTextState}
                      setEditorState={setPropTextState}
                    />
                  </Grid>
                  <Card className={classes.card}>
                    <Typography className={classes.cardTitle}>
                      License Agreement
                    </Typography>
                    <Typography className={classes.cardContent}>
                      {gotLicense ? (
                        licenseAgreement ? (
                          parse(licenseAgreement.agreement)
                        ) : (
                          parse(license)
                        )
                      ) : (
                        <Loading />
                      )}
                    </Typography>
                  </Card>
                </>
              )}
            </Grid>

            {values.status && action === "change" && (
              <TextField
                className={classes.input}
                variant="outlined"
                fullWidth
                name="comment"
                label="Add comment"
                value={values.comment}
                onChange={onHandleChange}
              />
            )}
            {action === "edit" && currentItem.items?.length > 0 && (
              <FormControlLabel
                control={
                  <Switch
                    checked={values.status !== "Draft"}
                    onChange={onSetSeen}
                  />
                }
                disabled={
                  values.status !== "Draft" && values.status !== "Pending"
                }
                label="Send proposal"
              />
            )}
            <Grid container spacing={2} className={classes.actions}>
              <CardActions>
                {action === "add" ? (
                  <Grid item>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      className={classes.submit}
                      disabled={adding}
                    >
                      Save
                    </Button>
                  </Grid>
                ) : (
                  <Grid item>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      className={classes.submit}
                      disabled={updating}
                    >
                      Update
                    </Button>
                  </Grid>
                )}
              </CardActions>
            </Grid>
          </form>
        )}
      </div>
    </Card>
  );
};
