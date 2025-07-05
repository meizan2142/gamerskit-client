import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Eye } from "lucide-react";
import { NavLink } from "react-router-dom";

const CancelledOrders = () => {

    const { isLoading, error, data: allOrders = [] } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/orderdetails`
            );
            return response.data;
        },
    });


    const cancelled = allOrders.filter(p =>
        p?.status === "cancelled"
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
        <div className="pt-2 md:pt-2 lg:pt-2 px-4 sm:px-6 md:px-10 space-y-6 md:space-y-10">
            <h1 className="font-bold text-3xl text-center">Cancelled Orders</h1>

            {cancelled.length > 0 ? (
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
                                {cancelled
                                    .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
                                    .map((item, index) => (
                                        <tr key={item._id}>
                                            <td className="py-4 px-6 border-b">{index + 1}</td>
                                            <td className="py-4 px-6 border-b">
                                                {new Date(item.orderDate).toLocaleDateString()}
                                            </td>
                                            <td className="py-4 px-6 border-b">{item.name}</td>
                                            <td className="py-4 px-6 border-b text-center">
                                                {item.cartItems.reduce((total, item) => total + item.quantity, 0)}
                                            </td>
                                            <td className="py-4 px-6 border-b text-center">৳{item.advanceAmount}</td>
                                            <td className="py-4 px-6 border-b text-center">৳{item.remainingAmount}
                                                {item.promoCode && (item.promoCode === "PCBBD10" || item.promoCode === "pcbbd10") && (
                                                    <span className="text-green-400 ml-2">(applied)</span>
                                                )}
                                            </td>
                                            <td className="py-4 px-6 border-b text-center">
                                                <NavLink to={`/single-order-details/${item._id}`} className="inline-block">
                                                    <Eye className="text-blue-500 hover:text-blue-700" />
                                                </NavLink>
                                            </td>
                                            <td className="py-4 px-6 border-b text-center">
                                                <span className="inline-block px-3 py-1 bg-red-100 text-black rounded-full text-sm">
                                                    {item.status}
                                                </span>
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
                    <p className='font-bold text-xl'>No orders have been cancelled yet.</p>
                </div>
            )}
        </div>
    );
};

export default CancelledOrders;