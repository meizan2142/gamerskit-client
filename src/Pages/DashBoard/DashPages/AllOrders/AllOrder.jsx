import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Eye } from "lucide-react";
import { NavLink } from "react-router-dom";
import { CSVLink } from "react-csv";
import { RiDeleteBin5Line } from "react-icons/ri";

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

    const deleteOrder = async (orderId) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/orderdetails/${orderId}`);
            queryClient.invalidateQueries(['orders']);
        } catch (error) {
            console.error('Error deleting order:', error);
            // Add error handling (e.g., show a toast notification)
        }
    };

    const getCSVData = () => {
        return allOrders.flatMap(order => {
            return order.cartItems?.map(item => ({
                date: new Date(order.orderDate).toLocaleDateString(),
                email: order.email || '',
                name: order.name,
                mobile: order.mobile,
                title: item.title,
                size: item.size || '',
                quantity: item.quantity,
                District: order.district,
                Thana: order.thana,
                Address: order.address,
                paymentDigits: order.paymentDigits || '',
                advanceAmount: order.advanceAmount,
                remainingAmount: order.remainingAmount,
                note: order.note,
            })) || [];
        });
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
            <div className="flex justify-between">
                <h1 className="font-bold text-3xl text-center">All Orders</h1>
                {
                    allOrders.length > 0 ?
                        <div className="text-center">
                            <CSVLink
                                data={getCSVData()}
                                filename={`my_orders_${new Date().toISOString().slice(0, 10)}.csv`}
                                className="inline-flex items-center gap-2 bg-[#FFD700] hover:bg-[#FFB300] text-black font-bold py-2 px-4 rounded transition"
                                headers={[
                                    { label: "Date", key: "date" },
                                    { label: "Email", key: "email" },
                                    { label: "Name", key: "name" },
                                    { label: "Mobile", key: "mobile" },
                                    { label: "Product Title", key: "title" },
                                    { label: "Size", key: "size" },
                                    { label: "Quantity", key: "quantity" },
                                    { label: "District", key: "District" },
                                    { label: "Thana", key: "Thana" },
                                    { label: "Address", key: "Address" },
                                    { label: "Payment Digits", key: "paymentDigits" },
                                    { label: "Advance Amount", key: "advanceAmount" },
                                    { label: "Remaining Amount", key: "remainingAmount" },
                                    { label: "Note", key: "note" }
                                ]}
                            >
                                Download CSV
                            </CSVLink>
                        </div>
                        :
                        <></>
                }
            </div>

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
                                    <th className="py-3 px-6 text-left border-b">Delete</th>
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
                                            <td className="py-4 px-6 border-b text-center">{item.status}</td>
                                            <td className="py-4 px-6 border-b space-y-1">
                                                <button
                                                    onClick={() => deleteOrder(item._id)}
                                                    className="text-gray-500 hover:text-red-500"
                                                >
                                                    <RiDeleteBin5Line size={18} />
                                                </button>
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