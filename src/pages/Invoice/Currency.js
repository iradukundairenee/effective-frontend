import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import { CurrencyTable } from "components/CustomizedTable";
import { useSelector } from "react-redux";
import { getAllCurrency  } from "redux/actions/currency";
import {CurrencyColumns} from "components/columns";

export const CurrencyPage = () => {
  const currencyState = useSelector((state) => state);

  const {
        getCurrencies: {loading,currencies},
        login:{
          userInfo:{
            user
          }
        }
      } =currencyState;
  
  useEffect(() => {
    getAllCurrency ({});
  }, []);
  const itemsPerPage = 5;

  return (
    <div>
      <p className="title">All Currency</p>
      <CurrencyTable
        columns={CurrencyColumns()}
        loading={loading}
        data={currencies}
        withPagination
        dataCount={currencies.length}
        pageCount={itemsPerPage}
        user={user}
      />
    </div>
  );
};
