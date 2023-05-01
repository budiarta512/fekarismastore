import React, { useState, useEffect } from "react";
import Breadcrumb from "../../../components/header/Breadcrumb";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import CurrencyInput from "react-currency-input-field";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { fetchSupplier } from "../../../redux/features/supplierSlice";
import {
  showProduct,
  updateProduct,
} from "../../../redux/features/productSlice";
import ReactSelect from "react-select";
import { STORAGE_URL } from "../../../utils/env";

type TProductForm = {
  name: string;
  qty: number;
};

const UpdateProduct = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const product = useAppSelector((state) => state.product.detailData);
  const [price, setPrice] = useState<string | undefined>("");
  const [supplier, setSupplier] = useState({
    label: "",
    value: "",
  });
  const [image, setImage] = useState<FileList | null>(null);
  const [showImage, setShowImage] = useState("");
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
    dispatch(showProduct(id || ""));
  }, [id]);

  useEffect(() => {
    setPrice(product?.price ? product?.price.toString() : "");
    setSupplier({
      label: product?.supplier.name || "",
      value: product?.supplier._id || "",
    });
    setShowImage(product?.image || "");
  }, [product]);

  const submitHandle = (value: TProductForm) => {
    const fd = new FormData();
    fd.append("name", value.name);
    fd.append("qty", value?.qty ? value.qty.toString() : "");
    fd.append("price", price || "");
    fd.append("image", image ? image[0] : "");
    fd.append("supplier", supplier.value);

    dispatch(updateProduct({ id: id || "", data: fd })).then((res: any) => {
      if (res.meta.requestStatus === "fulfilled") {
        navigate("/admin/product", {
          state: {
            message: res.payload.data.message,
            status: "success",
          },
        });
      } else {
        navigate("/admin/product/update/" + id, {
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
          enableReinitialize={true}
          initialValues={{
            name: product?.name || "",
            qty: product?.qty || 0,
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
                defaultValue={product?.name}
              />
            </div>

            <div>
              <label className="form-label" htmlFor="supplier">
                Suplier
              </label>
              <ReactSelect
                options={suppliers}
                id="supplier"
                onChange={(value: any) =>
                  setSupplier({
                    label: value?.value || "",
                    value: value?.value || "",
                  })
                }
                value={[supplier]}
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
                value={price}
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
                defaultValue={product?.qty}
              />
            </div>
            <div>
              <img
                className="w-44"
                src={STORAGE_URL + showImage}
                alt={showImage}
              />
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

export default UpdateProduct;
