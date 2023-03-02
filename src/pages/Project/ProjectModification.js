import React, { useEffect } from "react";
import { useParams } from "react-router";
import { ProjectRegistration } from "./ProjectRegistration";
import { getProjectDetails } from "redux/actions/project";
import { useSelector } from "react-redux";
import Loading from "components/loading.component";

export const EditProject = () => {
  const { projectId } = useParams();
  useEffect(() => {
    if (projectId) {
      getProjectDetails(projectId);
    }
  }, [projectId]);
  const projectState = useSelector((state) => state);
  const {
    projectGet: { project, loaded },
    projectsGet: { projects },
  } = projectState;
  const nn = projects?.find((project) => project._id === projectId);
  const pro = nn ? nn : project;
  if (!loaded && !pro) {
    return <Loading />;
  } else {
    return <ProjectRegistration action="edit" currentItem={pro} />;
  }
};
