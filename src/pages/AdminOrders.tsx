
// import { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "@/hooks/useAuth"; // ✅ Import this
// import { supabase } from "@/lib/supabase";
// import Navigation from "@/components/Navigation";

// interface Order {
//   id: string;
//   name: string;
//   phone: string;
//   address: string;
//   total: number;
//   created_at: string;
// }

// const AdminOrders = () => {
//   const { user } = useAuth(); // ✅ Get current user

//   // ✅ Block access if not admin
//   if (!user || user.email !== "terminatorkar98@gmail.com") {
//   return <div className="p-4 text-red-500">Access Denied. Admins only.</div>;
// }

//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       const { data, error } = await supabase
//         .from("orders")
//         .select("*")
//         .order("created_at", { ascending: false });

//       console.log("📦 Orders fetched from Supabase:", data);
//       if (error) {
//         console.error("❌ Error fetching orders:", error.message);
//       }

//       setOrders(data || []);
//       setLoading(false);
//     };

//     fetchOrders();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navigation />
//       <div className="max-w-6xl mx-auto py-8 px-4">
//         <h1 className="text-2xl font-bold mb-6">Admin Orders</h1>

//         {loading ? (
//           <p>Loading orders...</p>
//         ) : orders.length === 0 ? (
//           <p>No orders found.</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-md">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="text-left px-4 py-2">Name</th>
//                   <th className="text-left px-4 py-2">Phone</th>
//                   <th className="text-left px-4 py-2">Address</th>
//                   <th className="text-left px-4 py-2">Total</th>
//                   <th className="text-left px-4 py-2">Date</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {orders.map((order) => (
//                   <tr key={order.id} className="border-t">
//                     <td className="px-4 py-2">{order.name}</td>
//                     <td className="px-4 py-2">{order.phone}</td>
//                     <td className="px-4 py-2">{order.address}</td>
//                     <td className="px-4 py-2">${order.total}</td>
//                     <td className="px-4 py-2">
//   {new Date(order.created_at).toLocaleString("en-IN", {
//     timeZone: "Asia/Kolkata",
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//     second: "2-digit",
//     hour12: true,
//   })}
// </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminOrders;


// AdminOrders.tsx (updated)
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

    await fetch("/api/send-status-email", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email,
    name,
    status: newStatus,
    orderId,
  }),
});

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
