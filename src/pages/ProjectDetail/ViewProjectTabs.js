import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Card,
  FormControl,
  Input,
  Avatar,
} from "@material-ui/core";
import HtmlParser from "react-html-parser";
import Loading from "components/loading.component";
import { NoDisplayData } from "components/NoDisplayData";
import { IoIosAttach } from "react-icons/io";
import { BiSend } from "react-icons/bi";
import moment from "moment";
import { useSelector } from "react-redux";
import { getNotifications } from "redux/actions/dashboard";
import "./styles.css";
import { ICON_PATH } from "../../utils/constants";
import { useStyles } from "./styles";
import {
  getProjectConversation,
  addConversation,
} from "redux/actions/conversation";
import { PROFILES_PATH } from "utils/constants";
import { EditorState } from "draft-js";
import { stateFromHTML } from "draft-js-import-html";
import { DraftEditor } from "components/DraftEditor";
import { toHtml } from "utils/helper";
import { notifier } from "utils/notifier";

const logInitialState = { content: "", description: "" };

export const ProjectTabs = ({ project }) => {
  const classes = useStyles();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [activeTab, setActiveTab] = useState(0);
  const [conv, setConv] = useState(logInitialState);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const tabs = ["Description", "Conversation", "3D Assets"];
  const changeTab = (idx) => {
    setActiveTab(idx);
  };
  const appState = useSelector((state) => state);
  const {
    login: {
      userInfo: { user },
    },
    projectProductsGet: {
      loading: productsLoading,
      loaded: loadedProds,
      projectProducts,
    },
    conversationGet: { conversation, loading },
    conversationAdd: { conversationChange },
  } = appState;

  useEffect(() => {
    getProjectConversation(project._id);
  }, [project._id, conversationChange]);

  useEffect(() => {
    if (activeTab === 1) {
      getNotifications();
    }
  }, [activeTab]);

  useEffect(() => {
    setTitle("");
    setEditorState(EditorState.createEmpty());
  }, [conversationChange]);

  const onHandleChange = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  return (
    <div className={classes.root}>
      <div className={"w-full border-box"}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
          className="ar-tab grid"
        >
          {tabs.map((tab, idx) => (
            <div
              onClick={() => changeTab(idx)}
              className={activeTab === idx ? "active" : ""}
              style={{
                width: "100%",
                height: "100%",
              }}
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
                  {HtmlParser(project.description)}
                </Typography>
              </Grid>
            </Grid>
          )}

          {activeTab === 1 && (
            <div className="w-full tab-content">
              <Grid className={classes.conversationContainer}>
                <div className={classes.conversation}>
                  {conversation.map((item, id) =>
                    item?.user?._id !== user._id ? (
                      <Grid
                        item
                        style={{
                          display: "flex",
                          width: "70%",
                        }}
                        key={id}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            width: "47px",
                          }}
                        >
                          <Avatar
                            src={item?.user?.profileImage}
                            style={{ width: "40px", height: "40px" }}
                          />
                          <Typography
                            style={{
                              color: "#303030",
                              fontWeight: "300",
                              fontFamily: "Poppins",
                              fontSize: "12px",
                            }}
                          >
                            {item.user?.firstName.length > 8
                              ? item.user?.firstName.substring(0, 6) + "..."
                              : item.user?.firstName}
                          </Typography>
                        </div>
                        <div>
                          <Grid
                            style={{
                              background: "#DFE6EC",
                              borderRadius: "0px 20px 20px 20px",
                              padding: "10px",
                              marginLeft: "10px",
                            }}
                          >
                            <Typography
                              style={{
                                fontFamily: "Poppins",
                                fontWeight: "400",
                                fontSize: "18px",
                                wordBreak: "break-all",
                                color: "#303030",
                              }}
                            >
                              {item?.title}
                            </Typography>
                            <Typography
                              style={{
                                fontFamily: "Poppins",
                                fontWeight: "300",
                                fontSize: "16px",
                                wordBreak: "break-all",
                                color: "#7D7D7D",
                              }}
                            >
                              {HtmlParser(item.message)}
                            </Typography>
                          </Grid>
                          <span
                            style={{
                              color: "#303030",
                              fontWeight: "300",
                              fontFamily: "Poppins",
                              fontSize: "12px",
                              marginLeft: "20px",
                            }}
                          >
                            {moment(item.createdAt).format(
                              "Do MMM YYYY, h:mm:ss A"
                            )}
                          </span>
                        </div>
                      </Grid>
                    ) : (
                      <Grid
                        key={id}
                        item
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          marginLeft: "20%",
                        }}
                      >
                        <div>
                          <Grid
                            style={{
                              background: "#8967FC",
                              borderRadius: "20px 0 20px 20px",
                              padding: "10px",
                              marginRight: "10px",
                              textAlign: "left",
                            }}
                          >
                            <Typography
                              style={{
                                fontFamily: "Poppins",
                                fontWeight: "400",
                                fontSize: "18px",
                                wordBreak: "break-all",
                                color: "#fff",
                              }}
                            >
                              {item?.title}
                            </Typography>
                            <Typography
                              style={{
                                fontFamily: "Poppins",
                                fontWeight: "300",
                                fontSize: "16px",
                                wordBreak: "break-all",
                                color: "#fff",
                              }}
                            >
                              {HtmlParser(item.message)}
                            </Typography>
                          </Grid>
                          <Typography
                            style={{
                              color: "#303030",
                              fontWeight: "300",
                              fontFamily: "Poppins",
                              fontSize: "12px",
                              marginRight: "20px",
                              textAlign: "right",
                            }}
                          >
                            {moment(item.createdAt).format(
                              "Do MMM YYYY, h:mm:ss A"
                            )}
                          </Typography>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            width: "47px",
                          }}
                        >
                          <Avatar
                            src={item?.user?.profileImage}
                            style={{ width: "40px", height: "40px" }}
                          />
                          <Typography
                            style={{
                              color: "#303030",
                              fontWeight: "300",
                              fontFamily: "Poppins",
                              fontSize: "12px",
                              textAlign: "right",
                            }}
                          >
                            {item.user?.firstName?.length > 8
                              ? item.user?.firstName?.substring(0, 6) + "..."
                              : item.user?.firstName}
                          </Typography>
                        </div>
                      </Grid>
                    )
                  )}
                </div>
                {loading ? (
                  <Loading />
                ) : conversation.length === 0 ? (
                  <NoDisplayData message="No conversations found" />
                ) : null}
                <Grid
                  style={{
                    background: "#EFF0F6",
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "15px 10px",
                    borderRadius: "6px",
                    marginTop: "20px",
                  }}
                >
                  <FormControl
                    style={{
                      flex: 2,
                    }}
                  >
                    <Input
                      style={{
                        fontFamily: "Poppins",
                        fontSize: "16px",
                        fontWeight: "500",
                        color: "#000",
                        paddingLeft: "15px",
                      }}
                      disableUnderline={true}
                      name="title"
                      placeholder="Add title here"
                      value={title}
                      onChange={onHandleChange}
                      required
                    />
                    <DraftEditor
                      editorState={editorState}
                      setEditorState={setEditorState}
                      menuHidden={true}
                      placeholder="Add message here"
                    />
                  </FormControl>
                  <Grid
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignContent: "flex-end",
                      alignItems: "flex-end",
                    }}
                  >
                    <IoIosAttach size={30} style={{ marginTop: "20px" }} />
                    <BiSend
                      style={{
                        background: "#8967FC",
                        borderRadius: "6px",
                        width: "40px",
                        padding: "10px 0",
                        textAlign: "center",
                        marginTop: "10px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        if (toHtml(editorState).length > 8) {
                          addConversation(project._id, {
                            title: title,
                            message: toHtml(editorState),
                          });
                        } else {
                          notifier.error("Message is required");
                        }
                      }}
                      color="#fff"
                      size={25}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </div>
          )}

          {activeTab === 2 && (
            <div
              style={{
                width: "100%",
              }}
              className="w-full tab-content"
            >
              <Grid container>
                <Grid item md={6} xs={12}>
                  <Card className={classes.assetContainer}>
                    <Typography
                      style={{
                        fontFamily: "Poppins",
                        fontWeight: 600,
                        fontSize: "20px",
                        color: "#303030",
                      }}
                    >
                      History
                    </Typography>
                    {productsLoading ? (
                      <Loading />
                    ) : projectProducts.length === 0 ? (
                      <NoDisplayData message="No assets found" />
                    ) : null}
                    {projectProducts?.map((item) => {
                      return (
                        <Grid
                          item
                          style={{
                            display: "flex",
                            marginTop: "30px",
                            justifyContent: "space-between",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                            }}
                          >
                            <img
                              src={`${ICON_PATH}/${item.product?.imageIcon}`}
                              width="40"
                              alt="3D-asset"
                            />
                            <Grid style={{ marginLeft: "10px" }}>
                              <Typography
                                style={{
                                  color: "#303030",
                                  fontFamily: "Poppins",
                                  fontSize: "18px",
                                  fontWeight: "400",
                                }}
                              >
                                {item.product?.name}
                              </Typography>
                              <Typography
                                style={{
                                  color: "#7D7D7D",
                                  fontFamily: "Poppins",
                                  fontSize: "16px",
                                  fontWeight: "400",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  window.location.href = `/dashboard/viewProjectProduct/${item.product?._id}`;
                                }}
                              >
                                Click to View Asset
                              </Typography>
                            </Grid>
                          </div>
                          <Typography
                            style={{
                              color: "#303030",
                              fontFamily: "Poppins",
                              fontSize: "16px",
                              fontWeight: "400",
                            }}
                          >
                            {item.product?.customer.firstName}(
                            {item.product?.customer.role})- On{" "}
                            {moment(item.product?.createdAt).format(
                              "Do MMM YYYY, h:mm:ss A"
                            )}
                          </Typography>
                        </Grid>
                      );
                    })}
                  </Card>
                </Grid>
              </Grid>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
