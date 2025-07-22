
import emailjs from "@emailjs/browser"; 
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import Navigation from "@/components/Navigation";


interface Order {
  id: string;
  name: string;
  phone: string;
  address: string;
  email?: string; // ✅ Add this
  total: number;
  created_at: string;
  status: string;
}
const AdminOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  if (!user || user.email !== "terminatorkar98@gmail.com") {
    return <div className="p-4 text-red-500">Access Denied. Admins only.</div>;
  }

  useEffect(() => {
    supabase.from("orders").select("*").order("created_at", { ascending: false })
      .then(({ data }) => { setOrders(data || []); setLoading(false); });
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string, email: string, name: string) => {
  console.log("🔄 Changing status for", orderId, "to", newStatus, "for", email);

  const { error } = await supabase
    .from("orders")
    .update({ status: newStatus })
    .eq("id", orderId);

  if (!error) {
    console.log("✅ Status updated in Supabase");
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );

    await emailjs.send(
  import.meta.env.VITE_EMAILJS_SERVICE_ID!,
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID_ORDER_STATUS!,
  {
    to_email: email,
    user_name: name,
    order_status: newStatus,
    order_id: orderId,
    email,
    name,
    time: new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }),
    message: `Your order has been marked as ${newStatus}`,
  },
  import.meta.env.VITE_EMAILJS_USER_ID!
);

  } else {
    console.error("❌ Supabase update error:", error.message);
  }
};


  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-6xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">Admin Orders</h1>
        {loading ? <p>Loading orders...</p> :
          <div className="overflow-x-auto bg-white shadow rounded">
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th>Name</th><th>Phone</th><th>Email</th><th>Total</th><th>Address</th><th>Order Placed Date</th><th>Status</th>
                  
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-t">
                    <td className="px-4 py-2">{o.name}</td>
                    <td className="px-4 py-2">{o.phone}</td>
                    <td className="px-4 py-2">{o.email || "—"}</td> {/* ✅ Show email */}
                    <td className="px-4 py-2">${o.total}</td>
                    <td className="px-4 py-2">{o.address}</td>
                    <td className="px-4 py-2">
                      {new Date(o.created_at).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  })}
                    </td>
                    <td className="px-4 py-2">
                      <label htmlFor={`status-${o.id}`} className="sr-only">Update Status</label>
<select
  id={`status-${o.id}`}
  aria-label="Order status"
  value={o.status}
  onChange={e => handleStatusChange(o.id, e.target.value, o.email || "", o.name)}
  className="border px-1 rounded"
>
  {["Pending", "Shipped", "Delivered", "Cancelled"].map((s) => (
    <option key={s} value={s}>
      {s}
    </option>
  ))}
</select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>}
      </div>
    </div>
  );
};

export default AdminOrders;
