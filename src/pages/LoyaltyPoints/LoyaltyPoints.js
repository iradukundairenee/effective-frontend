import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import { paginate } from "utils/paginate";
import { LoyaltyPointsTable } from "components/CustomizedTable/loyaltyPointsTable";
import { getLoyaltyPoints } from "redux/actions/loyaltyPoints";
import { LoyaltyPointsColumns } from "components/columns/loyaltyPointsColumns";

export const LoyaltyPointsPage = () => {
  const loyaltyPointsState = useSelector((state) => state);
  const [paginatedData, setPaginatedData] = useState();
  const [page, setPage] = useState(1);

  const {
    loyaltyPointsGet: { loyaltyPoints },
  } = loyaltyPointsState;

  const itemsPerPage = loyaltyPoints.length;

  const maxPage = Math.ceil(loyaltyPoints.length / itemsPerPage);

  useEffect(() => {
    if (loyaltyPoints.length > 0) {
      const paginatedData = paginate(loyaltyPoints, itemsPerPage, page);
      setPaginatedData(paginatedData);
    }
  }, [page, loyaltyPoints, itemsPerPage]);

  useEffect(() => {
    getLoyaltyPoints();
  }, []);

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
    <Grid>
      <p className="title" style={{ width: "250px" }}>
        List of Loyalty Points
      </p>
      <LoyaltyPointsTable
        columns={LoyaltyPointsColumns()}
        data={paginatedData}
        withPagination
        dataCount={loyaltyPoints.length}
        pageCount={itemsPerPage}
        handlePageChange={onPageChange}
        page={page}
      />
    </Grid>
  );
};
