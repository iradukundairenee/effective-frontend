import React, { useEffect } from "react";
import { Card, CardContent, Collapse, CardHeader } from "@material-ui/core";
import { generateQR } from "redux/actions/product";
import { useSelector } from "react-redux";
import Loading from "components/loading.component";

export const QRCodeViewer = ({ attName, productId }) => {

  const {
    productGet: { product, },
    qrGenerate: { loading, loaded, qr },
  } = useSelector((state) => state);


  useEffect(() => {
    if (productId) {
      generateQR(productId, product.code);
    }
  }, [product.code, productId]);

  return (
    <Collapse in={attName === "qr-code"}>
      <Card>
        <CardHeader title="Scan the QR code to preview 3D asset in your space" />
        <CardContent>
          {loading && <Loading />}
          {loaded && (

            <img src={qr} alt="QR code" loading="lazy" />
          )}
        </CardContent>
      </Card>
    </Collapse>
  );
};
