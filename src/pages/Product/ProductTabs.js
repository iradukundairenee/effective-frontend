import React, { useState, useEffect } from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import { DropzoneDialog } from "material-ui-dropzone";
import HtmlParser from "react-html-parser";
import { notifier } from "utils/notifier";
import { uploadProductImages } from "redux/actions/product";
import "../ProjectDetail/styles.css";
import { useSelector } from "react-redux";
import { get_asset_logs } from "redux/actions/logs"
import { Loading } from "../../components/loading.component";
import { useStyles } from "styles/formStyles";

export const ProductTabs = ({ product, uploaded, uploading }) => {
  const classes = useStyles();
  const appState = useSelector((state) => state);
  const [activeTab, setActiveTab] = useState(0);
  const [openDz, setOpenDz] = useState(false);

  const { assetLogs: { loading, loaded, logs } } = appState;

  const tabs = ["Description", "History", "Upload 3D Asset"];
  const changeTab = (idx) => {
    setActiveTab(idx);
  };

  const onUploadImages = (files) => {
    if (files.length !== 2) {
      notifier.error("Sorry only two files are needed");
      return;
    }
    uploadProductImages(files);
  };

  useEffect(() => {
    if (uploaded) setOpenDz(false)
  }, [uploaded])

  useEffect(() => { if (activeTab === 1) get_asset_logs(product._id) }, [activeTab, product, product._id])

  // format dates
  const formatDate = (date) => {
    const formatted = date.replace("T", " ").substring(0, date.length - 5)
    return formatted
  }

  return (
    <div style={{ width: '100%' }}>
      <div className="w-full border-box">
        <div className="ar-tab grid">
          {tabs.map((tab, idx) => (
            <div
              style={{ fontWeight: 500, fontSize: '20px', lineHeight: '36px' }}
              onClick={() => changeTab(idx)}
              className={activeTab === idx ? "active" : ""}
            >
              {tab}
            </div>
          ))}
        </div>
        <div className="w-full tab-content">
          {activeTab === 0 && (
            <Grid container spacing={1} columns={1}>
              <Grid item xs={12}>
                <Typography
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: 600,
                    fontSize: "20px",
                    color: "#303030",
                  }}
                >
                  Description
                </Typography>
                <Typography
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: 400,
                    fontSize: "16px",
                    color: "#7D7D7D",
                  }}
                >
                  {HtmlParser(product.description)}
                </Typography>
              </Grid>
            </Grid>
          )}

          {activeTab === 1 && (
            <div className="w-full tab-content" style={{ width: '100%', overflow: 'auto', maxHeight: '200px' }}>
              {loading ? <Loading />
                : logs.length ? logs.map((log) => (
                  <Grid item className={classes.flex}
                    style={{ marginLeft: '2%', marginRight: '2%' }}>
                    <Typography
                      style={{
                        color: "#7D7D7D",
                        fontWeight: "300",
                        fontSize: "17px",
                        lineHeight: "27px"
                      }}>{`${log.user.firstName} ${log.user.lastName} : ${log.description}`}</Typography>
                    <Typography
                      style={{
                        color: "#7D7D7D",
                        fontWeight: "300",
                        fontSize: "17px",
                        lineHeight: "27px"
                      }}>{formatDate(log.createdAt)}</Typography>
                  </Grid>)) : (<Typography>no logs yet</Typography>)}
            </div>
          )}

          {activeTab === 2 && (
            <div
              className="w-full tab-content"
              style={{
                alignItems: "center",
                textAlign: "center"
              }}
            >
              <Button
                onClick={() => setOpenDz(true)}
                style={{
                  color: "#1C59F7",
                  fontFamily: "Poppins",
                  alignItems: "center",
                  textAlign: "center",
                  fontWeight: "300",
                  fontSize: "24px",
                }}
              >
                upload a new version of 3D asset
              </Button>
              <DropzoneDialog
                open={openDz}
                onSave={onUploadImages}
                acceptedFiles={[".gltf", ".glb", ".usdz"]}
                showPreviews={true}
                maxFileSize={50000000}
                filesLimit={2}
                onClose={() => {
                  if (uploading) return notifier.error('Uploading files, please wait,...')
                  return setOpenDz(false)
                }}
                clearOnUnmount={uploaded}
                submitButtonText={
                  uploading ? "Uploading files, please wait,..." : "Save files"
                }
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductTabs;
