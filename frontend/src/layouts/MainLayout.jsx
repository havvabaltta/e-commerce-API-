import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

function MainLayout() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">

      <Navbar toggleSidebar={() => setShowSidebar(!showSidebar)} />

      <div className="d-flex flex-grow-1 position-relative">
        
        <Sidebar show={showSidebar} />
       
       {showSidebar && (
  <div
    onClick={() => setShowSidebar(false)}
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.3)",
      zIndex: 10,
    }}
  />
)}

        {/* Ana İçerik */}
        <div
          className="flex-grow-1 p-4"
          style={{
            marginLeft: showSidebar ? "240px" : "0",
            transition: "0.3s",
          }}
        >
          <Outlet />
        </div>

      </div>

      <Footer />
    </div>
  );
}

export default MainLayout;