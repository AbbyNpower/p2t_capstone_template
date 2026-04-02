import { useEffect, useState } from "react";
import "../styles/orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${import.meta.env.VITE_API_URL}/api/orders`
, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(setOrders)
      .catch(console.log);
  }, []);

  return (
    <div className="orders-page">
      <h1>📦 All Orders</h1>

      {orders.length === 0 && <p>No orders found.</p>}

      {orders.map((o) => (
        <div key={o._id} className="order-card">
          <p><strong>Order ID:</strong> {o._id}</p>
          <p><strong>Total:</strong> ${o.totalPrice}</p>
          <p><strong>Paid:</strong> {o.isPaid ? "Yes" : "No"}</p>

          <div className="order-items">
            <strong>Items:</strong>
            {o.orderItems.map((item, index) => (
              <p key={index}>
                {item.name} — {item.quantity} × ${item.price}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Orders;


