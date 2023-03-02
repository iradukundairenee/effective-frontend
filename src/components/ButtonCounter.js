import React from "react";
import { Button, ButtonGroup,Grid , Typography } from "@material-ui/core";
import { Add as AddIcon, Remove as RemoveIcon } from "@material-ui/icons";

export const ButtonCounter = ({
  label,
  attribute,
  name,
  values = {},
  onSetValue,
}) => {
  return (
    <Grid container>
      <Grid item xs={6} sm={6} md={6}>
        <Typography variant="h6">{label}</Typography>
      </Grid>
      <Grid item xs={6} sm={6} md={6}>
        <ButtonGroup size="small">
          <Button
            aria-label="reduce"
            
            onClick={() =>{

              onSetValue(attribute, name, -1)
            }}
          >
            <RemoveIcon fontSize="small" />
          </Button>
          <Button>{values[name]}</Button>
          <Button
            aria-label="increase"
            onClick={() => onSetValue(attribute, name, 1)}
          >
            <AddIcon fontSize="small" />
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};
