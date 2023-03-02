import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { getProduct } from "redux/actions/product";
import { ProductRegistration } from "./ProductRegistraction";
import { Loading } from "../../components/loading.component";

export const EditProduct = () => {
  const { productId } = useParams();

  useEffect(
    (productId) => {
      if (productId) {
        getProduct(productId);
      }
    },
    [productId]
  );

  const productState = useSelector((state) => state);

  const {
    productGet: { loading, product },
  } = productState;

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <ProductRegistration
          action="edit"
          loading={loading}
          currentItem={product?.productObj}
        />
      )}
    </>
  );
};
