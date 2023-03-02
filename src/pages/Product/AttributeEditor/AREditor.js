import React from "react";
import {
  CardContent,
  CardMedia,
  Collapse,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";

const scales = ["auto", "fixed"];
const placements = ["floor", "wall"];
const locations = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
];

export const AREditor = ({ attName, attributes = {}, onInputChange }) => {
  return (
    <Collapse in={attName === "ar"} style={{ height: "100%", width: "100%" }}>
      <CardContent>
        <FormControl fullWidth>
          <InputLabel
            shrink
            id="select-scale"
            style={{
              color: "#7D7D7D",
              fontFamily: "Poppins",
              fontWeight: "400",
              fontSize: "16px",
            }}
          >
            AR scale
          </InputLabel>
          <Select
            disableUnderline={true}
            labelId="select-scale"
            name="scale"
            value={attributes.scale}
            onChange={onInputChange}
            style={{
              color: "#7D7D7D",
              fontFamily: "Poppins",
              fontWeight: "400",
            }}
          >
            {scales.map((scale, scaleIdx) => (
              <MenuItem value={scale} key={scaleIdx}>
                {scale}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel
            shrink
            id="select-placement"
            style={{
              color: "#7D7D7D",
              fontFamily: "Poppins",
              fontWeight: "400",
              fontSize: "16px",
            }}
          >
            AR placement
          </InputLabel>
          <Select
            disableUnderline={true}
            labelId="select-placement"
            name="placement"
            value={attributes.placement}
            onChange={onInputChange}
            style={{
              color: "#7D7D7D",
              fontFamily: "Poppins",
              fontWeight: "400",
            }}
          >
            {placements.map((pl, plIdx) => (
              <MenuItem value={pl} key={plIdx}>
                {pl}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {attributes.imageFiles?.filter((img) => img.imageType === "custom")
          .length > 0 && (
          <FormControl fullWidth>
            <InputLabel
              shrink
              id="select-ar-button-image"
              style={{
                color: "#7D7D7D",
                fontFamily: "Poppins",
                fontWeight: "400",
                fontSize: "16px",
              }}
            >
              AR button image
            </InputLabel>
            <Select
              disableUnderline={true}
              labelId="select-ar-button-image"
              name="arButtonImage"
              value={attributes.arButtonImage}
              onChange={onInputChange}
              style={{
                color: "#7D7D7D",
                fontFamily: "Poppins",
                fontWeight: "400",
              }}
            >
              <MenuItem value="">Empty</MenuItem>
              {attributes.customer.imageFiles
                ?.filter((img) => img.imageType === "custom")
                .map((img, imgIdx) => (
                  <MenuItem value={img.imageUrl} key={imgIdx}>
                    {img.imageName}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        )}
        {Boolean(attributes.arButtonImage) && (
          <>
            <CardMedia
              image={attributes.arButtonImage}
              component="img"
              height="40"
            />
            <FormControl fullWidth>
              <InputLabel
                shrink
                id="select-location"
                style={{
                  color: "#7D7D7D",
                  fontFamily: "Poppins",
                  fontWeight: "400",
                  fontSize: "16px",
                }}
              >
                AR location
              </InputLabel>
              <Select
                disableUnderline={true}
                labelId="select-location"
                name="arButtonPosition"
                value={attributes.arButtonPosition}
                onChange={onInputChange}
                style={{
                  color: "#7D7D7D",
                  fontFamily: "Poppins",
                  fontWeight: "400",
                }}
              >
                {locations.map((lo, loIdx) => (
                  <MenuItem value={lo} key={loIdx}>
                    {lo}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
        )}
      </CardContent>
    </Collapse>
  );
};
