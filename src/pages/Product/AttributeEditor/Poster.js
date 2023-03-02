import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getProduct,
  editProduct,
  uploadProductImages,
} from "redux/actions/product";
// import { uploadProductImages } from "redux/actions/product";

export const Poster = ({ product, attName, modelViewRef }) => {
  const [checked, setChecked] = useState(false);

  const { imageIcon, imagesSrc, createdAt, updatedAt, ...rest } = product;
  const onSaveImage = async () => {
    const imageViewer = modelViewRef.current;
    imageViewer.fieldOfView = "auto";
    imageViewer.jumpCameraToGoal();
    await new Promise((resolve) => requestAnimationFrame(() => resolve()));
    const blob = await imageViewer.toBlob({
      mimeType: "image/png",
      idealAspect: true,
    });

    const file = new File([blob], "asset-icon", { type: "image/png" });
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const { result } = e.target;
      const file = {
        type: blob.type,
        size: blob.size,
        path: result,
        name: result,
      };

      uploadProductImages(file, "asset-icon", {
        productId: product._id,
        imgType: blob.type,
      });
      window.location.reload(true);
    };
  };

  const onDownloadPoster = async () => {
    const imageViewer = modelViewRef.current;
    let posterUrl = "";
    imageViewer.fieldOfView = "auto";
    imageViewer.jumpCameraToGoal();
    await new Promise((resolve) => requestAnimationFrame(() => resolve()));
    const blob = await imageViewer.toBlob({
      mimeType: "image/png",
      idealAspect: true,
    });
    posterUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = posterUrl;
    a.download = "poster.png";
    a.click();
  };

  return (
    <div in={attName === "poster"}>
      <input
        type="checkbox"
        id="asset-icon"
        checked={checked}
        onChange={() => setChecked(!checked)}
        value="Use as asset icon"
      />
      <label for="asset-icon">Use as asset icon</label>
      <div
        style={{
          backgroundColor: "#8967FC",
          borderRadius: "100px",
          cursor: "pointer",
          marginTop: "10px",
        }}
      >
        {checked ? (
          <div
            style={{ color: "white", padding: "10px" }}
            onClick={onSaveImage}
          >
            Save as Asset Icon
          </div>
        ) : (
          <div
            style={{ color: "white", padding: "10px" }}
            onClick={onDownloadPoster}
          >
            Download poster
          </div>
        )}
      </div>
    </div>
  );
};
