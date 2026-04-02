import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { createOrder } from "../services/PaymentService";
import { useCartStore } from "../store/CartStore"; 

function Success() {
  const [params] = useSearchParams();
  const [order, setOrder] = useState(null);

  const clearCart = useCartStore((state) => state.clearCart); 

  const sessionId = params.get("session_id");

  useEffect(() => {
    if (sessionId) {
      createOrder(sessionId)
        .then((data) => {
          setOrder(data);
          clearCart(); 
        })
        .catch((err) => console.log(err));
    }
  }, [sessionId, clearCart]);

  return (
    <div>
      <h2>Payment Successful ✅</h2>

      {order && (
        <>
          <p>Order ID: {order._id}</p>
          <p>Total: ${order.totalPrice}</p>
        </>
      )}
    </div>
  );
}

export default Success;

