import React, { forwardRef, useState, useEffect } from "react";
import moment from "moment";
import HtmlParser from "react-html-parser";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  CardContent,
  ListItemText,
  ListItem,
  List,
  Typography,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import {
  CloudDownloadOutlined as DownloadIcon,
  ExpandMore as ExpandMoreIcon,
} from "@material-ui/icons";
import "react-big-calendar/lib/css/react-big-calendar.css";
import TextInfoContent from "@mui-treasury/components/content/textInfo";
import { useBlogTextInfoContentStyles } from "@mui-treasury/styles/textInfoContent/blog";
import { projectTypes } from "./projectConstants";
import { getProjectHistories } from "redux/actions/project";
import { useSelector } from "react-redux";
import Loading from "components/loading.component";
import { INVOICE_ROUTE } from "utils/constants";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));
export const ProjectModel = ({ open = false, setOpen, currentItem = null }) => {
  const classes = useStyles();

  const [project, setProject] = useState({ name: "" });
  const [projectType, setProjectType] = useState({});
  const { loading, histories } = useSelector(
    ({ historiesGet }) => historiesGet
  );
  useEffect(() => {
    if (currentItem) {
      setProject(currentItem);
      getProjectHistories(currentItem._id);
      const currentPType = projectTypes.find(
        (e) => e.name === currentItem.type
      );
      setProjectType(currentPType);
    }
  }, [currentItem]);
  const { button: buttonStyles, ...contentStyles } =
    useBlogTextInfoContentStyles();
  const toDowloadUrl = (projectHistory = {}) => {
    let url = projectHistory.invoice;
    if (projectHistory.quote) {
      url = `${projectHistory.quote}?downloadType=quote`;
    }
    return url;
  };
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={setOpen}
      aria-labelledby="project-name"
      aria-describedby="project-description"
    >
      <DialogTitle id="project-name">
        {`Project name: ${project.name.toUpperCase()}`}
      </DialogTitle>
      <DialogContent>
        <CardContent>
          <TextInfoContent
            classes={contentStyles}
            overline={
              project.user?.firstName &&
              `Created by: ${project.user.firstName} ${project.user.lastName}`
            }
          />
          <ListItemText
            primary={`Start: ${moment(project.startDate).format(
              "YYYY-MM-DD"
            )}, Due date: ${moment(project.dueDate).format("YYYY-MM-DD")}`}
          />
          <Typography variant="h4">Project type:</Typography>
          <ListItem>
            <ListItemText
              primary={projectType?.name}
              secondary={projectType?.description}
            />
          </ListItem>
          <Typography variant="h4">
            Number of items: {project.nOfItems}
          </Typography>
          {HtmlParser(project.description)}
          <Button className={buttonStyles}>
            Budget: ${project.budget?.toLocaleString("en-US") || 0}
          </Button>
          {loading ? (
            <Loading />
          ) : (
            <List>
              {histories.map((history, historyIdx) => (
                <Accordion key={historyIdx}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${historyIdx}a-content`}
                    id={`panel${historyIdx}a-header`}
                  >
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={history.description}
                        secondary={
                          <>
                            <Typography
                              component="span"
                              variant="body2"
                              className={classes.inline}
                              color="textPrimary"
                            >
                              {history.userRole}
                            </Typography>
                            {` — on ${moment(history.createdAt).format(
                              "MMM DD, YYYY @ HH:mm"
                            )}`}
                          </>
                        }
                      />
                      {(history.invoice || history.quote) && (
                        <IconButton
                          edge="end"
                          size="small"
                          component="a"
                          aria-label="Print invoice"
                          rel="noreferrer"
                          href={`${INVOICE_ROUTE}/${toDowloadUrl(history)}`}
                          target="_blank"
                        >
                          <DownloadIcon />
                        </IconButton>
                      )}
                    </ListItem>
                  </AccordionSummary>
                  {Boolean(history.content) && (
                    <AccordionDetails>
                      {HtmlParser(history.content)}
                    </AccordionDetails>
                  )}
                </Accordion>
              ))}
            </List>
          )}
        </CardContent>
      </DialogContent>
      <DialogActions>
        <Button onClick={setOpen} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
