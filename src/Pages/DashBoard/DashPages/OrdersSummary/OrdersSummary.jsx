import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../../../../Components/loader";

const OrdersSummary = () => {
    const { isLoading, error, data: allOrders = [] } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/orderdetails`
            );
            return response.data;
        },
    });

    const pending = allOrders.filter(p => p?.status === "pending");

    // Calculate product frequency and total quantity
    let totalQuantityAllProducts = 0;
    const productStats = pending.reduce((acc, order) => {
        order.cartItems.forEach(item => {
            const productName = item.title || item.name;
            if (!acc[productName]) {
                acc[productName] = {
                    name: productName,
                    orderCount: 0,
                    totalQuantity: 0,
                    latestOrder: new Date(order.orderDate)
                };
            }
            acc[productName].orderCount += 1;
            acc[productName].totalQuantity += item.quantity;
            totalQuantityAllProducts += item.quantity; // Add to the total sum
            // Update latest order date if this one is newer
            const currentDate = new Date(order.orderDate);
            if (currentDate > acc[productName].latestOrder) {
                acc[productName].latestOrder = currentDate;
            }
        });
        return acc;
    }, {});

    const productList = Object.values(productStats)
        .sort((a, b) => b.orderCount - a.orderCount);

     if (isLoading) return (
        <Loader/>
    );

    if (error) return (
        <div className="p-6 text-red-500 text-center">
            Error loading orders. Please try again later.
        </div>
    );

    return (
        <div className="pt-2 md:pt-2 lg:pt-2 px-4 sm:px-6 md:px-10 space-y-6 md:space-y-10">
            <h1 className="font-bold text-3xl text-center">Pending Orders Summary ({totalQuantityAllProducts})</h1>
            {pending.length > 0 ? (
                <>

                    {/* Product Frequency Table */}
                    <div className="mb-8">
                        <div className="overflow-x-auto">
                            <table className="min-w-[90%] shadow-md border mx-auto border-gray-100 my-2">
                                <thead>
                                    <tr className="bg-[#333333] text-white">
                                        <th className="py-3 px-6 border-b">Product Name</th>
                                        <th className="py-3 px-6 border-b">Total Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productList.map((product, index) => (
                                        <tr key={index}>
                                            <td className="py-4 px-6 border-b font-bold">{product.name}</td>
                                            <td className="py-4 px-6 border-b font-bold">{product.totalQuantity}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            ) : (
                <div className="text-center min-h-[50vh] flex flex-col justify-center space-y-5">
                    <p className='font-bold text-xl'>No pending orders found.</p>
                </div>
            )}
        </div>
    );
};

export default OrdersSummary;