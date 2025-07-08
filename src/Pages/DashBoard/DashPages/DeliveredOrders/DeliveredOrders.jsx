import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Eye } from "lucide-react";
import { NavLink, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DeliveredOrders = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectedTitle, setSelectedTitle] = useState("all");

    // Initialize filters from URL params on component mount
    useEffect(() => {
        const paramsStartDate = searchParams.get('startDate');
        const paramsEndDate = searchParams.get('endDate');
        const paramsTitle = searchParams.get('title');

        if (paramsStartDate) setStartDate(new Date(paramsStartDate));
        if (paramsEndDate) setEndDate(new Date(paramsEndDate));
        if (paramsTitle) setSelectedTitle(paramsTitle);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Update URL params when filters change
    useEffect(() => {
        const params = new URLSearchParams();

        if (startDate) params.set('startDate', startDate.toISOString());
        if (endDate) params.set('endDate', endDate.toISOString());
        if (selectedTitle && selectedTitle !== "all") params.set('title', selectedTitle);

        setSearchParams(params, { replace: true });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startDate, endDate, selectedTitle]);

    // Clear all filters
    const handleClearFilters = () => {
        setStartDate(null);
        setEndDate(null);
        setSelectedTitle("all");
        setSearchParams(new URLSearchParams(), { replace: true });
    };

    const { isLoading, error, data: allOrders = [] } = useQuery({
        queryKey: ['delivered'],
        queryFn: async () => {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/orderdetails`
            );
            return response.data;
        },
    });

    const { data: products = [] } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/addedProducts`
            );
            return response.data;
        },
    });

    // Filter delivered orders
    const delivered = allOrders.filter(d => d?.status === "delivered");

    // Filter by date range and title
    const filteredOrders = delivered.filter(order => {
        // Date filtering
        const dateMatch = (!startDate && !endDate) ||
            (new Date(order.orderDate) >= (startDate || new Date(0)) &&
                (new Date(order.orderDate) <= (endDate || new Date(8640000000000000))));

        // Title filtering
        const titleMatch = selectedTitle === "all" ||
            order.cartItems.some(item => item.title === selectedTitle);

        return dateMatch && titleMatch;
    });

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
            <div className="flex flex-col gap-4 mb-6">
                {/* First Row - Filters */}
                <div className="flex flex-col md:flex-row gap-4 w-full">
                    {/* Date Range Picker */}
                    <div className="flex flex-col sm:flex-row gap-2 items-center w-full md:w-auto">
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                selectsStart
                                startDate={startDate}
                                endDate={endDate}
                                placeholderText="Start Date"
                                className="p-2 border rounded w-full sm:w-40"
                            />
                            <span className="hidden sm:inline">to</span>
                            <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                selectsEnd
                                startDate={startDate}
                                endDate={endDate}
                                minDate={startDate}
                                placeholderText="End Date"
                                className="p-2 border rounded w-full sm:w-40"
                            />
                        </div>
                    </div>

                    {/* Product Select */}
                    <select
                        name="title"
                        id="title"
                        className="p-2 border rounded w-full md:w-64"
                        value={selectedTitle}
                        onChange={(e) => setSelectedTitle(e.target.value)}
                    >
                        <option value="all">All Products</option>
                        {products.map((product) => (
                            <option key={product._id} value={product.title}>
                                {product.title}
                            </option>
                        ))}
                    </select>

                    {/* Clear Button - Only visible on md and larger screens */}
                    <button
                        onClick={handleClearFilters}
                        className="hidden md:block px-4 py-2 bg-blue-400 hover:bg-blue-500 text-white rounded transition-colors whitespace-nowrap"
                    >
                        Clear Filters
                    </button>
                </div>

                {/* Second Row - Stats and Mobile Clear Button */}
                <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4">
                    {/* Stats */}
                    <div className="flex flex-wrap justify-center gap-4 sm:gap-6 w-full sm:w-auto">
                        <div className="text-center min-w-[100px]">
                            <p className="font-semibold text-sm sm:text-base">Total Orders</p>
                            <p className="text-lg sm:text-xl">{filteredOrders.length}</p>
                        </div>
                        <div className="text-center min-w-[100px]">
                            <p className="font-semibold text-sm sm:text-base">Total Quantity</p>
                            <p className="text-lg sm:text-xl">{totalQuantity}</p>
                        </div>
                        <div className="text-center min-w-[100px]">
                            <p className="font-semibold text-sm sm:text-base">Total Amount</p>
                            <p className="text-lg sm:text-xl">{totalAmount}</p>
                        </div>
                    </div>

                    {/* Clear Button - Only visible on mobile */}
                    <button
                        onClick={handleClearFilters}
                        className="md:hidden px-4 py-2 bg-blue-400 hover:bg-blue-500 text-white rounded transition-colors w-full sm:w-auto"
                    >
                        Clear Filters
                    </button>
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