// src/components/AdminRoute.tsx
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();

  const adminEmail = "terminatorkar98@gmail.com"; // Replace with your admin email

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  if (user.email !== adminEmail) {
    return <p className="text-center text-red-500 mt-10">Access Denied. Admins only.</p>;
  }

  return children;
};

export default AdminRoute;
