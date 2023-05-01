import { useEffect, useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfFile from "../../../components/pdf/PdfFile";
import Breadcrumb from "../../../components/header/Breadcrumb";
import { NavLink, useNavigate } from "react-router-dom";
import CustomTable from "../../../components/table/CustomTable";
import { formatRupiah } from "../../../utils/currency";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import {
  deleteTransaction,
  fetchTransaction,
} from "../../../redux/features/transactionSlice";

const Transaction = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const data = useAppSelector((state) => state.transaction.data);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    dispatch(fetchTransaction());
  }, [refresh]);

  const deleteHandle = (arg: string) => {
    dispatch(deleteTransaction(arg)).then((res: any) => {
      if (res.meta.requestStatus === "fulfilled") {
        setRefresh((prev) => prev + 1);
        navigate("/admin/transaction", {
          state: {
            message: res.payload.data.message,
            status: "success",
          },
        });
      } else {
        setRefresh((prev) => prev + 1);
        navigate("/admin/transaction", {
          state: { message: "delete product failed", status: "fail" },
        });
      }
    });
  };

  return (
    <div>
      <Breadcrumb>
        <NavLink to={"/admin/transaction"}>Transaction</NavLink>
      </Breadcrumb>
      <div className="w-full bg-white mt-4">
        <CustomTable
          columns={[
            {
              Header: "No Invoice",
              accessor: "invoice_no",
            },
            {
              Header: "Pelanggan",
              accessor: "customer.name",
            },
            {
              Header: "Total",
              accessor: "grand_total",
              Cell: (row) => <span>{formatRupiah(row.value)}</span>,
            },
            {
              Header: "Status",
              accessor: "status",
            },
            {
              Header: "Aksi",
              accessor: "_id",
              Cell: (row) => {
                return (
                  <div className="flex gap-3">
                    <PDFDownloadLink
                      document={<PdfFile invoice={row.row.original} />}
                      fileName={row.row.original.invoice_no}
                    >
                      {({ loading }) =>
                        loading ? (
                          <button>loading...</button>
                        ) : (
                          <button className="form-button flex gap-2">
                            <i className="bi bi-printer"></i>
                            Print
                          </button>
                        )
                      }
                    </PDFDownloadLink>

                    <NavLink
                      className={"w-full"}
                      to={"/admin/product/update/" + row.value}
                    >
                      <button className="form-button">Edit</button>
                    </NavLink>
                    <button
                      onClick={() => deleteHandle(row.value)}
                      className="form-button-danger"
                    >
                      Hapus
                    </button>
                  </div>
                );
              },
            },
          ]}
          data={data || []}
          initialPageSIze={10}
          options={{ isFilterActive: true, isPagination: true }}
        />
      </div>
    </div>
  );
};

export default Transaction;
