import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getProduct } from "redux/actions/product";
import { DropzoneDialog } from "material-ui-dropzone";
import { Delete as DeleteIcon } from "@material-ui/icons";
import {
  Button,
  Card,
  CardContent,
  Collapse,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Select,
} from "@material-ui/core";
import {
  deleteAttrImg,
  resetUploadAttrImg,
  uploadProductImages,
} from "redux/actions/product";

const imageTypes = [
  { id: "skybox", name: "Skybox & environment" },
  { id: "custom", name: "Custom AR" },
];
export const ManageImages = ({
  attName,
  attributes = {},
  setAttributes,
  productId,
  userId,
}) => {
  const [imgType, setImgType] = useState(imageTypes[0].id);
  const [open, setOpen] = useState(false);

  const {
    attrImg: { loading, loaded, fileName },
    imgAttrDel: { loaded: deleted, deletedFile },
  } = useSelector((state) => state);

  useEffect(() => {
    if (loaded) {
      getProduct(productId);
      setOpen(false);
      resetUploadAttrImg();
    }
    // eslint-disable-next-line
  }, [loaded, fileName]);
  useEffect(() => {
    if (deleted) {
      const newAttribs = { ...attributes };
      const idx = newAttribs.imageFiles?.findIndex(
        (img) => img.imageFileName === deletedFile
      );
      newAttribs.imageFiles?.splice(idx, 1);
      setAttributes(newAttribs);
    }
    // eslint-disable-next-line
  }, [deleted, deletedFile]);
  const onSelectChange = ({ target }) => {
    setImgType(target.value);
  };
  const onUploadImage = (files) => {
    const attrs = { productId, imgType, userId };
    uploadProductImages(files, "attr-image", attrs);
  };

  return (
    <Collapse in={attName === "manage_images"} style={{ "height": "100%", "width": "100%" }}>
      <Card>
        <CardContent>
          <FormControl fullWidth>
            <InputLabel shrink id="select-image-type">
              Image type
            </InputLabel>
            <Select
              labelId="select-image-type"
              name="imageType"
              style={{ color: '#888888', textTransform: 'none', fontFamily: "poppins", fontWeight: 700 }}
              value={imgType}
              onChange={onSelectChange}
            >
              {imageTypes.map((type, typeIdx) => (
                <MenuItem value={type.id} key={typeIdx}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            style={{ color: '#888888', textTransform: 'none', fontFamily: "poppins", fontWeight: 700 }}
            onClick={() => setOpen(true)}
          >{`Upload ${imgType} image`}</Button>
          <DropzoneDialog
            acceptedFiles={["image/*"]}
            cancelButtonText={"cancel"}
            submitButtonText={loading ? "Uploading,..." : "Submit"}
            maxFileSize={5000000}
            clearOnUnmount={loaded}
            open={open}
            onClose={() => setOpen(false)}
            onSave={onUploadImage}
            dialogTitle={`Upload ${imgType.toUpperCase()} image`}
          />

          <List dense>
            {attributes?.imageFiles
              ?.filter((img) => img.imageType === imgType).filter(img => img.canBeDeleted === true)
              .map((img, imgIdx) => (
                <ListItem key={imgIdx}>
                  <ListItemText primary={img.imageFileName} />
                  {img.canBeDeleted && (
                    <ListItemSecondaryAction>
                      <IconButton
                        onClick={() =>
                          deleteAttrImg(productId, img.imageFileName)
                        }
                        edge="end"
                        aria-label="delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  )}
                </ListItem>
              ))}
          </List>
        </CardContent>
      </Card>
    </Collapse>
  );
};
