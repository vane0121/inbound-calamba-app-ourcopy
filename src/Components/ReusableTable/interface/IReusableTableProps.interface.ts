import { SelectChangeEvent } from "@mui/material";

export interface IReusableTableProps {
  headers: ITableHeader[];
  data: ITableData[];
  handleOpen: () => void;
  handleSetItemPerPage: (event: SelectChangeEvent<number>) => void;
  handleSortChange: (name: string) => void;
  handleSetSearchQuery: (name: string) => void;
  handleSetPage: (pageNumber: number) => void;
  handleEdit: (id: unknown[]) => void;
  handleDelete: (id: unknown[]) => void;
  state: IPagination;
  pageNumber: number;
  IdName?: string;
  customFilters?: ICustomFilters[];
  headerName?: string;
  searchName?: string;
  linkName?: string;
  link?: string;
}

export interface ITableHeader {
  Key: string;
  Name: string;
}

export default interface ITableData {
  [key: string]: unknown;
}

export interface IPagination {
  searchQuery: string;
  pageNumber: number;
  pageSize: number;
  pageCount: number;
  columnToSort: string;
  orderBy: "asc" | "desc";
}
export interface ICustomFilters {
  FilterName: string;
  Value: string;
}
