import { useEffect, useState } from "react";
import { getProducts } from "../api/productApi";
import { Link } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(res => {
      const data = res.data.results || res.data;
      setProducts(data);
    });
  }, []);

  return (
    <div className="container py-4">

      {/* HERO */}
      <div
        className="text-white p-5 rounded-4 mb-5 shadow-lg"
        style={{
          background: "linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)",
        }}
      >
        <h1 className="display-4 fw-bold mb-3">Hoş Geldin 👋</h1>
        <p className="lead mb-4">
          En iyi ürünleri keşfetmeye hazır mısın?
        </p>

        <Link
          to="/products"
          className="btn btn-light btn-lg px-5 rounded-pill"
        >
          Alışverişe Başla
        </Link>
      </div>

      {/* PRODUCTS */}
      <h4 className="mb-4 fw-bold">Popüler Ürünler</h4>

      <div className="row g-4">

        {products.slice(0, 8).map(p => (
          <div className="col-md-3 col-sm-6" key={p.id}>

            <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">

              {/* IMAGE */}
              <img
                src={
                  p.image
                    ? `http://127.0.0.1:8000${p.image}`
                    : "https://via.placeholder.com/300"
                }
                alt={p.name}
                style={{ height: "180px", objectFit: "cover" }}
                className="w-100"
              />

              <div className="card-body d-flex flex-column">

                <h6 className="fw-bold">{p.name}</h6>

                <span className="badge bg-success mb-2">
                  {p.price} ₺
                </span>

                <Link
                  to={`/product/${p.id}`}
                  className="btn btn-outline-dark mt-auto rounded-pill"
                >
                  Detay
                </Link>

              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Home;