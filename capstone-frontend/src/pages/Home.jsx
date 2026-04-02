import { useEffect, useState } from "react";
import { getProducts } from "../services/ProductService";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5; // SHOW ONLY 5 PRODUCTS
  const navigate = useNavigate();

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  // Pagination logic
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProducts = products.slice(indexOfFirst, indexOfLast);

  const nextPage = () => {
    if (indexOfLast < products.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="home-container">

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <h1>Gift's For Growing Minds 🧸</h1>
          <p>Discover toys that spark imagination, joy, and learning.</p>
        </div>
      </section>

      {/* FUN BANNER */}
      <section className="fun-banner">
        <h2>✨ Explore Our Magical Toy Collection ✨</h2>
        <p>From big cars to learning toys — we have something for every kid!</p>
      </section>

      {/* VIEW SELECTION */}
      <section className="products-section">

        {/* HEADER WITH SHOP NOW BUTTON */}
        <div className="view-header">
          <h2>View Selection</h2>

          <button
            className="shop-now-small"
            onClick={() => navigate("/products")}
          >
            Shop Now
          </button>
        </div>

        {/* PRODUCT GRID */}
        <div className="products-grid">
          {currentProducts.map((product) => (
            <div key={product._id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1}>
            Previous
          </button>

          <span>Page {currentPage}</span>

          <button
            onClick={nextPage}
            disabled={indexOfLast >= products.length}
          >
            Next
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;
