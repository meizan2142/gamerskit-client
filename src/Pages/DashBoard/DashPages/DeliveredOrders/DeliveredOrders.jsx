import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Eye } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DeliveredOrders = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const { isLoading, error, data: allOrders = [] } = useQuery({
        queryKey: ['delivered'],
        queryFn: async () => {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/orderdetails`
            );
            return response.data;
        },
    });

    const delivered = allOrders.filter(d =>
        d?.status === "delivered"
    );

    // Filter by date range
    const filteredByDate = delivered.filter(order => {
        if (!startDate && !endDate) return true;
        const orderDate = new Date(order.orderDate);
        return (
            (!startDate || orderDate >= startDate) &&
            (!endDate || orderDate <= endDate)
        );
    });

    // Filter by search term
    const filteredOrders = filteredByDate.filter(order =>
        order.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calculate totals
    const totalQuantity = filteredOrders.reduce(
        (total, order) => total + order.cartItems.reduce((sum, item) => sum + item.quantity, 0),
        0
    );

    const totalAmount = filteredOrders.reduce(
        (total, order) => total + (order.advanceAmount + order.remainingAmount),
        0
    );

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
        <div className="overflow-x-auto p-4">
            <div className="space-y-4">
                <h1 className="font-bold text-3xl text-center mb-5">Delivered Orders</h1>
            </div>

            {/* Filters Section */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                    <div className="flex items-center gap-2">
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            placeholderText="Start Date"
                            className="p-2 border rounded"
                        />
                        <span>to</span>
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                            placeholderText="End Date"
                            className="p-2 border rounded"
                        />
                        {(startDate || endDate) && (
                            <button
                                onClick={() => {
                                    setStartDate(null);
                                    setEndDate(null);
                                }}
                                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                Clear
                            </button>
                        )}
                    </div>

                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="p-2 border rounded w-full md:w-64"
                    />
                </div>

                <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="text-center">
                        <p className="font-semibold">Total Orders</p>
                        <p className="text-xl">{filteredOrders.length}</p>
                    </div>
                    <div className="text-center">
                        <p className="font-semibold">Total Quantity</p>
                        <p className="text-xl">{totalQuantity}</p>
                    </div>
                    <div className="text-center">
                        <p className="font-semibold">Total Amount</p>
                        <p className="text-xl">{totalAmount}</p>
                    </div>
                </div>
            </div>

            {/* Orders Table */}
            {filteredOrders.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                    No delivered orders found matching your criteria.
                </div>
            ) : (
                <table className="min-w-full shadow-md border border-gray-100 my-2">
                    <thead>
                        <tr className="bg-[#333333] text-white">
                            <th className="py-3 px-6 text-left border-b">Serial</th>
                            <th className="py-3 px-6 text-left border-b">Date</th>
                            <th className="py-3 px-6 text-left border-b">Name</th>
                            <th className="py-3 px-6 border-b text-center">Quantity</th>
                            <th className="py-3 px-6 border-b text-center">Advance Amount</th>
                            <th className="py-3 px-6 border-b text-center">Remaining Amount</th>
                            <th className="py-3 px-6 border-b text-center">Total Amount</th>
                            <th className="py-3 px-6 text-left border-b">Details</th>
                            <th className="py-3 px-6 text-left border-b">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders
                            .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
                            .map((item, index) => (
                                <tr key={item._id} className="hover:bg-gray-50">
                                    <td className="py-4 px-6 border-b">{index + 1}</td>
                                    <td className="py-4 px-6 border-b">
                                        {new Date(item.orderDate).toLocaleDateString()}
                                    </td>
                                    <td className="py-4 px-6 border-b">{item.name}</td>
                                    <td className="py-4 px-6 border-b text-center">
                                        {item.cartItems.reduce((total, item) => total + item.quantity, 0)}
                                    </td>
                                    <td className="py-4 px-6 border-b text-center">৳{item.advanceAmount}</td>
                                    <td className="py-4 px-6 border-b text-center">৳{item.remainingAmount}</td>
                                    <td className="py-4 px-6 border-b text-center font-medium">
                                        ৳{(item.advanceAmount + item.remainingAmount)}
                                    </td>
                                    <td className="py-4 px-6 border-b text-center">
                                        <NavLink to={`/single-order-details/${item._id}`} className="inline-block">
                                            <Eye className="text-blue-500 hover:text-blue-700" />
                                        </NavLink>
                                    </td>
                                    <td className="py-4 px-6 border-b text-center">
                                        <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                                            {item.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default DeliveredOrders