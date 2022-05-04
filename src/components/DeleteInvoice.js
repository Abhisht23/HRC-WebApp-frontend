import React, { useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";

function DeleteInvoice(props) {
  useEffect(() => {
    if (props.delete) {
      props.parentDeleteData();
    }
  }, [props.delete]);
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={props.open}
    >
      <div style={{ backgroundColor: "#273D49", width: "30%", height: "25%" }}>
        <br />
        <span
          style={{
            color: "white",
            fontSize: "25px",
            paddingLeft: "20px",
          }}
        >
          Delete Records ?
        </span>
        <br />
        <br />

        <span
          style={{ fontSize: "17px", paddingLeft: "20px", marginTop: "40px" }}
        >
          Are you sure you want to delete these record[s]
        </span>

        <br />
        {props.children}
      </div>
    </Backdrop>
  );
}

export default DeleteInvoice;
