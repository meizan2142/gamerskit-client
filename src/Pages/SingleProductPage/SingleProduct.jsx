import Accordion from "../../Components/Accordion/Accordion";
import SingleProductSwiper from "../../Components/SingleProductSwiper/SingleProductSwiper";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Loader from "../../Components/loader";
import ProductCard from "../../Components/ProductCard/ProductCard";

const SingleProduct = () => {
  const { productSlug } = useParams();
  const location = useLocation();
  const productId = location.state?.productId;
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);

  const REACT_TABS = ["R36S Max Handheld Game Console"];

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    const savedTab = localStorage.getItem("selectedTab");
    if (savedTab !== null) {
      setSelectedTab(parseInt(savedTab));
    }
  }, []);

  // Fetch product data
  const { data, isLoading, error } = useQuery({
    queryKey: ["product", productSlug, productId],
    queryFn: async () => {
      try {
        // First try fetching by slug
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/products-by-slug/${productSlug}`
        );
        return response.data;
      } catch (error) {
        if (error.response?.status === 404 && productId) {
          // Fallback to ID-based fetch if available
          const fallback = await axios.get(
            `${import.meta.env.VITE_API_URL}/addedProducts/${productId}`
          );
          return fallback.data;
        }
        throw error;
      }
    },
  });

  // Fetch all products
  const { data: allProducts = [] } = useQuery({
    queryKey: ["allProduct"],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/addedProducts`
      );
      return response.data;
    },
  });

  useEffect(() => {
    if (!data) return;

    window.dataLayer = window.dataLayer || [];

    // GA4 event
    window.dataLayer.push({
      event: "view_item",
      item_id: productId,
      item_name: data.title,
      price: data.price,
      currency: "BDT",
    });

    // Facebook Pixel event
    window.dataLayer.push({
      event: "ViewContent",
      content_ids: [productId],
      content_name: data.title,
      content_type: "product",
      value: data.price,
      currency: "BDT",
    });
  }, [data, productId]);


  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("01303775977");
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  const saveCartToLocalStorage = (items) => {
    localStorage.setItem("cart", JSON.stringify(items));
    setCartItems(items);
  };

  const handleAddToCart = () => {
    // Check if sizes exist and are available
    const hasAvailableSizes =
      data.sizes &&
      Object.values(data.sizes).some((qty) => {
        const quantity = typeof qty === "string" ? parseInt(qty) : qty;
        return quantity > 0;
      });

    if (hasAvailableSizes && !selectedSize) {
      return toast.error("Please select a size");
    }

    // For R36S Max Handheld Game Console, include storage option
    const storageOption =
      data.title === "R36S Max Handheld Game Console"
        ? selectedTab === 0
          ? "64GB"
          : "128GB"
        : null;

    const price = REACT_TABS.includes(data.title)
      ? selectedTab === 0
        ? 5200
        : 5700
      : data.price;

    const cartProduct = {
      productId: data._id,
      title: data.title,
      price: price, // Use the determined price
      mainImage: data.mainImage,
      quantity: 1,
      ...(hasAvailableSizes && { size: selectedSize }),
      ...(storageOption && { storage: storageOption }),
    };

    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Check if item exists - compare productId, size, and storage
    const existingIndex = currentCart.findIndex(
      (item) =>
        item.productId === cartProduct.productId &&
        ((!hasAvailableSizes && !item.size) ||
          (hasAvailableSizes && item.size === cartProduct.size)) &&
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

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("storage"));
    toast.success("Added to Cart");
  };

  const handleBuyNow = () => {
    // Similar modifications as handleAddToCart
    const hasAvailableSizes =
      data.sizes &&
      Object.values(data.sizes).some((qty) => {
        const quantity = typeof qty === "string" ? parseInt(qty) : qty;
        return quantity > 0;
      });

    if (hasAvailableSizes && !selectedSize) {
      return toast.error("Please select a size");
    }

    const price = REACT_TABS.includes(data.title)
      ? selectedTab === 0
        ? 5200
        : 5700
      : data.price;

    const storageOption =
      data.title === "R36S Max Handheld Game Console"
        ? selectedTab === 0
          ? "64GB"
          : "128GB"
        : null;

    const cartProduct = {
      productId: data._id,
      title: data.title,
      price: price,
      mainImage: data.mainImage,
      quantity: 1,
      ...(hasAvailableSizes && { size: selectedSize }),
      ...(storageOption && { storage: storageOption }),
    };

    const isItemInCart = cartItems.some(
      (item) =>
        item.productId === data._id &&
        ((!hasAvailableSizes && !item.size) ||
          (hasAvailableSizes && item.size === selectedSize)) &&
        (!storageOption ||
          (storageOption && item.storage === cartProduct.storage))
    );

    let updatedCart;
    if (!isItemInCart) {
      updatedCart = [...cartItems, cartProduct];
      saveCartToLocalStorage(updatedCart);
    } else {
      updatedCart = [...cartItems];
    }

    window.dispatchEvent(new Event("storage"));
    navigate("/place-orders");
  };

  if (isLoading) return <Loader />;

  if (error)
    return (
      <div className="min-h-screen pt-24 flex justify-center">
        Error: {error.message}
      </div>
    );
  if (!data)
    return (
      <div className="min-h-screen pt-24 flex justify-center">
        Product not found
      </div>
    );

  const hasSizes =
    data.sizes &&
    Object.values(data.sizes).some((qty) => {
      const quantity = typeof qty === "string" ? parseInt(qty) : qty;
      return quantity > 0;
    });
  const isButtonDisabled = hasSizes && !selectedSize;

  // Suggested products
  const suggestedProducts = allProducts.filter(
    (p) => p.name === data.name && p._id !== allProducts._id
  );

  const EXCLUDED_OFFER_PRICE = [
    "Nissan GTR R34 RWD (Dual battery & Gyro Stabilizer)",
    "MN99S Full Scale 4WD Climbing Defender (Black) - (Dual Battery)",
    "MN98 RC Rock Crawler Defender (Yellow) - (Dual Battery)",
    "Nissan Black Racer (Dual Battery)",
    "G2 Prestige 2025",
    "Sentinels Jersey",
    "F1 Red Bull 2024",
    "Team Liquid Hand Sleeves",
    "Fnatic Tshirt",
    "F1 SHELL 2024",
    "F1 MERCEDES 2024",
    "Fnatic Hand Sleeves",
    "Sentinels Hand Sleeves",
    "Sentinels Tshirt",
    "Team Liquid Mask",
    "Sentinels Mask",
    "G2 Mask",
    "F1 SHELL 2025",
    "M22 Playstation 128GB",
    "R36S Handheld Game Console",
    "R36S Max Handheld Game Console",
  ];

  const ANOTHER_OFFER_PRICE = [
    "Nissan GTR Skyline 4WD (White-Grey) Dual Batteries",
    "Porsche 911 Drift Car 4WD (Dual Batteries)",
    "Ford Mustang GT",
  ];

  return (
    <div className="min-h-screen pt-16 md:pt-24 px-2">
      <div className="container mx-auto px-2 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8 py-6 rounded-2xl md:rounded-[32px] border-2 border-white bg-white/40">
        <SingleProductSwiper
          images={
            data.subImages
              ? [data.mainImage, ...data.subImages]
              : [data.mainImage]
          }
        />
        <div className="w-full space-y-8 rounded-xl md:rounded-[32px] border p-3 md:p-6 border-[#E9E9E9] bg-white">
          <div className="mb-6 space-y-3">
            <h1 className=" text-[#1F1F1F] font-urbanist text-xl md:text-[28px] not-italic font-semibold md:font-bold md:leading-[40px]">
              {data.title}
            </h1>
            <hr className="border-t border-gray-300 my-4" />
            <div className="mt-4 space-y-2 text-base sm:text-lg">
              {EXCLUDED_OFFER_PRICE.includes(data?.title) ? (
                <>
                  {REACT_TABS.includes(data?.title) ? (
                    <div className="sm:flex-row sm:items-center sm:gap-3">
                      <span className="font-semibold">Price: </span>
                      <span className="text-xl font-bold">
                        ৳{data?.price}{" "}
                        <span className="text-sm text-gray-500">(64GB)</span>
                      </span>
                    </div>
                  ) : (
                    <div className="sm:flex-row sm:items-center sm:gap-3">
                      <span className="font-semibold">Price: </span>
                      <span className="text-xl font-bold">৳{data?.price}</span>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {ANOTHER_OFFER_PRICE.includes(data?.title) ? (
                    <>
                      {data?.title === "Ford Mustang GT" ? (
                        <>
                          <div className="sm:flex-row sm:items-center sm:gap-3">
                            <span className="font-semibold">
                              Regular Price:
                            </span>
                            <span className="text-xl line-through">৳ 3400</span>
                          </div>
                          <div className="sm:flex-row sm:items-center sm:gap-3">
                            <span className="font-semibold">Offer Price:</span>
                            <span className="text-xl font-bold">
                              ৳{data?.price}
                            </span>
                          </div>
                          <div className="sm:flex-row sm:items-center sm:gap-3">
                            <span className="font-semibold">You Save: </span>
                            <span className="text-xl font-bold">৳ 400</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="sm:flex-row sm:items-center sm:gap-3 text-gray-400">
                            <span className="font-semibold">
                              Regular Price:
                            </span>
                            <span className="text-xl line-through ml-1.5">
                              {" "}
                              ৳ 3200
                            </span>
                          </div>
                          <div className="sm:flex-row sm:items-center sm:gap-3">
                            <span className="font-semibold">Offer Price: </span>
                            <span className="text-xl font-bold">
                              ৳{data?.price}
                            </span>
                          </div>
                          <div className="sm:flex-row sm:items-center sm:gap-3">
                            <span className="font-semibold">You Save: </span>
                            <span className="text-xl font-bold">৳ 700</span>
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="sm:flex-row sm:items-center sm:gap-3">
                        <span className="font-semibold">Regular Price: </span>
                        <span className="text-xl line-through">৳ 2800</span>
                      </div>
                      <div className="sm:flex-row sm:items-center sm:gap-3">
                        <span className="font-semibold">Offer Price: </span>
                        <span className="text-xl font-bold">
                          ৳{data?.price}
                        </span>
                      </div>
                      <div className="sm:flex-row sm:items-center sm:gap-3">
                        <span className="font-semibold">You Save: </span>
                        <span className="text-xl font-bold">৳ 500</span>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
            <hr className="border-t border-gray-300 my-4" />

            <div className="rounded-lg border border-yellow-300 bg-yellow-50 p-2 md:p-4">
              {/* Title */}

              {/* Order instructions */}
              <span className="text-yellow-800 text-lg font-bold text-nowrap">
                Order Process:
              </span>
              <div className="text-gray-800 text-sm space-y-1">
                {data?.name === "car" && (
                  <p>RC Car: For order make 100 tk advance.</p>
                )}
                {data?.name === "consoles" && (
                  <p>Game Console: For order make 100 tk advance.</p>
                )}
                {data?.name === "F1" && (
                  <p>F1 Jersey: For order make 100 tk advance.</p>
                )}
                {data?.name === "E-sports" && (
                  <p>E-sports Jersey: For order make 100 tk advance.</p>
                )}
                {data?.name === "Tshirt" && (
                  <p>Tshirt: For order make 100 tk advance.</p>
                )}
                {data?.name === "Sleeves" && (
                  <p>Hand Sleeves: No advance needed.</p>
                )}
                {data?.name === "Mask" && <p>• Mask: No advance needed.</p>}
              </div>

              {/* Payment instructions */}
              {(data?.name === "car" ||
                data?.name === "F1" ||
                data?.name === "Tshirt" ||
                data?.name === "E-sports") && (
                <div className="text-gray-900 text-sm font-medium">
                  Send money via (Bkash/Nagad) to:{" "}
                  <span
                    className="text-black font-bold cursor-pointer relative"
                    onClick={handleCopy}>
                    01303775977
                    {isCopied && (
                      <span className="absolute -top-7 -right-4 bg-black text-white text-xs px-2 py-1 rounded">
                        Copied!
                      </span>
                    )}
                  </span>
                  <p className="mt-1">Need help? Call us at the same number.</p>
                </div>
              )}

              {(data?.name === "Sleeves" || data?.name === "Mask") && (
                <div className="mt-3 text-gray-900 text-sm font-medium">
                  Need help? Call us{" "}
                  <span
                    className="text-black font-bold cursor-pointer relative"
                    onClick={handleCopy}>
                    01303775977
                    {isCopied && (
                      <span className="absolute -top-7 -right-4 bg-black text-white text-xs px-2 py-1 rounded">
                        Copied!
                      </span>
                    )}
                  </span>
                </div>
              )}
            </div>
          </div>

          {hasSizes && (
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">
                Available Sizes: (Choose a size to place your order)
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-3 gap-3 sm:gap-4">
                {Object.entries(data.sizes || {})
                  // eslint-disable-next-line no-unused-vars
                  .filter(([size, quantity]) => {
                    // Convert quantity to number and check if it's greater than 0
                    const qty =
                      typeof quantity === "string"
                        ? parseInt(quantity)
                        : quantity;
                    return qty > 0;
                  })
                  .map(([size]) => (
                    <button
                      key={size}
                      onClick={() => {
                        setSelectedSize(size);
                      }}
                      className={`w-full px-3 py-2 rounded-lg border-2 ${
                        selectedSize === size
                          ? "bg-[#FFD700] border-[#FFD700]"
                          : "border-gray-300 hover:border-[#FFD700]"
                      }  transition-colors`}>
                      <div className="flex flex-col justify-center items-center">
                        <h1 className="text-sm sm:text-base font-bold">
                          {size.toUpperCase()}
                        </h1>
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          )}

          <div>
            <Accordion data={data} selectedTab={selectedTab} />
          </div>

          <div className="space-y-4 w-full mx-auto">
            {/* Add to Cart Button (Border only) */}
            <button
              onClick={handleAddToCart}
              className={`w-full flex items-center justify-center gap-3  rounded-2xl py-3 px-4 text-sm sm:text-base font-semibold transition ${
                isButtonDisabled
                  ? "border-gray-300 text-gray-400 cursor-not-allowed"
                  : "border-[0.5px] border-gray-400 text-[#1F1F1F] hover:bg-[#FFF9E6]"
              }`}
              disabled={isButtonDisabled}>
              Add to Cart
            </button>

            {/* Buy Now Button (Solid background) */}
            <button
              onClick={handleBuyNow}
              className={`w-full flex items-center justify-center gap-3 rounded-2xl py-3 px-4 text-sm sm:text-base font-semibold transition ${
                isButtonDisabled
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-[#FFD700] text-black hover:bg-yellow-300 border-[0.5px] border-gray-400"
              }`}
              disabled={isButtonDisabled}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
      {/* Suggested products */}
      {suggestedProducts.length > 0 && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold mb-6">You may also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {suggestedProducts.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </div>
      )}
      <div>
        <Toaster />
      </div>
    </div>
  );
};

export default SingleProduct;
