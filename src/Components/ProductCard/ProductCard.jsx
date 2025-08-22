import { NavLink } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

const ProductCard = ({ product, onAddToCart }) => {
  const FREE_DELIVERY_TEXT = ["car", "consoles"];

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
              <h1 className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-2 hover:underline">
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
                onClick={() => onAddToCart(product)}
                className="flex items-center justify-center gap-1 text-gray-800 text-xs sm:text-sm font-medium py-1.5 border-gray-300 border-1 hover:bg-gray-200 transition px-2 rounded-full">
                <ShoppingCart className="w-3.5 h-3.5" />
              </button>

              {/* Buy Now button */}
              <NavLink
                to={`/product/${productSlug}`}
                state={{ productId: product._id }}
                className="w-full flex items-center justify-center gap-1 bg-[#FFB300] text-white text-xs sm:text-sm font-medium py-1.5 rounded-2xl shadow hover:bg-[#e6a100] transition">
                Buy Now
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
