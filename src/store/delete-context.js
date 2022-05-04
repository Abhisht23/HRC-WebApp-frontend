import React from "react";

const DeleteContext = React.createContext({
  slNo: [],
  addDelete: (item) => {},
  removeFromDelete: (item) => {},
  Delete: () => {},
});

export default DeleteContext;
