import { useReducer } from "react";
import EditContext from "./edit-context";
import axios from "axios";

const defaultEditState = {
  slNo: "",
  invoiceCurrency: "",
  customerPaymentTerms: "",
};

const editReducer = (state, action) => {
  if (action.type === "ADD") {
    axios
      .post("http://localhost:8080/HRC_Backend/EditInvoice", {
        invoiceCurrency: action.item.invoiceCurrency,
        customerPaymentTerms: action.item.customerPaymentTerms,
        slNo: action.item.slNo,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    return defaultEditState;
  }
  if (action.type === "SELECT") {
    return {
      slNo: action.item.slNo,
    };
  }
};

const EditProvider = (props) => {
  const [editState, dispatchEditAction] = useReducer(
    editReducer,
    defaultEditState
  );
  const addToEdit = (item) => {
    dispatchEditAction({ type: "ADD", item: item });
  };

  const selectForEdit = (item) => {
    dispatchEditAction({ type: "SELECT", item: item });
  };
  const editContext = {
    slNo: editState.slNo,
    invoiceCurrency: editState.invoiceCurrency,
    customerPaymentTerms: editState.customerPaymentTerms,
    addEdit: addToEdit,

    selectEdit: selectForEdit,
  };

  return (
    <EditContext.Provider value={editContext}>
      {props.children}
    </EditContext.Provider>
  );
};

export default EditProvider;
