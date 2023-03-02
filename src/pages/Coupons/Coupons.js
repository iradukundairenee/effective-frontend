import { Grid } from "@material-ui/core";
import { CouponColumns } from "components/columns/couponColumns";
import { CouponsTable } from "components/CustomizedTable/couponsTable";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getAllCoupons } from "redux/actions/coupons";

export const CouponsPage = () => {
  const couponsState = useSelector((state) => state);
  const {
    getAllCoupons: { coupons },
  } = couponsState;
  useEffect(() => {
    getAllCoupons();
  }, []);

  return (
    <Grid>
      <p className="title">Coupons</p>
      <CouponsTable columns={CouponColumns()} withPagination data={coupons} />
    </Grid>
  );
};
