import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { CircleChevronUp, Eye } from "lucide-react";
import { NavLink } from "react-router-dom";
import Status from "../../../../Components/Status/Status";

const AllOrder = () => {
    const queryClient = useQueryClient();

    const { isLoading, error, data: allOrders = [] } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/orderdetails`
            );
            return response.data;
        },
    });


    const updateOrderStatus = async (orderId, newStatus) => {
        const updatedAt = new Date().toLocaleString('en-US', {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        }).replace(',', '');

        try {
            await axios.patch(`${import.meta.env.VITE_API_URL}/orderdetails/${orderId}`, {
                status: newStatus,
                updatedAt: updatedAt
            });
            queryClient.invalidateQueries(['orders']);
        } catch (error) {
            console.error('Error updating order status:', error);
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
        <div className="pt-2 md:pt-2 lg:pt-2 px-4 sm:px-6 md:px-10 space-y-6 md:space-y-10">
            <h1 className="font-bold text-3xl text-center">All Orders</h1>

            {allOrders.length > 0 ? (
                <>
                    <div className="overflow-x-auto">
                        <table className="min-w-[90%] shadow-md border mx-auto border-gray-100 my-2">
                            <thead>
                                <tr className="bg-[#333333] text-white">
                                    <th className="py-3 px-6 text-left border-b">Serial</th>
                                    <th className="py-3 px-6 text-left border-b">Date</th>
                                    <th className="py-3 px-6 text-left border-b">Name</th>
                                    <th className="py-3 px-6 border-b text-center">Quantity</th>
                                    <th className="py-3 px-6 border-b text-center">Advance Amount</th>
                                    <th className="py-3 px-6 border-b text-center">Remaining Amount</th>
                                    <th className="py-3 px-6 text-left border-b">Check Details</th>
                                    <th className="py-3 px-6 text-left border-b">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allOrders
                                    .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
                                    .map((item, index) => (
                                        <tr key={item._id}>
                                            <td className="py-4 px-6 border-b">{index + 1}</td>
                                            <td className="py-4 px-6 border-b">
                                                {new Date(item.orderDate).toLocaleDateString()}
                                            </td>
                                            <td className="py-4 px-6 border-b">
                                                <div className="flex items-center">
                                                    {item.name}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 border-b text-center">
                                                {item.cartItems.reduce((total, item) => total + item.quantity, 0)}
                                            </td>
                                            <td className="py-4 px-6 border-b text-center">৳{item.advanceAmount}</td>
                                            <td className="py-4 px-6 border-b text-center">৳{item.remainingAmount}</td>
                                            <td className="py-4 px-6 border-b text-center">
                                                <NavLink to={`/single-order-details/${item._id}`} className="inline-block">
                                                    <Eye className="text-blue-500 hover:text-blue-700" />
                                                </NavLink>
                                            </td>
                                            <td className="py-4 px-6 border-b text-center">
                                                <Status item={item} onStatusChange={updateOrderStatus} />
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </>
            ) : (
                <div className="text-center min-h-[50vh] flex flex-col justify-center space-y-5">
                    <p className='font-bold text-xl'>No orders have been placed yet.</p>
                </div>
            )}
        </div>
    );
};

export default AllOrder;