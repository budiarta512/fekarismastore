import Breadcrumb from "../../../components/header/Breadcrumb";
import { NavLink, useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { IStoreSupplier } from "../../../utils/types";
import { useAppDispatch } from "../../../redux/store";
import { storeSupplier } from "../../../redux/features/supplierSlice";

const CreateSupplier = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const submitHandle = (value: IStoreSupplier) => {
    dispatch(storeSupplier(value)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        navigate("/admin/supplier", {
          state: {
            message: "supplier created successfuly",
            status: "success",
          },
        });
      } else {
        navigate("/admin/supplier/create", {
          state: { message: "create supplier failed", status: "fail" },
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
          initialValues={{
            name: "",
            phone: "",
            address: "",
          }}
          onSubmit={(value) => submitHandle(value)}
        >
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
              />
            </div>
            <div>
              <button className="form-button">Create</button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default CreateSupplier;
