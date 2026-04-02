import { useState } from "react";

function Admin() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const formData = new FormData();
    Object.keys(product).forEach((key) => {
      if (key === "image") {
        if (product.image) formData.append("image", product.image);
      } else {
        formData.append(key, product[key]);
      }
    });

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`
, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!res.ok) {
      const data = await res.json();
      alert(data.message || "Failed to add product");
      return;
    }

    alert("Product added!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Admin Dashboard</h2>

      <input
        placeholder="Name"
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
      />
      <input
        placeholder="Price"
        type="number"
        onChange={(e) => setProduct({ ...product, price: e.target.value })}
      />
      <input
        placeholder="Category"
        onChange={(e) => setProduct({ ...product, category: e.target.value })}
      />
      <input
        placeholder="Description"
        onChange={(e) =>
          setProduct({ ...product, description: e.target.value })
        }
      />
      <input
        type="file"
        onChange={(e) =>
          setProduct({ ...product, image: e.target.files[0] })
        }
      />

      <button>Add Product</button>
    </form>
  );
}

export default Admin;
