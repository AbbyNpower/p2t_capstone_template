import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Admin from "./pages/Admin";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders"
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";

function App() {
  return (
    <section className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add-product" element={<Admin />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancelled" element={<Cancel />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </section>
  );
}

export default App;
