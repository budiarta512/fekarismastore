import { api, apiFormData } from "./api";

const fetchProduct = async (options: string | undefined) => {
  return await api.get(
    "v1/product" + (options === undefined ? "" : "/" + options)
  );
};

const showProduct = async (id: string) => {
  return await api.get("v1/product/" + id);
};

const storeProduct = async (data: FormData) => {
  return await apiFormData.post("v1/product", data);
};

const updateProduct = async (data: { id: string; data: FormData }) => {
  return await apiFormData.post("v1/product/" + data.id, data.data);
};

const deleteProduct = async (id: string) => {
  return await api.delete("v1/product/" + id);
};

export default {
  fetchProduct,
  showProduct,
  storeProduct,
  updateProduct,
  deleteProduct,
};
