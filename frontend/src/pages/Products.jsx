import { useEffect, useState } from "react";
import { getProducts } from "../api/productApi";
import { getCategories } from "../api/categoryApi";
import { Link, useSearchParams } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  // URL'den category al
  const selectedCategory = searchParams.get("category");

  useEffect(() => {
    // ürünleri çek
    getProducts()
      .then((res) => {
        let data = res.data;

        // kategori filtre
        if (selectedCategory) {
          data = data.filter(
            (p) => String(p.category) === selectedCategory
          );
        }

        setProducts(data);
      })
      .catch((err) => console.error(err));

    // kategorileri çek
    getCategories()
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));

  }, [selectedCategory]);

  return (
    <div className="container mt-4">

      <div className="row">

        {/* 🔹 SOL: KATEGORİ FİLTRE */}
        <div className="col-md-3">
          <h5>Kategoriler</h5>

          <ul className="list-group">

            <li
              className="list-group-item"
              onClick={() => setSearchParams({})}
              style={{ cursor: "pointer" }}
            >
              Tümü
            </li>

            {categories.map((cat) => (
              <li
                key={cat.id}
                className="list-group-item"
                onClick={() =>
                  setSearchParams({ category: cat.id })
                }
                style={{ cursor: "pointer" }}
              >
                {cat.name}
              </li>
            ))}

          </ul>
        </div>

        {/* 🔹 SAĞ: ÜRÜNLER */}
        <div className="col-md-9">
          <h4>Ürünler</h4>

          <div className="row mt-3">
            {products.map((p) => (
              <div className="col-md-4" key={p.id}>
                <div className="card mb-3 h-100">
                  <div className="card-body d-flex flex-column">
                    <h5>{p.name}</h5>
                    <p>{p.price} ₺</p>
                    <p>Stok: {p.stock}</p>

                    <Link
                      to={`/product/${p.id}`}
                      className="btn btn-primary mt-auto"
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