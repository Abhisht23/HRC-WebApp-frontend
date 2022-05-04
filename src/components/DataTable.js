import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import EditContext from "../store/edit-context";
import DeleteContext from "../store/delete-context";
import SearchContext from "../store/search-context";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "sl_no",
    numeric: false,
    disablePadding: true,
    label: "Sl no",
  },
  {
    id: "bussiness_code",
    numeric: false,
    disablePadding: true,
    label: "Business Code",
  },
  {
    id: "cust_no",
    numeric: false,
    disablePadding: true,
    label: "Customer Number",
  },
  {
    id: "clear_date",
    numeric: false,
    disablePadding: true,
    label: "Clear Date",
  },
  {
    id: "buss_year",
    numeric: false,
    disablePadding: true,
    label: "Business Year",
  },
  {
    id: "doc_id",
    numeric: false,
    disablePadding: true,
    label: "Document id",
  },
  {
    id: "post_date",
    numeric: false,
    disablePadding: true,
    label: "Posting Date",
  },
  {
    id: "doc_create_date",
    numeric: false,
    disablePadding: true,
    label: "Document Create Date",
  },
  {
    id: "due_in_date",
    numeric: false,
    disablePadding: true,
    label: "Due in Date",
  },
  {
    id: "invoice_currency",
    numeric: false,
    disablePadding: true,
    label: "Invoice Currency",
  },
  {
    id: "doc_type",
    numeric: false,
    disablePadding: true,
    label: "Document Type",
  },
  {
    id: "posting_id",
    numeric: false,
    disablePadding: true,
    label: "Posting Id",
  },
  {
    id: "total_open_amount",
    numeric: false,
    disablePadding: true,
    label: "Total Open Amount",
  },
  {
    id: "baseline_create_date",
    numeric: false,
    disablePadding: true,
    label: "Baseline Create Date",
  },
  {
    id: "cust_payment_terms",
    numeric: false,
    disablePadding: true,
    label: "Customer Payment Terms",
  },
  {
    id: "invoice_id",
    numeric: false,
    disablePadding: true,
    label: "Invoice Id",
  },
  {
    id: "isOpen",
    numeric: false,
    disablePadding: true,
    label: "Is Open",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow style={{ color: "white" }}>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Nutrition
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable(props) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = useState([]);
  const [filteredSD, setFilteredSD] = useState([]);
  const editCtx = useContext(EditContext);
  const deleteCtx = useContext(DeleteContext);
  const searchCtx = useContext(SearchContext);

  useEffect(() => {
    handleSearch();
  }, [props.searchQuery, data]);

  useEffect(() => {
    deleteCtx.addDelete(selected);
  }, [selected]);

  const handleSearch = () => {
    const filteredRows = data.filter((row) => {
      return row.cust_number
        .toLowerCase()
        .includes(props.searchQuery.toLowerCase());
    });
    setFilteredSD(filteredRows);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.sl_no);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);

    editCtx.selectEdit({ slNo: name });

    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const handleChangeDense = (event) => {
  //   setDense(event.target.checked);
  // };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  useEffect(() => {
    if (
      searchCtx.docId ||
      searchCtx.invoiceId ||
      searchCtx.businessYear ||
      searchCtx.customerNumber
    ) {
      axios
        .get("http://localhost:8080/HRC_Backend/SearchInvoice", {
          params: {
            docId: searchCtx.docId,
            invoiceId: searchCtx.invoiceId,
            customerNumber: searchCtx.customerNumber,
            businessYear: searchCtx.businessYear,
          },
        })
        .then((response) => {
          setFilteredSD(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [
    searchCtx.docId,
    searchCtx.invoiceId,
    searchCtx.businessYear,
    searchCtx.customerNumber,
  ]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/HRC_Backend/SendData`)
      .then((response) => {
        console.log("data received yayyy");
        setData((prev) => [...prev, ...response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  return (
    <Box sx={{ width: "100%", paddingTop: "30px" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={filteredSD.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(filteredSD, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.sl_no);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.sl_no)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.sl_no}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            // "aria-labelledby": row.sl_no,
                            value: row.sl_no,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.sl_no}
                      </TableCell>
                      <TableCell align="right">{row.business_code}</TableCell>
                      <TableCell align="right">{row.cust_number}</TableCell>
                      <TableCell align="right" style={{ minWidth: "100px" }}>
                        {row.clear_date}
                      </TableCell>
                      <TableCell align="right" style={{ minWidth: "100px" }}>
                        {row.business_year}
                      </TableCell>
                      <TableCell align="right">{row.doc_id}</TableCell>
                      <TableCell align="right" style={{ minWidth: "100px" }}>
                        {row.posting_date}
                      </TableCell>
                      <TableCell align="right" style={{ minWidth: "100px" }}>
                        {row.document_create_date}
                      </TableCell>
                      <TableCell align="right" style={{ minWidth: "100px" }}>
                        {row.due_in_date}
                      </TableCell>
                      <TableCell align="right">
                        {row.invoice_currency}
                      </TableCell>
                      <TableCell align="right">{row.document_type}</TableCell>
                      <TableCell align="right">{row.posting_id}</TableCell>

                      <TableCell align="right">
                        {row.total_open_amount}
                      </TableCell>
                      <TableCell align="right" style={{ minWidth: "100px" }}>
                        {row.baseline_create_date}
                      </TableCell>
                      <TableCell align="right">
                        {row.cust_payment_terms}
                      </TableCell>
                      <TableCell align="right">{row.invoice_id}</TableCell>
                      <TableCell align="right" style={{ minWidth: "45px" }}>
                        {row.isOpen}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredSD.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </Box>
  );
}
