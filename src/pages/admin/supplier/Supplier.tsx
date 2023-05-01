import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import Breadcrumb from "../../../components/header/Breadcrumb";
import { NavLink, useNavigate } from "react-router-dom";
import CustomTable from "../../../components/table/CustomTable";
import ButtonLink from "../../../components/button/ButtonLink";
import {
  deleteSupplier,
  fetchSupplier,
} from "../../../redux/features/supplierSlice";

const Supplier = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.supplier.data);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchSupplier());
  }, []);

  const deleteHandle = (value: string) => {
    dispatch(deleteSupplier(value)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        navigate("/admin/supplier", {
          state: {
            message: "supplier deleted successfuly",
            status: "success",
          },
        });
      } else {
        navigate("/admin/supplier", {
          state: { message: "delete supplier failed", status: "fail" },
        });
      }
    });
  };
  return (
    <div>
      <Breadcrumb>
        <NavLink to={"/admin/supplier"}>Suplier</NavLink>
      </Breadcrumb>
      <div className="w-full bg-white mt-4">
        <CustomTable
          columns={[
            {
              Header: "#",
              accessor: "",
              Cell: (row) => row.row.index + 1,
            },
            {
              Header: "Name",
              accessor: "name",
            },
            {
              Header: "No. Telepon",
              accessor: "phone",
            },
            {
              Header: "Alamat",
              accessor: "address",
            },
            {
              Header: "",
              accessor: "_id",
              Cell: (row) => (
                <div className="flex gap-3">
                  <NavLink
                    className={"w-full"}
                    to={"/admin/supplier/update/" + row.value}
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
              ),
            },
          ]}
          data={data || []}
          initialPageSIze={10}
          nodeHeader={
            <ButtonLink name="Create Supplier" to="/admin/supplier/create" />
          }
          options={{ isFilterActive: true, isPagination: true }}
        />
      </div>
    </div>
  );
};

export default Supplier;
