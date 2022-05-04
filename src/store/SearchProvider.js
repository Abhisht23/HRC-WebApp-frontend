import { useReducer } from "react";
import SearchContext from "./search-context";
import axios from "axios";

const defaultSearchState = {
  docId: "",
  invoiceId: "",
  customerNumber: "",
  businessYear: "",
};

const searchReducer = (state, action) => {
  if (action.type === "ADD") {
    return {
      docId: action.item.docId,
      invoiceId: action.item.invoiceId,
      customerNumber: action.item.customerNumber,
      businessYear: action.item.businessYear,
    };
  }
  if (action.type === "SEARCH") {
    return defaultSearchState;
  }
};

const SearchProvider = (props) => {
  const [searchState, dispatchSearchAction] = useReducer(
    searchReducer,
    defaultSearchState
  );
  const addToSearch = (item) => {
    dispatchSearchAction({ type: "ADD", item: item });
  };
  const search = () => {
    dispatchSearchAction({ type: "SEARCH" });
  };

  const searchContext = {
    docId: searchState.docId,
    invoiceId: searchState.invoiceId,
    customerNumber: searchState.customerNumber,
    businessYear: searchState.businessYear,
    addSearch: addToSearch,
    search: search,
  };

  return (
    <SearchContext.Provider value={searchContext}>
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
