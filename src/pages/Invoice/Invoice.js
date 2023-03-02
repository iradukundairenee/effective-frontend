import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getInvoices } from "redux/actions/invoice";
import { InvoiceColumns } from "components/columns";
import { InvoiceTable } from "components/table/invoiceTable";

export const InvoicePage = () => {
  const invoiceState = useSelector((state) => state);
  const {
    invoicesGet: { loading, invoices },
  } = invoiceState;

  useEffect(() => {
    getInvoices({});
  }, []);
  const itemsPerPage = 5;

  return (
    <div>
      <p className="title">All Invoices</p>
      <InvoiceTable
        columns={InvoiceColumns()}
        loading={loading}
        data={invoices}
        withPagination
        dataCount={invoices.length}
        pageCount={itemsPerPage}
      />
    </div>
  );
};
