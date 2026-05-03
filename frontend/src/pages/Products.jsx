import { useEffect, useState } from "react";
import { getProducts } from "../api/productApi";
import { getCategories } from "../api/categoryApi";
import { Link, useSearchParams } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category");

  useEffect(() => {

    getProducts().then(res => {
      let data = res.data.results || res.data;

      if (selectedCategory) {
        data = data.filter(
          p => String(p.category) === selectedCategory
        );
      }

      setProducts(data);
    });

    getCategories().then(res => setCategories(res.data));

  }, [selectedCategory]);

  return (
    <div className="container mt-4">

      <div className="row">

        {/* CATEGORY */}
        <div className="col-md-3">

          <h5 className="mb-3">Kategoriler</h5>

          <ul className="list-group">

            {/* ALL */}
            <li
              className="list-group-item"
              onClick={() => setSearchParams({})}
              style={{ cursor: "pointer" }}
            >
              Tümü
            </li>

            {/* CATEGORIES */}
            {categories.map(cat => (
              <li
                key={cat.id}
                className="list-group-item d-flex align-items-center"
                onClick={() => setSearchParams({ category: cat.id })}
                style={{ cursor: "pointer" }}
              >

                {/* ICON */}
                <i className={`${cat.icon} me-2`}></i>

                {cat.name}

              </li>
            ))}

          </ul>

        </div>

        {/* PRODUCTS */}
        <div className="col-md-9">

          <h4>Ürünler</h4>

          <div className="row mt-3 g-3">

            {products.map(p => (
              <div className="col-md-4" key={p.id}>

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

                    <p className="text-success fw-bold">
                      {p.price} ₺
                    </p>

                    <p className="text-muted small">
                      Stok: {p.stock}
                    </p>

                    <Link
                      to={`/product/${p.id}`}
                      className="btn btn-primary mt-auto rounded-pill"
                    >
                      Detay
                    </Link>

                  </div>

                </div>

              </div>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Products;