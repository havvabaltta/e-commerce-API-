import React from "react";

function CategorySidebar({ categories, selectedCategory, setSearchParams }) {
  return (
    <div>
      <h5 className="mb-3">Kategoriler</h5>

      <ul className="list-group">

        <li
          className={`list-group-item ${!selectedCategory ? "active" : ""}`}
          onClick={() => setSearchParams({})}
          style={{ cursor: "pointer" }}
        >
          Tümü
        </li>

        {categories.map(cat => (
          <li
            key={cat.id}
            className={`list-group-item d-flex align-items-center ${
              String(cat.id) === selectedCategory ? "active" : ""
            }`}
            onClick={() => setSearchParams({ category: cat.id })}
            style={{ cursor: "pointer" }}
          >
            <i className={`${cat.icon} me-2`}></i>
            {cat.name}
          </li>
        ))}

      </ul>
    </div>
  );
}

export default CategorySidebar;