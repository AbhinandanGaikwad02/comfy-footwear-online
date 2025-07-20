// src/hooks/useProducts.ts
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  tags?: string[];
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching products:", error.message);
      } else {
        setProducts(data || []);
      }

      setLoading(false);
    };

    fetchProducts();
  }, []);

  return { products, loading };
};
