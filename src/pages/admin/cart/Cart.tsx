import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { showOrderByUserId } from "../../../redux/features/orderSlice";
import Breadcrumb from "../../../components/header/Breadcrumb";
import { NavLink, useNavigate } from "react-router-dom";
import { STORAGE_URL } from "../../../utils/env";
import { formatRupiah } from "../../../utils/currency";
import { deleteCart, refreshCart } from "../../../redux/features/cartSlice";
import { storeTransaction } from "../../../redux/features/transactionSlice";
import { IStoreTransaction } from "../../../utils/types";
import ReactSelect from "react-select";
import { fetchUser } from "../../../redux/features/userSlice";

const Cart = () => {
  const userId = useAppSelector((state) => state.user.user?._id);
  const order = useAppSelector((state) => state.order.detailData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(0);
  const [customer, setCustomer] = useState("");
  const userOptions = useAppSelector((state) =>
    state.user.data?.map((val) => {
      return {
        label: val.name,
        value: val._id,
      };
    })
  );
  const carts = useAppSelector((state) =>
    state.order.detailData?.carts?.map((val) => {
      return {
        _id: val._id,
        product: val.product.name,
        price: val.price,
        total: val.total,
        qty: val.qty,
        additional_price: val.additional_price,
      };
    })
  );

  useEffect(() => {
    dispatch(showOrderByUserId(userId || ""));
    dispatch(fetchUser());
  }, [userId, refresh]);

  const deleteCartHandle = (id: string) => {
    dispatch(deleteCart(id)).then((res: any) => {
      if (res.meta.requestStatus === "fulfilled") {
        setRefresh((prev) => prev + 1);
        dispatch(refreshCart());
        navigate("/admin/cart", {
          state: {
            message: res.payload.data.message,
            status: "success",
          },
        });
      } else {
        setRefresh((prev) => prev + 1);
        navigate("/admin/cart", {
          state: { message: "delete product failed", status: "fail" },
        });
      }
    });
  };

  const grand_total =
    order?.carts?.reduce((acumulator: number, val) => {
      return acumulator + val.total;
    }, 0) || 0;

  const checkoutHandle = () => {
    const data: IStoreTransaction = {
      carts: carts,
      grand_total: grand_total,
      customer: customer,
    };
    dispatch(storeTransaction(data)).then((res: any) => {
      if (res.meta.requestStatus === "fulfilled") {
        navigate("/admin/transaction", {
          state: {
            message: res.payload.data.message,
            status: "success",
          },
        });
      } else {
        setRefresh((prev) => prev + 1);
        navigate("/admin/cart", {
          state: { message: "create transaction failed", status: "fail" },
        });
      }
    });
  };
  return (
    <div>
      <Breadcrumb>
        <NavLink to={"/admin/cart"}>Cart</NavLink>
      </Breadcrumb>
      <div className="w-full bg-white p-4 mt-4">
        <h4 className="text-2xl">Keranjang Belanja</h4>
        <div className="flex flex-col gap-2 w-full mt-4">
          <div className="w-full flex justify-between items-center bg-green-100 p-4 rounded-xl">
            <div className="w-full">
              <span className="w-full flex justify-center">Product</span>
            </div>
            <div className="w-full hidden sm:block">
              <span className="w-full flex justify-end">Harga</span>
            </div>
            <div className="w-full hidden sm:block">
              <span className="w-full flex justify-end">Jumlah</span>
            </div>
            <div className="w-full hidden sm:block">
              <span className="w-full flex justify-end">Total</span>
            </div>
            <div className="w-full">
              <span className="w-full flex justify-end">Aksi</span>
            </div>
          </div>
          {order?.carts?.map((val, index: number) => {
            return (
              <div
                key={val._id}
                className={`w-full flex justify-between items-center p-4 rounded-xl ${
                  index % 2 === 0 ? "bg-orange-100" : "bg-blue-100"
                }`}
              >
                {/* breakpoint */}
                <div className="w-full flex items-center gap-2">
                  <img
                    className="w-24 h-28"
                    src={STORAGE_URL + val.product.image}
                    alt={val.product.image}
                  />
                  <div>
                    <span>{val.product.name}</span>
                    <span className="block sm:hidden">
                      {formatRupiah(val.price)} x {val.qty}
                    </span>
                    <span className="block sm:hidden">
                      = {formatRupiah(val.total)}
                    </span>
                  </div>
                </div>

                {/* breakpoint */}
                <div className="w-full hidden sm:block">
                  <span className="block flex justify-end">
                    {formatRupiah(
                      val.additional_price ? val.additional_price : val.price
                    )}
                  </span>
                </div>
                <div className="w-full hidden sm:block">
                  <span className="block flex justify-end">{val.qty}</span>
                </div>
                <div className="w-full hidden sm:block">
                  <span className="block flex justify-end">
                    {formatRupiah(val.total)}
                  </span>
                </div>
                <div className="w-auto sm:w-full flex justify-end">
                  <button
                    onClick={() => deleteCartHandle(val._id)}
                    className="bg-red-400 rounded-md px-3 py-2 text-white hover:bg-red-500"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            );
          })}
          <div className="w-full flex justify-start sm:justify-center items-center bg-green-100 p-4 rounded-xl">
            <span>Total Belanja : </span>
            <span>
              {formatRupiah(
                order?.carts?.reduce((acumulator: number, val) => {
                  return acumulator + val.total;
                }, 0) || 0
              )}
            </span>
          </div>
        </div>
        <div className="flex justify-end items-center gap-4 mt-4">
          <label htmlFor="customer">Pelanggan</label>
          <ReactSelect
            options={userOptions || []}
            maxMenuHeight={180}
            onChange={(val) => setCustomer(val?.value || "")}
          />
        </div>
        <div className="flex justify-end mt-4">
          <button onClick={checkoutHandle} className="form-button !w-auto">
            Chekout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
