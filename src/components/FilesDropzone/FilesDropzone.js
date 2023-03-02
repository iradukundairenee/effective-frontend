import React, { useState, useCallback, useEffect } from "react";
import clsx from "clsx";
import uuid from "uuid/v1";
import { useDropzone } from "react-dropzone";
import {
  Button,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Tooltip,
} from "@material-ui/core";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import MoreIcon from "@material-ui/icons/MoreVert";
import bytesToSize from "utils/bytesToSize";
import { useStyles } from "./styles";
import { useSelector } from "react-redux";
import { UPLOADED_FILE_NAME } from "utils/constants";
import { uploadFile } from "redux/actions/file";
import { useTranslation } from "react-i18next";

export const FilesDropzone = ({ currentFile = "" }) => {
  const classes = useStyles();
  const [file, setFile] = useState(null);
  const { t } = useTranslation();
  const { loading, loaded, fileName } = useSelector(
    ({ fileUpload }) => fileUpload
  );
  const handleDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
  }, []);

  const handleRemoveAll = () => {
    setFile(null);
  };
  useEffect(() => {
    if (loaded) {
      localStorage.setItem(UPLOADED_FILE_NAME, fileName);
    }
    // eslint-disable-next-line
  }, [loaded]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: acceptedFiles,
  });
  const handleUploadFile = () => {
    const formData = new FormData();
    const prevFile = currentFile !== "" && !fileName ? currentFile : fileName;
    formData.append("file", file);
    uploadFile(formData, fileType, prevFile);
  };
  return (
    <div className={classes.root}>
      {loading ? (
        <Typography align="center" variant="h3">
          File is uploading, please wait,...
        </Typography>
      ) : (
        <div
          className={clsx({
            [classes.dropZone]: true,
            [classes.dragActive]: isDragActive,
          })}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <img
            alt={t("blog:upload_title")}
            className={classes.image}
            src="/images/undraw_add_file2_gvbb.svg"
          />
          <div>
            <Typography gutterBottom variant="h3">
              {currentFile
                ? t("blog:upload_title_edit")
                : t("blog:upload_title")}
            </Typography>
            <Typography
              className={classes.info}
              color="textSecondary"
              variant="body1"
            >
              {t("blog:upload_sub_title")}
            </Typography>
          </div>
        </div>
      )}
      {file !== null && (
        <>
          <ListItem key={uuid()}>
            <ListItemIcon>
              <FileCopyIcon />
            </ListItemIcon>
            <ListItemText
              primary={file.name}
              primaryTypographyProps={{ variant: "h5" }}
              secondary={bytesToSize(file.size)}
            />
            <Tooltip title="More options">
              <IconButton edge="end">
                <MoreIcon />
              </IconButton>
            </Tooltip>
          </ListItem>
          <div className={classes.actions}>
            <Button onClick={handleRemoveAll} size="small">
              {t("blog:btn_remove_uploaded")}
            </Button>
            <Button
              color="secondary"
              disabled={loading || fileName}
              onClick={handleUploadFile}
              size="small"
              variant="contained"
            >
              {loading
                ? t("blog:btn_loading")
                : fileName
                ? t("blog:btn_uploaded_success")
                : t("blog:btn_upload")}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
