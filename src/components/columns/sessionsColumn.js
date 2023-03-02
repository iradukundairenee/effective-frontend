import { Typography } from "@material-ui/core";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectedSession } from "redux/actions/session";
import moment from "moment";

export const SessionsColumn = (sessions) => {
  const sessionsData = useSelector((state) => state);

  const {
    selectedSession: { index },
  } = sessionsData;

  useEffect(() => {
    if (sessions) {
      sessions.forEach((session, index) => (session.serial = index + 1));
    }
  }, [sessions]);

  return [
    {
      content: (item) => (
        <Typography
          onClick={() => {
            const number = parseInt((item.serial - 1).toString().slice(-1));
            selectedSession(number);
          }}
          style={{
            fontWeight:
              parseInt((item.serial - 1).toString().slice(-1)) === index
                ? "bold"
                : "400",
            color: "#7D7D7D",
            fontFamily: "Poppins",
            fontSize: "16px",
            padding: "10px 0",
          }}
        >
          0{item.serial}
        </Typography>
      ),
      label: "S.No",
    },
    {
      content: (item) => (
        <Typography
          onClick={() => {
            const number = parseInt((item.serial - 1).toString().slice(-1));
            selectedSession(number);
          }}
          style={{
            fontWeight:
              parseInt((item.serial - 1).toString().slice(-1)) === index
                ? "bold"
                : "400",
            color: "#7D7D7D",
            fontFamily: "Poppins",
            fontSize: "16px",
            padding: "10px 0",
          }}
        >
          {moment(item.startedAt).format("Do-MM-YYYY, H:mm:ss")}
        </Typography>
      ),
      label: "Started at",
    },
    {
      content: (item) => (
        <Typography
          onClick={() => {
            const number = parseInt((item.serial - 1).toString().slice(-1));
            selectedSession(number);
          }}
          style={{
            fontWeight:
              parseInt((item.serial - 1).toString().slice(-1)) === index
                ? "bold"
                : "400",
            color: "#7D7D7D",
            fontFamily: "Poppins",
            fontSize: "16px",
            padding: "10px 0",
          }}
        >
          {moment(item.endedAt).format("Do-MM-YYYY, H:mm:ss")}
        </Typography>
      ),
      label: "Ended at",
    },
  ];
};
