import axios from "axios";

const baseUrl = "http://localhost:3500";

export async function checkoutCart(items) {
  const token = localStorage.getItem("token");

  const res = await axios.post(
    `${baseUrl}/api/payment/create-checkout-session`,
    { cartItems: items },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data; // { url }
}

export async function createOrder(sessionId) {
  const res = await axios.post(`${baseUrl}/api/orders/from-stripe?sessionId=${sessionId}`);
  return res.data;
}
