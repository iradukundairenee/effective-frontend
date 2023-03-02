import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { Loading } from "../../components/loading.component";
import { getCoupon } from "redux/actions/coupons";
import { CreateCoupon } from "./createCoupons";

export const CouponUpdate = () => {
  const { couponId } = useParams();

  useEffect(() => {
    if (couponId) {
      getCoupon(couponId);
    }
  }, [couponId]);
  const couponState = useSelector((state) => state);
  const {
    getCoupon: { loaded, coupon },
    getAllCoupons: { coupons },
  } = couponState;
  const nn = coupons?.find((coupon) => coupon._id === couponId);
  const sub = nn ? nn : coupon;
  if (!loaded && !sub) {
    return <Loading />;
  } else {
    return <CreateCoupon action="edit" currentItem={sub} />;
  }
};
