import { api, apiFormData } from "./api";

const fetchOrder = async () => {
  return await api.get("v1/order");
};

const showOrder = async (id: string) => {
  return await api.get("v1/order/" + id);
};

const showOrderByUserId = async (id: string) => {
  return await api.get("v1/order/user/" + id);
};

const storeOrder = async (data: FormData) => {
  return await api.post("v1/order", data);
};

const updateOrder = async (data: { id: string; data: FormData }) => {
  return await api.post("v1/order/" + data.id, data.data);
};

const deleteOrder = async (id: string) => {
  return await api.delete("v1/order/" + id);
};

export default {
  fetchOrder,
  showOrder,
  showOrderByUserId,
  storeOrder,
  updateOrder,
  deleteOrder,
};
