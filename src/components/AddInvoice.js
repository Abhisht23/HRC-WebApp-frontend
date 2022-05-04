import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

function AddInvoice(props) {
  const [businessCode, setBusinessCode] = useState("");
  const [custNumber, setCustNumber] = useState("");
  const [clearDate, setClearDate] = useState("");
  const [businessYear, setBusinessYear] = useState("");
  const [docId, setDocId] = useState("");
  const [postingDate, setPostingDate] = useState("");
  const [docCreateDate, setDocCreateDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [invoiceCurrency, setInvoiceCurrency] = useState("");
  const [docType, setDocType] = useState("");
  const [postId, setPostId] = useState("");
  const [totalOpenAmount, setTotalOpenAmount] = useState("");
  const [baselineCreateDate, setBaselineCreateDate] = useState("");
  const [custPaymentTerms, setCustPaymentTerms] = useState("");
  const [invoiceId, setInvoiceId] = useState("");

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  const data = {
    business_code: businessCode,
    cust_number: custNumber,
    clear_date: formatDate(clearDate),
    business_year: businessYear,
    doc_id: docId,
    posting_date: formatDate(postingDate),
    document_create_date: formatDate(docCreateDate),
    due_in_date: formatDate(dueDate),
    invoice_currency: invoiceCurrency,
    document_type: docType,
    posting_id: postId,
    total_open_amount: totalOpenAmount,
    baseline_create_date: formatDate(baselineCreateDate),
    cust_payment_terms: custPaymentTerms,
    invoice_id: invoiceId,
  };

  useEffect(() => {
    if (props.send === "send") {
      props.parentSendData(data);
    }
    setBusinessCode("");
    setCustNumber("");
    setClearDate("");
    setBusinessYear("");
    setDocId("");
    setPostingDate("");
    setDocCreateDate("");
    setDueDate("");
    setInvoiceCurrency("");
    setDocType("");
    setPostId("");
    setTotalOpenAmount("");
    setBaselineCreateDate("");
    setCustPaymentTerms("");
    setInvoiceId("");
  }, [props.send]);
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={props.open}
    >
      <div style={{ background: "#273D49", width: "80%", height: "65%" }}>
        <span style={{ color: "white", fontSize: "25px", paddingLeft: "35px" }}>
          Add
        </span>
        <Grid
          container
          spacing={4}
          sx={{ paddingTop: "30px", marginLeft: "5px" }}
        >
          <Grid item>
            <TextField
              id="buss_code"
              label="Business Code"
              type="search"
              variant="filled"
              sx={{ background: "white", borderRadius: "10px", width: "258px" }}
              value={businessCode}
              onChange={(newValue) => setBusinessCode(newValue.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              id="cust_no"
              label="Customer Number"
              type="search"
              variant="filled"
              sx={{ background: "white", borderRadius: "10px", width: "258px" }}
              value={custNumber}
              onChange={(newValue) => setCustNumber(newValue.target.value)}
            />
          </Grid>
          <Grid item>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                value={clearDate}
                minDate={new Date("2017-01-01")}
                onChange={(newValue) => {
                  setClearDate(newValue);
                }}
                label={
                  <span
                    style={{
                      fontSize: "20px",
                    }}
                  >
                    Clear Date
                  </span>
                }
                renderInput={(params) => (
                  <TextField
                    sx={{ background: "white", borderRadius: "10px" }}
                    {...params}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item>
            <TextField
              id="buss_year"
              label="Business Year"
              variant="filled"
              sx={{ background: "white", borderRadius: "10px", width: "258px" }}
              value={businessYear}
              onChange={(newValue) => setBusinessYear(newValue.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              id="doc_id"
              label="Document Id"
              variant="filled"
              sx={{ background: "white", borderRadius: "10px", width: "258px" }}
              value={docId}
              onChange={(newValue) => setDocId(newValue.target.value)}
            />
          </Grid>
          <Grid item>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                value={postingDate}
                minDate={new Date("2017-01-01")}
                onChange={(newValue) => {
                  setPostingDate(newValue);
                }}
                label={
                  <span
                    style={{
                      fontSize: "20px",
                    }}
                  >
                    Posting Date
                  </span>
                }
                renderInput={(params) => (
                  <TextField
                    sx={{ background: "white", borderRadius: "10px" }}
                    {...params}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                value={docCreateDate}
                minDate={new Date("2017-01-01")}
                onChange={(newValue) => {
                  setDocCreateDate(newValue);
                }}
                label={
                  <span
                    style={{
                      fontSize: "20px",
                    }}
                  >
                    Document Create Date
                  </span>
                }
                renderInput={(params) => (
                  <TextField
                    sx={{ background: "white", borderRadius: "10px" }}
                    {...params}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                value={dueDate}
                minDate={new Date("2017-01-01")}
                onChange={(newValue) => {
                  setDueDate(newValue);
                }}
                label={
                  <span
                    style={{
                      fontSize: "20px",
                    }}
                  >
                    Due Date
                  </span>
                }
                renderInput={(params) => (
                  <TextField
                    sx={{ background: "white", borderRadius: "10px" }}
                    {...params}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item>
            <TextField
              id="invoice_curr"
              label="Invoice Currency"
              variant="filled"
              sx={{ background: "white", borderRadius: "10px", width: "258px" }}
              value={invoiceCurrency}
              onChange={(newValue) => setInvoiceCurrency(newValue.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              id="doc_type"
              label="Document Type"
              variant="filled"
              sx={{ background: "white", borderRadius: "10px", width: "258px" }}
              value={docType}
              onChange={(newValue) => setDocType(newValue.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              id="post_id"
              label="Posting Id"
              variant="filled"
              sx={{ background: "white", borderRadius: "10px", width: "258px" }}
              value={postId}
              onChange={(newValue) => setPostId(newValue.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              id="total_open_amount"
              label="Total Open Amount"
              variant="filled"
              sx={{ background: "white", borderRadius: "10px", width: "258px" }}
              value={totalOpenAmount}
              onChange={(newValue) => setTotalOpenAmount(newValue.target.value)}
            />
          </Grid>
          <Grid item>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                value={baselineCreateDate}
                minDate={new Date("2017-01-01")}
                onChange={(newValue) => {
                  setBaselineCreateDate(newValue);
                }}
                label={
                  <span
                    style={{
                      fontSize: "20px",
                    }}
                  >
                    Baseline Clear Date
                  </span>
                }
                renderInput={(params) => (
                  <TextField
                    sx={{ background: "white", borderRadius: "10px" }}
                    {...params}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item>
            <TextField
              id="cust_payment_terms"
              label="Customer Payment Terms"
              variant="filled"
              sx={{ background: "white", borderRadius: "10px", width: "258px" }}
              value={custPaymentTerms}
              onChange={(newValue) =>
                setCustPaymentTerms(newValue.target.value)
              }
            />
          </Grid>
          <Grid item>
            <TextField
              id="invoice_id"
              label="Invoice Id"
              variant="filled"
              sx={{ background: "white", borderRadius: "10px", width: "258px" }}
              value={invoiceId}
              onChange={(newValue) => setInvoiceId(newValue.target.value)}
            />
          </Grid>
        </Grid>
        {props.children}
      </div>
    </Backdrop>
  );
}

export default AddInvoice;
