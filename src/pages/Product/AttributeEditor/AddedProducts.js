import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Collapse,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import Loading from "components/loading.component";
import { NoDisplayData } from "components/NoDisplayData";
// import { getProjectProds } from "redux/actions/project";

export const AddedProducts = ({ attName, productId }) => {
  const appState = useSelector((state) => state);

  const {
    projectProdsGet: { loading: ppFetching, projProds },
  } = appState;
  useEffect(() => {
    // getProjectProds(productId, "product");
  }, [productId]);
  return (
    <Collapse in={attName === "added_projects"}>
      <Card>
        <CardHeader title="Added projects" />
        <CardContent>
          {ppFetching && !projProds.length ? (
            <Loading />
          ) : projProds.length ? (
            <List>
              {projProds.map((prod, prodIdx) => (
                <ListItem divider key={prodIdx}>
                  <ListItemText
                    primary={prod.project?.name}
                    secondary={prod.website}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <NoDisplayData message="No project added yet" />
          )}
        </CardContent>
      </Card>
    </Collapse>
  );
};
