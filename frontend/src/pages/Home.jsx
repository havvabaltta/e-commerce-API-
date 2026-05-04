import { useEffect, useState } from "react";
import { getProducts } from "../api/productApi";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(res => {
      const data = res.data.results || res.data;
      setProducts(data.filter(p => p.isHome));
    });
  }, []);

  return (
    <div className="container py-4">

      {/* HERO */}
      <div className="text-white p-5 rounded-4 mb-5 shadow-lg"
        style={{
          background: "linear-gradient(135deg, #ff7e5f, #feb47b)"
        }}
      >
        <h1>Hoş Geldiniz 👋</h1>
        <Link to="/products" className="btn btn-light mt-3">
          Alışverişe Başla
        </Link>
      </div>

      <h4 className="mb-4">Popüler Ürünler</h4>

      <div className="row">
        {products.map(p => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>

    </div>
  );
}

export default Home;