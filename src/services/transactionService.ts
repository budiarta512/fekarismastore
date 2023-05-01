import { IStoreTransaction } from "../utils/types";
import { api } from "./api";

const fetchTransaction = async () => {
  return await api.get("v1/transaction");
};

const showTransaction = async (id: string) => {
  return await api.get("v1/transaction/" + id);
};

const storeTransaction = async (data: IStoreTransaction) => {
  return await api.post("v1/transaction", data);
};

const updateTransaction = async (data: {
  id: string;
  data: IStoreTransaction;
}) => {
  return await api.put("v1/transaction/" + data.id, data.data);
};

const deleteTransaction = async (id: string) => {
  return await api.delete("v1/transaction/" + id);
};

export default {
  fetchTransaction,
  showTransaction,
  storeTransaction,
  updateTransaction,
  deleteTransaction,
};
