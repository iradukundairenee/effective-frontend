import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Typography,
  Radio,
  FormGroup,
  FormControl
} from "@material-ui/core";
import { ButtonCounter } from "./ButtonCounter";
import { Collapse } from "@material-ui/core";


export const CameraOrbit = ({
  cardTitle,
  onSetCounterValue,
  onChangeCheckbox,
  counterValues = {},
  attribute,
}) => {
  return (
    <div>
      <CardHeader title={cardTitle} />
      <CardContent>
<FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue={"custom"}
        name="radio-buttons-group"
      >
        <div style={{
            display: 'flex',
            alignItems: 'center'
          }}>
        <FormControlLabel label={ <Typography
              style={{
                color: "#7D7D7D",
                fontFamily: "Poppins",
              }}
            >
              Default
            </Typography>} value="default" control={<Radio />}  onChange={({ target }) => onChangeCheckbox({checked:true}, attribute)}/>
    
        <FormControlLabel label={<Typography
              style={{
                color: "#7D7D7D",
                fontFamily: "Poppins",
              }}
            >
              Custom
            </Typography>} value="custom" control={<Radio />}  onChange={({ target }) => onChangeCheckbox({checked:false}, attribute)}/>
      
          </div>
      </RadioGroup>
    </FormControl>
        <Collapse in={!counterValues.useDefault}>
        
          <ButtonCounter
          label={<Typography
            style={{
              color: "#7D7D7D",
              fontFamily: "Poppins",
              fontSize:12
            }}
          >
            Side to side
          </Typography>}
            onSetValue={onSetCounterValue}
            attribute={attribute}
            values={counterValues.custom}
            name="side"
          />
          <ButtonCounter
          label={ <Typography
            style={{
              color: "#7D7D7D",
              fontFamily: "Poppins",
              fontSize:12
            }}
          >
            Up and down
          </Typography>}
            onSetValue={onSetCounterValue}
            attribute={attribute}
            values={counterValues.custom}
            name="ud"
          />
          <ButtonCounter
          label={<Typography
            style={{
              color: "#7D7D7D",
              fontFamily: "Poppins",
              fontSize:12
            }}
          >
            In and out
          </Typography>}
            onSetValue={onSetCounterValue}
            attribute={attribute}
            values={counterValues.custom}
            name="io"
          />
        </Collapse>
      </CardContent>
    </div>
  );
};
