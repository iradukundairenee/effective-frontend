import { BASE_URL } from "utils/constants";
import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { useStyles } from "styles/formStyles";
import { getProduct } from "redux/actions/product";
import Loading from "components/loading.component";
import { AttributeEditor } from "./AttributeEditor";
import { add_asset_logs } from "redux/actions/logs";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { NoDisplayData } from "components/NoDisplayData";
import { updateAttributes } from "redux/actions/product";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toOrbitProp, toAttributes } from "./productConstants";
import { initialStates } from "./AttributeEditor/initialStates";

export const ImagePreview = ({ open, setOpen, productId = null }) => {
  const classes = useStyles();
  const modelViewRef = useRef(null);
  const [attributes, setAttributes] = useState(initialStates);
  const [attributesLogs, setAttributesLogs] = useState(null);
  const [currentHotspot, setCurrentHotspot] = useState(null);
  const [mv, setMv] = useState(null);
  const [copied, setCopied] = useState(false);
  const appState = useSelector((state) => state);
  const {
    login: { userInfo },
    productGet: { loading, product, loaded },
  } = appState;

  // post logs
  const createLogs = async () => {
    if (!attributesLogs) return;
    const structuredLogs = [];
    const user = userInfo.user._id;
    const logs = await Object.values(attributesLogs).map((log) => ({
      ...structuredLogs,
      user,
      product: product.productObj._id,
      description: log,
    }));
    add_asset_logs(logs);
    return setAttributesLogs(null);
  };

  useEffect(() => {
    if (productId && open) {
      getProduct(productId);
    }
  }, [productId, open]);

  useEffect(() => {
    if (loaded) {
      const { customer } = product.productObj;
      const { src, ...otherProps } = product.productObj.image;
      setAttributes((prevAttribs) => ({ prevAttribs, customer, ...otherProps }));
      setCopied(false);
      setCurrentHotspot(null);
    }
  }, [loaded, product]);

  useEffect(() => {
    const modelViewer = document.querySelector("model-viewer#image3d-viewer");
    document.querySelectorAll("button.hotspot").forEach((e) => e.remove());
    if (attributes.hotspots.length && modelViewer) {
      attributes.hotspots.forEach((el) => {
        const newHotspot = document.createElement("button");
        newHotspot.slot = `hotspot-${el.hotspotNum}`;
        newHotspot.classList.add("hotspot");
        newHotspot.style.backgroundColor = el.bgColor;
        newHotspot.dataset.position = el.dataPosition;
        newHotspot.dataset.normal = el.dataNormal;

        modelViewer.appendChild(newHotspot);
        newHotspot.addEventListener("click", () => {
          onSelectHotspot(el);
        });
        const div = document.createElement("div");
        div.classList.add("annotation");
        div.textContent = el.dataText;
        newHotspot.appendChild(div);
      });
    }
  }, [attributes.hotspots, currentHotspot]);

  useEffect(() => {
    const modelViewer = document.querySelector("model-viewer#image3d-viewer");
    if (loaded && modelViewer) {
      setMv(modelViewer);
      modelViewer.addEventListener("load", (ev) => {
        let material = modelViewer.model.materials[0];
        material.pbrMetallicRoughness.setMetallicFactor(attributes.metalness);
        material.pbrMetallicRoughness.setRoughnessFactor(attributes.roughness);
      });
    }
  }, [attributes.metalness, attributes.roughness, loaded]);

  useEffect(() => {
    const modelViewer = modelViewRef.current;
    if (modelViewer && modelViewer.model) {
      let material = modelViewer.model.materials[0];
      material.pbrMetallicRoughness.setMetallicFactor(attributes.metalness);
      material.pbrMetallicRoughness.setRoughnessFactor(attributes.roughness);
    }
  }, [attributes.metalness, attributes.roughness]);
  const onSelectHotspot = (hotspot) => {
    setCurrentHotspot(hotspot);
  };

  return (
    <Dialog
      open={open}
      maxWidth="lg"
      fullWidth
      onClose={() => setOpen(false)}
      aria-labelledby="product-dialog-title"
      aria-describedby="product-dialog-description"
    >
      <DialogContent id="product-dialog-description">
        <p>3D Output Settings</p>
        {!Boolean(product.productObj?.image) ? (
          <Loading />
        ) : (
          <Grid
            container
            spacing={2}
            style={{ backgroundColor: attributes.backgroundColor }}
          >
            <Grid item md={3} lg={3}>
              <AttributeEditor
                product={product?.productObj}
                attributes={attributes}
                setAttributes={setAttributes}
                modelViewRef={modelViewRef}
                currentHotspot={currentHotspot}
                mv={mv}
                setCurrentHotspot={setCurrentHotspot}
                attributesLogs={attributesLogs}
                setAttributesLogs={setAttributesLogs}
              />
            </Grid>
            <Grid item md={7} lg={7}>
              {product.productObj?.image?.imageUrls?.glb || product.productObj?.image?.imageUrls?.usdz ? (
                <model-viewer
                  id="image3d-viewer"
                  ref={modelViewRef}
                  src={product.productObj.image.imageUrls.glb}
                  ios-src={product.productObj.image.imageUrls.usdz}
                  style={{ width: "100%", height: "70vh", border: "none" }}
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
                  ar
                  ar-scale={attributes.scale}
                  ar-placement={attributes.placement}
                  ar-modes="webxr scene-viewer quick-look"
                  camera-controls
                  autoplay
                  quick-look-browsers="safari chrome firefox"
                  loading="eager"
                  interaction-prompt="none"
                  {...toAttributes(attributes)}
                  onClick={() => console.log("model clicked")}
                >
                  {Boolean(attributes.arButtonImage) && (
                    <input
                      type="image"
                      src={attributes.arButtonImage}
                      className="ar-button"
                      style={{ width: "50%" }}
                      slot="ar-button"
                      alt={attributes.alt}
                    />
                  )}
                </model-viewer>
              ) : (
                <NoDisplayData message="No asset to display" />
              )}
            </Grid>
          </Grid>
        )}
      </DialogContent>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginLeft: "28%",
          marginRight: "2%",
        }}
      >
        {product?.productObj?.status === 'Public' &&
          <DialogActions>
            <FileCopyIcon color="primary" />
            <CopyToClipboard
              style={{
                color: "#7D7D7D",
                fontFamily: "Poppins",
                fontWeight: "400",
                fontSize: "16px",
              }}
              text={`<iframe title="3d image"  style="overflow: hidden; width: 100%; border: none;" scrolling="no" src="${BASE_URL}/dashboard/products/${productId}"></iframe>`}
              onCopy={() => {
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 5000);
              }}
            >
              <Button color={copied ? "secondary" : ""}>
                {copied ? "Copied!" : "Copy the embeded code"}
              </Button>
            </CopyToClipboard>
          </DialogActions>
        }
        <div>
          <DialogActions></DialogActions>
        </div>
        <DialogActions>
          <Button
            className={classes.cancel}
            onClick={() => setOpen(false)}
            color="primary"
            autoFocus
          >
            Close
          </Button>
          <Button
            className={classes.submit}
            autoFocus
            variant="contained"
            disabled={loading}
            onClick={() => {
              updateAttributes(attributes, productId);
              return createLogs();
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};
