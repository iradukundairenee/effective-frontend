import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { getSessionsByUser } from "redux/actions/session";
import { SessionsColumn } from "components/columns/sessionsColumn";
import { SessionsTable } from "components/CustomizedTable/sessionsTable";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const SessionsPage = () => {
  const Sessions = useSelector((state) => state);
  const params = useParams();
  const { userId } = params;

  const {
    sessionsByUser: { sessions },
  } = Sessions;

  useEffect(() => {
    getSessionsByUser(userId);
  }, [userId]);

  return (
    <Grid>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          height: "30px",
          marginBottom: "15px",
        }}
      >
        <Link
          to="/dashboard/crm"
          style={{
            cursor: "pointer",
            color: "#8967fc",
            fontSize: "30px",
            marginRight: "5px",
          }}
        >
          <BsArrowLeft />
        </Link>
        <div className="title">Sessions</div>
      </div>
      <SessionsTable columns={SessionsColumn(sessions)} data={sessions} />
    </Grid>
  );
};
