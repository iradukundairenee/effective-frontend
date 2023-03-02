import React from "react";
import {
  CardContent,
  Collapse,
  Slider,
  Typography,
} from "@material-ui/core";

export const Material = ({ attName, attributes, onSliderChange }) => {
  return (
    <Collapse in={attName === "material"} style={{ "height": "100%", "width": "100%" }}>
      {/* <Card> */}
      <CardContent>
        <Typography variant="h4" id="metalness" gutterBottom style={{ fontSize: '16px', color: '#888888', textTransform: 'none', fontFamily: "poppins", fontWeight: 700 }}>
          Matelness
        </Typography>
        <Slider
          aria-labelledby="metalness"
          min={0}
          step={0.01}
          max={1}
          valueLabelDisplay="on"
          name="metalness"
          value={attributes.metalness}
          onChange={(e, value) => onSliderChange("metalness", value)}
        />
        <Typography variant="h4" id="roughness" gutterBottom style={{ fontSize: '16px', color: '#888888', textTransform: 'none', fontFamily: "poppins", fontWeight: 700 }}>
          Roughness
        </Typography>
        <Slider
          aria-labelledby="roughness"
          min={0}
          step={0.01}
          max={1}
          valueLabelDisplay="on"
          name="roughness"
          value={attributes.roughness}
          onChange={(e, value) => onSliderChange("roughness", value)}
        />
      </CardContent>
      {/* </Card> */}
    </Collapse>
  );
};
