import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";

import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetail from "../pages/ProductDetail";
import Login from "../pages/Login";
import UserProfile from "../pages/UserProfile";
import ProtectedRoute from "../components/ProtectedRoute";

function AppRouter() {
  return (
    <AuthProvider> 
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
            <Route
           path="/profile" element={<ProtectedRoute> <UserProfile />
           </ProtectedRoute>}/>

          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default AppRouter;