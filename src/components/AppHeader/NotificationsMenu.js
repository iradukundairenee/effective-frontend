import React from "react";
import {
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import moment from "moment";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { notifUser } from "utils/helper";

export const notificationsMenuId = "notifications-menu";

export const NotificationsMenu = ({ anchorEl, onClose, user }) => {
  const appState = useSelector((state) => state);
  const {
    notifsGet: { notifs, loading },
  } = appState;
  const toLink = (notif = {}) => {
    let url = `/dashboard/projects/${notif.project}`;
    if (notif.quote) {
      url = `/dashboard/quotes/${notif.quote}`;
    }
    return url;
  };
  
  return (
    <Menu
      id={notificationsMenuId}
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={onClose}
    >
      {loading ? (
        <Skeleton
          height={30}
          count={5}
          width={150}
          style={{ margin: "0 3px" }}
        />
      ) : notifs.length ? (
        notifs.map((notif, notifIdx) => (
          // {let quoteAction = }
          <MenuItem
            onClick={onClose}
            key={notifIdx}
            component={Link}
            to={toLink(notif)}
            style={{ margin: "0 3px" }}
          >
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={notif.description}
                secondary={
                  <>
                   <Typography>
                     {notif.name}
                    </Typography>
                    <Typography>
                     {notif.createdBy.fullName}
                    </Typography>
                
                    <Typography>
                    {`${moment(notif.createdAt).fromNow()}`}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          </MenuItem>
        ))
      ) : (
        <MenuItem onClick={onClose} style={{ margin: "0 3px" }}>
          {" "}
          No new notification
        </MenuItem>
      )}
    </Menu>
  );
};
