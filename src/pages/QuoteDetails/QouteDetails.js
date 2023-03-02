import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
  Avatar,
  Card,
  IconButton,
} from "@material-ui/core";
import { useParams, useHistory } from "react-router";
import { useSelector } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { BsArrowLeft } from "react-icons/bs";
import { useStyles } from "./styles";
import { DraftEditor } from "components/DraftEditor";
import { EditorState } from "draft-js";
import { stateFromHTML } from "draft-js-import-html";
import { toHtml } from "utils/helper";
import parse from "html-react-parser";
import acceptIcon from "../../assets/accept.svg";
import rejectIcon from "../../assets/reject.svg";
import pdfIcon from "../../assets/pdf.svg";
import sendIcon from "../../assets/send.svg";
import { UpdateOrAddItem } from "./updateOrAddItemModal";
import { AddComment } from "./AddCommentModal";
import {
  getQuote,
  deleteQuoteItem,
  deleteQuoteTax,
  sendQuote,
  acceptQuote,
  rejectQuote,
  updateQuoteDiscount,
  createPdf,
  downloadPdf,
  updateLicenseAgreement,
} from "redux/actions/quote";
import Loading from "components/loading.component";
import { AddOrUpdateTaxModel } from "./addOrUpdateTaxModel";
import { updateProposalText } from "redux/actions/quote";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { AddOrUpdateDiscountModel } from "./addOrUpdateDiscountModel";
import { getQuoteComments } from "redux/actions/Comment";
import { getCurrencyByUser } from "redux/actions/currency";
import moment from "moment";

const StyledTableCell = withStyles((theme) => ({
  head: {
    background: "#8967FC",
    color: "#fff",
    fontSize: 18,
    fontWeight: 700,
    fontFamily: "Poppins",
    padding: "25px 5px",
    textAlign: "justify",
    paddingLeft: "30px",
    "&:first-child": {
      borderRadius: "10px 0 0 0",
    },
    "&:last-child": {
      borderRadius: "0 10px 0 0",
    },
  },
  body: {
    fontSize: 16,
    fontFamily: "Poppins",
    color: "#7D7D7D",
    padding: "10px 5px",
    borderBottom: "none",
    fontWeight: 400,
    textAlign: "justify",
    paddingLeft: "30px",
  },
  footer: {
    fontSize: 16,
    fontFamily: "Poppins",
    fontWeight: 700,
    color: "#303030",
    background: "#EFF0F6",
    borderBottom: "none",
    textAlign: "justify",
    paddingLeft: "30px",
  },
}))(TableCell);

