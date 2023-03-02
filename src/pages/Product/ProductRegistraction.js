import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardActions,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { DropzoneDialog } from "material-ui-dropzone";
import NumberFormat from "react-number-format";
import { EditorState } from "draft-js";
import { DraftEditor } from "components/DraftEditor";
import { useStyles } from "styles/formStyles";
import { initialState, productStatuses } from "./productConstants";
import { notifier } from "utils/notifier";
import {
  addNewProduct,
  editProduct,
  getProducts,
  uploadProductImages,
} from "redux/actions/product";
import { useSelector } from "react-redux";
import { getUsersList } from "redux/actions/user";
import { getProjects } from "redux/actions/project";
import { useHistory } from "react-router-dom";
import { toHtml } from "utils/helper";
import ProductTabs from "./ProductTabs";

export const ProductRegistration = ({
  action = "add",
  currentItem = null,
  setAction,
}) => {
  const classes = useStyles();
  // const [action, setAction] = useState("add")
  const [values, setValues] = useState(initialState);
  const [openDz, setOpenDz] = useState(false);
  const appState = useSelector((state) => state);
  const history = useHistory();
  const [editorState, setDescriptionState] = useState(
    EditorState.createEmpty()
  );
  const {
    fileUpload: { loaded: uploaded, loading: uploading, filePath },
    productAdd: { loading: adding, loaded: added },
    productEdit: { loading: editing, loaded: edited },
    userList: { users },
    projectsGet: { projects },
    login: {
      userInfo: { user },
    },
  } = appState;
  useEffect(() => {
    getUsersList("Client");
  }, []);
  useEffect(() => {
    if (values.customer) {
      getProjects({ clientId: values.customer });
    }
  }, [values.customer]);
  const onHandleChange = (e) => {
    e.preventDefault();
    const {
      target: { name, value },
    } = e;
    setValues((prev) => {
      const newValues = { ...prev, [name]: value };
      if (name === "customer") {
        newValues.project = "";
      }
      return newValues;
    });
  };
  useEffect(() => {
    if (uploaded && filePath) {
      setValues({ ...values, image: { imageUrls: filePath.imageUrls } });
      setOpenDz(false);
      notifier.success("Images uploaded");
    }
    // eslint-disable-next-line
  }, [uploaded, filePath]);
  useEffect(() => {
    if (added || edited) {
      setValues(initialState);
      getProducts({});
    }
    if (added || edited) {
      let states = { ...initialState };
      setValues(states);
      setDescriptionState(EditorState.createEmpty());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [added, edited]);

  useEffect(() => {
    if (currentItem && action === "edit") {
      const { createdAt, updatedAt, image, project, customer, ...rest } =
        currentItem;
      setValues({ ...rest, project: project?._id, customer: customer?._id });
    }
  }, [action, currentItem]);
  const submitHandler = (e) => {
    e.preventDefault();
    values.description = toHtml(editorState);
    const user = users.find((u) => u._id === values.customer);
    values.website = user?.companyUrl;
    if (action === "add") {
      addNewProduct(values);
      history.push("/dashboard/products");
      window.location.reload();
    }
    if (action === "edit") {
      delete values.itemNumber;
      delete values.imagesSrc;
      editProduct(values);
      history.push("/dashboard/products");
      window.location.reload();
    }
  };
  const onUploadImages = (files) => {
    if (files.length !== 2) {
      notifier.error("Sorry only two files are needed");
      return;
    }
    uploadProductImages(files);
  };

  return (
    <Card component="main" className={classes.root}>
      <Grid className={classes.paper}>
        <Link to="/dashboard/products" className={classes.avatar}>
          <BsArrowLeft />
        </Link>
        <Typography className={classes.title}>
          {action === "add" && user.role === "Client"
            ? "3D Assets"
            : action === "edit"
            ? `Update ${currentItem?.name.toUpperCase()}`
            : "Add a new 3D asset"}
        </Typography>
      </Grid>
      {((action === "add" && user.role !== "Client") || action === "edit") && (
        <form className={classes.form} onSubmit={submitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12} className={classes.nameInputContainer}>
              <Typography className={classes.inputTitle}>
                3D Asset name
              </Typography>
              <TextField
                className={classes.input}
                name="name"
                autoFocus
                fullWidth
                InputProps={{ disableUnderline: true }}
                onChange={onHandleChange}
                value={values.name}
              />
            </Grid>
            {user.role !== "Client" && (
              <>
                <Grid item xs={12} className={classes.nameInputContainer}>
                  <FormControl fullWidth>
                    <Typography className={classes.inputTitle}>
                      Customer or company
                    </Typography>
                    <Select
                      className={classes.input}
                      style={{ width: "102%" }}
                      disableUnderline={true}
                      value={values.customer}
                      name="customer"
                      onChange={onHandleChange}
                      disabled={user.role === "Client"}
                    >
                      <MenuItem value="">---</MenuItem>
                      {users.map((user, userIdx) => (
                        <MenuItem value={user._id} key={userIdx}>
                          {user.fullName}, {user.companyName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <Typography className={classes.inputTitle}>
                      Select project
                    </Typography>
                    <Select
                      className={classes.input}
                      style={{ width: "102%" }}
                      disableUnderline={true}
                      value={values.project}
                      name="project"
                      onChange={onHandleChange}
                      disabled={
                        !Boolean(values.customer) || user.role === "Client"
                      }
                    >
                      <MenuItem value="">---</MenuItem>
                      {projects.map((project, projectIdx) => (
                        <MenuItem value={project._id} key={projectIdx}>
                          {project.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </>
            )}
            <Grid item xs={12} className={classes.flex}>
              <Grid className={classes.nameInputContainer} item>
                <Typography className={classes.inputTitle}>SKU</Typography>
                <TextField
                  InputProps={{ disableUnderline: true }}
                  className={classes.input}
                  name="sku"
                  disableUnderline={true}
                  fullWidth
                  onChange={onHandleChange}
                  value={values.sku}
                />
              </Grid>
              <Grid
                className={classes.nameInputContainer}
                item
                disableUnderline={true}
              >
                <Typography className={classes.inputTitle}>
                  Price(in USD)
                </Typography>
                <NumberFormat
                  InputProps={{ disableUnderline: true }}
                  className={classes.input}
                  value={values.price}
                  onValueChange={({ floatValue }) =>
                    setValues({ ...values, price: floatValue })
                  }
                  prefix="$"
                  thousandSeparator
                  customInput={TextField}
                  fullWidth
                />
              </Grid>
            </Grid>

            <input type="hidden" name="status" value={values.status} />

            {action === "edit" ? (
              <ProductTabs
                product={values}
                onSave={onUploadImages}
                uploaded={uploaded}
                uploading={uploading}
              />
            ) : (
              <Grid item md={12} xs={12}>
                <Typography className={classes.inputTitle}>
                  Description
                </Typography>
                <DraftEditor
                  editorState={editorState}
                  setEditorState={setDescriptionState}
                />
              </Grid>
            )}
            {action === "add" && user.role !== "Client" && (
              <Grid item xs={12}>
                <Button
                  style={{ marginTop: "3%", border: "1px solid hsl(231, 8%, 85%)" }}
                  onClick={() => setOpenDz(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z" />
                  </svg>
                  Add the 3D asset files
                </Button>
                <DropzoneDialog
                  open={openDz}
                  onSave={onUploadImages}
                  acceptedFiles={[".gltf", ".glb", ".usdz"]}
                  showPreviews={true}
                  maxFileSize={50000000}
                  filesLimit={2}
                  onClose={() => {
                    if (uploading) return notifier.error('Uploading files, please wait,...')
                    return setOpenDz(false)
                  }}
                  clearOnUnmount={uploaded}
                  submitButtonText={
                    uploading
                      ? "Uploading files, please wait,..."
                      : "Save files"
                  }
                />
              </Grid>
            )}
          </Grid>
          <CardActions style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.cancel}
              onClick={() => history.push("/dashboard/products")}
            >
              Cancel
            </Button>
            {action === "add" && user.role !== "Client" && (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
                disabled={adding}
              >
                Save
              </Button>
            )}
            {action === "edit" && (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
                disabled={editing}
              >
                Update Asset
              </Button>
            )}
          </CardActions>
        </form>
      )}
    </Card>
  );
};
