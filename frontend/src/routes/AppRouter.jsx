import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetail from "../pages/ProductDetail";

function AppRouter() {
  return (
    <BrowserRouter>

      <Routes>
        
        <Route path="/" element={<MainLayout><Home /></MainLayout>}/>
        <Route path="/products" element={<MainLayout><Products /></MainLayout>}/>
        <Route path="/product/:id" element={<MainLayout><ProductDetail /></MainLayout>}/>
               
               

      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;