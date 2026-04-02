import axios from "axios";

const baseUrl = "http://localhost:3500/api/";

export async function getProducts() {
  const { data } = await axios.get(`${baseUrl}products`);
  return data;
}

export async function getProductById(id) {
  const { data } = await axios.get(`${baseUrl}products/${id}`);
  return data;
}
