import React, { useState, useContext, useEffect } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import TextField from "@mui/material/TextField";
import AddInvoice from "./AddInvoice";
import EditInvoice from "./EditInvoice";
import DeleteInvoice from "./DeleteInvoice";
import RefreshIcon from "@mui/icons-material/Refresh";
import axios from "axios";
import EditContext from "../store/edit-context";
import DeleteContext from "../store/delete-context";
import SearchContext from "../store/search-context";
import Search from "./Search";

function TableHeader(props) {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [send, setSend] = useState("");
  const [edit, setEdit] = useState("");
  const editCtx = useContext(EditContext);
  const deleteCtx = useContext(DeleteContext);
  const searchCtx = useContext(SearchContext);
  const [del, setDel] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [search, setSearch] = useState(false);

  const handleSend = (data) => {
    setOpenAdd(false);
    axios
      .post("http://localhost:8080/HRC_Backend/AddInvoice", data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    setSend("");
  };

  const handleEdit = async ({ invoiceCurrency, customerPaymentTerms }) => {
    await editCtx.addEdit({
      invoiceCurrency: invoiceCurrency,
      customerPaymentTerms: customerPaymentTerms,
      slNo: editCtx.slNo,
    });

    setEdit("");
    setOpenEdit(false);
  };

  const handleDelete = async () => {
    deleteCtx.Delete();
    setDel(false);
    setOpenDelete(false);
  };

  const handleSearch = ({ docId, invoiceId, customerNumber, businessYear }) => {
    searchCtx.addSearch({
      docId: docId,
      invoiceId: invoiceId,
      customerNumber: customerNumber,
      businessYear: businessYear,
    });
    setSearch(false);
    setOpenSearch(false);
  };

  return (
    <div>
      <ButtonGroup
        variant="outlined"
        aria-label="outlined button group"
        style={{ marginLeft: "2%", marginTop: "1.5%" }}
      >
        <Button style={{ color: "white" }} variant="contained">
          PREDICT
        </Button>
        <Button style={{ color: "white" }}>ANALYTICS VIEW</Button>
        <Button style={{ color: "white" }} onClick={() => setOpenSearch(true)}>
          ADVANCE SEARCH
        </Button>
        <Button onClick={() => window.location.reload(false)}>
          <RefreshIcon />
        </Button>
      </ButtonGroup>
      <TextField
        id="filled-search"
        label="Search Customer Id"
        type="search"
        variant="filled"
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          marginLeft: "7%",
          marginTop: "1%",
          width: "300px",
        }}
        onChange={(e) => props.setSearchQuery(e.target.value)}
      />
      <ButtonGroup
        variant="outlined"
        aria-label="outlined button group"
        style={{ marginLeft: "8%", marginTop: "1%" }}
      >
        <Button
          style={{ color: "white", width: "150px" }}
          variant="contained"
          onClick={() => setOpenAdd(true)}
        >
          ADD
        </Button>
        <Button
          style={{ color: "white", width: "150px" }}
          onClick={() => setOpenEdit(true)}
        >
          EDIT
        </Button>
        <Button
          style={{ color: "white", width: "150px" }}
          onClick={() => setOpenDelete(true)}
        >
          DELETE
        </Button>
      </ButtonGroup>
      <AddInvoice open={openAdd} send={send} parentSendData={handleSend}>
        <Button
          variant="outlined"
          sx={{
            color: "white",
            width: "600px",
            marginTop: "60px",
            marginLeft: "5px",
          }}
          onClick={() => setSend("send")}
        >
          ADD
        </Button>
        &nbsp; &nbsp;
        <Button
          variant="outlined"
          sx={{ color: "white", width: "600px", marginTop: "60px" }}
          onClick={() => {
            setOpenAdd(false);
          }}
        >
          CANCEL
        </Button>
      </AddInvoice>
      <EditInvoice open={openEdit} edit={edit} parentEditData={handleEdit}>
        <Button
          variant="outlined"
          sx={{
            color: "white",
            width: "250px",
            marginTop: "50px",
            marginLeft: "10px",
          }}
          onClick={() => setEdit("edit")}
        >
          EDIT
        </Button>
        <Button
          variant="outlined"
          sx={{
            color: "white",
            width: "250px",
            marginTop: "50px",
            marginLeft: "15px",
          }}
          onClick={() => setOpenEdit(false)}
        >
          CANCEL
        </Button>
      </EditInvoice>
      <DeleteInvoice
        open={openDelete}
        delete={del}
        parentDeleteData={handleDelete}
      >
        <Button
          variant="outlined"
          sx={{
            color: "white",
            width: "199px",
            marginTop: "50px",
            marginLeft: "23px",
          }}
          onClick={() => setDel(true)}
        >
          DELETE
        </Button>
        <Button
          variant="outlined"
          sx={{
            color: "white",
            width: "199px",
            marginTop: "50px",
            marginLeft: "15px",
          }}
          onClick={() => setOpenDelete(false)}
        >
          CANCEL
        </Button>
      </DeleteInvoice>
      <Search open={openSearch} search={search} parentSearchData={handleSearch}>
        <Button
          variant="outlined"
          sx={{
            color: "white",
            width: "270px",
            marginTop: "50px",
            marginLeft: "32px",
          }}
          onClick={() => setSearch(true)}
        >
          SEARCH
        </Button>
        <Button
          variant="outlined"
          sx={{
            color: "white",
            width: "270px",
            marginTop: "50px",
            marginLeft: "15px",
          }}
          onClick={() => setOpenSearch(false)}
        >
          CANCEL
        </Button>
      </Search>
    </div>
  );
}

export default TableHeader;
