// import { useEffect, useState } from "react";
// import { useAuth } from "@/hooks/useAuth";
// import { supabase } from "@/lib/supabase";
// import Navigation from "@/components/Navigation";
// import { Navigate } from "react-router-dom";


// interface Order {
//   id: string;
//   name: string;
//   phone: string;
//   address: string;
//   total: number;
//   created_at: string;
// }

// const MyOrders = () => {
//   const { user } = useAuth();
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUserOrders = async () => {
//       if (!user) return;

//       const { data, error } = await supabase
//         .from("orders")
//         .select("*")
//         .eq("user_id", user.id) // ✅ Filter by logged-in user's ID
//         .order("created_at", { ascending: false });

//       if (error) {
//         console.error("Error fetching user orders:", error.message);
//       } else {
//         setOrders(data || []);
//       }

//       setLoading(false);
//     };

//     fetchUserOrders();
//   }, [user]);

//   const [shouldRedirect, setShouldRedirect] = useState(false);

// useEffect(() => {
//   const timer = setTimeout(() => {
//     setShouldRedirect(true);
//   }, 2000); // Wait 2 seconds before redirect

//   return () => clearTimeout(timer);
// }, []);

// if (!user) {
//   return shouldRedirect ? (
//     <Navigate to="/signin" replace />
//   ) : (
//     <div className="text-center mt-20 text-red-500 text-lg">
//       Please sign in to view your orders.
//     </div>
//   );
// }
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navigation />
//       <div className="pt-20 max-w-4xl mx-auto py-10 px-4">
//   <h2 className="text-2xl font-bold mb-6">My Orders</h2>

//         {loading ? (
//           <p>Loading...</p>
//         ) : orders.length === 0 ? (
//           <p>No orders found.</p>
//         ) : (
//           <ul className="space-y-4">
//             {orders.map((order) => (
//               <li
//                 key={order.id}
//                 className="bg-white p-4 rounded shadow border border-gray-200"
//               >
//                 <div className="font-semibold text-lg">Order ID: {order.id}</div>
//                 <div className="text-sm text-gray-600">
//                   {new Date(order.created_at).toLocaleString()}
//                 </div>
//                 <div className="mt-2 text-gray-800">
//                   <p><strong>Name:</strong> {order.name}</p>
//                   <p><strong>Phone:</strong> {order.phone}</p>
//                   <p><strong>Address:</strong> {order.address}</p>
//                   <p><strong>Total:</strong> ${order.total}</p>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyOrders;

// MyOrders.tsx (full updated)
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import Navigation from "@/components/Navigation";
import { Navigate } from "react-router-dom";

interface OrderItem { id: string; name: string; image: string; quantity: number; }
interface Order {
  id: string; name: string; email?: string; phone: string; address: string;
  total: number; created_at: string; status: string; items: OrderItem[];
}

const MyOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("orders")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!error) setOrders(data || []);
        setLoading(false);
      });
  }, [user]);

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-20 max-w-4xl mx-auto py-10 px-4">
        <h2 className="text-2xl font-bold mb-6">My Orders</h2>
        {loading ? <p>Loading...</p> : orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <ul className="space-y-4">
            {orders.map((o) => (
              <li key={o.id} className="bg-white p-4 rounded shadow border">
                <p><strong>Name:</strong> {o.name}</p>
                <p><strong>Phone:</strong> {o.phone}</p>
                <div className="font-semibold">Order #{o.id} – <em>{o.status}</em></div>
                <div className="text-sm text-gray-600">Order Placed Date:- {new Date(o.created_at).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  })}</div>
                <div className="mt-2 text-gray-800">
                  <p><strong>Total:</strong> ${o.total}</p>
                  <p><strong>Address:</strong> {o.address}</p>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-4">
                  {o.items.map((i) => (
                    <div key={i.id} className="flex items-center space-x-4">
                      <img src={i.image} alt={i.name} className="w-16 h-16 rounded object-cover"/>
                      <div>
                        <p className="font-medium">{i.name}</p>
                        <p className="text-sm">Qty: {i.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
export default MyOrders;

