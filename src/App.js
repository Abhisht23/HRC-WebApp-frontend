import React from "react";
import { makeStyles } from "@material-ui/core";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Container from "./components/Container";
import Footer from "./components/Footer";
import AddInvoice from "./components/AddInvoice";
import Backdrop from "@mui/material/Backdrop";
import EditProvider from "./store/EditProvider";
import DeleteProvider from "./store/DeleteProvider";
import SearchProvider from "./store/SearchProvider";

const useStyles = makeStyles((theme) => ({
  "@global": {
    "*::-webkit-scrollbar": {
      width: "0.4em",
      height: "0.4em",
    },
    "*::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "#6D7183",
      outline: "1px solid slategrey",
    },
  },
  mainBackground: {
    background: "#3A495E",
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
}));

function App() {
  const classes = useStyles();
  return (
    <EditProvider>
      <DeleteProvider>
        <SearchProvider>
          <div className={classes.mainBackground}>
            <Header />
            <Container />
            <Footer />
          </div>
        </SearchProvider>
      </DeleteProvider>
    </EditProvider>
  );
}

export default App;
