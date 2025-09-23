import { ArrowRight, ShoppingBasket, X } from "lucide-react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Loader from "../loader";

const ProductCart = ({ isCartOpen, setIsCartOpen }) => {
  const queryClient = useQueryClient();
  const [localCartItems, setLocalCartItems] = useState([]);

  // Fetch cart items from localStorage
  const { isLoading, error } = useQuery({
    queryKey: ["cart"],
    queryFn: () => {
      const cartData = localStorage.getItem("cart");
      const items = cartData ? JSON.parse(cartData) : [];
      setLocalCartItems(items);
      return items;
    },
    refetchOnWindowFocus: true,
    enabled: isCartOpen,
  });

  // Watch for localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const cartData = localStorage.getItem("cart");
      setLocalCartItems(cartData ? JSON.parse(cartData) : []);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Mutation for updating cart
  const { mutate: updateCart } = useMutation({
    mutationFn: (updatedCart) => {
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      window.dispatchEvent(new Event("storage"));
      return updatedCart;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
  });

  // Handle quantity changes
  const handleIncrease = (productId, size) => {
    const updatedItems = localCartItems.map((item) =>
      item.productId === productId && item.size === size
        ? { ...item, quantity: (item.quantity || 1) + 1 }
        : item
    );
    updateCart(updatedItems);
  };

  const handleDecrease = (productId, size) => {
    const updatedItems = localCartItems
      .map((item) =>
        item.productId === productId && item.size === size
          ? { ...item, quantity: Math.max((item.quantity || 1) - 1, 0) }
          : item
      )
      .filter((item) => (item.quantity || 1) > 0);

    updateCart(updatedItems);
  };

  const handleRemove = (productId, size) => {
    const updatedItems = localCartItems.filter(
      (item) => !(item.productId === productId && item.size === size)
    );
    updateCart(updatedItems);
  };

  // Calculate total
  const totalPrice = localCartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  if (isLoading)
    return (
      <Loader/>
    );

  if (error)
    return <div className="p-6 text-red-500">Error: {error.message}</div>;

  return (
    <>
      {/* Cart Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-[#121212] shadow-lg transform ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="p-4 h-full flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-white">🛒 Your Cart</h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-gray-300 hover:text-[#FFD700]"
            >
              <X size={22} />
            </button>
          </div>

          {/* Cart items */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-1">
            {localCartItems.length > 0 ? (
              localCartItems.map((item) => (
                <div
                  key={`${item.productId}-${item.size || ""}`}
                  className="flex gap-3 bg-[#1E1E1E] p-3 rounded-lg shadow-md"
                >
                  {/* Image */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-800 rounded-md overflow-hidden">
                    <img
                      src={item.mainImage || "/placeholder-product.jpg"}
                      alt={item.title || "Product"}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <p className="text-sm font-medium text-white">
                        {item.title || "Product"}
                      </p>
                      <button
                        onClick={() => handleRemove(item.productId, item.size)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <RiDeleteBin5Line size={16} />
                      </button>
                    </div>

                    <p className="text-[#FFD700] text-sm font-semibold">
                      ৳{item.price * (item.quantity || 1)}
                      {item?.storage && (
                        <span className="ml-1 text-xs text-gray-300">
                          ({item.storage})
                        </span>
                      )}
                    </p>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDecrease(item.productId, item.size)}
                        className="w-6 h-6 flex items-center justify-center border border-gray-500 rounded text-white hover:bg-gray-700"
                      >
                        -
                      </button>
                      <span className="text-white text-sm px-2">
                        {item.quantity || 1}
                      </span>
                      <button
                        onClick={() => handleIncrease(item.productId, item.size)}
                        className="w-6 h-6 flex items-center justify-center border border-gray-500 rounded text-white hover:bg-gray-700"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-white flex flex-col space-y-5 items-center justify-center h-full">
                <p className="font-bold text-lg">Your Cart is Empty</p>
                <NavLink to="/shop">
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="flex items-center justify-center gap-2 bg-[#FFD700] hover:bg-[#FFB300] text-black font-bold py-2 px-4 rounded-full transition shadow"
                  >
                    <ShoppingBasket className="w-4 h-4" />
                    Continue Shopping
                  </button>
                </NavLink>
              </div>
            )}
          </div>

          {/* Cart summary */}
          {localCartItems.length > 0 && (
            <div className="border-t border-gray-700 pt-4 mt-4">
              <div className="flex justify-between mb-3">
                <span className="text-gray-300 text-sm">Total</span>
                <span className="text-[#FFD700] font-bold text-lg">
                  ৳{totalPrice}
                </span>
              </div>
              <NavLink to="/place-orders">
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-full flex items-center justify-center gap-2 bg-[#FFD700] hover:bg-[#FFB300] text-black font-bold py-3 rounded-full transition shadow-md"
                >
                  Proceed to Checkout
                  <ArrowRight size={18} />
                </button>
              </NavLink>
            </div>
          )}
        </div>
      </div>

      {/* Overlay */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsCartOpen(false)}
        />
      )}
    </>
  );
};

export default ProductCart;
