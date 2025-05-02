import { useState, useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Eye, ShoppingBasket } from "lucide-react";
import { NavLink } from "react-router-dom";

const MyOrders = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    // Fetch all orders
    const { isLoading, error, data: allOrders = [] } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/orderdetails`);
            return response.data;
        },
    });

    // Filter orders when phoneNumber changes
    useEffect(() => {
        if (!phoneNumber) {
            setFilteredOrders([]);
            return;
        }

        setIsSearching(true);
        const timer = setTimeout(() => {
            const normalizedInput = phoneNumber.trim();
            const matchedOrders = allOrders.filter(order =>
                order.mobile?.trim() === normalizedInput
            );
            setFilteredOrders(matchedOrders);
            setIsSearching(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [phoneNumber, allOrders]);

    const handlePhoneChange = (e) => {
        const value = e.target.value.replace(/\D/g, ''); // Allow only digits
        if (value.length <= 11) {
            setPhoneNumber(value);
        }
    };

    if (isLoading) return (
        <div className="flex justify-center items-center min-h-[50vh]">
            <div className="w-10 h-10 animate-spin rounded-full border-4 border-dashed border-[#FFB300]"></div>
        </div>
    );

    if (error) return (
        <div className="p-6 text-red-500 text-center">
            Error loading orders. Please try again later.
        </div>
    );

    return (
        <div className="pt-20 md:pt-20 lg:pt-24 px-4 sm:px-6 md:px-10 space-y-6 md:space-y-10">
            <h1 className="font-bold text-3xl text-center">Track your parcel by mobile number</h1>

            <div className="w-full md:w-1/2 mx-auto space-y-2">
                <input
                    type="tel"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    placeholder="Enter your 11-digits mobile number"
                    className="w-full rounded-md border border-gray-300 p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-[#FFB300]"
                    maxLength={11}
                />
                {isSearching && (
                    <p className="text-gray-500 text-sm text-center mt-10">Searching orders...</p>
                )}
            </div>

            {phoneNumber ? (
                filteredOrders.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-200">
                            <thead className="bg-gray-800 text-white">
                                <tr>
                                    <th className="p-3 text-left">Serial</th>
                                    <th className="p-3 text-left">Date</th>
                                    <th className="p-3 text-left">Name</th>
                                    <th className="p-3 text-center">Qty</th>
                                    <th className="p-3 text-center">Advance</th>
                                    <th className="p-3 text-center">Remaining</th>
                                    <th className="p-3 text-center">Status</th>
                                    <th className="p-3 text-center">Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOrders.map((order, index) => (
                                    <tr key={order._id} className="border-b hover:bg-gray-50">
                                        <td className="p-3">{index + 1}</td>
                                        <td className="p-3">{new Date(order.orderDate).toLocaleDateString()}</td>
                                        <td className="p-3">{order.name}</td>
                                        <td className="p-3 text-center">
                                            {order.cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0)}
                                        </td>
                                        <td className="p-3 text-center">৳{order.advanceAmount}</td>
                                        <td className="p-3 text-center">৳{order.remainingAmount}</td>
                                        <td className={`p-3 text-center ${order.status === 'delivered' ? 'text-green-600' : 'text-yellow-600'
                                            }`}>
                                            {order.status}
                                        </td>
                                        <td className="p-3 text-end">
                                            <NavLink to={`/single-order-details/${order._id}`}>
                                                <Eye className="w-5 h-5 text-black" />
                                            </NavLink>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-10">
                        <p className="text-xl font-semibold">No orders found for: {phoneNumber}</p>
                        <p className="text-gray-600 mt-2">Please check if the mobile number is correct</p>
                    </div>
                )
            ) : (
                <div className="text-center py-10">
                    <p className="text-xl font-semibold">Enter your mobile number to view orders</p>
                    <p className="text-gray-600 mt-2">Use the same number used during purchase</p>
                </div>
            )}
        </div>
    );
};

export default MyOrders;