import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

function Search(props) {
  const [docId, setDocId] = useState("");
  const [invoiceId, setInvoiceId] = useState("");
  const [customerNumber, setCustomerNumber] = useState("");
  const [businessYear, setBusinessYear] = useState("");
  useEffect(() => {
    if (props.search) {
      props.parentSearchData({
        docId: docId,
        invoiceId: invoiceId,
        customerNumber: customerNumber,
        businessYear: businessYear,
      });
    }
    setDocId("");
    setInvoiceId("");
    setCustomerNumber("");
    setBusinessYear("");
  }, [props.search]);
  return (
    <Backdrop
      open={props.open}
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <div style={{ background: "#273D49", width: "40%", height: "45%" }}>
        <span
          style={{
            color: "white",
            fontSize: "23px",
            paddingLeft: "35px",
          }}
        >
          Advance Search
        </span>

        <Grid
          container
          spacing={4}
          sx={{ paddingTop: "50px", marginLeft: "5px" }}
        >
          <Grid item>
            <TextField
              id="doc_id"
              label="Document ID"
              type="search"
              variant="filled"
              sx={{ background: "white", borderRadius: "10px", width: "258px" }}
              value={docId}
              onChange={(newValue) => setDocId(newValue.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              id="doc_id"
              label="Invoice ID"
              type="search"
              variant="filled"
              sx={{ background: "white", borderRadius: "10px", width: "258px" }}
              value={invoiceId}
              onChange={(newValue) => setInvoiceId(newValue.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              id="doc_id"
              label="Customer Number"
              type="search"
              variant="filled"
              sx={{ background: "white", borderRadius: "10px", width: "258px" }}
              value={customerNumber}
              onChange={(newValue) => setCustomerNumber(newValue.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              id="doc_id"
              label="Business Year"
              type="search"
              variant="filled"
              sx={{ background: "white", borderRadius: "10px", width: "258px" }}
              value={businessYear}
              onChange={(newValue) => setBusinessYear(newValue.target.value)}
            />
          </Grid>
        </Grid>
        {props.children}
      </div>
    </Backdrop>
  );
}

export default Search;
