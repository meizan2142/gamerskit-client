import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../../../../Components/loader";

const OrdersSummary = () => {
  const {
    isLoading,
    error,
    data: allOrders = [],
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/orderdetails`
      );
      return response.data;
    },
  });

  const pending = allOrders.filter((p) => p?.status === "pending");

  // Calculate product frequency and total quantity
  let totalQuantityAllProducts = 0;
  const productStats = pending.reduce((acc, order) => {
    order.cartItems.forEach((item) => {
      const productName = item.title || item.name;
      if (!acc[productName]) {
        acc[productName] = {
          name: productName,
          orderCount: 0,
          totalQuantity: 0,
          latestOrder: new Date(order.orderDate),
        };
      }
      acc[productName].orderCount += 1;
      acc[productName].totalQuantity += item.quantity;
      totalQuantityAllProducts += item.quantity;

      const currentDate = new Date(order.orderDate);
      if (currentDate > acc[productName].latestOrder) {
        acc[productName].latestOrder = currentDate;
      }
    });
    return acc;
  }, {});

  const productList = Object.values(productStats).sort(
    (a, b) => b.orderCount - a.orderCount
  );

  if (isLoading) return <Loader />;

  if (error)
    return (
      <div className="p-6 text-red-500 text-center">
        Error loading orders. Please try again later.
      </div>
    );

  return (
    <div className="pt-4 px-4 sm:px-6 md:px-10 space-y-6 md:space-y-10">
      <h1 className="font-bold text-xl md:text-3xl text-center md:text-left mb-4 md:mb-0 text-gray-800 pb-0 md:pb-5">
        Pending Orders Summary ({totalQuantityAllProducts})
      </h1>

      {pending.length > 0 ? (
        <div className="overflow-x-auto rounded-lg">
          <div className="max-h-[80vh] overflow-y-auto rounded-lg">
            <table className="min-w-full mx-auto shadow-md divide-y divide-gray-200 rounded-lg">
              <thead className="bg-gray-800 text-white sticky top-0 z-50">
                <tr>
                  <th className="py-3 px-6 text-left text-sm font-semibold">
                    Product Name
                  </th>
                  <th className="py-3 px-6 text-center text-sm font-semibold">
                    Total Quantity
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {productList.map((product, index) => (
                  <tr
                    key={index}
                    className="hover:bg-yellow-50 transition-colors duration-200">
                    <td className="py-4 px-6 font-medium text-gray-700">
                      {product.name}
                    </td>
                    <td className="py-4 px-6 text-center font-semibold text-gray-700">
                      {product.totalQuantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center min-h-[50vh] flex flex-col justify-center items-center space-y-4">
          <p className="font-bold text-xl text-gray-600">
            No pending orders found.
          </p>
        </div>
      )}
    </div>
  );
};

export default OrdersSummary;
