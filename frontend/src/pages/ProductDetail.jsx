import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../api/productApi";
import { addToCart } from "../api/cartApi";

const BASE_URL = "http://127.0.0.1:8000";

function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [quantity, setQuantity] = useState(1);
  const [cartMessage, setCartMessage] = useState("");

  useEffect(() => {
    setLoading(true);

    getProduct(id)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Ürün bulunamadı");
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    addToCart({
      product_id: product.id,
      quantity: quantity,
    })
      .then(() => {
        setCartMessage("Ürün sepete eklendi ✔");
        setTimeout(() => setCartMessage(""), 2000);
      })
      .catch(() => {
        setCartMessage("Sepete eklenemedi ❌");
        setTimeout(() => setCartMessage(""), 2000);
      });
  };

  if (loading)
    return <p className="text-center mt-5">Yükleniyor...</p>;

  if (error)
    return <p className="text-center text-danger mt-5">{error}</p>;

  return (
    <div className="container mt-5">

      <div className="row g-4">

        {/* IMAGE */}
        <div className="col-md-5">
          <div className="border rounded-4 p-3 bg-light text-center">
            <img
              src={
                product.image
                  ? product.image.startsWith("http")
                    ? product.image
                    : `${BASE_URL}${product.image}`
                  : "https://via.placeholder.com/400"
              }
              alt={product.name}
              className="img-fluid rounded-3"
              style={{ maxHeight: "400px", objectFit: "contain" }}
            />
          </div>
        </div>

        {/* DETAILS */}
        <div className="col-md-7">

          <h2 className="fw-bold">{product.name}</h2>

          <h3 className="text-success mt-2">
            {product.price} ₺
          </h3>

          <p className="text-muted">
            Stok: {product.stock ?? "Yok"}
          </p>

          <p className="mt-3">
            {product.description || "Açıklama yok"}
          </p>

          {/* QUANTITY */}
          <div className="d-flex align-items-center gap-2 mt-3">

            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="form-control w-25"
            />

            <button
              className="btn btn-primary"
              onClick={handleAddToCart}
            >
              Sepete Ekle
            </button>

          </div>

          {/* CART MESSAGE */}
          {cartMessage && (
            <p className="mt-2 text-success fw-bold">
              {cartMessage}
            </p>
          )}

          {/* COMMENTS */}
          <div className="mt-5">

            <h5>Yorumlar</h5>

            {product.comments && product.comments.length > 0 ? (
              product.comments.map((c) => (
                <div key={c.id} className="border rounded p-2 mb-2">

                  <div className="d-flex justify-content-between">
                    <strong>{c.user}</strong>
                    <span style={{ color: "#f5c518", fontSize: "18px" }}>
                      {[...Array(5)].map((_, i) => (
                       <span key={i}>
                       {i < c.rating ? "★" : "☆"}
                      </span>
                      ))}
                    </span>
                  </div>

                  <p className="mb-0">{c.text}</p>

                </div>
              ))
            ) : (
              <p className="text-muted">
                Henüz yorum yok
              </p>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductDetail;