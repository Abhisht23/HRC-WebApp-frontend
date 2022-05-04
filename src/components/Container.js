import React from "react";
import DataTable from "./DataTable";
import TableHeader from "./TableHeader";
import axios from "axios";

function Container(props) {
  const [searchQuery, setSearchQuery] = React.useState("");
  return (
    <div style={{ background: "#273D49", height: "70%", marginTop: "80px" }}>
      <TableHeader setSearchQuery={setSearchQuery} />
      <DataTable searchQuery={searchQuery} id="tableContainer" />
    </div>
  );
}

export default Container;
