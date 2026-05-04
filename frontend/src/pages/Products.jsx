import { useEffect, useState } from "react";
import { getProducts } from "../api/productApi";
import { getCategories } from "../api/categoryApi";
import { useSearchParams } from "react-router-dom";

import CategorySidebar from "../components/CategorySidebar";
import ProductGrid from "../components/ProductGrid";

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category");

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [selectedCategory]);

  const fetchProducts = async () => {
    const res = await getProducts();
    let data = res.data.results || res.data;

    if (selectedCategory) {
      data = data.filter(
        p =>
          String(p.category) === selectedCategory ||
          String(p.category?.id) === selectedCategory
      );
    }

    setProducts(data);
  };

  const fetchCategories = async () => {
    const res = await getCategories();
    setCategories(res.data);
  };

  return (
    <div className="container mt-4">
      <div className="row">

        {/* SIDEBAR */}
        <div className="col-md-3">
          <CategorySidebar
            categories={categories}
            selectedCategory={selectedCategory}
            setSearchParams={setSearchParams}
          />
        </div>

        {/* PRODUCTS */}
        <div className="col-md-9">
          <h4>Ürünler</h4>
          <ProductGrid products={products} />
        </div>

      </div>
    </div>
  );
}

export default Products;