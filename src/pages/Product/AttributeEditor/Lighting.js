import React from "react";
import {
  CardContent,
  CardMedia,
  Checkbox,
  Collapse,
  FormControl,
  FormControlLabel,
  MenuItem,
  Select,
  Slider,
  Typography,
} from "@material-ui/core";

export const Lighting = ({
  attName,
  attributes,
  onSliderChange,
  onLightningCheck,
  onLighteningSelect,
}) => {

  return (
    <Collapse in={attName === "lighting"} style={{ "height": "100%", "width": "100%" }}>
      <CardContent>
        <Typography variant="h4" id="exposure" gutterBottom style={{ fontSize: '16px', color: '#888888', textTransform: 'none', fontFamily: "poppins", fontWeight: 700 }}>
          Exposure
        </Typography>
        <Slider
          aria-labelledby="exposure"
          min={0}
          step={0.01}
          max={2}
          valueLabelDisplay="on"
          name="exposure"
          value={attributes.exposure}
          onChange={(e, value) => onSliderChange("exposure", value)}
        />
        <Typography variant="h4" id="shadow-intensity" gutterBottom style={{ fontSize: '16px', color: '#888888', textTransform: 'none', fontFamily: "poppins", fontWeight: 700 }}>
          Shadow intensity
        </Typography>
        <Slider
          aria-labelledby="shadow-intensity"
          min={0}
          step={0.1}
          max={1}
          valueLabelDisplay="on"
          name="shadowIntensity"
          value={attributes.shadowIntensity}
          onChange={(e, value) => onSliderChange("shadowIntensity", value)}
        />
        <Typography variant="h4" id="shadow-softness" gutterBottom style={{ fontSize: '16px', color: '#888888', textTransform: 'none', fontFamily: "poppins", fontWeight: 700 }}>
          Shadow softness
        </Typography>
        <Slider
          aria-labelledby="shadow-softness"
          min={0}
          step={0.1}
          max={1}
          valueLabelDisplay="on"
          name="shadowSoftness"
          value={attributes.shadowSoftness}
          onChange={(e, value) => onSliderChange("shadowSoftness", value)}
        />
        <div style={{
          display: 'flex',
          alignItems: 'center'
        }}>
          <FormControlLabel

            control={
              <Checkbox
                checked={attributes.skyboxImage?.active}
                onChange={({ target }) =>
                  onLightningCheck(target, "skyboxImage")
                }
              />
            }
          />
          <Typography gutterBottom style={{ color: '#888888', textTransform: 'none', fontFamily: "poppins", fontWeight: 700 }}>
            skybox Image
          </Typography>


        </div>
        {attributes.skyboxImage?.active && (
          <FormControl fullWidth>
            <Select
              labelId="select-skybox-image"
              name="skyboxImage"
              value={attributes.skyboxImage?.image}
              onChange={({ target }) =>
                onLighteningSelect(target, "skyboxImage")
              }
            >
              {attributes.customer.imageFiles
                ?.filter((img) => img.imageType === "skybox")
                .map((img, imgIdx) => (
                  <MenuItem value={img.imageUrl} key={imgIdx}>
                    {img.imageName}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        )}
        {Boolean(attributes.skyboxImage?.image) && (
          <CardMedia
            image={attributes.skyboxImage?.image}
            component="img"
            height="140"
          />
        )}
        <div style={{
          display: 'flex',
          alignItems: 'center'
        }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={attributes.environmentImage?.active}
                onChange={({ target }) =>
                  onLightningCheck(target, "environmentImage")
                }
              />
            }
          />
          <Typography gutterBottom style={{ color: '#888888', textTransform: 'none', fontFamily: "poppins", fontWeight: 700 }}>
            Environment image
          </Typography>
        </div>
        {attributes.environmentImage?.active && (
          <FormControl fullWidth>
            <Select
              labelId="select-environment-image"
              name="environmentImage"
              value={attributes.environmentImage?.image}
              onChange={({ target }) =>
                onLighteningSelect(target, "environmentImage")
              }
            >
              {attributes.customer.imageFiles
                ?.filter((img) => img.imageType === "skybox")
                .map((img, imgIdx) => (
                  <MenuItem value={img.imageUrl} key={imgIdx}>
                    {img.imageName}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        )}
        {Boolean(attributes.environmentImage?.image) && (
          <CardMedia
            image={attributes.environmentImage?.image}
            component="img"
            height="140"
          />
        )}
      </CardContent>
    </Collapse>
  );
};
