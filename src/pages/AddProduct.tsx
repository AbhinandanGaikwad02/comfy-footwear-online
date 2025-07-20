import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AddProduct = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    tags: "", // 🆕 tags as comma-separated string
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const tagsArray = form.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean); // ["New", "Popular"]

    const { error } = await supabase.from("products").insert([
      {
        name: form.name,
        price: parseFloat(form.price),
        category: form.category,
        image: form.image,
        tags: tagsArray, // 🆕 array of tags
      },
    ]);

    if (error) {
      alert("❌ Error adding product: " + error.message);
    } else {
      navigate("/admin/products");
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="price">Price</Label>
          <Input name="price" type="number" value={form.price} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Input name="category" value={form.category} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="image">Image URL</Label>
          <Input name="image" value={form.image} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="tags">Tags (comma-separated)</Label>
          <Input
            name="tags"
            placeholder="e.g. New, Popular"
            value={form.tags}
            onChange={handleChange}
          />
        </div>
        <Button type="submit">Add Product</Button>
      </form>
    </div>
  );
};

export default AddProduct;
