import React from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  TextField,
} from "@material-ui/core";
import ColorPicker from "material-ui-color-picker";
import { useStyles } from "../productStyles";
import Typography from '@material-ui/core/Typography';
import { handleLogs } from "utils/handleLogs";

export const Annotation = ({
  attName,
  attributes = {},
  setAttributes,
  onInputChange,
  modelViewRef = {},
  currentHotspot,
  setCurrentHotspot,
  onClickSwitchAutoRotateOff,
  attributesLogs,
  setAttributesLogs,
}) => {
  const classes = useStyles();
  const imageViewer = modelViewRef.current;

  const onAddHotspot = () => imageViewer.addEventListener("click", onClickHotspot);

  const onRemoveHotspot = () => {
    if (currentHotspot) {
      const currentAttributes = { ...attributes };
      const theHotspots = currentAttributes.hotspots.filter(
        (hs) => hs.hotspotNum !== currentHotspot.hotspotNum
      );
      setAttributes((prev) => ({ ...prev, hotspots: theHotspots }));

      setCurrentHotspot(null);
      setAttributesLogs({
        ...attributesLogs,
        [`removeHotSpot${currentHotspot.hotspotNum}`]: `Removed annotation "${currentHotspot.dataText}"`
      })
    }
  };
  const nextNumber = () => {
    const hotspots = [...attributes.hotspots];
    let theNum = 1;
    if (hotspots.length > 0) {
      const lastHotspot = hotspots.pop();
      theNum = lastHotspot.hotspotNum + 1;
    }
    return theNum;
  };
  const onClickHotspot = (event) => {
    const x = event.layerX;
    const y = event.layerY;
    const positionAndNormal = imageViewer.positionAndNormalFromPoint(x, y);

    if (!positionAndNormal) {
      return;
    }

    const { position, normal } = positionAndNormal;
    const currentAttributes = { ...attributes };
    const newHotspot = {
      dataPosition: position.toString(),
      dataNormal: normal.toString(),
      dataText: "",
      bgColor: "black",
      hotspotNum: nextNumber(),
      selected: "selected",
    };
    const theHotspots = currentAttributes.hotspots.map((hs) => ({
      ...hs,
      selected: "",
    }));
    theHotspots.push(newHotspot);
    setAttributes({ ...attributes, hotspots: theHotspots });
    setCurrentHotspot(newHotspot);
    imageViewer.removeEventListener("click", onClickHotspot);
  };

  const onChangeAnnotationText = ({ target }) => {
    if (currentHotspot) {
      const currentAttributes = { ...attributes };
      const idx = currentAttributes.hotspots.findIndex(
        (hs) => hs.dataNormal === currentHotspot.dataNormal
      );
      const theCurrentHotspot = { ...currentHotspot, dataText: target.value };
      setCurrentHotspot(theCurrentHotspot);

      currentAttributes.hotspots[idx].dataText = target.value;

      setAttributes(currentAttributes);
      setAttributesLogs({ ...attributesLogs, [`hotSpot${currentHotspot.hotspotNum}`]: `created annotation "${target.value}"` })
    }
  };

  const onChangeColor = (color) => {
    if (currentHotspot) {
      const currentAttributes = { ...attributes };
      const idx = currentAttributes.hotspots.findIndex(
        (hs) => hs.dataNormal === currentHotspot.dataNormal
      );
      const theCurrentHotspot = { ...currentHotspot, bgColor: color };
      setCurrentHotspot(theCurrentHotspot);

      currentAttributes.hotspots[idx].bgColor = color;

      setAttributes(currentAttributes);
      const annotation = currentAttributes.hotspots[idx].dataText
      setAttributesLogs({
        ...attributesLogs,
        [`hotSpot${currentHotspot.hotspotNum}`]: `set background color of "${annotation}" to "${color}"`
      })
    }
  };
  return (
    <Collapse in={attName === "annotation"}>
      {/* <Card className={classes.root}> */}
      {/* <CardHeader title="Modal annotation" /> */}
      <CardContent>
        <Typography style={{ color: 'gray' }}>
          SEO text
        </Typography >
        <TextField
          style={{ margin: 8 }}
          placeholder="#SEO"
          InputProps={{ disableUnderline: true }}
          fullWidth
          margin="normal"
          name="alt"
          value={attributes.alt}
          onChange={onInputChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <div style={{
          display: 'flex',
          alignItems: 'center'
        }}>
          <Button slot='hotspot-foot'
            data-position='0.16 0.11 0.15'
            data-normal='0 1 0.75'
            data-visibility-attribute='visible' style={{ color: '#3300FF', fontSize: 15, textTransform: 'none', fontFamily: "poppins", fontWeight: 700 }}
            onClick={() => {
              onClickSwitchAutoRotateOff()
              return onAddHotspot()
            }}>
            + Add New
          </Button>
          <Button
            style={{ color: '#3300FF', fontSize: 15, textTransform: 'none', fontFamily: "poppins", fontWeight: 700 }}
            disabled={!currentHotspot}
            onClick={() => onRemoveHotspot()}
          >
            Remove
          </Button>
        </div>
        <TextField
          // label="Model alt text"
          style={{ margin: 8 }}
          placeholder="Annotation Text"
          fullWidth
          margin="normal"
          name="dataText"
          InputProps={{ disableUnderline: true }}
          value={currentHotspot?.dataText}
          disabled={!currentHotspot}
          onFocus={() => onClickSwitchAutoRotateOff()}
          onChange={onChangeAnnotationText}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <ColorPicker
          defaultValue="Click to select color"
          name="bgColor"
          floatingLabelText="Hotspot background color"
          onChange={onChangeColor}
          disabled={!currentHotspot}
          fullWidth
          value={currentHotspot?.bgColor}
        />
      </CardContent>
      {/* </Card> */}
    </Collapse>
  );
};
