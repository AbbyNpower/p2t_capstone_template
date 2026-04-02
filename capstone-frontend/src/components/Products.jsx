import { useEffect, useState } from "react";
import { useCartStore } from "../store/CartStore";
import axios from "axios";
import "../styles/products.css";

const baseURL = `${import.meta.env.VITE_API_URL}/api/products`;

function Products() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");

  const addToCart = useCartStore((state) => state.addToCart);

  const isAdmin = localStorage.getItem("isAdmin") === "true";

  useEffect(() => {
    axios
      .get(`${baseURL}?category=${category}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, [category]);

  const deleteProduct = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${baseURL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.log(err);
      alert("Failed to delete product");
    }
  };

  return (
    <div className="products-page">
      <h1>🛍️ Products</h1>

      <div className="filters">
        <button onClick={() => setCategory("All")}>All</button>
        <button onClick={() => setCategory("Toys")}>Toys</button>
        <button onClick={() => setCategory("Big Cars")}>Big Cars for Kids</button>
        <button onClick={() => setCategory("Learning")}>Learning Toys</button>
      </div>

      <div className="products-grid">
        {products.map((p) => (
          <div key={p._id} className="card">
            <img src={p.image} alt={p.name} />

            <h3>{p.name}</h3>

            <p className="description">{p.description}</p>

            <p>${p.price}</p>

            <button onClick={() => addToCart(p)}>Add to Cart</button>

            {isAdmin && (
              <button
                className="delete-btn"
                onClick={() => deleteProduct(p._id)}
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;

