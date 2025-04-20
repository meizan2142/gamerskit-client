import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ArrowRight, ShoppingBasket } from "lucide-react";
import { NavLink } from "react-router";
import { CSVLink } from "react-csv";

const MyOrders = () => {    
    // Fetch placed orders
    const { isLoading, error, data = [] } = useQuery({
        queryKey: ['details'],
        queryFn: async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/orderdetails`
                );
                return response.data;
            } catch (err) {
                console.error(err, "Failed to fetch cart items");
                return [];
            }
        },
    });

    // Transform data for CSV export
    const getCSVData = () => {
        return data.flatMap(order => {
            return order.cartItems.map(item => ({
                date: new Date(order.orderDate).toLocaleDateString(),
                email: order.email || '',
                name: order.name,
                mobile: order.mobile,
                title: item.title,
                size: item.size || '', // Include size if available
                quantity: item.quantity,
                District: order.district,
                Thana: order.thana,
                Address: order.address,
                paymentDigits: order.paymentDigits || '',
                advanceAmount: order.advanceAmount,
                remainingAmount: order.remainingAmount
            }));
        });
    };

    if (isLoading) return <div className="p-6 text-white">
        <div className="w-10 h-10 animate-[spin_2s_linear_infinite] rounded-full border-4 border-dashed border-[#FFB300]"></div>
    </div>;
    if (error) return <div className="p-6 text-red-500">Error: {error.message}</div>;
    
    return (
        <div className="pt-20 md:pt-20 lg:pt-24 px-4 sm:px-6 md:px-10 space-y-6 md:space-y-10">
            <h1 className="font-bold text-3xl text-center">My Orders</h1>

            {data.length > 0 ? (
                <>
                    <div className="overflow-x-auto">
                        <table className="min-w-[90%] shadow-md border mx-auto border-gray-100 my-6">
                            <thead>
                                <tr className="bg-[#333333] text-white">
                                    <th className="py-3 px-6 text-left border-b">Serial</th>
                                    <th className="py-3 px-6 text-left border-b">Date</th>
                                    <th className="py-3 px-6 text-left border-b">Name</th>
                                    <th className="py-3 px-6 border-b text-end">Quantity</th>
                                    <th className="py-3 px-6 border-b text-end">Advance Amount</th>
                                    <th className="py-3 px-6 border-b text-end">Remaining Amount</th>
                                    <th className="py-3 px-6 text-left border-b">Check Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={item._id}>
                                        <td className="py-4 px-6 border-b">{index + 1}</td>
                                        <td className="py-4 px-6 border-b">
                                            {new Date(item.orderDate).toLocaleDateString()}
                                        </td>
                                        <td className="py-4 px-6 border-b">{item.name}</td>
                                        <td className="py-4 px-6 border-b text-end">
                                            {item.cartItems.reduce((total, item) => total + item.quantity, 0)}
                                        </td>
                                        <td className="py-4 px-6 border-b text-end">৳{item.advanceAmount}</td>
                                        <td className="py-4 px-6 border-b text-end">৳{item.remainingAmount}</td>
                                        <td className="py-4 px-6 border-b space-y-1">
                                            <NavLink to={`/single-order-details/${item._id}`}>
                                                <button className="px-5 gap-2 py-3 rounded-full flex items-center justify-center mx-auto lg:mx-0 xl:mx-0 2xl:mx-0 text-[10px] sm:text-base font-bold hover:bg-[#FFD700] text-white bg-[#FFB300] transition-all">
                                                    Check Details
                                                    <ArrowRight />
                                                </button>
                                            </NavLink>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="text-center">
                        <button className="grid items-center justify-center text-center gap-2 bg-[#FFD700] hover:bg-[#FFB300] text-black font-bold py-2 px-4 rounded transition">
                            <CSVLink 
                                data={getCSVData()} 
                                filename={`orders_${new Date().toISOString().slice(0, 10)}.csv`}
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
                                    { label: "Remaining Amount", key: "remainingAmount" }
                                ]}
                            >
                                Download CSV
                            </CSVLink>
                        </button>
                    </div>
                </>
            ) : (
                <div className="text-center min-h-screen space-y-5">
                    <p className='font-bold text-xl'>You haven't purchased anything yet.</p>
                    <NavLink to='/shop' className='flex flex-col items-center'>
                        <button className="flex items-center justify-center gap-2 bg-[#FFD700] hover:bg-[#FFB300] text-black font-bold py-2 px-4 rounded transition">
                            <ShoppingBasket className="w-4 h-4" />
                            Continue Shopping
                        </button>
                    </NavLink>
                </div>
            )}
        </div>
    )
}

export default MyOrders;