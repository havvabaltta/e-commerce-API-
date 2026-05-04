import ProductCard from "./ProductCard";

function ProductGrid({ products }) {
  return (
    <div className="row mt-3 g-3">
      {products.map(p => (
        <ProductCard key={p.id} p={p} />
      ))}
    </div>
  );
}

export default ProductGrid;