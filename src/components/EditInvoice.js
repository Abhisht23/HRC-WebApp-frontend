import React, { useState, useEffect, useContext } from "react";
import Backdrop from "@mui/material/Backdrop";
import EditContext from "../store/edit-context";
import TextField from "@mui/material/TextField";

function EditInvoice(props) {
  const [invoiceCurrency, setInvoiceCurrency] = useState("");
  const [customerPaymentTerms, setCustomerPaymentTerms] = useState("");

  useEffect(() => {
    if (props.edit === "edit") {
      props.parentEditData({
        invoiceCurrency: invoiceCurrency,
        customerPaymentTerms: customerPaymentTerms,
      });
    }

    setInvoiceCurrency("");
    setCustomerPaymentTerms("");
  }, [props.edit]);
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={props.open}
    >
      <div style={{ backgroundColor: "#273D49", width: "35%", height: "30%" }}>
        <span
          style={{
            color: "white",
            fontSize: "25px",
            paddingLeft: "20px",
          }}
        >
          Edit
        </span>
        <TextField
          id="invoice_currency"
          label="Invoice Currency"
          type="search"
          variant="filled"
          value={invoiceCurrency}
          sx={{
            background: "white",
            borderRadius: "10px",
            marginTop: "80px",
            marginLeft: "-35px",
          }}
          onChange={(newValue) => setInvoiceCurrency(newValue.target.value)}
        />
        <TextField
          id="cust_payment_terms"
          label="Customer Payment Terms"
          type="search"
          variant="filled"
          value={customerPaymentTerms}
          sx={{
            background: "white",
            borderRadius: "10px",
            marginTop: "80px",
            marginLeft: "35px",
          }}
          onChange={(newValue) =>
            setCustomerPaymentTerms(newValue.target.value)
          }
        />
        <br />
        {props.children}
      </div>
    </Backdrop>
  );
}

export default EditInvoice;
