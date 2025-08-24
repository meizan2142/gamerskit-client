import { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import {
  Home,
  User,
  PlusCircle,
  Box,
  Clock,
  ListCheck,
  Truck,
  XCircle,
  RotateCw,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import logo from "../../assets/logo.jpg";
import { useAuth } from "../../useAuth/useAuth";

const DashBoard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { logOut } = useAuth();

  useEffect(() => {
    if (window.location.pathname === "/admin-dashboard") {
      navigate("/dashboard/pending-orders", { replace: true });
    }
  }, [navigate]);

  const navItems = [
    { name: "Home", path: "/", icon: <Home className="w-4 h-4 mr-2" /> },
    {
      name: "Accounts",
      path: "/dashboard/accounts",
      icon: <User className="w-4 h-4 mr-2" />,
    },
    {
      name: "Add Product",
      path: "/dashboard/add-product",
      icon: <PlusCircle className="w-4 h-4 mr-2" />,
    },
    {
      name: "All Orders",
      path: "/dashboard/all-orders",
      icon: <ListCheck className="w-4 h-4 mr-2" />,
    },
    {
      name: "Stock Product",
      path: "/dashboard/stock-jerseys",
      icon: <Box className="w-4 h-4 mr-2" />,
    },
    {
      name: "Pending Orders",
      path: "/dashboard/pending-orders",
      icon: <Clock className="w-4 h-4 mr-2" />,
    },
    {
      name: "Orders Summary",
      path: "/dashboard/orders-summary",
      icon: <ListCheck className="w-4 h-4 mr-2" />,
    },
    {
      name: "Delivered Orders",
      path: "/dashboard/delivered-orders",
      icon: <Truck className="w-4 h-4 mr-2" />,
    },
    {
      name: "Cancelled Orders",
      path: "/dashboard/cancelled-orders",
      icon: <XCircle className="w-4 h-4 mr-2" />,
    },
    {
      name: "Returned Orders",
      path: "/dashboard/returned-orders",
      icon: <RotateCw className="w-4 h-4 mr-2" />,
    },
  ];

  return (
    <div className="flex h-screen text-gray-900 bg-gray-50">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed top-0 left-0 h-full w-64 p-5 bg-gray-100 border-r border-gray-200 flex-col z-50 justify-between">
        <div>
          <div className="flex items-center justify-center h-20 border-b border-gray-200 mb-6">
            <img
              src={logo}
              alt="GamersKit Logo"
              className="w-14 rounded-full mr-3"
            />
            <h1 className="font-bold text-2xl">GamersKit</h1>
          </div>
          <nav className="flex-1 overflow-y-auto p-2 space-y-2 bg-white rounded-xl">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center py-2 px-4 rounded transition-colors duration-200 ${
                    isActive
                      ? "bg-yellow-100 rounded-lg text-yellow-500 border border-yellow-300 font-semibold"
                      : "hover:bg-yellow-100"
                  }`
                }>
                {item.icon}
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
        <button
          onClick={logOut}
          className="flex items-center py-2 px-4 mt-4 rounded text-red-600 hover:bg-red-100 font-semibold">
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </button>
      </aside>

      {/* Mobile Top Navbar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 flex items-center justify-between p-4 bg-gray-100 border-b-[0.2px] border-gray-300 z-50">
        <div className="flex items-center gap-3">
          <h1 className="font-bold text-xl">GamersKit</h1>
        </div>
        <button
          className="p-2 rounded "
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 p-5 bg-gray-100 border-r border-gray-200 flex flex-col z-50 transform transition-transform duration-300
        ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden justify-between`}>
        <div>
          <div className="flex items-center justify-center border-b border-gray-200 mb-6">
            <img
              src={logo}
              alt="GamersKit Logo"
              className="w-12 h-12 rounded-full mb-4"
            />
          </div>
          <nav className="flex-1 overflow-y-auto p-2 space-y-2 bg-white rounded-xl">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center py-2 px-4 rounded transition-colors duration-200 ${
                    isActive
                      ? "bg-yellow-100 rounded-lg text-yellow-500 border border-yellow-300 font-semibold"
                      : "hover:bg-yellow-100"
                  }`
                }>
                {item.icon}
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
        <button
          onClick={logOut}
          className="flex items-center py-2 px-4 mt-4 rounded text-red-600 hover:bg-red-100 font-semibold">
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </button>
      </aside>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-opacity-30 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 pt-20 p-4 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashBoard;
