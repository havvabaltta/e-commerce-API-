import { useEffect, useState } from "react";
import { getProducts } from "../api/productApi";
import { getCategories } from "../api/categoryApi"; //  ekledik
import { Link } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); //  yeni state

  useEffect(() => {
    // 🔹 ürünleri çek
    getProducts()
      .then((res) => {
        const homeProducts = res.data.filter(p => p.isHome);
        setProducts(homeProducts);
      })
      .catch((err) => console.error(err));

    // 🔹 kategorileri çek
    getCategories()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.error(err));

  }, []);

  return (
    <div>

      {/* HERO */}
      <div className="bg-dark text-white p-5 text-center">
        <div className="container">
          <h1>Hoş Geldin 👋</h1>
          <p>En iyi ürünleri en uygun fiyatlarla keşfet</p>
          <Link to="/products" className="btn btn-primary">
            Alışverişe Başla
          </Link>
        </div>
      </div>

      {/* KATEGORİLER (DİNAMİK) */}
      <div className="container mt-5">
        <h3>Kategoriler</h3>
        <div className="row text-center mt-3">

          {categories.map((cat) => (
            <div className="col-md-3" key={cat.id}>
              <div className="card p-3">
                <h5>{cat.name}</h5>
                <small>{cat.description}</small>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* ÜRÜNLER */}
      <div className="container mt-5">
        <h3>Öne Çıkan Ürünler</h3>
        <div className="row mt-3">
          {products.map((p) => (
            <div className="col-md-3" key={p.id}>
              <div className="card mb-3">
                <div className="card-body">
                  <h5>{p.name}</h5>
                  <p>{p.price} ₺</p>
                  <Link to={`/product/${p.id}`} className="btn btn-outline-primary btn-sm">
                    Detay
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* KAMPANYA */}
      <div className="bg-warning mt-5 p-5 text-center">
        <h2>%50 İndirim!</h2>
        <p>Seçili ürünlerde büyük fırsatları kaçırma</p>
      </div>

      {/* FOOTER */}
      <div className="bg-dark text-white mt-5 p-4 text-center">
        <p>© 2026 E-Commerce</p>
      </div>

    </div>
  );
}

export default Home;