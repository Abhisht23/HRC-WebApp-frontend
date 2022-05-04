import React from "react";

const SearchContext = React.createContext({
  docId: "",
  invoiceId: "",
  customerNumber: "",
  businessYear: "",
  addSearch: (item) => {},
  search: () => {},
});

export default SearchContext;
