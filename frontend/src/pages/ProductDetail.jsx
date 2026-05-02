import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../api/productApi";
import { getProductComments } from "../api/commentApi";
import { addToCart } from "../api/cartApi";

function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // 🔹 ürün detayı
    getProduct(id)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));

    // 🔹 yorumlar
    getProductComments(id)
      .then((res) => setComments(res.data))
      .catch((err) => console.error(err));

  }, [id]);

  // 🛒 sepete ekle
  const handleAddToCart = () => {
    addToCart({ product: id, quantity: 1 })
      .then(() => alert("Sepete eklendi"))
      .catch((err) => console.error(err));
  };

  if (!product) return <p>Yükleniyor...</p>;

  return (
    <div className="container mt-4">

      <div className="row">

        {/* 🔹 SOL: ÜRÜN */}
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <h4>{product.price} ₺</h4>
          <p>Stok: {product.stock}</p>

          <button className="btn btn-success" onClick={handleAddToCart}>
            Sepete Ekle
          </button>
        </div>

        {/* 🔹 SAĞ: YORUMLAR */}
        <div className="col-md-6">
          <h4>Yorumlar</h4>

          {comments.length === 0 && <p>Henüz yorum yok</p>}

          {comments.map((c) => (
            <div key={c.id} className="card mb-2 p-2">
              <strong>⭐ {c.rating}</strong>
              <p>{c.text}</p>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}

export default ProductDetail;