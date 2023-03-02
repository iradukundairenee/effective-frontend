import React, { useEffect, useState } from "react";
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
  IconButton,
} from "@material-ui/core";
import { useHistory, useParams } from "react-router";
import { useSelector } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { BsArrowLeft } from "react-icons/bs";
import { useStyles } from "./styles";
import pdfIcon from "../../assets/pdf.svg";
import {
  getInvoice,
  createInvoicePdf,
  downloadInvoicePdf,
} from "redux/actions/invoice";
import Loading from "components/loading.component";
import { InvoiceModal } from "./invoiceModal";
import { getClientCoupons } from "redux/actions/coupons";
import PaymentModal from "pages/payments/paymentModal";

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
    fontWeight: 400,
    color: "#7D7D7D",
    padding: "10px 5px",
    borderBottom: "none",
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

export const InvoiceDetails = () => {
  const classes = useStyles();
  const { invoiceId } = useParams();
  const [subTotal, setSubTotal] = useState([]);
  const [couponValue, setCouponValue] = useState([]);
  const [pointsValue, setPointsValue] = useState([]);
  const [openPayModal, setOpenPayModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("");
  const invoiceState = useSelector((state) => state);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenPayModal = () => {
    setOpenPayModal(true);
  };
  const handleClosePayModal = () => {
    setOpenPayModal(false);
  };

  const history = useHistory();
  const {
    invoiceGet: { loading, loaded, invoice },
    createInvoicePdf: { loading: creatingPdf, loaded: pdfCreated },
    downloadInvoicePdf: { loading: downloadingPdf },
    login: {
      userInfo: { user },
    },
  } = invoiceState;

  useEffect(() => {
    if (invoiceId) {
      getInvoice(invoiceId);
    }
  }, [invoiceId]);

  useEffect(() => {
    if (user.role === "Client") getClientCoupons();
  }, [user.role]);

  useEffect(() => {
    if (invoice && loaded) {
      invoice?.items.forEach((item, idx) => (item.serial = idx + 1));
      const itemsTotal = invoice?.items.map((item) => {
        const total = item.quantity * item.price;
        return total;
      });
      const subTotal = (itemsTotal.reduce((a, b) => a + b, 0)).toLocaleString(undefined, { minimumFractionDigits: 2 });
      setSubTotal(subTotal);
      setPointsValue(invoice?.loyaltyPoints * 0.04);
      if (invoice?.coupon && invoice?.coupon.couponType === "Percentage") {
        setCouponValue((subTotal * invoice?.coupon.percentageValue) / 100);
      }
      if (invoice?.coupon && invoice?.coupon.couponType === "Flat") {
        setCouponValue(invoice?.coupon.discountAmount);
      }
    }
  }, [loaded, invoice]);

  useEffect(() => {
    if (pdfCreated) {
      downloadInvoicePdf(invoiceId);
    }
  }, [pdfCreated, invoiceId]);

  const headerColumns = ["S.No", "Name", "Qty", "Price", "Total"];
  const taxAmount = (percentage) => {
    return (percentage / 100) * invoice?.invoiceDetails?.quote?.amounts.subtotal;
  };

  const discountAmount = (quote) => {
    const { discount, discountType } = quote;
    if (discountType === "Percentage") return (discount / 100) * subTotal;
    return discount;
  };

  const downloadPdf = async () => {
    const taxItems = [{
      name: invoice?.invoiceDetails?.user?.currency?.taxName,
      currency: invoice?.invoiceDetails?.user?.currency?.icon,
      amount: invoice?.invoiceDetails?.user?.currency?.taxPercentage,
      total: (taxAmount(invoice?.invoiceDetails?.user?.currency?.taxPercentage)).toLocaleString(undefined, { minimumFractionDigits: 2 }),
    }];

    const items = [];
    const itemsDiscount = invoice?.amounts?.discount.toLocaleString(undefined, { minimumFractionDigits: 2 });
    invoice?.items?.map((item) => {
      items.push({
        name: item.itemId.item,
        quantity: item.quantity,
        price: (item.itemId.price).toLocaleString(undefined, { minimumFractionDigits: 2 }),
        total: (item.itemId.price * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2 }),
        currency: invoice?.invoiceDetails?.user?.currency?.icon,
      });
    });

    const total = (
      invoice?.invoiceDetails?.user?.currency?.taxPercentage +
      subTotal -
      discountAmount(invoice?.invoiceDetails?.quote?.discount) -
      couponValue -
      pointsValue
    ).toLocaleString(undefined, { minimumFractionDigits: 2 });

    const updatedData = [
      invoice,
      subTotal,
      taxItems,
      itemsDiscount,
      total,
      items,
    ];
    await createInvoicePdf(invoiceId, updatedData);
  };

  return (
    <Grid className={classes.root}>
      <Grid className={classes.nav}>
        <Grid className={classes.paper}>
          <Link to="/dashboard/invoices" className={classes.backArrow}>
            <BsArrowLeft />
          </Link>
          <Typography className={classes.title}>View Invoice</Typography>
        </Grid>
        <Grid>
          {loading ? (
            <Loading />
          ) : (
            <Button
              variant="outlined"
              startIcon={<img src={pdfIcon} alt="Pdf Icon" />}
              className={classes.actionButtons}
              onClick={downloadPdf}
            >
              {downloadingPdf ? (
                <i className="fa fa-spinner fa-spin"></i>
              ) : (
                "Download PDF"
              )}
            </Button>
          )}
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
            {invoice?.items &&
              invoice?.items.map((item, itemIdx) => (
                <TableRow key={itemIdx}>
                  <StyledTableCell>0{item.serial}</StyledTableCell>
                  <StyledTableCell style={{ paddingRight: "100px" }}>
                    {item.itemId.item}
                  </StyledTableCell>
                  <StyledTableCell>{item.quantity}</StyledTableCell>
                  <StyledTableCell>
                    {invoice?.invoiceDetails?.user?.currency?.icon} {item.itemId.price.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </StyledTableCell>
                  <StyledTableCell>
                    {invoice?.invoiceDetails?.user?.currency?.icon} {(item.itemId.price * item.quantity).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </StyledTableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell>SubTotal</StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell>
                {invoice?.invoiceDetails?.user?.currency?.icon} {invoice?.invoiceDetails?.quote?.amounts.subtotal.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell>{invoice?.invoiceDetails?.user?.currency?.taxName}</StyledTableCell>
              <StyledTableCell>{invoice?.invoiceDetails?.user?.currency?.taxPercentage}%</StyledTableCell>
              <StyledTableCell>
                {invoice?.invoiceDetails?.user?.currency?.icon}{" "}
                {(invoice?.invoiceDetails?.quote?.amounts.subtotal * invoice?.invoiceDetails?.user?.currency?.taxPercentage) / 100}
              </StyledTableCell>
            </TableRow>
            {invoice?.invoiceDetails?.quote && invoice?.invoiceDetails?.quote?.amounts.discount !== 0 && (
              <TableRow>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell>Discount</StyledTableCell>
                <StyledTableCell>
                  {invoice?.discountType === "Flat" && invoice?.invoiceDetails?.user?.currency?.icon}
                  {invoice?.invoiceDetails?.quote?.discount.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                  {invoice?.discountType === "Percentage" && "%"}
                </StyledTableCell>
                <StyledTableCell>
                  -({invoice?.invoiceDetails?.user?.currency?.icon} {invoice?.invoiceDetails?.quote?.amounts.discount})
                </StyledTableCell>
              </TableRow>
            )}
            {invoice?.loyaltyPoints > 0 && (
              <TableRow>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell>Points</StyledTableCell>
                <StyledTableCell>{invoice?.loyaltyPoints}</StyledTableCell>
                <StyledTableCell>
                  {invoice?.invoiceDetails?.user?.currency?.icon} {pointsValue}
                </StyledTableCell>
              </TableRow>
            )}
            {invoice?.coupon && (
              <TableRow>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell>Coupon</StyledTableCell>
                <StyledTableCell>
                  {invoice?.coupon.couponType === "Percentage"
                    ? invoice?.coupon.percentageValue + "%"
                    : invoice?.invoiceDetails?.user?.currency?.icon + invoice?.coupon.discountAmount}
                </StyledTableCell>
                <StyledTableCell>
                  {invoice?.invoiceDetails?.user?.currency?.icon} {couponValue}
                </StyledTableCell>
              </TableRow>
            )}
            <TableRow>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell>Advance Payment</StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell>{invoice?.invoiceDetails?.user?.currency?.icon} {parseInt(invoice?.invoiceDetails?.amount).toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}</StyledTableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.totalRow}></TableCell>
              <TableCell className={classes.totalRow}></TableCell>
              <TableCell className={classes.totalRow}>Total</TableCell>
              <TableCell className={classes.totalRow}></TableCell>
              <TableCell className={classes.totalRow}>
                {invoice?.invoiceDetails?.user?.currency?.icon} {invoice?.invoiceDetails?.quote?.amounts.total.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
      <Grid style={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton
          variant="outlined"
          className={classes.itemActionBtn}
          onClick={() => history.goBack()}
        >
          Close
        </IconButton>
        {user && user.role === "Client" && (
          <>
            <IconButton
              variant="outlined"
              className={classes.itemActionBtn}
              onClick={() => {
                setAction("coupon");
                handleOpen();
              }}
            >
              Apply Coupon
            </IconButton>
            <IconButton
              variant="outlined"
              className={classes.itemActionBtn}
              onClick={() => {
                setAction("points");
                handleOpen();
              }}
            >
              Apply Points
            </IconButton>
            <IconButton
              style={invoice?.invoiceDetails?.status === 'paid' ? { pointerEvents: 'none' } : { pointerEvents: 'auto' }}
              variant="outlined"
              className={classes.addItemBtn}
              onClick={() => {
                handleOpenPayModal();
              }}
            >
              Pay Invoice
            </IconButton>
          </>
        )}
      </Grid>
      <InvoiceModal open={open} handleClose={handleClose} action={action} />
      <PaymentModal
        open={openPayModal}
        handleClose={handleClosePayModal}
        mode="invoice"
        item={{
          invoiceAmount:
            invoice?.invoiceDetails?.quote &&
            invoice?.invoiceDetails?.quote?.amounts.total,
          invoiceId: invoiceId,
          currency: invoice?.invoiceDetails?.user?.currency?.currencyCode
        }}
      />
    </Grid >
  );
};
