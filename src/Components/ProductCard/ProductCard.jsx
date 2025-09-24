import { NavLink } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const ProductCard = ({ product }) => {
  const FREE_DELIVERY_TEXT = ["car", "consoles"];
  const REACT_TABS = ["R36S Max Handheld Game Console"];

  const handleAddToCart = () => {
    // 1. If product has sizes → force user to go to details page
    const hasAvailableSizes =
      product.sizes &&
      Object.values(product.sizes).some((qty) => {
        const quantity = typeof qty === "string" ? parseInt(qty) : qty;
        return quantity > 0;
      });

    if (hasAvailableSizes) {
      return toast.error("Please select a size from details page");
    }

    // 2. Handle storage option only for R36S Max
    const storageOption =
      product.title === "R36S Max Handheld Game Console" ? "64GB" : null;

    // 3. Handle price for REACT_TABS items
    const price = REACT_TABS.includes(product.title)
      ? 5200 // default price when quick-adding
      : product.price;

    // 4. Build cart product
    const cartProduct = {
      productId: product._id,
      title: product.title,
      price,
      mainImage: product.mainImage,
      quantity: 1,
      ...(storageOption && { storage: storageOption }),
    };

    // 5. Get current cart
    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");

    // 6. Check if product already exists
    const existingIndex = currentCart.findIndex(
      (item) =>
        item.productId === cartProduct.productId &&
        (!storageOption ||
          (storageOption && item.storage === cartProduct.storage))
    );

    let updatedCart;
    if (existingIndex >= 0) {
      updatedCart = [...currentCart];
      updatedCart[existingIndex].quantity += 1;
    } else {
      updatedCart = [...currentCart, cartProduct];
    }

    // 7. Save and update
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("storage"));
    toast.success("Added to Cart");
    // Push event to GTM
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "add_to_cart",
      item_id: cartProduct.productId, // match your DB/product unique ID
      item_name: cartProduct.title, // match your cart product title
      price: cartProduct.price, // use final calculated price
      currency: "BDT",
      quantity: cartProduct.quantity,
    });
  };

  const productSlug =
    product.slug ||
    product.title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

  return (
    <div className="group w-full flex flex-col h-full rounded-lg relative overflow-hidden items-center">
      <div className="block w-full h-full max-w-[260px] sm:max-w-[300px] mx-auto">
        <div className="relative flex flex-col rounded-lg bg-white shadow-md hover:shadow-lg transition duration-300 overflow-hidden h-full">
          {/* Product Image (clickable for details) */}
          <NavLink
            to={`/product/${productSlug}`}
            state={{ productId: product._id }}
            className="relative pb-[65%] p-2 block">
            <img
              className="absolute inset-2 h-[calc(100%-16px)] w-[calc(100%-16px)] object-contain rounded-md transition-transform duration-300 group-hover:scale-105"
              src={product.mainImage}
              alt={product.title}
              loading="lazy"
            />
          </NavLink>

          {/* Product Info */}
          <div className="flex flex-col p-3 space-y-2 flex-grow">
            <NavLink
              to={`/product/${productSlug}`}
              state={{ productId: product._id }}>
              <h1 className="text-sm font-semibold text-gray-900 line-clamp-2 hover:underline">
                {product.title}
              </h1>
            </NavLink>

            <p className="text-sm font-medium text-gray-600">
              Price: ৳{product.price}{" "}
              {FREE_DELIVERY_TEXT.includes(product?.name) && (
                <span className="text-green-500 text-xs font-medium ml-1">
                  + Free Delivery
                </span>
              )}
            </p>

            <div className="mt-auto flex gap-2 lg:gap-5">
              {/* Add to Cart button */}
              <button
                onClick={handleAddToCart}
                className="flex items-center justify-center gap-1 text-gray-800 text-xs sm:text-sm font-medium py-1.5 border-gray-300 border-1 hover:bg-gray-200 transition px-2 rounded-full">
                <ShoppingCart className="w-3.5 h-3.5" />
              </button>

              <NavLink
                to={`/product/${productSlug}`}
                state={{ productId: product._id }}
                className="w-full flex items-center justify-center gap-1 bg-[#FFB300] text-white text-xs sm:text-sm font-medium py-1.5 rounded-2xl hover:bg-[#e6a100] transition">
                see details
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Toaster />
      </div>
    </div>
  );
};

export default ProductCard;
