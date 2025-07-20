
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import Index from "./pages/Index";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import PaymentSuccess from "./pages/PaymentSuccess";
import Checkout from "@/pages/Checkout";
import AdminOrders from "./pages/AdminOrders";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import MyOrders from "./pages/MyOrders";
import AdminProducts from "@/pages/AdminProducts";
import AddProduct from "@/pages/AddProduct";
import EditProduct from "@/pages/EditProduct";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import Profile from "@/pages/Profile";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";



const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
      <AuthProvider>
        <Routes>
  <Route path="/" element={<Index />} />
  <Route path="/products" element={<Products />} />
  <Route path="/cart" element={<Cart />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/about" element={<About />} />
  <Route path="/signin" element={<SignIn />} />
  <Route path="/register" element={<Register />} />
  <Route path="/forgot-password" element={<ForgotPassword />} />
  <Route path="/update-password" element={<UpdatePassword />} />
  <Route path="/my-orders" element={<MyOrders />} />
  <Route path="/admin/products" element={<AdminProducts />} />
  <Route path="/admin/products/new" element={<AddProduct />} />
  <Route path="/terms" element={<Terms />} />
  <Route path="/privacy" element={<Privacy />} />
  <Route path="/my-profile" element={<Profile />} />
  <Route path="/admin/products/edit/:id" element={<EditProduct />} />
  <Route path="/checkout" element={
    <ProtectedRoute>
      <Checkout />
    </ProtectedRoute>
  } />
  <Route path="/payment-success" element={<PaymentSuccess />} />
  <Route path="/admin/orders" element={
    <AdminRoute>
      <AdminOrders />
    </AdminRoute>
  } />
  <Route path="*" element={<NotFound />} />
</Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
