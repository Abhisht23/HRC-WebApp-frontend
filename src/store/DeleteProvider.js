import { useReducer } from "react";
import DeleteContext from "./delete-context";
import axios from "axios";

const defaultDeleteState = {
  slNo: [],
};

const deleteReducer = (state, action) => {
  if (action.type === "ADD") {
    let updatedSl = action.item;
    return {
      slNo: updatedSl,
    };
  }
  if (action.type === "DELETE") {
    axios
      .post("http://localhost:8080/HRC_Backend/DeleteInvoice", {
        slNo: state.slNo,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    return defaultDeleteState;
  }
};

const DeleteProvider = (props) => {
  const [deleteState, dispatchDeleteAction] = useReducer(
    deleteReducer,
    defaultDeleteState
  );
  const addToDelete = (item) => {
    dispatchDeleteAction({ type: "ADD", item: item });
  };

  const selectForDelete = (item) => {
    dispatchDeleteAction({ type: "DELETE" });
  };
  const deleteContext = {
    slNo: deleteState.slNo,
    addDelete: addToDelete,

    Delete: selectForDelete,
  };

  return (
    <DeleteContext.Provider value={deleteContext}>
      {props.children}
    </DeleteContext.Provider>
  );
};

export default DeleteProvider;
