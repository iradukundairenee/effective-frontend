import React, { useEffect, useState } from "react";
import { NewComp } from "../../components/table/NewComp";
import { useSelector } from "react-redux";
import { getQuotes } from "redux/actions/quote";
import { initialPaginate, paginate } from "utils/paginate";
import { QuoteColumns } from "components/columns/quoteColumns";
import "../../styles/Style.css";

export const QuotePage = () => {
  const quoteState = useSelector((state) => state);
  const commentState = useSelector((state) => state);
  const [paginatedData, setPaginatedData] = useState([]);
  const [paginator, setPaginator] = useState(initialPaginate());
  const [currentItem, setCurrentItem] = useState(null);
  const [action, setAction] = useState("add");
  const [page, setPage] = useState(1);

  const {
    quotesGet: { loading, quotes, comments },
    quoteAdd: { loaded: added },
    quoteEdit: { loaded: updated },
    login: {
      userInfo: { user },
    },
  } = quoteState;
  const itemsPerPage = 5;
  useEffect(() => {
    if (quotes.length > 0) {
      const { pageNumber, pageSize } = paginator;
      const paginatedData = paginate(quotes, pageNumber, pageSize);
      setPaginatedData(paginatedData);
    }
  }, [quotes, paginator]);
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

  const clientQuotes = quotes.filter((quote) => quote.status !== "Draft");

  return (
    <div>
      <p className="title">All proposals</p>
      <NewComp
        columns={QuoteColumns()}
        loading={loading}
        data={user.role === "Client" ? clientQuotes : quotes}
        withPagination
        dataCount={quotes.length}
        pageCount={itemsPerPage}
        handlePageChange={onPageChange}
        page={page}
        user={user}
      />
    </div>
  );
};
