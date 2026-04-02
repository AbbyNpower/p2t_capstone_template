import { useState } from "react";

function Checkout() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    email: "",
  });

  return (
    <div className="checkout">
      <h2>Checkout</h2>

      <input placeholder="Name" onChange={(e) => setForm({...form, name: e.target.value})} />
      <input placeholder="Address" onChange={(e) => setForm({...form, address: e.target.value})} />
      <input placeholder="Email" onChange={(e) => setForm({...form, email: e.target.value})} />

      <p>Click checkout in cart to pay</p>
    </div>
  );
}

export default Checkout;