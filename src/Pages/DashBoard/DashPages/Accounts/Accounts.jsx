import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Account = () => {
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
    }, [searchParams]);

    // Update URL params when filters change
    useEffect(() => {
        const params = new URLSearchParams();

        if (startDate) params.set('startDate', startDate.toISOString());
        if (endDate) params.set('endDate', endDate.toISOString());
        if (selectedTitle && selectedTitle !== "all") params.set('title', selectedTitle);

        setSearchParams(params, { replace: true });
    }, [startDate, endDate, selectedTitle, setSearchParams]);

    // Clear all filters
    const handleClearFilters = () => {
        setStartDate(null);
        setEndDate(null);
        setSelectedTitle("all");
        setSearchParams(new URLSearchParams(), { replace: true });
    };

    const { isLoading: isLoadingOrders, error: ordersError, data: allOrders = [] } = useQuery({
        queryKey: ['delivered'],
        queryFn: async () => {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/orderdetails`
            );
            return response.data;
        },
    });

    const { isLoading: isLoadingProducts, error: productsError, data: products = [] } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/addedProducts`
            );
            return response.data;
        },
    });

    const { unitsSold, unitSales } = useMemo(() => {
        // 1. Only delivered orders
        const deliveredOrders = allOrders.filter(
            order => order?.status === "delivered"
        );

        // 2. Apply date filter
        const dateFilteredOrders = deliveredOrders.filter(order => {
            const orderDate = new Date(order.updatedAt);
            if (startDate && orderDate < startDate) return false;
            if (endDate && orderDate > endDate) return false;
            return true;
        });

        let unitsSold = 0;
        let totalSales = 0;
        let unitSales = 0;

        dateFilteredOrders.forEach(order => {
            // Check if order contains the selected product
            const orderHasSelectedProduct =
                selectedTitle === "all" ||
                order.cartItems.some(item => item.title === selectedTitle);

            if (!orderHasSelectedProduct) return;

            // Total sales (order-based)
            totalSales += order.advanceAmount + order.remainingAmount;

            // Units sold and unit sales
            order.cartItems.forEach(item => {
                if (selectedTitle === "all" || item.title === selectedTitle) {
                    unitsSold += item.quantity;
                    // Calculate unit sales: quantity * price
                    unitSales += item.quantity * item.price;
                }
            });
        });

        return { unitsSold, totalSales, unitSales };
    }, [allOrders, startDate, endDate, selectedTitle]);




    const isLoading = isLoadingOrders || isLoadingProducts;
    const error = ordersError || productsError;



    if (isLoading) return (
        <div className="flex justify-center items-center min-h-[50vh]">
            <div className="w-10 h-10 animate-spin rounded-full border-4 border-dashed border-[#FFB300]"></div>
        </div>
    );

    if (error) return (
        <div className="p-6 text-red-500 text-center">
            Error loading data: {error.message}
        </div>
    );

    return (
        <div className="overflow-x-auto p-4">
            <div className="space-y-4">
                <h1 className="font-bold text-3xl text-center mb-5">Accounts</h1>
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

                    {/* Clear Button */}
                    <button
                        onClick={handleClearFilters}
                        className="hidden md:block px-4 py-2 bg-blue-400 hover:bg-blue-500 text-white rounded transition-colors whitespace-nowrap"
                    >
                        Clear Filters
                    </button>
                </div>

                {/* Mobile Clear Button */}
                <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4">
                    <button
                        onClick={handleClearFilters}
                        className="md:hidden px-4 py-2 bg-blue-400 hover:bg-blue-500 text-white rounded transition-colors w-full sm:w-auto"
                    >
                        Clear Filters
                    </button>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-3 bg-gray-50 rounded">
                            <h3 className="font-semibold text-gray-600">Units Sold</h3>
                            <p className="text-xl font-bold">{unitsSold}</p>
                        </div>

                        <div className="p-3 bg-gray-50 rounded">
                            <h3 className="font-semibold text-gray-600">Total Sales</h3>
                            <p className="text-xl font-bold">{unitSales}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Account  