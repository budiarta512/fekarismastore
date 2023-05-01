import { useEffect } from "react";
import Breadcrumb from "../../../components/header/Breadcrumb";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { IStoreSupplier } from "../../../utils/types";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import {
  showSupplier,
  updateSupplier,
} from "../../../redux/features/supplierSlice";

const UpdateSupplier = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const supplier = useAppSelector((state) => state.supplier.detailData);
  const { id } = useParams();

  useEffect(() => {
    dispatch(showSupplier(id || ""));
  }, []);

  const submitHandle = (value: IStoreSupplier) => {
    const data = {
      id: id || "",
      data: value,
    };
    dispatch(updateSupplier(data)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        navigate("/admin/supplier", {
          state: {
            message: "supplier updated successfuly",
            status: "success",
          },
        });
      } else {
        navigate("/admin/supplier/update/" + id, {
          state: { message: "update supplier failed", status: "fail" },
        });
      }
    });
  };
  return (
    <div>
      <Breadcrumb>
        <NavLink to="/admin/supplier">Suplier</NavLink>
        <NavLink to="/admin/supplier/create">Buat Suplier</NavLink>
      </Breadcrumb>
      <div className="w-full bg-white mt-4 p-4">
        <Formik
          enableReinitialize={true}
          initialValues={{
            name: supplier?.name || "",
            phone: supplier?.phone || "",
            address: supplier?.address || "",
          }}
          onSubmit={(value) => submitHandle(value)}
        >
          {() => (
            <Form className="flex flex-col gap-4">
              <div>
                <label className="form-label" htmlFor="name">
                  Nama
                </label>
                <Field
                  className={"form-input"}
                  id="name"
                  name="name"
                  placeholder={"Nama Produk"}
                  defaultValue={supplier?.name}
                />
              </div>
              <div>
                <label className="form-label" htmlFor="phone">
                  No. Hp
                </label>
                <Field
                  className={"form-input"}
                  id="phone"
                  name="phone"
                  placeholder={"No. Hp"}
                  defaultValue={supplier?.phone}
                />
              </div>
              <div>
                <label className="form-label" htmlFor="address">
                  Alamat
                </label>
                <Field
                  className={"form-input"}
                  id="address"
                  name="address"
                  placeholder={"Alamat"}
                  defaultValue={supplier?.address}
                />
              </div>
              <div>
                <button className="form-button">Create</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UpdateSupplier;
