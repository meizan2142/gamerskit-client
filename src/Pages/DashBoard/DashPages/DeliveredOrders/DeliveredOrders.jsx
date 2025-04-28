import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Eye } from "lucide-react";
import { NavLink } from "react-router";

const DeliveredOrders = () => {
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
        <div className="overflow-x-auto">
            <h1 className="font-bold text-3xl text-center mb-8">Delivered Orders</h1>
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
                    {delivered
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
                                <td className="py-4 px-6 border-b text-center">৳{item.remainingAmount}</td>
                                <td className="py-4 px-6 border-b space-y-1">
                                    <NavLink to={`/single-order-details/${item._id}`}>
                                        <Eye />
                                    </NavLink>
                                </td>
                                <td className="py-4 px-6 border-b text-center text-xl text-green-400 rounded-full">{item.status}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default DeliveredOrders