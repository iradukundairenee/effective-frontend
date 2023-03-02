import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  ButtonGroup,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getInvoices,
  getInvoice,
  createInvoicePdf,
  downloadInvoicePdf,
  clearPdfDownloadStates,
} from "redux/actions/invoice";
import pdfIcon from "../../assets/pdf2.svg";
import viewIcon from "../../assets/view.svg";

const statusStyles = (item) => {
  if (item.status === "Paid") {
    return {
      background: "rgba(47, 186, 86, 0.2)",
      color: "#2FBA56",
      borderRadius: "15px",
      textAlign: "center",
      width: "70%",
    };
  } else if (item.status === "Partially Paid") {
    return {
      background: "rgba(28, 89, 247, 0.2)",
      borderRadius: "15px",
      textAlign: "center",
      width: "70%",
      color: "#1C59F7",
    };
  } else if (item.status === "Cancelled") {
    return {
      background: "rgba(246, 25, 25, 0.2)",
      borderRadius: "15px",
      textAlign: "center",
      width: "70%",
      color: "#FE0000",
    };
  }
  return {
    background: "rgba(254, 183, 0, 0.2)",
    borderRadius: "15px",
    textAlign: "center",
    width: "70%",
    color: "#FEB700",
  };
};

export const InvoiceColumns = () => {
  const invoiceState = useSelector((state) => state);
  const [subTotal, setSubTotal] = useState([]);
  const [download, setDownload] = useState(false);
  const [invoiceId, setInvoiceId] = useState(null);

  const {
    invoicesGet: { invoices },
    invoiceGet: { loaded, invoice },
    createInvoicePdf: { loaded: pdfCreated },
    downloadInvoicePdf: { loading: downloadingPdf },
    login: {
      userInfo: { user },
    },
  } = invoiceState;

  useEffect(() => {
    getInvoices({});
  }, []);


  useEffect(() => {
    if (invoiceId) {
      getInvoice(invoiceId);
    }
  }, [invoiceId]);

  useEffect(() => {
    invoices.forEach((invoice, index) => (invoice.serial = index + 1));
  }, [invoices]);

  useEffect(() => {
    if (invoice && loaded && download) {
      createPdf(invoiceId);
    }
  }, [loaded, invoice, download]);

  useEffect(() => {
    if (pdfCreated && download) {
      setDownload(false);
      downloadInvoicePdf(invoiceId);
      clearPdfDownloadStates();
    }
  }, [pdfCreated, invoice, download]);

  const downloadPdf = (invoiceId) => {
    setDownload(true);
    setInvoiceId(invoiceId);
    getInvoice(invoiceId);
  };

  const taxAmount = (percentage) => {
    return (percentage / 100) * invoice?.invoiceDetails?.quote?.amounts.subtotal;
  };

  const createPdf = async (invoiceId) => {
    const taxItems = [{
      name: invoice?.invoiceDetails?.user?.currency?.taxName,
      currency: invoice?.invoiceDetails?.user?.currency?.icon,
      amount: invoice?.invoiceDetails?.user?.currency?.taxPercentage,
      total: (taxAmount(invoice?.invoiceDetails?.user?.currency?.taxPercentage)).toLocaleString(undefined, { minimumFractionDigits: 2 }),
    }];

    const items = [];
    const itemsDiscount = invoice?.quote?.amounts?.discount;
    invoice.items?.map((item) => {
      items.push({
        name: item.itemId.item,
        quantity: item.quantity,
        price: (item.itemId.price).toLocaleString(undefined, { minimumFractionDigits: 2 }),
        total: (item.itemId.price * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2 }),
        currency: invoice.currency,
      });
    });

    let total = invoice?.quote?.amounts?.total;
    let subTotal = invoice?.quote?.amounts?.subtotal;
    const updatedData = [
      invoice,
      subTotal,
      taxItems,
      itemsDiscount,
      total,
      items,
    ];
    createInvoicePdf(invoiceId, updatedData);
  };

  const companyName = () => {
    if (user.role !== "Client") {
      return {
        content: (item) => (
          <Typography
            style={{
              color: "#7D7D7D",
              fontFamily: "Poppins",
              fontWeight: "400",
              fontSize: "16px",
            }}
          >
            {item?.user?.companyName}
          </Typography>
        ),
        label: "Company",
      };
    }
  };
  return [
    {
      content: (item) => (
        <Typography
          style={{
            color: "#7D7D7D",
            fontFamily: "Poppins",
            fontWeight: "400",
            fontSize: "16px",
          }}
        >
          0{item.serial}
        </Typography>
      ),
      label: "S.No",
    },
    {
      content: (item) => (
        <Typography
          style={{
            color: "#7D7D7D",
            fontFamily: "Poppins",
            fontWeight: "400",
            fontSize: "16px",
          }}
        >
          {item.project?.name}
        </Typography>
      ),
      label: "Project",
    },
    { ...companyName() },
    {
      content: (item) => (
        <Typography
          style={{
            color: "#7D7D7D",
            fontFamily: "Poppins",
            fontWeight: "400",
            fontSize: "16px",
          }}
        >
          {item?.type}
        </Typography>
      ),
      label: "Invoice Type",
    },
    {
      content: (item) => (
        <Typography
          style={{
            color: "#7D7D7D",
            fontFamily: "Poppins",
            fontWeight: "400",
            fontSize: "16px",
          }}
        >
          {moment(item.due_date).format("DD MMM YYYY")}
        </Typography>
      ),
      label: "Due date",
    },
    {
      content: (item) => (
        <Typography
          style={{
            color: "#7D7D7D",
            fontFamily: "Poppins",
            fontWeight: "400",
            fontSize: "16px",
          }}
        >
          {item?.user?.currency?.icon}{item.quote?.amounts.total.toLocaleString("en-US")}
        </Typography>
      ),
      label: "Amount",
    },
    {
      content: (item) => (
        <Typography style={statusStyles(item)}>{item.status}</Typography>
      ),
      label: "Status",
    },
    {
      content: (item) => (
        <>
          <ButtonGroup variant="outlined" size="large">
            <Tooltip title="Download Invoice">
              <IconButton
                aria-label="Download"
                size="large"
                style={{
                  color: "#7D7D7D",
                  fontFamily: "Poppins",
                  fontWeight: "400",
                }}
                onClick={() => downloadPdf(item._id)}
              >
                {item._id === invoice._id && download ? (
                  <i className="fa fa-spinner fa-spin"></i>
                ) : (
                  <img src={pdfIcon} alt="pdf icon" />
                )}
              </IconButton>
            </Tooltip>
          </ButtonGroup>
          <ButtonGroup variant="outlined" size="large">
            <Tooltip title="View">
              <IconButton
                aria-label="View"
                component={Link}
                to={`/dashboard/invoices/${item._id}`}
                size="large"
                style={{
                  color: "#7D7D7D",
                  fontFamily: "Poppins",
                  fontWeight: "400",
                }}
              >
                <img src={viewIcon} alt="view icon" />
              </IconButton>
            </Tooltip>
          </ButtonGroup>
        </>
      ),
      label: "Actions",
    },
  ];
};
