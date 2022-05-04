import React from "react";

const EditContext = React.createContext({
  slNo: "",
  invoiceCurrency: "",
  customerPaymentTerms: "",
  addEdit: (item) => {},

  selectEdit: (item) => {},
});

export default EditContext;
