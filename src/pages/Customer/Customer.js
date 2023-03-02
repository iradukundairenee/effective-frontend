import React, { useEffect, useState } from "react";
import { Registration } from "./Registration";
import { useSelector } from "react-redux";
import { Box, Grid, Typography } from "@material-ui/core";
import { deleteUser, getUsersList } from "redux/actions/user";
import { initialPaginate, paginate } from "utils/paginate";
import { CustomisedTable } from "components/CustomizedTable";
import { userColumns } from "components/columns/userColumns";
import { CustomerModel } from "./CustomerModel";
import { AlertConfirm } from "components/AlertConfirm";

export const CustomerPage = () => {
  const [paginatedUsers, setPaginatedUsers] = useState([]);
  const [paginator, setPaginator] = useState(initialPaginate(10));
  const [currentItem, setCurrentItem] = useState(null);
  const [action, setAction] = useState("add");
  const [openView, setOpenView] = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);

  const userState = useSelector((state) => state);
  const {
    userList: { loading, users },
    userRm: { loading: deleting, loaded: deleted },
  } = userState;
  // useEffect(() => {
  //   getUsersList();
  // }, []);
  // useEffect(() => {
  //   if (deleted) {
  //     getUsersList();
  //     setConfirmDel(false);
  //   }
  // }, [deleted]);
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
  const onUserClick = (user = {}, action) => {
    setCurrentItem(user);
    if (action === "delete") {
      setConfirmDel(true);
      return;
    }
    if (action === "view") {
      setOpenView(true);
      return;
    }
    setAction(action);
  };
  return (
    // <Box
    //   sx={{
    //     backgroundColor: "background.default",
    //     minHeight: "100%",
    //     py: 3,
    //   }}
    // >
    //   <Grid container spacing={1}>
    //     <CustomerModel
    //       open={openView}
    //       setOpen={() => setOpenView(false)}
    //       currentItem={currentItem}
    //     />
    //     <AlertConfirm
    //       loading={deleting}
    //       message={
    //         currentItem &&
    //         `Are you sure you want to delete ${currentItem.firstName}`
    //       }
    //       onConfirmYes={() => deleteUser(currentItem._id)}
    //       open={confirmDel}
    //       setOpen={() => setConfirmDel(false)}
    //     />
    //     <Grid item lg={4} md={4} xl={6} xs={12}>
    //       <Registration action={action} currentItem={currentItem} />
    //     </Grid>
    //     <Grid item lg={8} md={8} xl={6} xs={12}>
    //       <CustomisedTable
    //         tableTitle="All users"
    //         loading={loading}
    //         columns={userColumns(onUserClick)}
    //         dataCount={paginatedUsers.length}
    //         data={paginatedUsers}
    //         withPagination
    //         pageCount={Math.ceil(users.length / paginator.pageSize)}
    //         handlePageChange={onPageChange}
    //         page={paginator.pageNumber}
    //       />
    //     </Grid>
    //   </Grid>
    // </Box>
    <Typography variant="h1">Customer Page</Typography>
  );
};
