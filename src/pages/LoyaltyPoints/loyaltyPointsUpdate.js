import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { Loading } from "../../components/loading.component";
import { getSingleLoyaltyPoint } from "redux/actions/loyaltyPoints";
import { AddLoyaltyPoints } from "./AddLoyaltyPoint";

export const LoyaltyPointsUpdate = () => {
  const { pointsId } = useParams();

  useEffect(() => {
    if (pointsId) {
      getSingleLoyaltyPoint(pointsId);
    }
  }, [pointsId]);
  const state = useSelector((state) => state);
  const {
    singleLoyaltyPoint: { loaded, loyaltyPoint },
    loyaltyPointsGet: { loyaltyPoints },
  } = state;
  const nn = loyaltyPoints.find((point) => point._id === pointsId);
  const sub = nn ? nn : loyaltyPoint;
  if (!loaded && !sub) {
    return <Loading />;
  } else {
    return <AddLoyaltyPoints action="edit" currentItem={sub} />;
  }
};
