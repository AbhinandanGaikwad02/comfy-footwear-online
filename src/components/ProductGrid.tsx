// src/components/ProductGrid.tsx
import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { useProducts } from "@/hooks/useProducts";
import { CategoryFilters } from "./product/CategoryFilters";
import { ProductCard } from "./product/ProductCard";

const ProductGrid = () => {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const { addToCart } = useCart();
  const { products, loading } = useProducts();
  const [sort, setSort] = useState<"low" | "high" | "">(""); // ✅
const [selectedTags, setSelectedTags] = useState<string[]>([]); // ✅
const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]); // ✅ default

  const filteredProducts = products
  .filter((product) => {
    const categoryMatch = filter === "all" || product.category === filter;
    const priceMatch =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    const tagMatch =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => product.tags?.includes(tag));
    const searchMatch = product.name.toLowerCase().includes(search.toLowerCase()); // ✅ Add this

    return categoryMatch && priceMatch && tagMatch && searchMatch; // ✅ Include searchMatch
  })
  .sort((a, b) => {
    if (sort === "low") return a.price - b.price;
    if (sort === "high") return b.price - a.price;
    return 0;
  });


  if (loading) {
    return <p className="text-center text-gray-600">Loading products...</p>;
  }

  return (
    <div>
      <CategoryFilters currentFilter={filter} onFilterChange={setFilter} />

      {/* 🔍 Search Input */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-4 py-2 w-full max-w-md"
        />
      </div>
      <div className="flex flex-wrap gap-4 mb-6 justify-center">
  <label htmlFor="sort" className="sr-only">Sort products</label>
<select
  id="sort"
  aria-label="Sort products"
  value={sort}
  onChange={(e) => setSort(e.target.value as "low" | "high" | "")}
  className="border px-3 py-2 rounded"
>
  <option value="">Sort by Price</option>
  <option value="low">Low to High</option>
  <option value="high">High to Low</option>
</select>

  {/* Price Range */}
  <label htmlFor="min-price" className="sr-only">Min price</label>
<input
  id="min-price"
  type="number"
  aria-label="Min price"
  value={priceRange[0]}
  onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
  className="border rounded px-2 py-1 w-20"
/>

<label htmlFor="max-price" className="sr-only">Max price</label>
<input
  id="max-price"
  type="number"
  aria-label="Max price"
  value={priceRange[1]}
  onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
  className="border rounded px-2 py-1 w-20"
/>


  {/* Tag Filter */}
  {["New", "Popular"].map((tag) => (
    <button
      key={tag}
      onClick={() =>
        setSelectedTags((prev) =>
          prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        )
      }
      className={`px-3 py-1 rounded border ${
        selectedTags.includes(tag) ? "bg-blue-600 text-white" : "bg-gray-200"
      }`}
    >
      {tag}
    </button>
  ))}
</div>


      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-600">No products match your search.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
