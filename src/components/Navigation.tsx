import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import Spinner from "@/components/ui/Spinner"; 

const Navigation = () => {
  const { items } = useCart();
  const cartItemsCount = items.length;
  const { user, signOut } = useAuth();
  const { syncing } = useCart();

  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const adminMenuRef = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  const getInitial = (email: string | null | undefined) => {
    return email ? email.charAt(0).toUpperCase() : "?";
  };

  // ✅ Close dropdowns if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        adminMenuRef.current &&
        !adminMenuRef.current.contains(event.target as Node)
      ) {
        setShowAdminMenu(false);
      }
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-2xl font-bold text-blue-500">
            FootwearStore
          </Link>

          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-blue-500">Home</Link>
            <Link to="/products" className="text-gray-700 hover:text-blue-500">Products</Link>
            <Link to="/cart" className="text-gray-700 hover:text-blue-500 relative">
              Cart
              {cartItemsCount > 0 && (
                <span className="ml-1 text-vivid-purple font-semibold">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            {syncing && (
  <div className="ml-2 flex items-center space-x-1">
    <Spinner />
    <span className="text-xs text-gray-500 dark:text-gray-400">Syncing...</span>
  </div>
)}

            <Link to="/contact" className="text-gray-700 hover:text-blue-500">Contact</Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-500">About</Link>
            <Link to="/my-orders" className="text-gray-700 hover:text-blue-500">My Orders</Link>

            {/* ✅ Admin Dropdown */}
            {user?.email === "terminatorkar98@gmail.com" && (
              <div className="relative inline-block text-left" ref={adminMenuRef}>
                <Button onClick={() => setShowAdminMenu(prev => !prev)}>
                  Admin
                </Button>

                {showAdminMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-50">
                    <Link
                      to="/admin/products"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowAdminMenu(false)}
                    >
                      Manage Products
                    </Link>
                    <Link
                      to="/admin/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowAdminMenu(false)}
                    >
                      View Orders
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* ✅ Profile Dropdown */}
            {user ? (
              <>
                <div className="relative flex items-center gap-2" ref={profileMenuRef}>
                  <span className="hidden sm:inline text-gray-700">Welcome</span>

                  <div
                    onClick={() => setShowProfileMenu(prev => !prev)}
                    className={`w-8 h-8 rounded-full text-white flex items-center justify-center font-semibold cursor-pointer ${
                      user?.email === "terminatorkar98@gmail.com" ? "bg-red-600" : "bg-indigo-600"
                    }`}
                    title={user.email || ""}
                  >
                    {getInitial(user.email)}
                  </div>

                  {showProfileMenu && (
                    <div className="absolute right-0 top-10 w-40 bg-white border rounded shadow z-50">
                      <Link
                        to="/my-profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        My Profile
                      </Link>
                    </div>
                  )}
                </div>

                <Button onClick={signOut} variant="outline" size="sm" className="ml-2">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/signin">
                  <Button variant="outline" size="sm" className="ml-4">
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="default" size="sm">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
