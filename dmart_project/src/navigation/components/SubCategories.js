import React, { useEffect, useState } from "react";

export default function SubCategories({ onSelect }) {
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    fetch("https://localhost:7001/api/SubCategories")
      .then((res) => res.json())
      .then((data) => setSubCategories(data))
      .catch((err) => console.error("Error fetching subcategories:", err));
  }, []);

  return (
    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
      {subCategories.map((sub) => (
        <button
          key={sub.subCategoryId}
          onClick={() => onSelect(sub.subCategoryId)}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          {sub.subCategoryName}
        </button>
      ))}
    </div>
  );
}
