import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const EditProduct = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    tags: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase.from("products").select("*").eq("id", id).single();
      if (data) {
        setForm({
          name: data.name,
          price: data.price,
          category: data.category,
          image: data.image,
          tags: data.tags?.join(", ") || "",
        });
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const tagsArray = form.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    const { error } = await supabase.from("products").update({
      name: form.name,
      price: parseFloat(form.price),
      category: form.category,
      image: form.image,
      tags: tagsArray,
    }).eq("id", id);

    if (error) {
      alert("Error updating product: " + error.message);
    } else {
      navigate("/admin/products");
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6">Edit Product</h2>
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
            value={form.tags}
            onChange={handleChange}
            placeholder="e.g. New, Popular"
          />
        </div>
        <Button type="submit">Update Product</Button>
      </form>
    </div>
  );
};

export default EditProduct;