export const QuoteDetails = () => {
  const history = useHistory();
  const classes = useStyles();
  const { quoteId } = useParams();
  const [action, setAction] = useState("add");
  const [propTextState, setPropTextState] = useState(EditorState.createEmpty());
  const [licenseTextState, setLicenseTextState] = useState(
    EditorState.createEmpty()
  );
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [openComment, setOpenComment] = useState(false);
  const handleOpenComment = () => setOpenComment(true);
  const handleCloseComment = () => setOpenComment(false);
  const handleClose = () => setOpen(false);
  const [openEditLicense, setOpenEditLicense] = useState(false);
  const [editProposalOpen, setEditProposalOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState({});
  const state = useSelector((state) => state);
  const [subTotal, setSubTotal] = useState([]);
  const [addingTax, setAddingTax] = useState(false);
  const [taxModelStatus, setTaxModelStatus] = useState();
  const [updateTaxData, setUpdateTaxData] = useState(null);
  const [addingDiscount, setAddingDiscount] = useState(false);
  const [discountModelStatus, setDiscountModelStatus] = useState();
  const [updateDiscountData, setUpdateDiscountData] = useState(null);
  const {
    quoteGet: { loading, loaded, quote },
    createQuotePdf: { loading: creatingPdf, loaded: pdfCreated },
    downloadQuotePdf: { loading: downloadingPdf },
    login: {
      userInfo: { user },
    },
    commentGet: { comment },
    commentAdd: { commentAdded },
    addQuoteTax: { addedTax },
    updateQuoteDiscount: { updatedQuoteDiscount },
    updateProposalText: { updatedProposalText },
    quoteEdit: { updatedQuote },
    updateLicenseAgreement: { updatedLicenseAgreement },
  } = state;

  useEffect(() => {
    if (quoteId) {
      getQuote(quoteId);
    }
  }, [
    quoteId,
    addedTax,
    updatedQuoteDiscount,
    updatedQuote,
    updatedProposalText,
    updatedLicenseAgreement,
  ]);
  useEffect(() => {
    getQuoteComments(quoteId);
  }, [quoteId, commentAdded]);
  useEffect(() => {
    if (pdfCreated) {
      downloadPdf(quoteId);
    }
  }, [pdfCreated, quoteId]);
  useEffect(() => {
    if (quote && loaded) {
      quote?.items.forEach((item, idx) => (item.serial = idx + 1));
    }
  }, [loaded, quote]);
  const headerColumns =
    user.role !== "Client"
      ? ["S.No", "Name", "Actions", "Qty", "Price", "Total"]
      : ["S.No", "Name", "Qty", "Price", "Total"];

  const taxAmount = (percentage) => {
    return (percentage / 100) * quote?.amounts?.subtotal;
  };

  const handleActions = async (quoteId, action) => {
    if (user.role === "Client" && action === "Accept") {
      await acceptQuote(quoteId);
      history.push("/dashboard/quotes");
    } else if (user.role === "Client" && action === "Reject") {
      await rejectQuote(quoteId);
      history.push("/dashboard/quotes");
    } else if (
      (user.role === "Admin" || user.role === "Manager") &&
      action === "Send"
    ) {
      await sendQuote(quoteId);
      history.push("/dashboard/quotes");
    }
  };

  const handleUpdateProposalText = (quote) => {
    setEditProposalOpen(false);
    let newProposalText = toHtml(propTextState);
    updateProposalText(quote?.quote?._id, newProposalText);
  };

  const handleUpdateLicenseAgreement = () => {
    setOpenEditLicense(false);
    let newLicenseAgreement = toHtml(licenseTextState);
    updateLicenseAgreement(newLicenseAgreement);
  };

  const onDeleteItem = (itemId, quoteId) => {
    deleteQuoteItem(itemId, quoteId);
    window.location.reload(true);
  };

  // delete quote tax
  const deleteTax = async (taxId) => {
    await deleteQuoteTax(quoteId, taxId);
    await getQuote(quoteId);
  };

  // remove quote discount
  const removeDiscount = async () => {
    await updateQuoteDiscount(quoteId, { discount: 0 });
    await getQuote(quoteId);
  };

  const downloadProposalPdf = async () => {
    const taxItems = [
      {
        name: quote?.user?.currency?.taxName,
        currency: quote?.user?.currency?.icon,
        amount: quote?.user?.currency?.taxPercentage,
        total: taxAmount(quote?.user?.currency?.taxPercentage).toLocaleString(
          undefined,
          { minimumFractionDigits: 2 }
        ),
      },
    ];

    const items = [];

    quote?.items?.map((item) => {
      items.push({
        name: item.item?.item,
        quantity: item.quantity,
        price: (item.item?.price).toLocaleString(undefined, {
          minimumFractionDigits: 2,
        }),
        total: (item.item?.price * item.quantity).toLocaleString(undefined, {
          minimumFractionDigits: 2,
        }),
        currency: quote?.user?.currency?.icon,
      });
    });

    const itemsDiscount = quote?.amounts?.discount;
    const proposalText = quote?.propasalText.replace(/<[^>]*>/g, "");
    const total = quote?.amounts?.total;
    const updatedData = [
      { quote },
      subTotal,
      taxItems,
      itemsDiscount,
      total,
      proposalText,
      items,
    ];
    createPdf(quoteId, updatedData);
  };

  return (
    <Grid className={classes.root}>
      <Grid className={classes.nav}>
        <Grid className={classes.paper}>
          <Link to="/dashboard/quotes" className={classes.backArrow}>
            <BsArrowLeft />
          </Link>
          <Typography className={classes.title}>
            Manage Proposal Items
          </Typography>
        </Grid>
        <Grid>
          {user.role === "Client" &&
            (quote?.status === "Accepted" || quote?.status === "Delivered") && (
              <Button
                variant="outlined"
                startIcon={<img src={acceptIcon} alt="Accept Icon" />}
                className={classes.actionButtons}
                style={
                  quote?.status === "Accepted"
                    ? { pointerEvents: "none" }
                    : { pointerEvents: "auto" }
                }
                onClick={() => handleActions(quoteId, "Accept")}
              >
                {quote?.status === "Accepted" ? "Accepted" : "Accept"}
              </Button>
            )}

          {user.role !== "Client" && quote?.status === "Draft" && (
            <Button
              variant="outlined"
              startIcon={<img src={sendIcon} alt="Send Icon" />}
              className={classes.sendActionButton}
              onClick={() => handleActions(quoteId, "Send")}
            >
              Send
            </Button>
          )}

          {user.role === "Client" && quote?.status === "Delivered" && (
            <Button
              variant="outlined"
              startIcon={<img src={rejectIcon} alt="Reject Icon" />}
              className={classes.actionButtons}
              onClick={() => handleActions(quoteId, "Reject")}
            >
              Reject
            </Button>
          )}

          <Button
            variant="outlined"
            startIcon={<img src={pdfIcon} alt="Pdf Icon" />}
            className={classes.actionButtons}
            onClick={downloadProposalPdf}
          >
            {creatingPdf || downloadingPdf ? (
              <i className="fa fa-spinner fa-spin"></i>
            ) : (
              "Download PDF"
            )}
          </Button>
        </Grid>
      </Grid>
      {loading ? (
        <Loading />
      ) : (
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {headerColumns.map((column, columnIdx) => (
                <StyledTableCell key={columnIdx}>{column}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {user.role === "Client"
              ? quote?.items &&
                quote?.items.map((item, itemIdx) => (
                  <TableRow key={itemIdx}>
                    <StyledTableCell>0{item.serial}</StyledTableCell>
                    <StyledTableCell>{item.item?.item}</StyledTableCell>
                    <StyledTableCell>{item.quantity}</StyledTableCell>
                    <StyledTableCell>
                      {quote?.user?.currency?.icon} {item.item?.price}
                    </StyledTableCell>
                    <StyledTableCell>
                      {quote?.user?.currency?.icon}{" "}
                      {(item.quantity * item.item?.price).toLocaleString()}
                    </StyledTableCell>
                  </TableRow>
                ))
              : quote?.items &&
                quote?.items.map((item, itemIdx) => (
                  <TableRow key={itemIdx}>
                    <StyledTableCell>0{item?.serial}</StyledTableCell>
                    <StyledTableCell>{item.item?.item}</StyledTableCell>
                    <StyledTableCell>
                      <Button
                        onClick={() => {
                          setAction("edit");
                          setItemToEdit(item);
                          return handleOpen(true);
                        }}
                      >
                        <MdOutlineModeEditOutline
                          className={classes.editButton}
                        />
                      </Button>
                      <Button onClick={() => onDeleteItem(item._id, quoteId)}>
                        <RiDeleteBin5Line className={classes.deleteButton} />
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell>
                      {item.quantity.toLocaleString()}
                    </StyledTableCell>
                    <StyledTableCell>
                      {quote?.user?.currency?.icon}{" "}
                      {item.item?.price.toLocaleString()}
                    </StyledTableCell>
                    <StyledTableCell>
                      {quote?.user?.currency?.icon}{" "}
                      {(item.quantity * item.item?.price).toLocaleString()}
                    </StyledTableCell>
                  </TableRow>
                ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell></StyledTableCell>
              {user.role !== "Client" ? (
                <>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell>SubTotal</StyledTableCell>
                </>
              ) : (
                <StyledTableCell>SubTotal</StyledTableCell>
              )}
              <StyledTableCell></StyledTableCell>
              {quote && (
                <StyledTableCell>
                  {quote?.user?.currency?.icon}{" "}
                  {quote?.amounts?.subtotal.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </StyledTableCell>
              )}
            </TableRow>
            <TableRow>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell></StyledTableCell>
              {user.role !== "Client" && (
                <>
                  <StyledTableCell></StyledTableCell>
                </>
              )}
              <StyledTableCell>
                {quote?.user?.currency?.taxName}
              </StyledTableCell>
              <StyledTableCell>
                {quote?.user?.currency?.taxPercentage}%
              </StyledTableCell>
              <StyledTableCell>
                {quote?.user?.currency?.icon}{" "}
                {taxAmount(quote?.user?.currency?.taxPercentage).toLocaleString(
                  undefined,
                  {
                    minimumFractionDigits: 2,
                  }
                )}
              </StyledTableCell>
            </TableRow>
            {quote?.discount && quote?.discount !== 0 ? (
              <TableRow>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
                {user.role !== "Client" && (
                  <StyledTableCell>
                    <Button
                      onClick={() => {
                        setAddingDiscount(true);
                        setUpdateDiscountData({
                          discount: quote?.discount,
                          discountType: quote?.discountType,
                        });
                        setDiscountModelStatus("updateDiscount");
                      }}
                    >
                      <MdOutlineModeEditOutline
                        className={classes.editButton}
                      />
                    </Button>
                    <Button onClick={() => removeDiscount()}>
                      <RiDeleteBin5Line className={classes.deleteButton} />
                    </Button>
                  </StyledTableCell>
                )}
                <StyledTableCell>Discount</StyledTableCell>
                <StyledTableCell>
                  {quote?.discountType === "Flat" &&
                    quote?.user?.currency?.icon}{" "}
                  {quote?.discount.toLocaleString()}
                  {quote?.discountType === "Percentage" && "%"}
                </StyledTableCell>
                <StyledTableCell>
                  {quote?.user?.currency?.icon}{" "}
                  {quote?.amounts?.discount.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </StyledTableCell>
              </TableRow>
            ) : (
              ""
            )}
            <TableRow>
              <TableCell className={classes.totalRow}></TableCell>
              <TableCell className={classes.totalRow}></TableCell>
              {user.role !== "Client" ? (
                <>
                  <TableCell className={classes.totalRow}></TableCell>
                  <TableCell className={classes.totalRow}>Total</TableCell>
                </>
              ) : (
                <TableCell className={classes.totalRow}>Total</TableCell>
              )}
              <TableCell className={classes.totalRow}></TableCell>
              <TableCell className={classes.totalRow}>
                {quote?.user?.currency?.icon}{" "}
                {quote?.amounts &&
                  quote?.amounts?.total.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
      <UpdateOrAddItem
        open={open}
        action={action}
        quoteId={quoteId}
        item={itemToEdit}
        handleClose={handleClose}
        currency={quote?.user?.currency?.icon}
      />
      <AddComment
        open={openComment}
        handleClose={handleCloseComment}
        quoteId={quoteId}
      />
      {user.role !== "Client" ? (
        <Grid style={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton
            variant="outlined"
            className={`${classes.itemActionBtn} ${
              quote?.discount !== 0 && classes.buttonDisabled
            }`}
            onClick={() => {
              setAddingDiscount(true);
              setUpdateDiscountData(null);
              setDiscountModelStatus("addDiscount");
            }}
          >
            Add Discount
          </IconButton>
          <IconButton
            variant="outlined"
            className={classes.addItemBtn}
            onClick={() => {
              handleOpen();
              return setAction("add");
            }}
          >
            Add Item
          </IconButton>
        </Grid>
      ) : (
        ""
      )}

      {/* add discount */}
      <AddOrUpdateDiscountModel
        addingDiscount={addingDiscount}
        setAddingDiscount={setAddingDiscount}
        quoteId={quoteId}
        discountModelStatus={discountModelStatus}
        updateDiscountData={updateDiscountData}
      />

      {/*  comment */}
      <Grid className={classes.conversationContainer}>
        <Typography className={classes.cardTitle}>Added Comments</Typography>
        <div className={classes.conversation}>
          {comment &&
            comment.map((item, id) =>
              item?.userId?._id !== user._id ? (
                <Grid
                  item
                  style={{
                    display: "flex",
                    width: "70%",
                    marginTop: "5px",
                  }}
                  key={id}
                >
                  <div>
                    <Avatar
                      src={item?.userId?.profileImage}
                      style={{ width: "40px", height: "40px" }}
                    />
                    <Typography>{item?.userId?.firstName}</Typography>
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
                          fontWeight: "300",
                          fontSize: "16px",
                          wordBreak: "break-all",
                          color: "#7D7D7D",
                        }}
                      >
                        {item.comment}
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
                      {moment(item.createdAt).format("Do MMM YYYY, h:mm:ss A")}
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
                    marginTop: "5px",
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
                          fontWeight: "300",
                          fontSize: "16px",
                          wordBreak: "break-all",
                          color: "#fff",
                        }}
                      >
                        {item.comment}
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
                      {moment(item.createdAt).format("Do MMM YYYY, h:mm:ss A")}
                    </Typography>
                  </div>
                  <div>
                    <Avatar
                      src={item?.userId?.profileImage}
                      style={{ width: "40px", height: "40px" }}
                    />
                    <Typography>{item?.userId?.firstName}</Typography>
                  </div>
                </Grid>
              )
            )}
        </div>
      </Grid>
      <Grid style={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton
          variant="outlined"
          className={classes.itemActionBtn}
          onClick={handleOpenComment}
        >
          Add Comment
        </IconButton>
      </Grid>
      <Card className={classes.card}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            alignContent: "center",
            padding: "10px",
          }}
        >
          <Typography className={classes.cardTitle}>Proposal Text</Typography>
          {user.role !== "Client" && (
            <Button
              variant="outlined"
              className={classes.itemActionBtn}
              onClick={() => {
                setEditProposalOpen(true);
                const propasalText = stateFromHTML(quote?.propasalText);
                setPropTextState(EditorState.createWithContent(propasalText));
              }}
            >
              Edit
            </Button>
          )}
        </div>
        {editProposalOpen ? (
          <>
            <DraftEditor
              editorState={propTextState}
              setEditorState={setPropTextState}
            />
            <Button
              variant="contained"
              style={{
                float: "right",
                margin: "10px",
              }}
              className={classes.addItemBtn}
              onClick={() => handleUpdateProposalText(quote)}
            >
              Save
            </Button>
          </>
        ) : (
          <div id="proposal" className={classes.cardContent}>
            {loaded && parse(quote?.propasalText)}
          </div>
        )}
      </Card>
      <Card className={classes.card}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            alignContent: "center",
            padding: "10px",
          }}
        >
          <Typography className={classes.cardTitle}>
            License Agreement
          </Typography>
          {user.role === "Admin" && (
            <Button
              variant="outlined"
              className={classes.itemActionBtn}
              onClick={() => {
                setOpenEditLicense(true);
                const licenseText = stateFromHTML(
                  quote?.licenseText?.agreement
                );
                setLicenseTextState(EditorState.createWithContent(licenseText));
              }}
            >
              Edit
            </Button>
          )}
        </div>
        {openEditLicense ? (
          <>
            <DraftEditor
              editorState={licenseTextState}
              setEditorState={setLicenseTextState}
            />
            <Button
              variant="contained"
              style={{
                float: "right",
                margin: "10px",
              }}
              className={classes.addItemBtn}
              onClick={() => handleUpdateLicenseAgreement()}
            >
              Save
            </Button>
          </>
        ) : (
          <Typography className={classes.cardContent}>
            {loaded &&
              quote?.licenseText?.agreement &&
              parse(quote?.licenseText?.agreement)}
          </Typography>
        )}
      </Card>
    </Grid>
  );
};
