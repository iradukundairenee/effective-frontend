import React from "react";
import {
  Card,
  Collapse,
  FormControlLabel,
  Slider,
  TextField,
  Typography,
  Switch,
  CardContent,
} from "@material-ui/core";
import ColorPicker from "material-ui-color-picker";
import { CameraOrbit } from "components/CameraOrbit";

export const Scene = ({
  attributes = {},
  attName,
  onInputChange,
  onSetCounterValue,
  onSliderChange,
  onChangeColor,
  onChangeSwitch,
  onChangeCheckbox,
}) => {
  let check = attributes.disableZoom;
  let checked = attributes.autoRotate;
  return (
    <Collapse in={attName === "scene"} style={{ "height": "100%", "width": "100%" }}>
      <CardContent>
        <div style={{
          display: 'flex',
          alignItems: 'center'
        }}>

          <FormControlLabel
            control={
              <Switch
                value={true}
                style={attributes.disableZoom ? { color: 'green' } : { color: 'white' }}
                onChange={onChangeSwitch}
                name="disableZoom"
              />
            }
          />
          <Typography
            style={{
              color: "#7D7D7D",
              fontFamily: "Poppins",
              fontWeight: "400",
              fontSize: "16px",
            }}
          >
            Zoom
          </Typography>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <FormControlLabel
            control={
              <Switch
                // value={attributes.autoRotate}
                style={checked === true ? { color: 'green' } : { color: 'white' }}
                checked={attributes.autoRotate}
                onChange={onChangeSwitch}
                name="autoRotate"

              />
            }
          />
          <Typography
            style={{
              color: "#7D7D7D",
              fontFamily: "Poppins",
              fontWeight: "400",
              fontSize: "16px",
            }}
          >
            Auto rotate
          </Typography>
        </div>
        <div>
          <Typography
            style={{
              color: "#7D7D7D",
              fontFamily: "Poppins",
              fontWeight: "400",
              fontSize: "16px",
            }}
          >
            Auto rotate delay
          </Typography>
          <TextField
            InputProps={{ disableUnderline: true }}
            autoFocus
            fullWidth
            type="number"
            name="autoRotateDelay"
            value={attributes.autoRotateDelay}
            onChange={onInputChange}
            border="solid"
          />
        </div>
        <div>
          <Typography
            style={{
              color: "#7D7D7D",
              fontFamily: "Poppins",
              fontWeight: "400",
              fontSize: "12px",
            }}
          >
            Background color
          </Typography>
          <ColorPicker

            InputProps={{ disableUnderline: true }}
            defaultValue="Select Color"
            name="backgroundColor"
            onChange={onChangeColor}
            fullWidth
            value={attributes.backgroundColor}
          />
        </div>

        <div>
          <Typography
            style={{
              color: "#7D7D7D",
              fontFamily: "Poppins",
              fontWeight: "400",
              fontSize: "16px",
            }}
          >
            Camera orbit
          </Typography>
          <CameraOrbit

            onSetCounterValue={onSetCounterValue}
            counterValues={attributes.cameraOrbit}
            onChangeCheckbox={onChangeCheckbox}
            attribute="cameraOrbit"
          />

        </div>

        <div>
          <Typography
            style={{
              color: "#7D7D7D",
              fontFamily: "Poppins",
              fontWeight: "400",
              fontSize: "16px",
            }}
          >
            Min Camera orbit
          </Typography>
          <CameraOrbit

            onSetCounterValue={onSetCounterValue}
            counterValues={attributes.minCameraOrbit}
            onChangeCheckbox={onChangeCheckbox}
            attribute="minCameraOrbit"
          />
        </div>
        <div>
          <Typography
            style={{
              color: "#7D7D7D",
              fontFamily: "Poppins",
              fontWeight: "400",
              fontSize: "16px",
            }}
          >
            Max Camera orbit
          </Typography>
          <CameraOrbit

            onSetCounterValue={onSetCounterValue}
            counterValues={attributes.maxCameraOrbit}
            onChangeCheckbox={onChangeCheckbox}
            attribute="maxCameraOrbit"
          />
        </div>
        <Typography variant="h4" id="field-of-view" gutterBottom style={{
          color: "#7D7D7D",
          fontFamily: "Poppins",
          fontWeight: "400",
          fontSize: "16px",
        }}>
          Field of view
        </Typography>

        <Slider
          aria-labelledby="field-of-view"
          min={0}
          step={5}
          max={50}
          valueLabelDisplay="on"
          name="fieldOfView"
          value={attributes.fieldOfView}
          onChange={(e, value) => onSliderChange("fieldOfView", value)}
        />

      </CardContent>
    </Collapse>
  );
};
