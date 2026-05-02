import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">

        {/* LOGO */}
        <Link className="navbar-brand" to="/">
          E-Commerce
        </Link>

        {/* MENU */}
        <div className="d-flex">

          <Link className="btn btn-outline-light me-2" to="/products">
            Ürünler
          </Link>

          <Link className="btn btn-outline-light me-2" to="/cart">
            Sepet
          </Link>

          <Link className="btn btn-outline-warning" to="/login">
            Giriş
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;