import { Link } from "react-router-dom";

const BASE_URL = "http://127.0.0.1:8000";

function ProductCard({ p }) {
  return (
    <div className="col-md-4 mb-4">

      <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">

        {/* IMAGE */}
        <div
          style={{
            height: "200px",
            backgroundColor: "#f8f9fa",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <img
            src={
              p.image
                ? (p.image.startsWith("http")
                    ? p.image
                    : `${BASE_URL}${p.image}`)
                : "https://via.placeholder.com/300"
            }
            alt={p.name}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain"
            }}
          />
        </div>

        {/* BODY */}
        <div className="card-body d-flex flex-column">

          <h6 className="fw-bold text-truncate">{p.name}</h6>  {/*isim taşmaması için*/}

          <p className="text-success fw-bold mb-2">
            {p.price} ₺
          </p>

          <p className="text-muted small mb-3">
             {p.stock ?? "Stokta yok"}
          </p>

          <Link
            to={`/product/${p.id}`}
            className="btn btn-primary mt-auto rounded-pill w-100"
          >
            Detay
          </Link>

        </div>

      </div>

    </div>
  );
}

export default ProductCard;