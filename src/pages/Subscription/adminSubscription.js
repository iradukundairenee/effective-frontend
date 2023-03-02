import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { SubscriptionTable } from "components/table/SubscriptionTable";
import { useSelector } from "react-redux";
import { getSubscriptions } from "redux/actions/subscriptionPlan";
import { SubscriptionColumns } from "components/columns";
import { initialPaginate, paginate } from "utils/paginate";

const itemsPerPage = 5;
export const AdminSubscription = () => {
  const subscriptionsState = useSelector((state) => state);
  const [page, setPage] = useState(1);
  const [paginator, setPaginator] = useState(initialPaginate());

  const onPageChange = ({ selected }) => {
    setPaginator({ ...paginator, pageNumber: selected + 1 });
  };

  const {
    subscriptionsGet: { loading, subscriptions },
    login: {
      userInfo: { user },
    },
  } = subscriptionsState;

  useEffect(() => {
    getSubscriptions();
  }, []);

  return (
    <Grid>
      <p className="title">Subscription</p>
      <SubscriptionTable
        columns={SubscriptionColumns()}
        loading={loading}
        data={subscriptions}
        withPagination
        dataCount={subscriptions.length}
        pageCount={itemsPerPage}
        handlePageChange={onPageChange}
        page={page}
        user={user}
      />
    </Grid>
  );
};
