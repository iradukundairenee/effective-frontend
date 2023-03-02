import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { CustomisedTable } from "components/CustomizedTable";
import { useSelector } from "react-redux";
import { ProjectRegistration } from "./ProjectRegistration";
import { getProjects } from "redux/actions/project";
import { ProjectColumns } from "components/columns";
import { initialPaginate, paginate } from "utils/paginate";
import { ProjectModel } from "./ProjectModal";

export const ProjectPage = () => {
  const projectState = useSelector((state) => state);
  const [paginatedData, setPaginatedData] = useState();
  const [paginator, setPaginator] = useState(initialPaginate());
  const [currentItem, setCurrentItem] = useState(null);
  const [action, setAction] = useState("add");
  const [openView, setOpenView] = useState(false);
  const [page, setPage] = useState(1);
  const {
    projectsGet: { loading, projects },
    projectAdd: { loaded: added },
    projectEdit: { loaded: updated },
    login: {
      userInfo: { user },
    },
  } = projectState;
  const itemsPerPage = 7;
  const maxPage = Math.ceil(projects.length / itemsPerPage);
  useEffect(() => {
    if (projects.length > 0) {
      const paginatedData = paginate(projects, itemsPerPage, page);
      setPaginatedData(paginatedData);
    }
  }, [page, projects]);

  useEffect(() => {
    getProjects({});
  }, []);

  useEffect(() => {
    if (added || updated) {
      setCurrentItem(null);
      setAction("add");
      getProjects({});
    }
  }, [added, updated]);

  const jumpToPage = (page) => {
    const pageNumber = Math.max(1, page);
    setPage(() => Math.min(pageNumber, maxPage));
  };
  const onPageChange = (e, p) => {
    e.preventDefault();
    setPage(p);
    jumpToPage(p);
  };
  return (
    <div>
      <p
        style={{
          fontSize: "24px",
          fontWeight: "700",
          fontFamily: "Poppins",
          color: "#303030",
        }}
      >
        List of Projects
      </p>
      <Grid>
        <CustomisedTable
          columns={ProjectColumns()}
          loading={loading}
          data={paginatedData}
          withPagination
          dataCount={projects.length}
          pageCount={itemsPerPage}
          handlePageChange={onPageChange}
          page={page}
          user={user}
        />
      </Grid>
    </div>
  );
};
