// src/hooks/useCart.ts
import { create } from "zustand";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  user: User | null;
  syncing: boolean; // 👈 add this
  setUser: (user: User | null) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  total: number; // ✅ add total
  updateQuantity: (id: string, quantity: number) => void;
}

export const useCart = create<CartState>((set, get) => ({
  items: [],
  user: null,
  total: 0, // ✅ initialize total
  syncing: false, 

  setUser: async (user) => {
    set({ user, syncing: true }); 
    
    await new Promise((res) => setTimeout(res, 1000));

    if (user) {
      const { data, error } = await supabase
        .from("carts")
        .select("items")
        .eq("user_id", user.id)
        .single();

      if (!error && data?.items) {
        set({ items: data.items, total: calculateTotal(data.items) });
      } else {
        set({ items: [], total: 0 });
      }
    } else {
      set({ items: [], total: 0 });
    }

    set({ syncing: false }); 
  },

  addToCart: async (item) => {
    const { items, user } = get();
    const existing = items.find((i) => i.id === item.id);
    let updatedItems;

    if (existing) {
      updatedItems = items.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      );
    } else {
      updatedItems = [...items, { ...item, quantity: 1 }];
    }

    set({ items: updatedItems, total: calculateTotal(updatedItems) });

    if (user) {
      await supabase
        .from("carts")
        .upsert({ user_id: user.id, items: updatedItems });
    }
  },

  removeFromCart: async (id) => {
    const { items, user } = get();
    const updatedItems = items.filter((item) => item.id !== id);
    set({ items: updatedItems, total: calculateTotal(updatedItems) });

    if (user) {
      await supabase
        .from("carts")
        .upsert({ user_id: user.id, items: updatedItems });
    }
  },

  clearCart: async () => {
    const user = get().user;
    set({ items: [], total: 0 });

    if (user) {
      await supabase
        .from("carts")
        .upsert({ user_id: user.id, items: [] });
    }
  },
  updateQuantity: async (id, quantity) => {
  const { items, user } = get();
  const updatedItems = items.map((item) =>
    item.id === id ? { ...item, quantity } : item
  );

  set({ items: updatedItems, total: calculateTotal(updatedItems) });

  if (user) {
    await supabase
      .from("carts")
      .upsert({ user_id: user.id, items: updatedItems });
  }
},
}));

// 🧮 Helper function to calculate total
const calculateTotal = (items: CartItem[]): number =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);

// 🧼 Utility for logout
export const clearCartOutsideStore = () => {
  useCart.setState({ items: [], total: 0 });
};
