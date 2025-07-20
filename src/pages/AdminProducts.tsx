import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Navigation from "@/components/Navigation";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  tags?: string[];
}

const AdminProducts = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.email === "terminatorkar98@gmail.com") {
      fetchProducts();
    }
  }, [user]);

  const fetchProducts = async () => {
    const { data, error } = await supabase.from("products").select("*");
    if (error) {
      console.error("Error fetching products:", error.message);
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  // ❌ Access Denied UI — move this after hooks
  if (!user) {
    return <div className="p-4 text-red-500">Please sign in first.</div>;
  }

  if (user.email !== "terminatorkar98@gmail.com") {
    return <div className="p-4 text-red-500">Access Denied. Admins only.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-6xl mx-auto py-16 px-4">
        <h1 className="text-2xl font-bold mb-6">Admin - Manage Products</h1>

        <Link to="/admin/products/new">
          <Button className="mb-4">Add New Product</Button>
        </Link>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="min-w-full bg-white border">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-4 py-2">Image</th>
                <th className="text-left px-4 py-2">Name</th>
                <th className="text-left px-4 py-2">Price</th>
                <th className="text-left px-4 py-2">Category</th>
                <th className="text-left px-4 py-2">Tags</th>
                <th className="text-left px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t">
                  <td className="px-4 py-2">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                  <td className="px-4 py-2">{product.name}</td>
                  <td className="px-4 py-2">${product.price}</td>
                  <td className="px-4 py-2">{product.category}</td>
                  <td className="px-4 py-2">
  {Array.isArray(product.tags) ? (
    product.tags.map((tag: string) => (
      <span
        key={tag}
        className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded mr-2"
      >
        {tag}
      </span>
    ))
  ) : (
    <span className="text-gray-400 text-sm">No tags</span>
  )}
</td>

                  <td className="px-4 py-2">
                    <Link
                      to={`/admin/products/edit/${product.id}`}
                      className="text-blue-500 mr-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={async () => {
                        await supabase
                          .from("products")
                          .delete()
                          .eq("id", product.id);
                        fetchProducts(); // Refresh list
                      }}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;
