import { useState, useEffect } from "react";
import Breadcrumb from "../../../components/header/Breadcrumb";
import { NavLink, useNavigate } from "react-router-dom";
import { Field, Formik, Form } from "formik";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import ReactSelect from "react-select";
import CurrencyInput from "react-currency-input-field";
import { fetchSupplier } from "../../../redux/features/supplierSlice";
import { storeProduct } from "../../../redux/features/productSlice";

type TProductForm = {
  name: string;
  qty: number;
};

const CreateProduct = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [price, setPrice] = useState<string | undefined>("");
  const [supplier, setSupplier] = useState<string | undefined>("");
  const [image, setImage] = useState<FileList | null>(null);
  const suppliers = useAppSelector((state) =>
    state.supplier.data?.map((res) => {
      return {
        label: res.name,
        value: res._id,
      };
    })
  );

  useEffect(() => {
    dispatch(fetchSupplier());
  }, []);

  const submitHandle = (value: TProductForm) => {
    const fd = new FormData();
    fd.append("price", price || "");
    fd.append("supplier", supplier || "");
    fd.append("image", image ? image[0] : "");
    fd.append("qty", value.qty.toString());
    fd.append("name", value.name);
    dispatch(storeProduct(fd)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        navigate("/admin/product", {
          state: {
            message: "product created successfuly",
            status: "success",
          },
        });
      } else {
        navigate("/admin/product/create", {
          state: { message: "create product failed", status: "fail" },
        });
      }
    });
  };
  return (
    <div>
      <Breadcrumb>
        <NavLink to="/admin/product">Product</NavLink>
        <NavLink to="/admin/product/create">Craete Product</NavLink>
      </Breadcrumb>
      <div className="w-full bg-white mt-4 p-4">
        <Formik
          initialValues={{
            name: "",
            qty: 0,
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
              <label className="form-label" htmlFor="supplier">
                Suplier
              </label>
              <ReactSelect
                options={suppliers}
                id="supplier"
                onChange={(value) => setSupplier(value?.value)}
              />
            </div>
            <div>
              <label className="form-label" htmlFor="price">
                Harga
              </label>
              <CurrencyInput
                className="form-input"
                id="price"
                prefix="Rp. "
                placeholder="Rp. 0"
                onValueChange={(value) => setPrice(value)}
              />
            </div>
            <div>
              <label className="form-label" htmlFor="qty">
                Jumlah
              </label>
              <Field
                className={"form-input"}
                id="qty"
                name="qty"
                placeholder={"Jumlah produk"}
              />
            </div>
            <div>
              <label className="form-label" htmlFor="image">
                Gambar
              </label>
              <input
                className={"form-input"}
                type="file"
                id={"image"}
                onChange={(e) => setImage(e.target.files)}
              />
            </div>
            <div>
              <button className="form-button">Login</button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default CreateProduct;
