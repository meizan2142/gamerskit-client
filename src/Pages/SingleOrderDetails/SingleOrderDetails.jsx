import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router";

const SingleOrderDetails = () => {
    const { id } = useParams();

    const { isLoading, error, data } = useQuery({
        queryKey: ['orderDetails', id],
        queryFn: async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/orderdetails/${id}`
                );
                return response.data;
            } catch (err) {
                console.error(err, "Failed to fetch order details");
                throw err;
            }
        },
    });
    if (isLoading) return <div className="p-6 text-white flex flex-col items-center">
        <div className="w-10 h-10 animate-[spin_2s_linear_infinite] rounded-full border-4 border-dashed border-[#FFB300]"></div>
    </div>;
    if (error) return <div className="p-6 text-red-500">Error: {error.message}</div>;

    // Format date to be more readable
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    console.log(data);
    

    return (
        <div className="pt-20 md:pt-20 lg:pt-24 px-4 sm:px-6 md:px-10 space-y-6 md:space-y-10 min-h-screen">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Order Header */}
                <div className="bg-[#1A1A1A] p-6 text-white space-y-2">
                    <h1 className="text-2xl font-bold">Order #{data?._id}</h1>
                    <p className="text-blue-100">
                        Placed on {formatDate(data.orderDate)}
                    </p>
                </div>

                {/* Order Status */}
                <div className="p-6 border-b">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                        <div>
                            <h2 className="text-lg font-semibold">Order Status</h2>
                            <p className={`text-${data.status === 'delivered' ? 'green' :
                                data.status === 'pending' ? 'yellow' :
                                    data.status === 'cancelled' ? 'red' :
                                        data.status === 'returned' ? 'purple' :
                                            'gray'
                                }-600 font-medium capitalize`}>
                                {data.status}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                        <h2 className="text-lg font-semibold mb-3">Your Information</h2>
                        <p className="text-gray-700"><span className="font-bold">Name:</span> {data.name}</p>
                        <p className="text-gray-700"><span className="font-bold">Email:</span> {data.email}</p>
                        <p className="text-gray-700"><span className="font-bold">Mobile:</span> {data.mobile}</p>
                        <p className="text-gray-700"><span className="font-bold">Address:</span> {data.address}</p>
                        <p className="text-gray-700"><span className="font-bold">District:</span> {data.district}</p>
                        <p className="text-gray-700"><span className="font-bold">Thana:</span> {data.thana}</p>
                        <p className="text-gray-700"><span className="font-bold">Last Digits:</span> {data.paymentDigits}</p>
                        <p className="text-gray-700"><span className="font-bold">Note:</span> {data.note}</p>
                    </div>
                </div>

                <div className="p-6">
                    {/* Order Items */}
                    <div className="p-6">
                        <h2 className="text-lg font-semibold mb-4">Order Items</h2>
                        <div className="space-y-4">
                            {data?.cartItems?.length > 0 ? (
                                data.cartItems.map((item, index) => (
                                    <div key={index} className="flex justify-between items-center border-b pb-4">
                                        <div className="flex items-center space-x-4 spy">
                                            <img
                                                src={item.mainImage}
                                                alt={item.title}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                            <div className="space-y-2">
                                                <h3 className="font-medium">{item.title}</h3>
                                                {
                                                    item?.size === "N/A" ?
                                                        <></>
                                                        :
                                                        <p className="text-gray-500 text-sm">Size: {item.size}</p>
                                                }
                                                <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                                                {/* <p className="text-gray-500 text-sm">Qty: {item}</p> */}
                                            </div>
                                        </div>
                                        <p className="font-medium">৳{item.price * item.quantity}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">No items found in this order</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Order Total */}
                <div className="p-6 bg-gray-50">
                    <div className="max-w-md ml-auto space-y-2">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Subtotal</span>
                            <span>৳{data.totalPrice}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Delivery Charge</span>
                            <span>৳{data.deliveryCharge}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Advance</span>
                            <span>৳{data.advanceAmount}</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
                            <span>Remaining Amount</span>
                            <span>৳{data.remainingAmount}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleOrderDetails