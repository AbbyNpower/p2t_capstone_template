import { useCartStore } from "../store/CartStore";
import "../styles/cart.css";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51TCsN8FO56fBLZvUb3AV5VDbGVWjYOQWQIlQdRfe85VJhEcyGbiHSVhlIkkzaiTYK5DhCE2AyVPMVUJ7pcALljTT006HAkpL3n"
);

function Cart() {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    try {
      const stripe = await stripePromise;

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/payment/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ cartItems: cart }),
        }
      );

      const data = await response.json();

      if (!data.url) {
        console.error("Stripe session error:", data);
        alert("Unable to start checkout");
        return;
      }

      window.location.href = data.url;
    } catch (err) {
      console.log("Checkout error:", err);
      alert("Checkout failed");
    }
  }; // <-- correct closing of handleCheckout

  return (
    <div className="cart-container">
      <h1>Your Cart 🛒</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.image} alt={item.name} width="100" />

              <div>
                <h3>{item.name}</h3>
                <p>${item.price}</p>
              </div>

              <button onClick={() => removeFromCart(index)}>Remove</button>
            </div>
          ))}
        </>
      )}

      <h2>Total: ${total}</h2>

      <button className="checkout-btn" onClick={handleCheckout}>
        Checkout
      </button>
      <button className="clear-btn" onClick={clearCart}>
        Clear Cart
      </button>
    </div>
  );
}

export default Cart;
