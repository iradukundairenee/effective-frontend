import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import { qrProduct } from "redux/actions/product";
import Loading from "components/loading.component";
import { initialStates } from "pages/Product/AttributeEditor/initialStates";
import { toAttributes, toOrbitProp } from "pages/Product/productConstants";

export const ProductQrPage = ({
  match,
  styles = { width: "100%", height: "100vh" },
}) => {
  const [attributes, setAttributes] = useState(initialStates);
  const appState = useSelector((state) => state);
  const { productId, code } = match.params;
  const {
    singleProductGet: { singleProduct, loaded, loading },
  } = appState;

  useEffect(() => {
    if (productId) {
      qrProduct(productId, code);
    }
  }, [code, productId]);
  useEffect(() => {
    if (loaded) {
      const { src, ...otherProps } = singleProduct.image;
      setAttributes(otherProps);
    }
  }, [loaded, singleProduct]);

  useEffect(() => {
    const modelViewer = document.querySelector("model-viewer#image3d-viewer");
    if (loaded && modelViewer) {
      modelViewer.addEventListener("load", (ev) => {
        let material = modelViewer.model.materials[0];
        material.pbrMetallicRoughness.setMetallicFactor(attributes.metalness);
        material.pbrMetallicRoughness.setRoughnessFactor(attributes.roughness);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, attributes.metalness, attributes.roughness]);
  if (loading) return <Loading />;
  if (!Boolean(singleProduct.image)) return null;

  return (
    <Grid onContextMenu={(e) => e.preventDefault()}>
      <model-viewer
        id="image3d-viewer"
        src={singleProduct.image.imageUrls?.glb}
        ios-src={singleProduct.image.imageUrls?.usdz}
        style={{
          ...styles,
          border: "none",
          backgroundColor: attributes.backgroundColor,
        }}
        interaction
        auto-rotate-delay={attributes.autoRotateDelay}
        background-color={attributes.backgroundColor}
        camera-orbit={toOrbitProp("cameraOrbit", attributes)}
        min-camera-orbit={toOrbitProp("minCameraOrbit", attributes)}
        max-camera-orbit={toOrbitProp("maxCameraOrbit", attributes)}
        camera-target={toOrbitProp("cameraTarget", attributes)}
        field-of-view={attributes.fieldOfView}
        exposure={attributes.exposure}
        shadow-intensity={attributes.shadowIntensity}
        shadow-softness={attributes.shadowSoftness}
        alt={attributes.alt}
        ar-scale={attributes.scale}
        ar-placement={attributes.placement}
        ar
        ar-modes="webxr scene-viewer quick-look"
        camera-controls
        autoplay
        quick-look-browsers="safari chrome firefox"
        loading="eager"
        {...toAttributes(attributes)}
      >
        {Boolean(attributes.arButtonImage) && (
          <input
            type="image"
            src={attributes.arButtonImage}
            id="ar-button"
            className="ar-button"
            slot="ar-button"
            alt={attributes.alt}
          />
        )}
        {attributes.hotspots?.map((hs, hsIdx) => (
          <button
            key={hsIdx}
            slot={`hotspot-${hsIdx}`}
            className="hotspot"
            style={{ backgroundColor: hs.bgColor }}
            data-position={hs.dataPosition}
            data-normal={hs.dataNormal}
          >
            <div className="annotation">{hs.dataText}</div>
          </button>
        ))}
      </model-viewer>
    </Grid>
  );
};
