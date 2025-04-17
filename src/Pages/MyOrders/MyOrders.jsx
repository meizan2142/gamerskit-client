import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router";

const MyOrders = () => {
    const navigate = useNavigate()
    // Fetch placed orders
    const { isLoading, error, data = [] } = useQuery({
        queryKey: ['details'],
        queryFn: async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/orderdetails`
                );
                return response.data; // Axios automatically parses JSON
            } catch (err) {
                console.error(err, "Failed to fetch cart items");
                return []; // Fallback empty array on error
            }
        },
    });


    if (isLoading) return <div className="p-6 text-white">
        <div className="w-10 h-10 animate-[spin_2s_linear_infinite] rounded-full border-4 border-dashed border-[#FFB300]"></div>
    </div>;
    if (error) return <div className="p-6 text-red-500">Error: {error.message}</div>;
    return (
        <div className="pt-20 md:pt-20 lg:pt-24 px-4 sm:px-6 md:px-10 space-y-6 md:space-y-10">
            <h1 className="font-bold text-3xl text-center">My Orders</h1>

            <div className="overflow-x-auto ">
                <table className="min-w-[90%] shadow-md  border mx-auto border-gray-100  my-6">
                    <thead>
                        <tr className="bg-[#333333] text-white">
                            <th className="py-3 px-6 text-left border-b">Serial</th>
                            <th className="py-3 px-6 text-left border-b">Date</th>
                            <th className="py-3 px-6 text-left border-b">Name</th>
                            <th className="py-3 px-6 text-left border-b">Product Name</th>
                            <th className="py-3 px-6 border-b text-end">Quantity</th>
                            <th className="py-3 px-6 border-b text-end">Advance Amount</th>
                            <th className="py-3 px-6 border-b text-end">Remaining Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr
                                key={item._id}
                                onClick={() => navigate(`/single-order-details/${item._id}`)}
                                className="hover:bg-yellow-50 transition duration-300 cursor-pointer"
                            >
                                <td className="py-4 px-6 border-b">{index + 1}</td>
                                <td className="py-4 px-6 border-b">
                                    {new Date(item.orderDate).toLocaleDateString()}
                                </td>
                                <td className="py-4 px-6 border-b">{item.name}</td>
                                <td className="py-4 px-6 border-b space-y-1">
                                    {item.cartItems.map(cartItem => (
                                        <div key={cartItem.productId}>
                                            {cartItem.title} {cartItem.size !== "N/A" ? `(${cartItem.size})` : ''}
                                        </div>
                                    ))}
                                </td>
                                <td className="py-4 px-6 border-b text-end">
                                    {item.cartItems.reduce((total, item) => total + item.quantity, 0)}
                                </td>
                                <td className="py-4 px-6 border-b text-end">৳{item.advanceAmount}</td>
                                <td className="py-4 px-6 border-b text-end">৳{item.remainingAmount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default MyOrders