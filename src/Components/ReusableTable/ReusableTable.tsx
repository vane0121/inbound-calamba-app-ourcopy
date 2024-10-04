import * as React from "react";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  GlobalStyles,
  Link,
  MenuItem,
  Pagination,
  Paper,
  Select,
  styled,
  Tab,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { IReusableTableProps } from "./interface/IReusableTableProps.interface";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#F0F0F0",
    color: theme.palette.common.black,
    fontWeight: "bold",
    fontSize: "12px",
    outline: "solid 1px #B9B9B9",
  },
  [`&.${tableCellClasses.body}`]: {
    color: "#212C5E",
  },
  "&.actionCell": {},
  "&.highlight": {
    backgroundColor: "yellow",
  },
}));

export default function ReusableTable({
  headers,
  state,
  handleSortChange,
  handleSetPage,
  data,
  handleSetItemPerPage,
  pageNumber,
  handleSetSearchQuery,
  IdName = "",
  handleEdit,
  handleOpen,
  handleDelete,
  customFilters,
  headerName,
  searchName,
  linkName,
  link,
}: IReusableTableProps) {
  const clientHeight = document.documentElement.clientHeight;
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedItems, setSelectedItems] = useState<unknown[]>([]);
  const [selectAll, setSelectAll] = React.useState(false);

  const CustomTab = styled(Tab)(({ theme }) => ({
    backgroundColor: "#f5f5f5",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
    "&.Mui-selected": {
      backgroundColor: "#575757",
      color: "white",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.4)",
    },
    borderTopLeftRadius: "12px",
    borderTopRightRadius: "12px",
    color: "#636161",
    minWidth: theme.breakpoints.values.xs
      ? 20
      : theme.breakpoints.values.sm
        ? 90
        : 120,
  }));

  const handleTabChange = (event: unknown, newValue: number) => {
    setSelectedTab(newValue);
    console.log(newValue, "this is the value");
  };

  const handleCheckboxChange = (id: unknown) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(id)) {
        return prevSelectedItems.filter((item) => item !== id);
      } else {
        return [...prevSelectedItems, id];
      }
    });
  };

  const handleSelectAllChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked);
    if (isChecked) {
      const allIds = data.map((row) => row[IdName]);
      setSelectedItems(allIds);
      console.log(allIds, "test id");
    } else {
      setSelectedItems([]);
    }
  };

  useEffect(() => {
    const updatedSelectedItems = selectedItems.filter((selectedId) =>
      data.some((row) => row[IdName] === selectedId)
    );

    if (updatedSelectedItems.length !== selectedItems.length) {
      setSelectedItems(updatedSelectedItems);
    }
    const allSelected = data.every((row) =>
      updatedSelectedItems.includes(row[IdName])
    );
    if (allSelected !== selectAll) {
      setSelectAll(allSelected);
    }
  }, [selectedItems, data, IdName, selectAll]);

  return (
    <>
      <GlobalStyles styles={{ body: { overflow: "hidden" } }} />
      <Typography
        variant="h6"
        sx={{
          marginBottom: 3,
          color: "primary.main",
          fontWeight: "bold",
          fontSize: { xs: 25, md: 35 },
          textAlign: "center",
        }}
      >
        {headerName}
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: -0.5,
          flexWrap: { xs: "wrap", md: "nowrap" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            mb: 1,
            flexGrow: 1, // Make this box flexible to take available space
          }}
        >
          <Typography
            variant="h3"
            sx={{
              marginRight: 2,
              color: "primary.main",
              fontWeight: "bold",
              fontSize: { xs: 14, md: 20 },
            }}
          >
            {searchName}
          </Typography>
          <TextField
            onChange={(e) => handleSetSearchQuery(e.target.value)}
            value={state.searchQuery}
            variant="outlined"
            sx={{
              width: {
                xs: 250, // Extra-small screens (mobile phones)
                sm: 200, // Small screens (tablets)
                md: 300, // Medium screens (small laptops)
                lg: 380, // Large screens (laptops/desktops)
                xl: 500,
              },
              padding: 0,
            }}
          />
          <Link
            href={link}
            sx={{
              marginLeft: 2,
              color: "#048ed9",
              fontWeight: 400,
              fontSize: { xs: 14, md: 20 },
              textDecoration: "underline",
            }}
          >
            {linkName}
          </Link>
        </Box>

        {/* Second box with action buttons */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            mb: 0,
          }}
        >
          <Button
            sx={{
              color: "primary.main",
              display: "flex",
              alignItems: "center",
            }}
            onClick={() => handleOpen()}
          >
            <AddIcon />
            <Typography sx={{ fontSize: { xs: 14, md: 20 }, marginLeft: 1 }}>
              Add
            </Typography>
          </Button>
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              mx: 0.5,
              borderWidth: 1.5,
            }}
          />
          <Button
            disabled={selectedItems.length !== 1}
            sx={{
              color: "primary.main",
              display: "flex",
              alignItems: "center",
            }}
            onClick={() => handleEdit(selectedItems)}
          >
            <EditIcon />
            <Typography sx={{ fontSize: { xs: 14, md: 20 }, marginLeft: 1 }}>
              Modify
            </Typography>
          </Button>
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              mx: 0.5,
              borderWidth: 1.5,
            }}
          />
          <Button
            disabled={selectedItems.length !== 1}
            sx={{
              color: "primary.main",
              display: "flex",
              alignItems: "center",
            }}
            onClick={() => handleDelete(selectedItems)}
          >
            <DeleteIcon />
            <Typography sx={{ fontSize: { xs: 14, md: 20 }, marginLeft: 1 }}>
              Delete
            </Typography>
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mb: 0.5,
          flexWrap: { xs: "wrap", md: "nowrap" },
        }}
      >
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          variant="standard"
          scrollButtons="auto"
        >
          {customFilters?.map((filter, index) => (
            <CustomTab
              key={index}
              label={filter.FilterName}
              sx={{}}
              onClick={() => handleSortChange(filter.Value)}
            />
          ))}
        </Tabs>
      </Box>
      <Box
        sx={{
          width: "100%",
          overflowY: "none",
          scrollbarWidth: "none",
        }}
      >
        <TableContainer
          component={Paper}
          sx={{
            overflow: "auto",
            scrollbarWidth: "thin",
            msOverflowStyle: "none",
            maxHeight: {
              xs: `${clientHeight - 380}px`, // Extra-small screens (0px and up)
              sm: `${clientHeight - 320}px`, // Small screens (600px and up)
              md: `${clientHeight - 440}px`, // Medium screens (900px and up)
              lg: `${clientHeight - 345}px`, // Large screens (1200px and up)
              xl: `${clientHeight - 370}px`, // Extra-large screens (1536px and up)
            },
          }}
        >
          <Table aria-labelledby="tableTitle" size="medium" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell
                  padding="checkbox"
                  sx={{
                    backgroundColor: "primary.main",
                    color: "white",
                    height: "90%",
                  }}
                >
                  <Checkbox
                    color="primary"
                    checked={selectAll}
                    onChange={handleSelectAllChange}
                    sx={{
                      color: "#c4c4c4",
                      "&.Mui-checked": {
                        color: "white",
                      },
                    }}
                  />
                </TableCell>
                {headers.map((headCell, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      whiteSpace: "nowrap",
                      width: "auto",
                      backgroundColor: "primary.main",
                      color: "white",
                      height: "80%",
                    }}
                  >
                    <TableSortLabel
                      className="custom-table-sort-label"
                      active={state.columnToSort == headCell.Name}
                      direction={state.orderBy}
                      onClick={() => handleSortChange!(headCell.Name)}
                      sx={{
                        color: "white",
                        "&.MuiTableSortLabel-root.Mui-active": {
                          color: "white",
                        },
                        "&.MuiTableSortLabel-root:hover": {
                          color: "white",
                        },
                        "& .MuiTableSortLabel-icon": {
                          color: "white !important",
                        },
                      }}
                    >
                      {headCell.Name}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length > 0 ? (
                data.map((row, rowIndex) => (
                  <TableRow
                    key={rowIndex}
                    sx={{
                      backgroundColor:
                        rowIndex % 2 === 0 ? "#BFBFBF" : "#FFFFFF",
                      height: { xs: 5, sm: 5, md: 5 },
                      padding: 0,
                      borderRadius: "50%",
                    }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedItems.includes(row[IdName])}
                        onChange={() => handleCheckboxChange(row[IdName])}
                      />
                    </TableCell>
                    {headers.map((header, colIndex) => (
                      <StyledTableCell
                        key={colIndex}
                        sx={{
                          width: `${100 / headers.length}%`,
                        }}
                      >
                        {row[header.Key] as React.ReactNode}
                      </StyledTableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <StyledTableCell align="center" colSpan={headers.length + 1}>
                    No Data
                  </StyledTableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 2,
          flexDirection: "row",
        }}
      >
        <Box display="flex" alignItems="center" sx={{ mb: { xs: 2, md: 0 } }}>
          <Typography
            marginRight={1}
            sx={{ fontWeight: "fontWeightBold", fontSize: { xs: 14, md: 16 } }}
          >
            Show
          </Typography>
          <Select
            value={state.pageSize}
            variant="outlined"
            size="small"
            sx={{ fontSize: { xs: 12, md: 14 }, borderRadius: 4, width: 70 }}
            onChange={(event) => {
              handleSetItemPerPage(event);
            }}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
        </Box>
        <Pagination
          page={state.pageNumber}
          variant="outlined"
          shape="circular"
          count={pageNumber}
          sx={{ mb: { xs: 2, md: 0 } }}
          onChange={(_, value) => handleSetPage(value)}
        />
      </Box>
    </>
  );
}
