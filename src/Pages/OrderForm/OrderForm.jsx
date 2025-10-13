import { useEffect, useRef, useState } from "react";
import { allLocation } from "./locations";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../../useAuth/useAuth";
import Loader from "../../Components/loader";

const OrderForm = () => {
  const locations = allLocation();
  const { user } = useAuth();
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [advanceAmount, setAdvanceAmount] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hiddenSubmitRef = useRef(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isCopied, setIsCopied] = useState(false);
  const [localCartData, setLocalCartData] = useState([]);

  useEffect(() => {
    // Get cart data from localStorage
    const cart = localCartData || "[]";

    if (cart.length > 0) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "begin_checkout", // GA4 standard event
        ecommerce: {
          currency: "BDT",
          items: cart.map((item) => ({
            item_id: item.productId,
            item_name: item.title,
            price: Number(item.price),
            quantity: item.quantity,
            tabColor: item?.tabColor
          })),
        },
      });
    }
  }, [localCartData]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("01303775977");
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  const handlePlaceOrderClick = () => {
    hiddenSubmitRef.current.click();
  };

  const {
    isLoading,
    error,
    data: cartData = [],
  } = useQuery({
    queryKey: ["cart"],
    queryFn: () => {
      const cartData = localStorage.getItem("cart");
      return cartData ? JSON.parse(cartData) : [];
    },
    refetchOnWindowFocus: true,
  });
  const selectedLocation = locations.find(
    (loc) => loc.name === selectedDistrict
  );

  const thanas = selectedLocation ? selectedLocation.thana : [];

  const SPECIAL_CAR_MODELS = [
    "porsche 911 drift car 4wd (dual batteries)",
    "ford mustang gt",
    "nissan gtr skyline 4wd (white-grey) dual batteries",
    "nissan gtr r34 rwd (dual battery & gyro stabilizer)",
    "r36s max handheld game console",
    "m22 playstation 128gb",
    "r36s handheld game console",
    "mn99s full scale 4wd climbing defender (black) - (dual battery)",
    "mn98 rc rock crawler defender (yellow) - (dual battery)",
    "nissan black racer (dual battery)",
    "mclaren 750s saros grey (1:64 scale)",
    "professional ytp yoyo - the divine lion - blue/red/black"
  ];

  // Check if cart contains only cars
  const hasOnlyCars = (cartItems) => {
    if (!cartItems || cartItems.length === 0) return false;

    return cartItems.every(
      (item) =>
        item.title.toLowerCase().includes("car") ||
        SPECIAL_CAR_MODELS.some((model) =>
          item.title.toLowerCase().includes(model)
        )
    );
  };

  // Check if cart contains special car models
  const hasSpecialCarModels = (cartItems) => {
    if (!cartItems || cartItems.length === 0) return false;

    return cartItems.some((item) =>
      SPECIAL_CAR_MODELS.some((model) =>
        item.title.toLowerCase().includes(model)
      )
    );
  };

  // Updated delivery charge calculation
  const calculateDeliveryCharge = (districtName, cartItems) => {
    // Special cars always have free delivery
    if (hasSpecialCarModels(cartItems)) return 0;

    // Regular cars have free delivery when they're the only items
    if (hasOnlyCars(cartItems)) return 0;

    // Normal delivery charges
    if (!districtName) return 0;
    if (districtName === "dhaka") return 70;
    if (districtName === "dhaka sub-urban") return 100;
    return 130;
  };

  const displayData = localCartData.length > 0 ? localCartData : cartData;

  // Modify your existing charge calculations to include discount
  const extra4XLCharge = displayData
    .filter((item) => item.size === "xxxxl")
    .reduce((sum, item) => sum + 100 * (item.quantity || 1), 0);

  const totalPrice = displayData.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );
  const deliveryCharge = calculateDeliveryCharge(selectedDistrict, displayData);
  const subtotal = totalPrice + extra4XLCharge;
  const totalAmount = subtotal + deliveryCharge;
  const remainingAmount = totalAmount - advanceAmount;

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      const updatedAt = new Date()
        .toLocaleString("en-US", {
          month: "numeric",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })
        .replace(",", "");

      // Get cart items from localStorage with proper size handling
      const cartItems = JSON.parse(localStorage.getItem("cart") || "[]").map(
        (item) => ({
          title: item.title,
          size: item.size || null,
          quantity: item.quantity,
          price: item.price,
          productId: item.productId,
          mainImage: item.mainImage,
          storage: item.storage,
          tabColor: item?.tabColor
        })
      );

      const orderDetails = {
        ...data,
        totalPrice,
        advanceAmount,
        remainingAmount,
        cartItems,
        orderDate: updatedAt,
        status: "pending",
        deliveryCharge,
        extra4XLCharge,
      };

      const orderResponse = await axios.post(
        `${import.meta.env.VITE_API_URL}/orderdetails`,
        orderDetails,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log("Order response:", orderResponse);

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "purchase",
        ecommerce: {
          transaction_id: orderResponse.data?._id || Date.now().toString(), // use backend order id if available
          value: Number(totalAmount), // total price incl. delivery
          currency: "BDT",
          items: cartItems.map((item) => ({
            item_id: item.productId,
            item_name: item.title,
            price: Number(item.price),
            quantity: Number(item.quantity),
          })),
        },
        customer: {
          name: data.name,
          email: data.email || user?.email || "",
          phone: data.mobile,
          district: data.district,
          thana: data.thana,
          address: data.address,
          note: data.note || "",
        },
        item_id: cartItems.map((item) => item.productId),
        content_type: "product",
        value: Number(totalAmount),
        currency: "BDT",
      });

      // Clear cart and update state
      localStorage.removeItem("cart");
      setLocalCartData([]);
      window.dispatchEvent(new Event("storage"));

      queryClient.invalidateQueries(["cart"]);
      queryClient.setQueryData(["cart"], []);

      toast.success("Order placed successfully!");
      setTimeout(() => navigate("/my-orders"), 1000);
    } catch (error) {
      console.error("Order error:", error);
      toast.error(error.response?.data?.message || "Order failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const loadCartData = () => {
      const cartData = localStorage.getItem("cart");
      setLocalCartData(cartData ? JSON.parse(cartData) : []);
    };

    const handleStorageChange = () => {
      loadCartData();
    };

    // Initial load
    loadCartData();

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      // Reset local state when component unmounts
      setLocalCartData([]);
    };
  }, []);

  if (isLoading) return <Loader />;
  if (error)
    return <div className="p-6 text-red-500">Error: {error.message}</div>;

  return (
    <div className="pt-20 md:pt-20 lg:pt-24 px-4 sm:px-6 md:px-10 text-center md:space-y-10 py-5">
      <div>
        <h1 className="font-bold text-2xl sm:text-3xl">Delivery Details</h1>
      </div>

      {/* Main Container - changes layout based on screen size  */}
      <div className="flex flex-col lg:flex-row justify-center w-full mx-auto gap-4 sm:gap-6 md:gap-8">
        <div>
          <Toaster />
        </div>
        {/* Order Form - full width on mobile, then fixed width on larger screens */}
        <div className="w-full lg:w-1/2 xl:w-2/3">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col mx-auto space-y-8 md:space-y-12 bg-white p-3 md:p-6 sm:p-8 rounded-2xl border border-gray-200">
            <fieldset className="grid grid-cols-1 gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-6 col-span-full">
                {/* Email and Name */}
                <div className="col-span-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Email */}
                  <div className="flex flex-col items-start">
                    <label
                      htmlFor="email"
                      className="block text-sm sm:text-base font-semibold text-gray-700">
                      Email <span className="text-gray-400">(Optional)</span>
                    </label>
                    <input
                      defaultValue={user?.email}
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="w-full rounded-lg border border-gray-300 text-gray-900 p-3 outline-none"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Name */}
                  <div className="flex flex-col items-start">
                    <label
                      htmlFor="name"
                      className="block text-sm sm:text-base font-semibold text-gray-700">
                      Facebook/Instagram Name
                    </label>
                    <input
                      defaultValue={user?.displayName}
                      id="name"
                      type="text"
                      placeholder="Recipient Name"
                      className="w-full rounded-lg border border-gray-300 text-gray-900 p-3 outline-none"
                      {...register("name", {
                        required: "Name is required",
                        minLength: {
                          value: 3,
                          message: "Name must be at least 3 characters",
                        },
                      })}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Mobile Number */}
                <div className="col-span-full">
                  <label
                    htmlFor="mobile"
                    className="block text-sm sm:text-base font-semibold text-gray-700 text-start">
                    Mobile Number
                  </label>
                  <input
                    id="mobile"
                    type="tel"
                    placeholder="Enter your mobile number"
                    className="w-full rounded-lg border border-gray-300 text-gray-900 p-3 outline-none"
                    {...register("mobile", {
                      required: "Mobile number is required",
                      pattern: {
                        value: /^[0-9]{11}$/,
                        message: "Please enter a valid 11-digit number",
                      },
                    })}
                  />
                  {errors.mobile && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.mobile.message}
                    </p>
                  )}
                </div>

                {/* District and Thana */}
                <div className="col-span-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* District */}
                  <div className="flex flex-col items-start">
                    <label
                      htmlFor="district"
                      className="block text-sm sm:text-base font-semibold text-gray-700">
                      District
                    </label>
                    <select
                      id="district"
                      className="w-full rounded-lg border border-gray-300 text-gray-900 p-3 outline-none"
                      {...register("district", {
                        required: "District is required",
                      })}
                      value={selectedDistrict}
                      onChange={(e) => {
                        setSelectedDistrict(e.target.value);
                        setValue("district", e.target.value);
                        setValue("thana", "");
                      }}>
                      <option value="">Select a district</option>
                      {locations.map((location) => (
                        <option key={location.name} value={location.name}>
                          {location.district}
                        </option>
                      ))}
                    </select>
                    {errors.district && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.district.message}
                      </p>
                    )}
                  </div>

                  {/* Thana */}
                  <div className="flex flex-col items-start">
                    <label
                      htmlFor="thana"
                      className="block text-sm sm:text-base font-semibold text-gray-700">
                      Thana
                    </label>
                    <select
                      id="thana"
                      className="w-full rounded-lg border border-gray-300 text-gray-900 p-3 outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                      disabled={!selectedDistrict}
                      {...register("thana", { required: "Thana is required" })}>
                      <option value="">Select a thana</option>
                      {thanas.map((thana, index) => (
                        <option key={index} value={thana}>
                          {thana}
                        </option>
                      ))}
                    </select>
                    {errors.thana && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.thana.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div className="col-span-full flex flex-col items-start">
                  <label
                    htmlFor="address"
                    className="block text-sm sm:text-base font-semibold text-gray-700">
                    Address
                  </label>
                  <input
                    id="address"
                    type="text"
                    placeholder="Type Address"
                    className="w-full rounded-lg border border-gray-300 text-gray-900 p-3 outline-none"
                    {...register("address", {
                      required: "Address is required",
                      minLength: {
                        value: 10,
                        message: "Address must be at least 10 characters",
                      },
                    })}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.address.message}
                    </p>
                  )}
                </div>

                {/* Payment details */}
                <div className="col-span-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Advance amount */}
                  <div className="flex flex-col items-start">
                    <label
                      htmlFor="advanceAmount"
                      className="block text-sm sm:text-base font-semibold text-red-600 text-start">
                      Advance: 100 Tk Send Money via Bkash/Nagad:{" "}
                      <span
                        onClick={handleCopy}
                        className="font-semibold cursor-pointer hover:text-blue-600 transition-colors"
                        title="Click to copy">
                        01303775977
                      </span>
                      {isCopied && (
                        <span className="ml-2 text-green-600 text-sm">
                          ✓ Copied!
                        </span>
                      )}
                    </label>
                    <input
                      id="advanceAmount"
                      type="number"
                      placeholder="Type Advance Amount"
                      className="w-full rounded-lg border border-gray-300 text-gray-900 p-3 outline-none"
                      {...register("advanceAmount", {
                        min: 0,
                        max: {
                          value: totalPrice,
                          message: "Advance can't exceed total price",
                        },
                      })}
                      value={advanceAmount}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        setAdvanceAmount(value);
                        setValue("advanceAmount", value);
                      }}
                    />
                    {errors.advanceAmount && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.advanceAmount.message}
                      </p>
                    )}
                  </div>

                  {/* Bkash/Nagad digits */}
                  <div className="flex flex-col items-start">
                    <label
                      htmlFor="paymentDigits"
                      className="block text-sm sm:text-base font-semibold text-gray-700">
                      Last 4 digits of (Bkash/Nagad) number
                    </label>
                    <input
                      id="paymentDigits"
                      type="text"
                      placeholder="Type last 4 digits"
                      className="w-full rounded-lg border border-gray-300 text-gray-900 p-3 outline-none"
                      {...register("paymentDigits", {
                        required: "Payment digits are required",
                        pattern: {
                          value: /^[0-9]{4}$/,
                          message: "Please enter exactly 4 digits",
                        },
                      })}
                    />
                    {errors.paymentDigits && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.paymentDigits.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Note */}
                <div className="col-span-full flex flex-col items-start">
                  <label
                    htmlFor="note"
                    className="block text-sm sm:text-base font-semibold text-gray-700">
                    Note
                  </label>
                  <input
                    id="note"
                    type="text"
                    placeholder="Write a note (optional)"
                    className="w-full rounded-lg border border-gray-300 text-gray-900 p-3 outline-none"
                    {...register("note")}
                  />
                </div>
              </div>
            </fieldset>

            {/* Hidden submit */}
            <button type="submit" ref={hiddenSubmitRef} className="hidden">
              Submit
            </button>
          </form>
        </div>

        {/* Vertical divider - hidden on mobile, shown on lg+ */}
        <hr className="border-0 lg:border-l border-gray-400 hidden lg:block lg:h-[550px] mx-4" />

        {/* Horizontal divider - shown on mobile, hidden on lg+ */}
        <hr className="border-t border-gray-400 my-4 lg:hidden" />

        {/* Price view */}
        <div className="w-full lg:w-1/2 xl:w-1/3 space-y-6">
          {/* Product List */}
          <div className="space-y-4">
            {(localCartData.length > 0 ? localCartData : cartData).map(
              (item) => (
                <div
                  key={item.productId || item._id}
                  className="flex gap-3 sm:gap-4 p-3 border border-gray-200 rounded-lg bg-white">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-md overflow-hidden bg-gray-100">
                    <img
                      src={item.mainImage}
                      alt={item.title || "Product"}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 space-y-2">
                    {/* Title + Price */}
                    <div className="flex justify-between gap-2 md:gap-12">
                      <p className="text-gray-800 font-semibold text-sm sm:text-base leading-snug text-start">
                        {item.title}  
                        <span
                          className={
                            item?.tabColor === "Red"
                              ? "text-red-500"
                              : item?.tabColor === "Black"
                                ? "text-yellow-600"
                                : item?.tabColor === "Blue"
                                  ? "text-blue-500"
                                  : "text-green-500"
                          }
                        >
                          -  - ({item?.tabColor ? item?.tabColor : <></>})
                        </span>
                      </p>
                      <p className="text-gray-900 font-medium text-sm sm:text-base text-nowrap">
                        ৳{item.price}
                        {item.quantity > 1 && (
                          <span className="text-gray-500 ml-1">
                            × {item.quantity}
                          </span>
                        )}
                      </p>
                    </div>

                    {/* Size */}
                    {item.size && (
                      <p className="text-gray-600 text-xs sm:text-sm">
                        <span className="font-semibold">Size:</span> {item.size}
                      </p>
                    )}

                    {/* Storage (only for console) */}
                    {item?.title === "R36S Max Handheld Game Console" &&
                      item?.storage && (
                        <p className="text-gray-600 text-xs sm:text-sm">
                          <span className="font-semibold">Storage:</span>{" "}
                          {item.storage}
                        </p>
                      )}
                  </div>
                </div>
              )
            )}
          </div>

          {/* Order Summary */}
          <div className="p-4 sm:p-5 border border-gray-300 rounded-lg bg-gray-50  space-y-3">
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
              Order Summary
            </h2>

            <div className="space-y-2 text-sm sm:text-base text-gray-700">
              <div className="flex justify-between">
                <span>
                  Subtotal -{" "}
                  {(localCartData.length > 0 ? localCartData : cartData).length}{" "}
                  items
                </span>
                <span>৳{totalPrice}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery Charge</span>
                {hasOnlyCars(
                  localCartData.length > 0 ? localCartData : cartData
                ) ? (
                  <span className="text-green-600">Free Delivery</span>
                ) : (
                  <span>৳{deliveryCharge}</span>
                )}
              </div>

              {extra4XLCharge > 0 && (
                <div className="flex justify-between">
                  <span>Extra for 4XL Size</span>
                  <span>৳{extra4XLCharge}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Advance Amount</span>
                <span>৳{advanceAmount}</span>
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center pt-3 border-t">
              <h1 className="font-bold text-base sm:text-lg text-gray-900">
                Remaining Amount
              </h1>
              <p className="flex items-center gap-1 sm:gap-2 font-bold text-lg text-gray-900">
                <span className="text-xs sm:text-sm font-normal text-gray-500">
                  BDT
                </span>
                ৳{remainingAmount}
              </p>
            </div>
          </div>

          {/* Place Order Button */}
          <div>
            <button
              onClick={handlePlaceOrderClick}
              className={`w-full flex items-center justify-center gap-2 ${isSubmitting ? "bg-gray-400" : "bg-[#FFD700] hover:bg-[#FFB300]"
                } text-black font-bold py-3 rounded-lg transition`}
              type="button"
              disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 
                 5.291A7.962 7.962 0 014 12H0c0 3.042 
                 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Place Order"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
