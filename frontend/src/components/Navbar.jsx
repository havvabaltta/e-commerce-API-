import { Link } from "react-router-dom";

function Navbar({ toggleSidebar }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4 py-3 sticky-top">
      {/* Hamburger */}
      <button className="btn btn-outline-primary me-3" onClick={toggleSidebar}>
        ☰
      </button>

      {/* Logo */}
      <Link className="navbar-brand fw-bold text-primary fs-4" to="/">
        🛍️ E-Commerce
      </Link>

      {/* Search */}
      <div className="input-group mx-auto w-50 d-none d-md-flex">
        <input
          className="form-control border-end-0 border rounded-start-pill ps-3"
          placeholder="Ürün ara..."
        />
        <button className="btn btn-outline-primary rounded-end-pill px-4" type="button">
          Ara
        </button>
      </div>

      {/* Right */}
      <div className="d-flex align-items-center">
        <Link className="btn btn-outline-dark me-2 rounded-pill px-3" to="/products">
          Ürünler
        </Link>
        <Link className="btn btn-dark me-2 rounded-pill px-3" to="/login">
          Giriş
        </Link>
        <Link className="btn btn-success rounded-pill px-4" to="/cart">
          Sepet
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;