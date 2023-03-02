import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import { EmployeePage } from "./Employees";
import { BsArrowLeft } from "react-icons/bs";
import { adminGetUsers, resetUpdateUserProfile } from "redux/actions/user";
import { initialPaginate, paginate } from "utils/paginate";
import { userColumns } from "components/columns/userColumns";
import { UserTable } from "components/CustomizedTable/userTable";
import { AccountProfile } from "pages/UserProfile/AccountProfile";
import { AccountDetails } from "pages/UserProfile/AccountDetails";
import { notifier } from "utils/notifier";
import { EmployeeTable } from "components/CustomizedTable/EmployeeTable";
import { getAllEmployees } from "redux/actions/employee";
import { EmployeeColumns } from "components/columns/employeeColumns";

export const CrmPage = () => {
  const [paginatedUsers, setPaginatedUsers] = useState([]);
  const [paginator, setPaginator] = useState(initialPaginate(10));
  const tabs = ["Customers", "Employees", "Permissions/Role"];
  const [activeTab, setActiveTab] = useState(0);
  const [currentItem, setCurrentItem] = useState(null);
  const [action, setAction] = useState("add");
  const [openView, setOpenView] = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);
  const crmProfileEdited = useSelector((state) => state);
  const employeeState = useSelector((state) => state);
  const [paginatedData, setPaginatedData] = useState();
  const [page, setPage] = useState(1);

  const changeTab = (idx) => {
    setActiveTab(idx);
  };

  const userState = useSelector((state) => state);
  const {
    adminGetUsers: { loading, users },
    userRm: { loading: deleting, loaded: deleted },
    login: {
      userInfo: { user },
    },
  } = userState;
  const {
    userProfileEdit: { loaded: crmEditDone },
  } = crmProfileEdited;

  const {
    employeesGet: { loading: employeesLoading, employees },
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

  const onEmployeesPageChange = (e, p) => {
    e.preventDefault();
    setPage(p);
    jumpToPage(p);
  };

  useEffect(() => {
    adminGetUsers();
  }, [crmEditDone]);

  useEffect(() => {
    if (crmEditDone) {
      notifier.success("Profile updated successfully");
      resetUpdateUserProfile();
    }
  }, [crmEditDone]);

  useEffect(() => {
    if (deleted) {
      adminGetUsers();
      setConfirmDel(false);
    }
  }, [deleted]);

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
    if (action === "close") {
      setOpenView(false);
      return;
    }
    setAction(action);
  };

  return (
    <div style={{ marginTop: "30px" }}>
      {openView ? (
        <div className={"w-full border-box"}>
          <Grid style={{ margin: "1% 0" }}>
            <div
              onClick={() => setOpenView(false)}
              style={{ cursor: "pointer" }}
            >
              <BsArrowLeft
                style={{
                  color: "#8967fc",
                  fontSize: "24px",
                  margin: "1% 0",
                  backgroundColor: "#fff",
                }}
              />
            </div>
          </Grid>
          <div className="ar-tab grid">
            <div className={"active"}>Edit Profile</div>
          </div>
          <div className="w-full tab-content">
            <Grid container spacing={1} columns={1}>
              <Grid item xs={12}>
                <AccountProfile user={currentItem} />
              </Grid>
              <Grid xs={12}>
                <AccountDetails
                  user={currentItem}
                  action={() => onUserClick({}, "close")}
                  setOpenView={setOpenView}
                />
              </Grid>
            </Grid>
          </div>
        </div>
      ) : (
        <div className={"w-full border-box"}>
          <div className="ar-tab grid">
            {user?.role === "Manager" ? (
              <div className={"active"}>{tabs[0]}</div>
            ) : (
              tabs.map((tab, idx) => (
                <div
                  onClick={() => changeTab(idx)}
                  className={activeTab === idx ? "active" : ""}
                >
                  {tab}
                </div>
              ))
            )}
          </div>
          <div className="w-full tab-content">
            {activeTab === 0 && (
              <Grid container spacing={1}>
                <Grid>
                  <UserTable
                    tableTitle="All users"
                    loading={loading}
                    columns={userColumns(onUserClick)}
                    dataCount={paginatedUsers.length}
                    data={users}
                    withPagination
                    pageCount={Math.ceil(users.length / paginator.pageSize)}
                    handlePageChange={onPageChange}
                    page={paginator.pageNumber}
                    user={user}
                  />
                </Grid>
              </Grid>
            )}
            {activeTab === 1 && (
              <Grid>
                <EmployeeTable
                  columns={EmployeeColumns(onUserClick)}
                  loading={employeesLoading}
                  data={paginatedData}
                  withPagination
                  dataCount={employees.length}
                  pageCount={itemsPerPage}
                  handlePageChange={onEmployeesPageChange}
                  page={page}
                  user={user}
                />
              </Grid>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
