import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Paper, TableContainer } from "@material-ui/core";
import { getUsersList } from "redux/actions/user";
import { initialPaginate, paginate } from "utils/paginate";
import { CustomisedTable } from "../CustomizedTable";
import { userColumns } from "../columns/userColumns";

export default function Users() {
  const [paginatedUsers, setPaginatedUsers] = useState([]);
  const [paginator, setPaginator] = useState(initialPaginate(10));
  const userList = useSelector((state) => state.userList);
  const { loading, users } = userList;
  useEffect(() => {
    getUsersList();
  }, []);
  useEffect(() => {
    if (users.length > 0) {
      const { pageNumber, pageSize } = paginator;
      const paginatedUsers = paginate(users, pageNumber, pageSize);
      setPaginatedUsers(paginatedUsers);
    }
  }, [users, paginator]);
  const onPageChange = ({ selected }) => {
    setPaginator({ ...paginator, pageNumber: selected + 1 });
  };
  return (
    <TableContainer component={Paper}>
      <CustomisedTable
        tableTitle="All users"
        loading={loading}
        columns={userColumns()}
        dataCount={paginatedUsers.length}
        data={paginatedUsers}
        withPagination
        pageCount={Math.ceil(users.length / paginator.pageSize)}
        handlePageChange={onPageChange}
        page={paginator.pageNumber}
      />
    </TableContainer>
  );
}
