import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { EmployeeTable } from "components/CustomizedTable/EmployeeTable";
import { useSelector } from "react-redux";
import { paginate } from "utils/paginate";
import { getAllEmployees } from "redux/actions/employee";
import { EmployeeColumns } from "components/columns/employeeColumns";

export const EmployeePage = (onUserClick) => {
  const employeeState = useSelector((state) => state);
  const [paginatedData, setPaginatedData] = useState();
  const [page, setPage] = useState(1);

  const {
    employeesGet: { loading, employees },
  } = employeeState;
  const itemsPerPage = 5;

  const maxPage = Math.ceil(employees.length / itemsPerPage);

  useEffect(() => {
    if (employees.length > 0) {
      const paginatedData = paginate(employees, itemsPerPage, page);
      setPaginatedData(paginatedData);
    }
  }, [page, employees]);

  useEffect(() => {
    getAllEmployees();
  }, []);

  const jumpToPage = (page) => {
    const pageNumber = Math.max(1, page);
    setPage(() => Math.min(pageNumber, maxPage));
  };

  const onPageChange = (e, p) => {
    e.preventDefault();
    setPage(p);
    jumpToPage(p);
  }

  return (
    <Grid>
      <EmployeeTable
        columns={EmployeeColumns(onUserClick)}
        loading={loading}
        data={paginatedData}
        withPagination
        dataCount={employees.length}
        pageCount={itemsPerPage}
        handlePageChange={onPageChange}
        page={page}
      />
    </Grid>
  )
};
