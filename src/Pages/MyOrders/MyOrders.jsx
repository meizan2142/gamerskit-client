import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ArrowRight, Eye, ShoppingBasket } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../useAuth/useAuth";

const MyOrders = () => {
    const { user } = useAuth();

    // Fetch current user data
    const { data: currentUser } = useQuery({
        queryKey: ['currentUser', user?.email],
        queryFn: async () => {
            if (!user?.email) return null;
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/users/${user.email}`
            );
            return response.data;
        },
        enabled: !!user?.email,
    });

    // Fetch all orders (no filtering yet)
    const { isLoading, error, data: allOrders = [] } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/orderdetails`
            );
            return response.data;
        },
    });

    // Filter orders by current user's email
    const userOrders = allOrders.filter(order =>
        order?.email === currentUser?.email
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
        <div className="pt-20 md:pt-20 lg:pt-24 px-4 sm:px-6 md:px-10 space-y-6 md:space-y-10">
            <h1 className="font-bold text-3xl text-center">My Orders</h1>

            {userOrders.length > 0 ? (
                <>
                    <div className="overflow-x-auto">
                        <table className="min-w-[90%] shadow-md border mx-auto border-gray-100 my-6">
                            <thead>
                                <tr className="bg-[#333333] text-white">
                                    <th className="py-3 px-6 text-left border-b">Serial</th>
                                    <th className="py-3 px-6 text-left border-b">Date</th>
                                    <th className="py-3 px-6 text-left border-b">Name</th>
                                    <th className="py-3 px-6 border-b text-center">Quantity</th>
                                    <th className="py-3 px-6 border-b text-center">Advance Amount</th>
                                    <th className="py-3 px-6 border-b text-center">Remaining Amount</th>
                                    <th className="py-3 px-6 text-left border-b">Status</th>
                                    <th className="py-3 px-6 text-left border-b">Check Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userOrders.map((item, index) => (
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
                                        <td className="py-4 px-6 border-b text-center">{item.status}</td>
                                        <td className="py-4 px-6 border-b space-y-1 flex items-center justify-center">
                                            <NavLink to={`/single-order-details/${item._id}`}>
                                                <Eye />
                                            </NavLink>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            ) : (
                <div className="text-center min-h-[50vh] flex flex-col justify-center space-y-5">
                    <p className='font-bold text-xl'>You haven't purchased anything yet.</p>
                    <NavLink to='/shop' className='flex justify-center'>
                        <button className="flex items-center gap-2 bg-[#FFD700] hover:bg-[#FFB300] text-black font-bold py-2 px-4 rounded transition">
                            <ShoppingBasket className="w-4 h-4" />
                            Continue Shopping
                        </button>
                    </NavLink>
                </div>
            )}
        </div>
    );
};

export default MyOrders;