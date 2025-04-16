import { useState } from 'react';
import { allLocation } from "./locations";
import { NavLink } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const OrderForm = () => {
    const locations = allLocation();
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [advanceAmount, setAdvanceAmount] = useState(0)

    // Fetch cart data
    const { isLoading, error, data = [] } = useQuery({
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
    const totalPrice = data.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
    }, 0);

    if (isLoading) return <div className="p-6 text-white">
        <div className="w-10 h-10 animate-[spin_2s_linear_infinite] rounded-full border-4 border-dashed border-[#FFB300]"></div>
    </div>;
    if (error) return <div className="p-6 text-red-500">Error: {error.message}</div>;

    console.log(data);


    return (
        <div className="pt-20 md:pt-20 lg:pt-24 px-4 sm:px-6 md:px-10 text-center space-y-6 md:space-y-10">
            <div>
                <h1 className="font-bold text-2xl sm:text-3xl">Delivery Details</h1>
            </div>

            {/* Main Container - changes layout based on screen size */}
            <div className="flex flex-col lg:flex-row justify-center w-full mx-auto gap-4 sm:gap-6 md:gap-8">
                {/* Order Form - full width on mobile, then fixed width on larger screens */}
                <div className="w-full lg:w-1/2 xl:w-2/3">
                    <form noValidate="" action="" className="container flex flex-col mx-auto space-y-8 md:space-y-12">
                        <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-6 rounded-md shadow-sm">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4 col-span-full">
                                {/* Email and Name in one row taking full width */}
                                <div className="col-span-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Email */}
                                    <div className="w-full">
                                        <label htmlFor="email" className="text-sm sm:text-base font-bold">Email</label>
                                        <input
                                            id="email"
                                            type="email"
                                            placeholder="Email"
                                            className="w-full rounded-md border border-black text-black p-2 sm:p-3 outline-none"
                                        />
                                    </div>

                                    {/* Name */}
                                    <div className="w-full">
                                        <label htmlFor="firstname" className="text-sm sm:text-base font-bold">Name</label>
                                        <input
                                            id="firstname"
                                            type="text"
                                            placeholder="Recipient Name"
                                            className="w-full rounded-md border border-black text-black p-2 sm:p-3 outline-none"
                                        />
                                    </div>
                                </div>

                                {/* Mobile Number - full width on mobile, half on larger */}
                                <div className="col-span-full sm:col-span-3">
                                    <label htmlFor="address" className="text-sm sm:text-base font-bold">Mobile Number</label>
                                    <input id="address" type="number" placeholder="Your mobile number" className="w-full rounded-md border-black text-black p-2 sm:p-3 outline" />
                                </div>

                                {/* District and Thana in one row taking full width */}
                                <div className="col-span-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* District */}
                                    <div className="w-full">
                                        <label htmlFor="district" className="text-sm sm:text-base font-bold">District</label>
                                        <select
                                            id="district"
                                            name="district"
                                            className="w-full rounded-md border border-black text-black p-2 sm:p-3 outline-none"
                                            value={selectedDistrict}
                                            onChange={(e) => setSelectedDistrict(e.target.value)}
                                        >
                                            <option value="">Select a district</option>
                                            {locations.map((location) => (
                                                <option key={location.name} value={location.name}>
                                                    {location.district}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Thana */}
                                    <div className="w-full">
                                        <label htmlFor="thana" className="text-sm sm:text-base font-bold">Thana</label>
                                        <select
                                            id="thana"
                                            name="thana"
                                            className="w-full rounded-md border border-black text-black p-2 sm:p-3 outline-none disabled:opacity-70 disabled:cursor-not-allowed"
                                            disabled={!selectedDistrict}
                                        >
                                            <option value="">Select a thana</option>
                                            {thanas.map((thana, index) => (
                                                <option key={index} value={thana}>
                                                    {thana}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Address - full width */}
                                <div className="col-span-full">
                                    <label htmlFor="zip" className="text-sm sm:text-base font-bold">Address</label>
                                    <input id="zip" type="text" placeholder="Type Address" className="w-full rounded-md border-black text-black p-2 sm:p-3 outline" />
                                </div>

                                {/* Payment details - full width on mobile, half on larger */}
                                <div className="col-span-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Bkash / Nagad last 4 digits  */}
                                    <div className="w-full">
                                        <label htmlFor="digits" className="text-sm sm:text-base font-bold">Bkash / Nagad last 4 digits</label>
                                        <input
                                            id="digits"
                                            type="digits"
                                            placeholder="Type last 4 digits"
                                            className="w-full rounded-md border border-black text-black p-2 sm:p-3 outline-none"
                                        />
                                    </div>

                                    {/* Advance amount */}
                                    <div className="w-full">
                                        <label htmlFor="amount" className="text-sm sm:text-base font-bold">Advance Amount</label>
                                        <input
                                            id="amount"
                                            type="number"
                                            placeholder="Type Advance Amount"
                                            className="w-full rounded-md border border-black text-black p-2 sm:p-3 outline-none"
                                            value={advanceAmount}
                                            onChange={(e) => setAdvanceAmount(Number(e.target.value))}
                                        />
                                    </div>
                                </div>

                                {/* Note - full width */}
                                <div className="col-span-full">
                                    <label htmlFor="note" className="text-sm sm:text-base font-bold">Note</label>
                                    <input id="note" type="text" placeholder="Type Note" className="w-full rounded-md border-black text-black p-2 sm:p-3 outline" />
                                </div>
                            </div>
                        </fieldset>
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
                            data.map((item) => <div key={item._id} className="flex gap-3 sm:gap-4">
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
                            <h1>Subtotal - {data.length} items</h1>
                            <p>৳{totalPrice.toFixed(2)}</p>
                        </div>
                        <div className='flex font-normal text-xs sm:text-sm justify-between items-center'>
                            <h1>Delivery Charge</h1>
                            {/* <p>৳130</p> */}
                            <p>Included with price</p>
                        </div>
                        <div className='flex font-normal text-xs sm:text-sm justify-between items-center'>
                            <h1>Advance Amount</h1>
                            <p>৳{advanceAmount.toFixed(2)}</p>
                        </div>
                    </div>

                    {/* Total */}
                    <div className='flex font-normal text-sm sm:text-base justify-between items-center'>
                        <h1 className='font-bold text-base sm:text-[18px]'>Total</h1>
                        <p className='flex items-center gap-1 sm:gap-2 font-bold text-base sm:text-lg'>
                            <span className='text-[8px] sm:text-[10px] font-normal'>BDT</span>
                            ৳{(totalPrice - advanceAmount).toFixed(2)} {/* Subtract advance from total */}
                        </p>
                    </div>

                    <div>
                        <NavLink to='/place-orders'>
                            <button className="w-full flex items-center justify-center gap-2 bg-[#FFD700] hover:bg-[#FFB300] text-black font-bold py-2 px-4 rounded transition">
                                Place Order
                            </button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderForm;