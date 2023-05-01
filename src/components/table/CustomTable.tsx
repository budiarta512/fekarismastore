import React, { ReactNode, useEffect, useMemo, useState } from "react";
import {
  useTable,
  Column,
  useFilters,
  useGlobalFilter,
  usePagination,
  useSortBy,
} from "react-table";
import FilterDateTable from "./FilterDateTable";
import FilterTable from "./FilterTable";
import Button from "../button/Button";

interface CustomTableProps {
  columns: Array<{
    Header: string;
    accessor: string;
    Cell?: (row: any) => JSX.Element;
    sortType?: string;
    isSorted?: boolean;
    disableSortBy?: boolean;
  }>;
  initialPageSIze?: number;
  data: Array<object>;
  nodeHeader?: ReactNode;
  manualPagination?: boolean;
  pageChangeHandler?: (a: any) => void;
  manualOptions?: {
    totalRows: number;
    rowsPerPage: number;
  };
  options?: {
    isFilterActive?: boolean;
    isSortBy?: boolean;
    isFilterDate?: boolean;
    isPagination?: boolean;
  };
}
const CustomTable = (props: CustomTableProps) => {
  // server pagination
  const [currentPage, setCurrentPage] = useState(1);
  // Onclick handlers for the butons
  const onNextPage = () => setCurrentPage(currentPage + 1);
  const onPrevPage = () => setCurrentPage(currentPage - 1);
  const onPageSelect = (pageNo: number) => setCurrentPage(pageNo);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoNext, setCanGoNext] = useState(true);

  // Calculating max number of pages
  const noOfPages = Math.ceil(
    (props.manualOptions?.totalRows || 1) /
      (props.manualOptions?.rowsPerPage || 1)
  );

  // Creating an array with length equal to no.of pages
  const pagesArr = [...new Array(noOfPages)];

  useEffect(() => {
    if (noOfPages === currentPage) {
      setCanGoNext(false);
    } else {
      setCanGoNext(true);
    }
    if (currentPage === 1) {
      setCanGoBack(false);
    } else {
      setCanGoBack(true);
    }
  }, [noOfPages, currentPage]);

  useEffect(() => {
    // const skipFactor = (currentPage - 1) * props.manualOptions.rowsPerPage;
    if (props.manualPagination && props.pageChangeHandler) {
      props.pageChangeHandler(currentPage);
    }
  }, [currentPage]);

  // default pagination
  const data = useMemo(() => props.data, [props.data]);
  const columns = useMemo(() => props.columns, []);
  const {
    headerGroups,
    getTableProps,
    getTableBodyProps,
    prepareRow,
    rows,
    state,
    setGlobalFilter,
    pageOptions,
    page,
    pageCount,
    gotoPage,
    previousPage,
    nextPage,
    setPageSize,
    canPreviousPage,
    canNextPage,
  } = useTable(
    {
      columns,
      data,
      manualPagination: props.manualPagination,
      initialState: { pageSize: props.initialPageSIze || 6 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <>
      {/* filter */}
      {props.options ? (
        <div className="flex justify-between">
          <div className="m-4 flex items-center">
            {props.nodeHeader}
            {props.options.isFilterDate ? <FilterDateTable /> : ""}
          </div>
          {props.options.isFilterActive ? (
            <div className="m-4">
              <FilterTable filter={globalFilter} setFilter={setGlobalFilter} />
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
      {props.options ? <hr /> : ""}
      {/* table */}
      <div className="overflow-x-auto">
        <div className="py-2 inline-block min-w-full">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white" {...getTableProps()}>
              <thead className="border-b">
                {
                  // Loop over the header rows
                  headerGroups.map((headerGroup) => (
                    // Apply the header row props
                    <tr
                      key={headerGroup.getFooterGroupProps().key}
                      className={headerGroup.getHeaderGroupProps().className}
                      role={headerGroup.getHeaderGroupProps().role}
                      style={headerGroup.getHeaderGroupProps().style}
                    >
                      {
                        // Loop over the headers in each row
                        headerGroup.headers.map((column) => (
                          // Apply the header cell props
                          <th
                            key={
                              column.getHeaderProps(
                                column.getSortByToggleProps()
                              ).key
                            }
                            style={
                              column.getHeaderProps(
                                column.getSortByToggleProps()
                              ).style
                            }
                            role={
                              column.getHeaderProps(
                                column.getSortByToggleProps()
                              ).role
                            }
                            className={`px-6 py-4 text-sm font-medium text-gray-900 text-left ${
                              column.getHeaderProps(
                                column.getSortByToggleProps()
                              ).className
                            }`}
                          >
                            {
                              // Render the header
                              column.render("Header")
                            }
                            {!column.disableSortBy ? (
                              <span>
                                {column.isSorted
                                  ? column.isSortedDesc
                                    ? " ↑"
                                    : " ↓"
                                  : ""}
                              </span>
                            ) : (
                              ""
                            )}
                          </th>
                        ))
                      }
                    </tr>
                  ))
                }
              </thead>
              {/* Apply the table body props */}
              <tbody {...getTableBodyProps()}>
                {
                  // Loop over the table rows
                  page.map((row) => {
                    // Prepare the row for display
                    prepareRow(row);
                    return (
                      // Apply the row props
                      <tr
                        key={row.getRowProps().key}
                        style={row.getRowProps().style}
                        className={row.getRowProps().className}
                        role={row.getRowProps().role}
                      >
                        {
                          // Loop over the rows cells
                          row.cells.map((cell) => {
                            // Apply the cell props
                            return (
                              <td
                                key={cell.getCellProps().key}
                                style={cell.getCellProps().style}
                                role={cell.getCellProps().role}
                                className={`px-6 py-4 whitespace-nowrap text-sm text-start text-gray-900 ${
                                  row.index % 2 === 0
                                    ? "bg-gray-100"
                                    : "bg-white"
                                } ${cell.getCellProps().className}`}
                              >
                                {
                                  // Render the cell contents
                                  cell.render("Cell")
                                }
                              </td>
                            );
                          })
                        }
                      </tr>
                    );
                  })
                }
                {data.length === 0 ? (
                  <tr>
                    <td
                      colSpan={10}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center"
                    >
                      No data available in table
                    </td>
                  </tr>
                ) : (
                  ""
                )}
              </tbody>
            </table>

            {/* pagination */}
            {props.options?.isPagination ? (
              props.manualPagination ? (
                // server pagination
                <div>
                  <div className="pagination mx-4 flex justify-center items-center gap-1">
                    <Button
                      disabled={!canGoBack}
                      onClick={() => onPageSelect(1)}
                    >
                      <i className="bi bi-chevron-double-left"></i>
                    </Button>{" "}
                    <Button disabled={!canGoBack} onClick={onPrevPage}>
                      <i className="bi bi-chevron-left"></i>
                    </Button>{" "}
                    {pagesArr.map((num, index) => {
                      return index + 1 === currentPage ||
                        index + 2 === currentPage ||
                        index + 3 === currentPage ||
                        index === currentPage ||
                        index - 1 === currentPage ? (
                        <Button
                          key={index}
                          onClick={() => onPageSelect(index + 1)}
                          className={`${
                            index + 1 === currentPage ? "bg-blue-800" : ""
                          }`}
                        >
                          {index + 1}
                        </Button>
                      ) : (
                        "."
                      );
                    })}
                    <Button disabled={!canGoNext} onClick={onNextPage}>
                      <i className="bi bi-chevron-right"></i>
                    </Button>{" "}
                    <Button
                      disabled={!canGoNext}
                      onClick={() => onPageSelect(pagesArr.length)}
                    >
                      <i className="bi bi-chevron-double-right"></i>
                    </Button>{" "}
                  </div>
                </div>
              ) : (
                // front end pagination
                <div className="pagination mx-4 flex justify-end items-center">
                  <span className="text-sm">
                    Page {pageIndex + 1} of {pageOptions.length}{" "}
                  </span>
                  <div className="flex gap-1 pt-3 mx-3">
                    <Button
                      onClick={() => gotoPage(0)}
                      disabled={!canPreviousPage}
                    >
                      <i className="bi bi-chevron-double-left"></i>
                    </Button>{" "}
                    <Button
                      onClick={() => previousPage()}
                      disabled={!canPreviousPage}
                    >
                      <i className="bi bi-chevron-left"></i>
                    </Button>{" "}
                    <Button onClick={() => nextPage()} disabled={!canNextPage}>
                      <i className="bi bi-chevron-right"></i>
                    </Button>{" "}
                    <Button
                      onClick={() => gotoPage(pageCount - 1)}
                      disabled={!canNextPage}
                    >
                      <i className="bi bi-chevron-double-right"></i>
                    </Button>{" "}
                  </div>

                  {/* <span>
                  | Go to page:{' '}
                  <input
                    type="number"
                    defaultValue={pageIndex + 1}
                    onChange={e => {
                      const page = e.target.value ? Number(e.target.value) - 1 : 0
                      gotoPage(page)
                    }}
                    style={{ width: '100px' }}
                  />
                </span>{' '} */}
                  <select
                    className="border focus:outline-blue-400 p-1 text-sm"
                    value={pageSize}
                    onChange={(e) => {
                      setPageSize(Number(e.target.value));
                    }}
                  >
                    {[6, 10, 20, 30, 40, 50].map((pageSize) => (
                      <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                      </option>
                    ))}
                  </select>
                </div>
              )
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomTable;
