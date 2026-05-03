import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

function MainLayout({ children }) {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <Navbar toggleSidebar={() => setShowSidebar(!showSidebar)} />

      <div className="d-flex flex-grow-1 position-relative">
        <Sidebar show={showSidebar} />

        {/* Ana İçerik Alanı */}
        <div
          className="flex-grow-1 p-4"
          style={{
            marginLeft: showSidebar ? "240px" : "0",
            transition: "0.3s",
          }}
        >
          {children}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default MainLayout;