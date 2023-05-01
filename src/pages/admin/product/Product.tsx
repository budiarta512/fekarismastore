import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { STORAGE_URL } from "../../../utils/env";
import Breadcrumb from "../../../components/header/Breadcrumb";
import CustomTable from "../../../components/table/CustomTable";
import ButtonLink from "../../../components/button/ButtonLink";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import {
  deleteProduct,
  fetchProduct,
  showProduct,
} from "../../../redux/features/productSlice";
import { formatRupiah } from "../../../utils/currency";
import CurrencyInput from "react-currency-input-field";
import { showOrderByUserId } from "../../../redux/features/orderSlice";
import { refreshCart, storeCart } from "../../../redux/features/cartSlice";
import { IStoreCart } from "../../../utils/types";

const Product = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userId = useAppSelector((state) => state.user.user?._id);
  const [showModal, setShowModal] = useState(false);
  const data = useAppSelector((state) => state.product.data);
  const detailProduct = useAppSelector((state) => state.product.detailData);
  const [qty, setQty] = useState(0);
  const [customPrice, setCustomPrice] = useState(0);
  const order = useAppSelector((state) => state.order.detailData);

  useEffect(() => {
    dispatch(showOrderByUserId(userId || ""));
  }, [userId]);

  useEffect(() => {
    dispatch(fetchProduct());
  }, []);

  const showModalHandle = (id: string) => {
    setShowModal(true);
    dispatch(showProduct(id));
  };
  const total =
    customPrice !== 0
      ? customPrice * qty
      : detailProduct
      ? detailProduct?.price * qty
      : 0;

  const addProductToCartHandle = () => {
    const data: IStoreCart = {
      product: detailProduct?._id || "",
      order: order?._id || "",
      price: detailProduct?.price || 0,
      qty: qty,
      total: total,
      additional_price: customPrice,
    };
    dispatch(storeCart(data)).then((res: any) => {
      if (res.meta.requestStatus === "fulfilled") {
        setShowModal(false);
        dispatch(refreshCart());
        navigate("/admin/product", {
          state: {
            message: res.payload.data.message,
            status: "success",
          },
        });
      } else {
        setShowModal(false);
        navigate("/admin/product", {
          state: { message: "Product already in cart", status: "fail" },
        });
      }
    });
  };

  const deleteHandle = (id: string) => {
    dispatch(deleteProduct(id)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        navigate("/admin/product", {
          state: {
            message: "product deleted successfuly",
            status: "success",
          },
        });
      } else {
        navigate("/admin/product", {
          state: { message: "delete product failed", status: "fail" },
        });
      }
    });
  };
  const cancelModal = () => {
    setQty(0);
    setCustomPrice(0);
    setShowModal(false);
  };
  return (
    <div>
      <Breadcrumb>
        <NavLink to={"/admin/product"}>Product</NavLink>
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
              Header: "Add to Cart",
              accessor: "asd",
              Cell: (row) => (
                <button
                  className="w-auto form-button "
                  onClick={() => showModalHandle(row.row.original._id)}
                >
                  <i className="bi bi-cart-plus"></i>
                </button>
              ),
            },
            {
              Header: "Price",
              accessor: "price",
              Cell: (row) => formatRupiah(row.value),
            },
            {
              Header: "Qty",
              accessor: "qty",
            },
            {
              Header: "Image",
              accessor: "image",
              Cell: (row) => (
                <div className="w-full">
                  <img
                    className="w-24"
                    src={STORAGE_URL + row.value}
                    alt={row.value}
                  />
                </div>
              ),
            },
            {
              Header: "",
              accessor: "_id",
              Cell: (row) => (
                <div className="flex gap-3">
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
              ),
            },
          ]}
          data={data || []}
          initialPageSIze={10}
          nodeHeader={
            <ButtonLink name="Buat Produk" to="/admin/product/create" />
          }
          options={{ isFilterActive: true, isPagination: true }}
        />
      </div>

      {/* modal */}
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Tambah ke keranjang
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 w-full">
                  <div className="flex justify-between w-full">
                    <div className="flex flex-col gap-1 text-sm">
                      <span>Nama : {detailProduct?.name}</span>
                      <span>sisa produk : {detailProduct?.qty}</span>
                      <span>Harga : {detailProduct?.price}</span>
                      <span>
                        Total :{" "}
                        {formatRupiah(
                          customPrice !== 0
                            ? customPrice * qty
                            : detailProduct
                            ? detailProduct?.price * qty
                            : 0
                        )}
                      </span>
                    </div>
                    <div className="flex justify-end">
                      <img
                        className="w-20"
                        src={STORAGE_URL + detailProduct?.image}
                        alt={detailProduct?.name}
                      />
                    </div>
                  </div>
                  <hr />
                  <div className="flex h-20 gap-2">
                    {/* counter */}
                    <div className="custom-number-input h-10 w-32">
                      <label
                        htmlFor="custom-input-number"
                        className="w-full text-gray-700 text-sm font-semibold"
                      >
                        Jumlah
                      </label>
                      <div className="flex flex-row h-[2.1rem] w-full rounded-lg relative bg-transparent mt-1">
                        <button
                          data-action="decrement"
                          className=" bg-white border text-gray-200 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                          onClick={() => setQty((prev) => prev - 1)}
                        >
                          <span className="m-auto text-2xl font-thin">−</span>
                        </button>
                        <input
                          type="number"
                          className="outline-none focus:outline-none text-center w-full bg-white border font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
                          name="custom-input-number"
                          value={qty}
                          onChange={(e) => setQty(parseInt(e.target.value))}
                        ></input>
                        <button
                          data-action="increment"
                          className="bg-white border text-gray-200 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                          onClick={() => setQty((prev) => prev + 1)}
                        >
                          <span className="m-auto text-2xl font-thin">+</span>
                        </button>
                      </div>
                    </div>
                    <div>
                      {/* custom harga */}
                      <label className="form-label" htmlFor="price">
                        Kustom Harga
                      </label>
                      <CurrencyInput
                        className="form-input mt-1"
                        id="price"
                        prefix="Rp. "
                        placeholder="Rp. 0"
                        onValueChange={(value) =>
                          setCustomPrice(parseInt(value || "0"))
                        }
                        value={customPrice}
                      />
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => cancelModal()}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => addProductToCartHandle()}
                  >
                    Tambah Ke Keranjang
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
};

export default Product;
