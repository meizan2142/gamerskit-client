import { useRef, useState } from 'react';
import { allLocation } from "./locations";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../../useAuth/useAuth';

const OrderForm = () => {
    const locations = allLocation();
    const {user} = useAuth()
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [advanceAmount, setAdvanceAmount] = useState(0)
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const [isSubmitting, setIsSubmitting] = useState(false);
    const hiddenSubmitRef = useRef(null);
    const navigate = useNavigate()
    const queryClient = useQueryClient();

    const handlePlaceOrderClick = () => {
        // Trigger the hidden submit button click
        hiddenSubmitRef.current.click();
    };


    // Fetch cart data
    const { isLoading, error, data: cartData = [] } = useQuery({
        queryKey: ['cart'],
        queryFn: async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/cartList`
                );
                return response.data; // Axios automatically parses JSON
            } catch (err) {
                console.error(err, "Failed to fetch cart items");
                return []; // Fallback empty array on error
            }
        },
    });

    // Get the selected location object based on the selected district name
    const selectedLocation = locations.find(loc => loc.name === selectedDistrict);

    // Get thanas for the selected district or empty array if none selected
    const thanas = selectedLocation ? selectedLocation.thana : [];

    // Calculate total
    const totalPrice = cartData.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
    }, 0);

    // Calculate delivery charge based on selected district
    // Constants for car identification
    const SPECIAL_CAR_MODELS = [
        'porsche 911 drift car 4wd',
        'nissan gtr skyline 4wd'
    ];

    // Check if cart contains only cars
    const hasOnlyCars = (cartItems) => {
        if (!cartItems || cartItems.length === 0) return false;

        return cartItems.every(item =>
            item.title.toLowerCase().includes('car') || // Basic car check
            SPECIAL_CAR_MODELS.some(model =>
                item.title.toLowerCase().includes(model)
            )
        );
    };

    // Check if cart contains special car models
    const hasSpecialCarModels = (cartItems) => {
        if (!cartItems || cartItems.length === 0) return false;

        return cartItems.some(item =>
            SPECIAL_CAR_MODELS.some(model =>
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


    // Calculate all values
    const deliveryCharge = calculateDeliveryCharge(selectedDistrict, cartData);
    const subtotal = cartData.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalAmount = subtotal + deliveryCharge;
    const remainingAmount = totalAmount - advanceAmount;


    const onSubmit = async (data) => {
        try {
            setIsSubmitting(true);

            // Prepare order data
            const cartItems = cartData.map(item => ({
                title: item.title,
                size: item.size || 'N/A',
                quantity: item.quantity,
                price: item.price,
                productId: item._id,
                productImg: item.img
            }));

            const orderDetails = {
                ...data,
                totalPrice,
                advanceAmount,
                remainingAmount,
                cartItems,
                orderDate: new Date().toISOString(),
                status: 'pending',
                deliveryCharge
            };

            // 1. Place the order
            const orderResponse = await axios.post(
                `${import.meta.env.VITE_API_URL}/orderdetails`,
                orderDetails,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            console.log("Order placed successfully:", orderResponse.data);

            // 2. Clear the cart
            await axios.delete(
                `${import.meta.env.VITE_API_URL}/clearCart`,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            // 3. Invalidate and reset cart queries for instant UI update
            await queryClient.invalidateQueries(['cart']); // This will refetch the cart
            queryClient.setQueryData(['cart'], []); // This will instantly set cart to empty

            // 4. Show success and redirect
            toast.success("Order placed successfully!");
            setTimeout(() => navigate('/my-orders'), 1000);

        } catch (error) {
            console.error("Order error:", error);
            if (error.response) {
                toast.error(error.response.data.message || 'Order failed');
            } else {
                toast.error("Network error - please try again");
            }
        } finally {
            setIsSubmitting(false);
        }
    }


    if (isLoading) return <div className="p-6 text-white">
        <div className="w-10 h-10 animate-[spin_2s_linear_infinite] rounded-full border-4 border-dashed border-[#FFB300]"></div>
    </div>;
    if (error) return <div className="p-6 text-red-500">Error: {error.message}</div>;



    return (
        <div className="pt-20 md:pt-20 lg:pt-24 px-4 sm:px-6 md:px-10 text-center space-y-6 md:space-y-10">
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
                    <form onSubmit={handleSubmit(onSubmit)} className="container flex flex-col mx-auto space-y-8 md:space-y-12">
                        <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-6 rounded-md shadow-sm">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4 col-span-full">
                                {/* Email and Name */}
                                <div className="col-span-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Email */}
                                    <div className="w-full">
                                        <label htmlFor="email" className="text-sm sm:text-base font-bold">Email</label>
                                        <input
                                            defaultValue={user?.email}
                                            id="email"
                                            type="email"
                                            placeholder="Email"
                                            className="w-full rounded-md border border-black text-black p-2 sm:p-3 outline-none"
                                            {...register("email", {
                                                required: "Email is required",
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: "Invalid email address"
                                                }
                                            })}
                                        />
                                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                                    </div>

                                    <div className="w-full">
                                        <label htmlFor="name" className="text-sm sm:text-base font-bold">Name</label>
                                        <input
                                            defaultValue={user?.displayName}
                                            id="name"
                                            type="text"
                                            placeholder="Recipient Name"
                                            className="w-full rounded-md border border-black text-black p-2 sm:p-3 outline-none"
                                            {...register("name", {
                                                required: "Name is required",
                                                minLength: {
                                                    value: 3,
                                                    message: "Name must be at least 3 characters"
                                                }
                                            })}
                                        />
                                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                                    </div>
                                </div>

                                {/* Mobile Number */}
                                <div className="col-span-full sm:col-span-3">
                                    <label htmlFor="mobile" className="text-sm sm:text-base font-bold">Mobile Number</label>
                                    <input
                                        id="mobile"
                                        type="tel"
                                        placeholder="Your mobile number"
                                        className="w-full rounded-md border-black text-black p-2 sm:p-3 outline"
                                        {...register("mobile", {
                                            required: "Mobile number is required",
                                            pattern: {
                                                value: /^[0-9]{11}$/,
                                                message: "Please enter a valid phone number with 11 Digit!"
                                            }
                                        })}
                                    />
                                    {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile.message}</p>}
                                </div>

                                {/* District and Thana */}
                                <div className="col-span-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* District */}
                                    <div className="w-full">
                                        <label htmlFor="district" className="text-sm sm:text-base font-bold">District</label>
                                        <select
                                            id="district"
                                            className="w-full rounded-md border border-black text-black p-2 sm:p-3 outline-none"
                                            {...register("district", { required: "District is required" })}
                                            value={selectedDistrict}
                                            onChange={(e) => {
                                                setSelectedDistrict(e.target.value);
                                                setValue("district", e.target.value);
                                                setValue("thana", ""); // Reset thana when district changes
                                            }}
                                        >
                                            <option value="">Select a district</option>
                                            {locations.map((location) => (
                                                <option key={location.name} value={location.name}>
                                                    {location.district}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.district && <p className="text-red-500 text-xs mt-1">{errors.district.message}</p>}
                                    </div>

                                    {/* Thana */}
                                    <div className="w-full">
                                        <label htmlFor="thana" className="text-sm sm:text-base font-bold">Thana</label>
                                        <select
                                            id="thana"
                                            className="w-full rounded-md border border-black text-black p-2 sm:p-3 outline-none disabled:opacity-70 disabled:cursor-not-allowed"
                                            disabled={!selectedDistrict}
                                            {...register("thana", { required: "Thana is required" })}
                                        >
                                            <option value="">Select a thana</option>
                                            {thanas.map((thana, index) => (
                                                <option key={index} value={thana}>
                                                    {thana}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.thana && <p className="text-red-500 text-xs mt-1">{errors.thana.message}</p>}
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="col-span-full">
                                    <label htmlFor="address" className="text-sm sm:text-base font-bold">Address</label>
                                    <input
                                        id="address"
                                        type="text"
                                        placeholder="Type Address"
                                        className="w-full rounded-md border-black text-black p-2 sm:p-3 outline"
                                        {...register("address", {
                                            required: "Address is required",
                                            minLength: {
                                                value: 10,
                                                message: "Address must be at least 10 characters"
                                            }
                                        })}
                                    />
                                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
                                </div>

                                {/* Payment details */}
                                <div className="col-span-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Bkash/Nagad digits */}
                                    <div className="w-full">
                                        <label htmlFor="paymentDigits" className="text-sm sm:text-base font-bold">Bkash/Nagad last 4 digits</label>
                                        <input
                                            id="paymentDigits"
                                            type="text"
                                            placeholder="Type last 4 digits"
                                            className="w-full rounded-md border border-black text-black p-2 sm:p-3 outline-none"
                                            {...register("paymentDigits", {
                                                required: "Payment digits are required",
                                                pattern: {
                                                    value: /^[0-9]{4}$/,
                                                    message: "Please enter exactly 4 digits"
                                                }
                                            })}
                                        />
                                        {errors.paymentDigits && <p className="text-red-500 text-xs mt-1">{errors.paymentDigits.message}</p>}
                                    </div>

                                    {/* Advance amount */}
                                    <div className="w-full">
                                        <label htmlFor="advanceAmount" className="text-sm sm:text-base font-bold">Advance Amount</label>
                                        <input
                                            id="advanceAmount"
                                            type="number"
                                            placeholder="Type Advance Amount"
                                            className="w-full rounded-md border border-black text-black p-2 sm:p-3 outline-none"
                                            {...register("advanceAmount", {
                                                min: 0,
                                                max: {
                                                    value: totalPrice,
                                                    message: "Advance can't exceed total price"
                                                }
                                            })}
                                            value={advanceAmount}
                                            onChange={(e) => {
                                                const value = Number(e.target.value);
                                                setAdvanceAmount(value);
                                                setValue("advanceAmount", value);
                                            }}
                                        />
                                        {errors.advanceAmount && <p className="text-red-500 text-xs mt-1">{errors.advanceAmount.message}</p>}
                                    </div>
                                </div>

                                {/* Note */}
                                <div className="col-span-full">
                                    <label htmlFor="note" className="text-sm sm:text-base font-bold">Note</label>
                                    <input
                                        id="note"
                                        type="text"
                                        placeholder="Type Note"
                                        className="w-full rounded-md border-black text-black p-2 sm:p-3 outline"
                                        {...register("note")}
                                    />
                                </div>
                            </div>
                        </fieldset>

                        {/* Hidden submit button for the price summary section to trigger */}
                        <button type="submit" ref={hiddenSubmitRef} className="hidden">
                            Submit
                        </button>
                    </form>
                </div>

                {/* Vertical divider - hidden on mobile, shown on lg+ */}
                <hr className="border-0 lg:border-l border-black hidden lg:block lg:h-[550px] mx-4" />

                {/* Horizontal divider - shown on mobile, hidden on lg+ */}
                <hr className="border-t border-black my-4 lg:hidden" />

                {/* Price view - full width on mobile, fixed on larger */}
                <div className="w-full lg:w-1/2 xl:w-1/3 space-y-4 sm:space-y-6 md:space-y-8">
                    {/* Product List */}
                    <div className='grid space-y-3'>
                        {/* single item */}
                        {
                            cartData.map((item) => <div key={item._id} className="flex gap-3 sm:gap-4">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-800 rounded-md overflow-hidden">
                                    <img
                                        src={item.img}
                                        alt={'Product'}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="flex-1 space-y-2 sm:space-y-4 justify-start">
                                    <div className="flex justify-between gap-3 sm:gap-5">
                                        <p className="text-black font-bold text-xs sm:text-sm">
                                            {item.title}
                                        </p>
                                        <p className='text-black font-normal text-xs sm:text-sm'>
                                            ৳{item.price}
                                        </p>
                                    </div>
                                    <div className='flex justify-start'>
                                        {
                                            item.size ?
                                                <p className="text-black font-normal text-xs sm:text-sm">
                                                    <span className='font-bold'>Size:</span> {item.size}
                                                </p>
                                                :
                                                <></>
                                        }
                                    </div>

                                </div>
                            </div>)
                        }
                    </div>

                    {/* Order Summary */}
                    <div className='space-y-1 sm:space-y-2'>
                        <div className='flex font-normal text-xs sm:text-sm justify-between items-center'>
                            <h1>Subtotal - {cartData.length} items</h1>
                            <p>৳{totalPrice}</p>
                        </div>
                        <div className='flex font-normal text-xs sm:text-sm justify-between items-center'>
                            <h1>Delivery Charge</h1>
                            {hasOnlyCars(cartData) ? (
                                hasSpecialCarModels(cartData) ? (
                                    <p className="text-green-600">Included with price</p>
                                ) : (
                                    <p className="text-green-600">Included with price</p>
                                )
                            ) : (
                                <p>৳{deliveryCharge}</p>
                            )}
                        </div>
                        <div className='flex font-normal text-xs sm:text-sm justify-between items-center'>
                            <h1>Advance Amount</h1>
                            <p>৳{advanceAmount}</p>
                        </div>
                    </div>

                    {/* Total */}
                    <div className='flex font-normal text-sm sm:text-base justify-between items-center'>
                        <h1 className='font-bold text-base sm:text-[18px]'>Remaining Amount</h1>
                        <p className='flex items-center gap-1 sm:gap-2 font-bold text-base sm:text-lg'>
                            <span className='text-[8px] sm:text-[10px] font-normal'>BDT</span>
                            ৳{(totalAmount - advanceAmount)}
                        </p>
                    </div>

                    <div>
                        <button
                            onClick={handlePlaceOrderClick}
                            className={`w-full flex items-center justify-center gap-2 ${isSubmitting ? 'bg-gray-400' : 'bg-[#FFD700] hover:bg-[#FFB300]'} text-black font-bold py-2 px-4 rounded transition`}
                            type="button"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </>
                            ) : 'Place Order'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderForm;