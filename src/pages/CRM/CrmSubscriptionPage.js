import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { CrmSubscriptionTable } from "components/table/CrmSubscriptionTable";
import { useSelector } from "react-redux";
import { viewCustomerSubscriptions } from "redux/actions/subscription";
import { CrmSubscriptionColumns } from "components/columns/CrmSubscriptionColumns";
import { initialPaginate, paginate } from "utils/paginate";
import { useParams } from "react-router";

const itemsPerPage = 5;
export const CrmSubscriptionPage = () => {
  const subscriptionState = useSelector((state) => state);
  const [page, setPage] = useState(1);
  const [paginator, setPaginator] = useState(initialPaginate());

  const params = useParams();
  const { id } = params;

  const onPageChange = ({ selected }) => {
    setPaginator({ ...paginator, pageNumber: selected + 1 });
  };

  const {
    viewCustomersSubscription: { loading, customersub },
    login: {
      userInfo: { user },
    },
  } = subscriptionState;
  useEffect(() => {
    viewCustomerSubscriptions(id);
  }, [id]);
  return (
    <Grid>
      <h1>Subscription History</h1>
      <CrmSubscriptionTable
        columns={CrmSubscriptionColumns()}
        loading={loading}
        data={customersub}
        withPagination
        dataCount={customersub.length}
        pageCount={itemsPerPage}
        handlePageChange={onPageChange}
        page={page}
        user={user}
      />
    </Grid>
  );
};
