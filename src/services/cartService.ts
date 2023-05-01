import { IStoreCart } from "../utils/types";
import { api } from "./api";

const fetchCart = async (options: string | undefined) => {
  return await api.get(
    "v1/cart" + (options === undefined ? "" : "/" + options)
  );
};

const showCart = async (id: string) => {
  return await api.get("v1/cart/" + id);
};

const storeCart = async (data: IStoreCart) => {
  return await api.post("v1/cart", data);
};

const updateCart = async (data: { id: string; data: IStoreCart }) => {
  return await api.post("v1/cart/" + data.id, data.data);
};

const deleteCart = async (id: string) => {
  return await api.delete("v1/cart/" + id);
};

export default {
  fetchCart,
  showCart,
  storeCart,
  updateCart,
  deleteCart,
};
