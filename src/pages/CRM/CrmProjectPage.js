import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { CrmTable } from "components/table/CrmTable";
import { useSelector } from "react-redux";
import { getProjectListDetails } from "redux/actions/project";
import { CrmColumns } from "components/columns/CrmColums";
import { initialPaginate, paginate } from "utils/paginate";
import { useParams } from "react-router";
import {getDuplicates } from "redux/actions/product";

const itemsPerPage = 5;
export const CrmProjectPage = () => {
  const params=useParams();
  const {type,id}=params;
  const projectState = useSelector((state) => state);
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [paginator, setPaginator] = useState(initialPaginate());

  const onPageChange = ({ selected }) => {
    setPaginator({ ...paginator, pageNumber: selected + 1 });
  };

  const {
    CustomerProjectList: { loading,project},
    login: {
      userInfo: { user },
    },
  } = projectState;
  useEffect(() => {
    getProjectListDetails(type,id);
  }, []);
  const getProductDuplicates = (product) => {
    getDuplicates(product._id);
    setIsOpen(!isOpen);
  };

  return (
    <Grid>
       <h1>List of Project Details</h1>
      <CrmTable
        style={{ backgroundColor:'red',
        marginTop:'2px !important',}}
        columns={CrmColumns(getProductDuplicates)}
        loading={loading}
        data={project}
        withPagination
        dataCount={project.length}
        pageCount={itemsPerPage}
        handlePageChange={onPageChange}
        page={page}
        user={user}
        isOpen={isOpen}
      />
    </Grid>
  );
};
