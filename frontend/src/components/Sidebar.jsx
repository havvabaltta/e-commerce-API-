import { Link } from "react-router-dom";

function Sidebar({ show }) {
  return (
    <div
      className="p-3 position-fixed h-100 shadow"
      style={{
        width: "240px",
        left: show ? "0" : "-240px",
        top: "0",
        transition: "0.3s",
        zIndex: 1000,
        background: "linear-gradient(180deg, #1e3c72 0%, #2a5298 100%)", // Canlı mavi gradyan
        color: "#fff"
      }}
    >
      <h5 className="mb-4 text-center text-warning fw-bold mt-2">Menü</h5>

      <Link 
        to="/" 
        className="d-block text-white text-decoration-none py-2 px-3 rounded mb-2"
        style={{ transition: "0.2s" }}
        onMouseOver={e => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"}
        onMouseOut={e => e.currentTarget.style.backgroundColor = "transparent"}
      >
        🏠 Ana Sayfa
      </Link>

      <Link 
        to="/products" 
        className="d-block text-white text-decoration-none py-2 px-3 rounded mb-2"
        style={{ transition: "0.2s" }}
        onMouseOver={e => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"}
        onMouseOut={e => e.currentTarget.style.backgroundColor = "transparent"}
      >
        📦 Ürünler
      </Link>

      <Link 
        to="/cart" 
        className="d-block text-white text-decoration-none py-2 px-3 rounded"
        style={{ transition: "0.2s" }}
        onMouseOver={e => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"}
        onMouseOut={e => e.currentTarget.style.backgroundColor = "transparent"}
      >
        🛒 Sepet
      </Link>
    </div>
  );
}

export default Sidebar;