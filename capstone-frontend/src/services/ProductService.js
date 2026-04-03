import axios from "axios";

const baseUrl = `${import.meta.env.VITE_API_URL}/api/products`;

export async function getProducts() {
  const { data } = await axios.get(`${baseUrl}products`);
  return data;
}

export async function getProductById(id) {
  const { data } = await axios.get(`${baseUrl}products/${id}`);
  return data;
}
