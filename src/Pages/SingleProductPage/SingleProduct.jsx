import Accordion from "../../Components/Accordion/Accordion";
import SingleProductSwiper from "../../Components/SingleProductSwiper/SingleProductSwiper";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import "react-tabs/style/react-tabs.css";
import Loader from "../../Components/loader";
import ProductCard from "../../Components/ProductCard/ProductCard";
import OpenGraph from "../../Components/OpenGraph";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const SingleProduct = () => {
  const { id: productSlug } = useParams();
  const location = useLocation();
  const productId = location.state?.productId;
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const REACT_TABS = "Professional YTP YOYO - The Divine Lion - BLUE/RED/BLACK"
  const COLOR_TABS = ["Red", "Black", "Blue"]
  const tabColor = COLOR_TABS[selectedTab];

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);


  useEffect(() => {
    const savedTab = localStorage.getItem('selectedTab');
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
          `${import.meta.env.VITE_API_URL}/products/${productSlug}`
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
      item_category: data.name,
      price: data.price,
      currency: "BDT",
    });

    // Facebook Pixel event
    window.dataLayer.push({
      event: "ViewContent",
      content_ids: [productId],
      content_name: data.title,
      item_category: data.name,
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

    const cartProduct = {
      productId: data._id,
      title: data.title,
      price: data.price,
      mainImage: data.mainImage,
      quantity: 1,
      ...(hasAvailableSizes && { size: selectedSize }),
      tabColor,
    };

    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Check if item exists - compare productId, size, and storage
    const existingIndex = currentCart.findIndex(
      (item) =>
        item.productId === cartProduct.productId &&
        ((!hasAvailableSizes && !item.size) ||
          (hasAvailableSizes && item.size === cartProduct.size))
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

    const cartProduct = {
      productId: data._id,
      title: data.title,
      price: data.price,
      mainImage: data.mainImage,
      quantity: 1,
      ...(hasAvailableSizes && { size: selectedSize }),
      tabColor,
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


  return (
    <div className="min-h-screen pt-16 md:pt-24 px-2">
      <OpenGraph
        title={data.name}
        description={data.description}
        image={data.mainImage}
        url={"https://gamerskitbd.com/product/" + data.slug}
        type="data"
        price={data.price}
        currency={data.currency || "BDT"}
        availability={data.inStock ? "instock" : "outofstock"}
      />
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
              {
                REACT_TABS.includes(data?.title) ?
                  <div className="max-w-4xl mx-auto px-4 py-6">
                    <span className="text-yellow-600">Select a color your own(required)</span>
                    <Tabs
                      selectedIndex={selectedTab}
                      onSelect={(index) => {
                        setSelectedTab(index);
                        localStorage.setItem('selectedTab', index.toString());
                      }}
                    >
                      <TabList className="flex flex-wrap gap-3 border-b border-gray-200 mb-4">
                        <Tab
                          className="px-4 py-2 text-sm font-medium text-gray-700 border border-transparent rounded-t-md cursor-pointer transition duration-200"
                          selectedClassName="border-b-2 border-blue-500 text-blue-600 bg-[#FFD700]"
                        >
                          <span>Red</span>
                        </Tab>
                        <Tab
                          className="px-4 py-2 text-sm font-medium text-gray-700 border border-transparent rounded-t-md cursor-pointer transition duration-200"
                          selectedClassName="border-b-2 border-blue-500 text-blue-600 bg-[#FFD700]"
                        >
                          <span>Black</span>
                        </Tab>
                        <Tab
                          className="px-4 py-2 text-sm font-medium text-gray-700 border border-transparent rounded-t-md cursor-pointer transition duration-200"
                          selectedClassName="border-b-2 border-blue-500 text-blue-600 bg-[#FFD700]"
                        >
                          <span>Blue</span>
                        </Tab>
                      </TabList>

                      <TabPanel>
                        <></>
                      </TabPanel>
                      <TabPanel>
                        <></>
                      </TabPanel>
                      <TabPanel>
                        <></>
                      </TabPanel>
                    </Tabs>
                  </div>
                  :
                  <></>
              }
              <div className="sm:flex-row sm:items-center sm:gap-3">
                <span className="font-semibold">Price: </span>
                {
                  data?.leftProducts === 0 ?
                    <span className="text-xl font-bold">
                      ৳{data?.price} - <span className="font-medium text-red-500">(Stock out)</span>
                    </span>
                    :
                    <span className="text-xl font-bold">
                      ৳{data?.price} - <span className="font-medium text-green-500">(In stock)</span>
                    </span>
                }
              </div>
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
                {data?.name === "YoYo" && (
                  <p>YoYo: For order make 100 tk advance.</p>
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
                      className={`w-full px-3 py-2 rounded-lg border-2 ${selectedSize === size
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
            <Accordion data={data} />
          </div>

          <div className="space-y-4 w-full mx-auto">
            {/* Add to Cart Button (Border only) */}
            <button
              onClick={handleAddToCart}
              className={`w-full flex items-center justify-center gap-3  rounded-2xl py-3 px-4 text-sm sm:text-base font-semibold transition ${isButtonDisabled
                ? "border-gray-300 text-gray-400 cursor-not-allowed"
                : "border-[0.5px] border-gray-400 text-[#1F1F1F] hover:bg-[#FFF9E6]"
                }`}
              disabled={isButtonDisabled}>
              Add to Cart
            </button>

            {/* Buy Now Button (Solid background) */}
            <button
              onClick={handleBuyNow}
              className={`w-full flex items-center justify-center gap-3 rounded-2xl py-3 px-4 text-sm sm:text-base font-semibold transition ${isButtonDisabled
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

      {/* Microdata (JSON-LD) for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org/",
          "@type": "Product",
          name: data?.title,
          image: [data?.mainImage, ...(data?.subImages || [])],
          description: data?.description || data?.title,
          sku: data?._id,
          brand: {
            "@type": "Brand",
            name: "GamersKit",
          },
          offers: {
            "@type": "Offer",
            url: window.location.href,
            priceCurrency: "BDT",
            price: data?.price,
            availability: "https://schema.org/InStock",
            itemCondition: "https://schema.org/NewCondition",
          },
          aggregateRating: data?.rating
            ? {
              "@type": "AggregateRating",
              ratingValue: data?.rating,
              reviewCount: data?.reviewCount || 1,
            }
            : undefined,
        })}
      </script>

      <div>
        <Toaster />
      </div>
    </div>
  );
};

export default SingleProduct;
