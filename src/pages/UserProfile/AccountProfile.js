import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { removeProfilePic } from "redux/actions/user";
import { DropzoneDialog } from "material-ui-dropzone";
import { uploadProductImages } from "redux/actions/product";

const useStyles = makeStyles((theme) => ({
  root: {},
  details: {
    display: "flex",
  },
  avatar: {
    height: "100%",
    width: "100%",
    flexShrink: 0,
    flexGrow: 0,
  },
  progress: {
    marginTop: theme.spacing(2),
  },
  uploadButton: {
    marginRight: theme.spacing(2),
  },
}));

export const AccountProfile = ({ user }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const {
    profileImgAdd: { loading, loaded },
    profileImgRm: { loading: rmLoading },
  } = useSelector((state) => state);

  useEffect(() => {
    if (loaded) {
      setOpen(false);
    }
  }, [loaded]);

  return (
    <div >
      <div className="user-avatar">
        <i className="fa fa-trash remove-profile" onClick={() => removeProfilePic()}></i>
        <Avatar className={classes.avatar} src={user.profileImage} />
      </div>

      <DropzoneDialog
        acceptedFiles={["image/*"]}
        cancelButtonText={"cancel"}
        submitButtonText={loading ? "Uploading,..." : "Submit"}
        maxFileSize={5000000}
        clearOnUnmount={loaded}
        open={open}
        onClose={() => setOpen(false)}
        onSave={(files) =>
          uploadProductImages(files, "profile-img", { userId: user._id })
        }
        dialogTitle={`Upload profile image`}
      />

      <p className="update-profile-text" onClick={() => setOpen(true)}>Update Photo</p>
    </div>
  );
};
