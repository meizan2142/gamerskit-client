import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AlignJustify, ShoppingCart, User, X } from "lucide-react";
import { Badge } from "@mui/material";
import ProductCart from "../ProductCart/ProductCart";
import mainLogo from "/src/assets/logo-icon.png";
import { useAuth } from "../../useAuth/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user, logOut } = useAuth();
  const [cartCount, setCartCount] = useState(0);
  const [newUser, setNewUser] = useState(null);

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
      return response.data;
    },
  });

  useEffect(() => {
    const updateCartCount = () => {
      const cartData = localStorage.getItem("cart");
      setCartCount(cartData ? JSON.parse(cartData).length : 0);
    };

    // Initial load
    updateCartCount();

    // Enhanced storage event listener
    const handleStorageChange = (e) => {
      if (e.key === "cart" || !e.key) {
        // Handle both specific and dispatched events
        updateCartCount();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Find matching user when either user or users data changes
  useEffect(() => {
    if (!user?.email || users.length === 0) return;

    const matchedUser = users.find((u) => u.email === user.email);
    if (matchedUser) {
      setNewUser(matchedUser);
    } else {
      console.log("No user found with email:");
    }
  }, [user, users]);

  return (
<>
      <header className="p-4 lg:px-8 xl:px-20 shadow-none fixed w-full z-50 bg-gray-900/60 backdrop-blur-md">
        <div className="container mx-auto flex justify-between items-center">
          {/* Mobile Menu Button (visible on small screens only) */}
          <button
            className="p-2 lg:hidden text-white order-1"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X size={28} className="hover:text-[#FFD700] transition" />
            ) : (
              <AlignJustify
                size={28}
                className="hover:text-[#FFD700] transition"
              />
            )}
          </button>

          {/* Logo */}
          <NavLink to="/" className="order-2 lg:order-1 lg:mx-0">
            <img src={mainLogo} alt="GamersKit Logo" className="h-9 w-auto" />
          </NavLink>

          {/* Desktop Navigation Links (visible on lg and up) */}
          <nav className="hidden lg:flex order-2 flex-grow justify-center">
            <ul className="flex items-center space-x-8 xl:space-x-12">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "font-bold text-white text-sm sm:text-base border-b-2 border-[#FFD700]"
                      : "text-gray-300 hover:text-[#FFD700] transition duration-300 text-sm sm:text-base relative group"
                  }
                >
                  Home
                  <span className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-[#FFD700] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/shop"
                  className={({ isActive }) =>
                    isActive
                      ? "font-bold text-white text-sm sm:text-base border-b-2 border-[#FFD700]"
                      : "text-gray-300 hover:text-[#FFD700] transition duration-300 text-sm sm:text-base relative group"
                  }
                >
                  Shop
                  <span className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-[#FFD700] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/media"
                  className={({ isActive }) =>
                    isActive
                      ? "font-bold text-white text-sm sm:text-base border-b-2 border-[#FFD700]"
                      : "text-gray-300 hover:text-[#FFD700] transition duration-300 text-sm sm:text-base relative group"
                  }
                >
                  Media
                  <span className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-[#FFD700] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
                </NavLink>
              </li>
              {newUser?.role === "admin" ? (
                <li>
                  <NavLink
                    to="/dashboard/pending-orders"
                    className={({ isActive }) =>
                      isActive
                        ? "font-bold text-white text-sm sm:text-base border-b-2 border-[#FFD700]"
                        : "text-gray-300 hover:text-[#FFD700] transition duration-300 text-sm sm:text-base relative group"
                    }
                  >
                    Dashboard
                    <span className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-[#FFD700] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
                  </NavLink>
                </li>
              ) : (
                <li>
                  <NavLink
                    to="/my-orders"
                    className={({ isActive }) =>
                      isActive
                        ? "font-bold text-white text-sm sm:text-base border-b-2 border-[#FFD700]"
                        : "text-gray-300 hover:text-[#FFD700] transition duration-300 text-sm sm:text-base relative group"
                    }
                  >
                    My Orders
                    <span className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-[#FFD700] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
                  </NavLink>
                </li>
              )}
            </ul>
          </nav>

          {/* Icons and Buttons (Cart, User/Signout) */}
          <div className="flex space-x-5 xl:space-x-6 items-center order-3">
            {/* Cart with badge showing total items */}
            <Badge
              badgeContent={cartCount}
              color="primary"
              className="text-[#FAE82A] font-bold"
            >
              <button onClick={() => setIsCartOpen(true)}>
                <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-white hover:text-[#FFD700] transition" />
              </button>
            </Badge>

            {user ? (
              <button
                onClick={logOut}
                className="hidden lg:flex px-3 py-2 text-sm font-bold tracking-wide transition bg-[#FFD700] text-black hover:bg-[#FFB300] rounded-md"
              >
                Signout
              </button>
            ) : (
              <NavLink to="/signin">
                <User className="cursor-pointer text-white hover:text-[#FFB300] transition" />
              </NavLink>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Navigation Links (Full-screen Mobile Menu) */}
      <nav
        className={`lg:hidden fixed top-0 left-0 w-screen h-screen z-40 transition-transform duration-500 ease-in-out bg-gray-950 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="relative w-full h-full flex flex-col items-center justify-center space-y-8 text-center p-4">
          {/* Close button */}
          <button
            className="absolute top-6 right-6 p-2 text-white"
            onClick={() => setIsOpen(false)}
          >
            <X size={32} className="hover:text-[#FFD700] transition" />
          </button>
          <ul className="flex flex-col items-center space-y-8 text-center">
            <li>
              <NavLink
                to="/"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "font-bold text-white text-lg border-b-2 border-[#FFD700]"
                    : "text-gray-300 hover:text-[#FFD700] transition duration-300 text-lg relative group"
                }
              >
                Home
                <span className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-[#FFD700] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/shop"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "font-bold text-white text-lg border-b-2 border-[#FFD700]"
                    : "text-gray-300 hover:text-[#FFD700] transition duration-300 text-lg relative group"
                }
              >
                Shop
                <span className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-[#FFD700] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
              </NavLink>
            </li>
            {newUser?.role === "admin" ? (
              <li>
                <NavLink
                  to="/dashboard/pending-orders"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "font-bold text-white text-lg border-b-2 border-[#FFD700]"
                      : "text-gray-300 hover:text-[#FFD700] transition duration-300 text-lg relative group"
                  }
                >
                  Dashboard
                  <span className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-[#FFD700] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
                </NavLink>
              </li>
            ) : (
              <li>
                <NavLink
                  to="/my-orders"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "font-bold text-white text-lg border-b-2 border-[#FFD700]"
                      : "text-gray-300 hover:text-[#FFD700] transition duration-300 text-lg relative group"
                  }
                >
                  My Orders
                  <span className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-[#FFD700] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
                </NavLink>
              </li>
            )}
            {user && (
              <li className="mt-8">
                <button
                  onClick={() => {
                    logOut();
                    setIsOpen(false);
                  }}
                  className="px-6 py-3 text-base font-bold tracking-wide transition bg-[#FFD700] text-black hover:bg-[#FFB300] rounded-md"
                >
                  Signout
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>
      <ProductCart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
    </>
  );
};

export default Navbar;
