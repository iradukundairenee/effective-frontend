import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { QuoteRegistration } from "./QuoteRegistration";
import { useSelector } from "react-redux";
import { getQuotes } from "redux/actions/quote";
import { initialPaginate, paginate } from "utils/paginate";
import { QuoteColumns } from "components/columns/quoteColumns";
import { CustomisedTable } from "components/CustomizedTable";
import { QuoteItemsDialog } from "./QuoteItemsDialog";
import "../../styles/Style.css";
import { ButtonComp } from "../../components/button/Button";
import { TableComp } from "../../components/table/TableComp";
import { BsArrowLeft } from "react-icons/bs";

export const ProposalPage = () => {
  const [buttonPopup, setButtonPopup] = useState(false);
  const quoteState = useSelector((state) => state);
  const [paginatedData, setPaginatedData] = useState([]);
  const [paginator, setPaginator] = useState(initialPaginate());
  const [currentItem, setCurrentItem] = useState(null);
  const [action, setAction] = useState("add");

  const {
    quotesGet: { loading, quotes },
    quoteAdd: { loaded: added, proposalId },
    quoteEdit: { loaded: updated, loading: updating },
    login: { userInfo },
  } = quoteState;
  useEffect(() => {
    if (quotes.length > 0) {
      const { pageNumber, pageSize } = paginator;
      const paginatedData = paginate(quotes, pageNumber, pageSize);
      setPaginatedData(paginatedData);
    }
  }, [quotes, paginator]);
  if (proposalId) {
    window.location.href = `/dashboard/quotes/${proposalId}`;
  }
  useEffect(() => {
    getQuotes();
  }, []);
  useEffect(() => {
    if (added || updated) {
      onReset();
      getQuotes();
    }
  }, [added, updated]);
  const onPageChange = ({ selected }) => {
    setPaginator({ ...paginator, pageNumber: selected + 1 });
  };
  const onQuoteClick = (project = {}, action) => {
    setCurrentItem(project);
    setAction(action);
  };
  const onReset = () => {
    setCurrentItem(null);
    setAction("add");
  };

  return (
    <>
      <Grid>
        <QuoteRegistration action={action} currentItem={currentItem} />

        <QuoteItemsDialog
          open={action === "items"}
          setOpen={() => onReset()}
          quote={currentItem}
          loading={updating}
          user={userInfo.user}
        />
      </Grid>
    </>
  );
};
