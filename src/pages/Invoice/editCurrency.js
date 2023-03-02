import React, { useEffect } from "react";
import { useParams } from "react-router";
import { CreateCurrency } from "./currencyRegistration";
import { useSelector } from "react-redux";
import { Loading } from "../../components/loading.component";
import { getSingleCurrency } from "redux/actions/currency";

export const EditCurrency = () => {
  const { currencyId } = useParams();

  useEffect(() => {
    if (currencyId) {
      getSingleCurrency(currencyId);
    }
  }, [currencyId]);
  const currencyState = useSelector((state) => state);
  const {
    getSingleCurrency: { loaded, currency },
    getCurrencies: { currencies },
  } = currencyState;
  const nn = currencies?.find((currency) => currency._id === currencyId);
  const curr = nn ? nn : currency;
  if (!loaded && !curr) {
    return <Loading />;
  } else {
    return <CreateCurrency action="edit" currentItem={curr} />;
  }
};
