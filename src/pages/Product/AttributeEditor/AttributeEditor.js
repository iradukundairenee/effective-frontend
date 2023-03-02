import React, { useState } from "react";
import { Button, ButtonGroup, Grid } from "@material-ui/core";
import { Scene } from "./Scene";
import { Lighting } from "./Lighting";
import { Material } from "./Material";
import { Annotation } from "./Annotation";
import { AREditor } from "./AREditor";
import { useStyles } from "../productStyles";
import { updateAttributes } from "redux/actions/product";
import { useSelector } from "react-redux";
import { ManageImages } from "./ManageImages";
import { initialStates } from "./initialStates";
import { Poster } from "./Poster";
import { AddedProducts } from "./AddedProducts";
import { QRCodeViewer } from "./QRCodeViewer";

import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { handleLogs } from "utils/handleLogs";

export const AttributeEditor = ({
  product,
  attributes,
  setAttributes,
  modelViewRef,
  currentHotspot,
  setCurrentHotspot,
  attributesLogs,
  setAttributesLogs,
}) => {
  const classes = useStyles();
  const [activeBtn, setActiveBtn] = useState("scene");

  const appState = useSelector((state) => state);

  const {
    attrUpdate: { loading },
    login: {
      userInfo: { user },
    },
  } = appState;

  const onSetCounterValue = async (attribute, name, currentValue) => {
    const customValues = { ...attributes[attribute].custom };
    customValues[name] += currentValue;
    attributes[attribute].custom = customValues;
    setAttributes({ ...attributes, [attribute]: attributes[attribute] });
    await handleLogs(attribute, attributesLogs, setAttributesLogs, { changeCustom: attribute }, attributes);
  };

  const onInputChange = async ({ target: { name, value } }) => {
    setAttributes({ ...attributes, [name]: value });
    await handleLogs(name, attributesLogs, setAttributesLogs, value, attributes);
  };

  const onSliderChange = async (name, newValue) => {
    setAttributes({ ...attributes, [name]: newValue });
    await handleLogs(name, attributesLogs, setAttributesLogs, newValue, attributes);
  };

  const onChangeColor = async (color) => {
    setAttributes({ ...attributes, backgroundColor: color });
    await handleLogs('backgroundColor', attributesLogs, setAttributesLogs, color, attributes);
  };

  const onChangeSwitch = async ({ target: { name, checked } }) => {
    setAttributes({ ...attributes, [name]: checked });
    await handleLogs(name, attributesLogs, setAttributesLogs, checked, attributes);
  };

  const onClickSwitchAutoRotateOff = () => setAttributes({ ...attributes, 'autoRotate': false });

  const onChangeCheckbox = async ({ checked }, attribute) => {
    const attributeValues = { ...attributes[attribute] };
    attributeValues.useDefault = checked;
    if (checked) {
      attributeValues.custom = initialStates[attribute].custom;
    }
    setAttributes({ ...attributes, [attribute]: attributeValues });
    await handleLogs(attribute, attributesLogs, setAttributesLogs, attributeValues, attributes);
  };

  const onLightningCheck = async ({ checked }, attribute) => {
    const attributeValues = { ...attributes[attribute] };
    attributeValues.active = checked;
    if (!checked) {
      attributeValues.image = "";
    }
    setAttributes({ ...attributes, [attribute]: attributeValues });
    await handleLogs(attribute, attributesLogs, setAttributesLogs, attributeValues);
  };

  const onLighteningSelect = async ({ value }, attribute) => {
    const attributeValues = { ...attributes[attribute] };
    attributeValues.image = value;
    setAttributes({ ...attributes, [attribute]: attributeValues });
    await handleLogs(attribute, attributesLogs, setAttributesLogs, attributeValues);
  };


  return (
    <div className={classes.root}>
      <Accordion style={{ width: "100%" }}>
        <AccordionSummary
          style={
            activeBtn === "scene"
              ? {
                color: "#3300FF",
                fontSize: 20,
                textTransform: "none",
                fontFamily: "poppins",
                fontWeight: 700,
              }
              : {
                color: "#888888",
                textTransform: "none",
                fontFamily: "poppins",
                fontWeight: 700,
              }
          }
          onClick={() => setActiveBtn("scene")}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          Scene
        </AccordionSummary>
        <AccordionDetails>
          <Scene
            attName={activeBtn}
            attributes={attributes}
            onInputChange={onInputChange}
            onSetCounterValue={onSetCounterValue}
            onSliderChange={onSliderChange}
            onChangeColor={onChangeColor}
            onChangeSwitch={onChangeSwitch}
            onChangeCheckbox={onChangeCheckbox}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          style={
            activeBtn === "lighting"
              ? {
                color: "#3300FF",
                fontSize: 20,
                textTransform: "none",
                fontFamily: "poppins",
                fontWeight: 700,
              }
              : {
                color: "#888888",
                textTransform: "none",
                fontFamily: "poppins",
                fontWeight: 700,
              }
          }
          onClick={() => setActiveBtn("lighting")}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          Lighting
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <Lighting
              attName={activeBtn}
              attributes={attributes}
              onSliderChange={onSliderChange}
              onLightningCheck={onLightningCheck}
              onLighteningSelect={onLighteningSelect}
            />
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          style={
            activeBtn === "material"
              ? {
                color: "#3300FF",
                fontSize: 20,
                textTransform: "none",
                fontFamily: "poppins",
                fontWeight: 700,
              }
              : {
                color: "#888888",
                textTransform: "none",
                fontFamily: "poppins",
                fontWeight: 700,
              }
          }
          onClick={() => setActiveBtn("material")}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          Material
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <Material
              attName={activeBtn}
              attributes={attributes}
              onSliderChange={onSliderChange}
            />
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          style={
            activeBtn === "annotation"
              ? {
                color: "#3300FF",
                fontSize: 20,
                textTransform: "none",
                fontFamily: "poppins",
                fontWeight: 700,
              }
              : {
                color: "#888888",
                textTransform: "none",
                fontFamily: "poppins",
                fontWeight: 700,
              }
          }
          onClick={() => setActiveBtn("annotation")}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          Annotations
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <Annotation
              attName={activeBtn}
              attributes={attributes}
              onInputChange={onInputChange}
              modelViewRef={modelViewRef}
              setAttributes={setAttributes}
              currentHotspot={currentHotspot}
              setCurrentHotspot={setCurrentHotspot}
              onClickSwitchAutoRotateOff={onClickSwitchAutoRotateOff}
              attributesLogs={attributesLogs}
              setAttributesLogs={setAttributesLogs}
            />
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          style={
            activeBtn === "ar"
              ? {
                color: "#3300FF",
                fontSize: 20,
                textTransform: "none",
                fontFamily: "poppins",
                fontWeight: 700,
              }
              : {
                color: "#888888",
                textTransform: "none",
                fontFamily: "poppins",
                fontWeight: 700,
              }
          }
          onClick={() => setActiveBtn("ar")}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          AR
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <AREditor
              attName={activeBtn}
              attributes={attributes}
              onInputChange={onInputChange}
            />
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          style={
            activeBtn === "poster"
              ? {
                color: "#3300FF",
                fontSize: 20,
                textTransform: "none",
                fontFamily: "poppins",
                fontWeight: 700,
              }
              : {
                color: "#888888",
                textTransform: "none",
                fontFamily: "poppins",
                fontWeight: 700,
              }
          }
          onClick={() => setActiveBtn("poster")}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          Poster
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <Poster
              product={product}
              attName={activeBtn}
              modelViewRef={modelViewRef}
            />
          </Typography>
        </AccordionDetails>
      </Accordion>
      {user.role !== "Client" && (
        <Accordion>
          <AccordionSummary
            style={activeBtn === "manage_images" ? { color: '#3300FF', fontSize: 20, textTransform: 'none', fontFamily: "poppins", fontWeight: 700 } : { color: '#888888', textTransform: 'none', fontFamily: "poppins", fontWeight: 700 }}
            onClick={() => setActiveBtn("manage_images")}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >

            Manage Images
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <ManageImages
                attName={activeBtn}
                attributes={attributes}
                setAttributes={setAttributes}
                productId={product._id}
                userId={product.customer._id}
              />
            </Typography>

          </AccordionDetails>
        </Accordion>
      )}
      <Accordion>
        <AccordionSummary
          style={
            activeBtn === "qr-code"
              ? {
                color: "#3300FF",
                fontSize: 20,
                textTransform: "none",
                fontFamily: "poppins",
                fontWeight: 700,
              }
              : {
                color: "#888888",
                textTransform: "none",
                fontFamily: "poppins",
                fontWeight: 700,
              }
          }
          onClick={() => setActiveBtn("qr-code")}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          View QR code
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <AddedProducts attName={activeBtn} productId={product._id} />
            <QRCodeViewer attName={activeBtn} productId={product._id} />
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
