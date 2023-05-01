import { IStoreSupplier } from "../utils/types";
import { api } from "./api";

const fetchSupplier = async (options: string | undefined) => {
  return await api.get(
    "v1/supplier" + options !== undefined ? "/" + options : ""
  );
};

const showSupplier = async (id: string) => {
  return await api.get("v1/supplier/" + id);
};

const storeSupplier = async (data: IStoreSupplier) => {
  return await api.post("v1/supplier", data);
};

const updateSupplier = async (data: { id: string; data: IStoreSupplier }) => {
  return await api.put("v1/supplier/" + data.id, data.data);
};

const deleteSupplier = async (id: string) => {
  return await api.delete("v1/supplier/" + id);
};

export default {
  fetchSupplier,
  showSupplier,
  storeSupplier,
  updateSupplier,
  deleteSupplier,
};
