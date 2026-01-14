import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Eye } from "lucide-react";
import { NavLink } from "react-router-dom";
import Loader from "../../../../Components/loader";

const DeliveredOrders = () => {
  const {
    isLoading,
    error,
    data: allOrders = [],
  } = useQuery({
    queryKey: ["delivered"],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/orderdetails`
      );
      return response.data;
    },
  });

  const delivered = allOrders.filter((d) => d?.status === "delivered");

  if (isLoading) return <Loader />;

  if (error)
    return (
      <div className="p-6 text-red-500 text-center">
        Error loading orders. Please try again later.
      </div>
    );

  return (
    <div className="pt-4 sm:px-6 md:px-10 space-y-6 md:space-y-10">
      <h1 className="font-bold text-xl md:text-3xl text-center text-gray-800">
        Delivered Orders
      </h1>

      {delivered.length === 0 ? (
        <div className="text-center min-h-[50vh] flex flex-col justify-center items-center space-y-3">
          <p className="font-bold text-xl text-gray-500">
            No delivered orders found.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg">
          <div className="max-h-[80vh] overflow-y-auto rounded-lg">
            <table className="min-w-full shadow-md divide-y divide-gray-200 rounded-lg">
              <thead className="bg-gray-800 text-white sticky top-0 z-50">
                <tr>
                  <th className="py-3 px-6 text-left text-sm font-semibold">
                    #
                  </th>
                  <th className="py-3 px-6 text-left text-sm font-semibold">
                    Date
                  </th>
                  <th className="py-3 px-6 text-left text-sm font-semibold">
                    Name
                  </th>
                  <th className="py-3 px-6 text-center text-sm font-semibold">
                    Quantity
                  </th>
                  <th className="py-3 px-6 text-center text-sm font-semibold">
                    Advance
                  </th>
                  <th className="py-3 px-6 text-center text-sm font-semibold">
                    Remaining
                  </th>
                  <th className="py-3 px-6 text-center text-sm font-semibold">
                    Total
                  </th>
                  <th className="py-3 px-6 text-center text-sm font-semibold">
                    Details
                  </th>
                  <th className="py-3 px-6 text-center text-sm font-semibold">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {delivered
                  .sort((a, b) => new Date(b.orderDate) - new Date(a.updatedAt))
                  .map((item, index) => (
                    <tr
                      key={item._id}
                      className="hover:bg-yellow-50 transition-colors duration-200">
                      <td className="py-4 px-6 text-gray-700">{index + 1}</td>
                      <td className="py-4 px-6 text-gray-700">
                        {new Date(item.updatedAt || item.orderDate).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6 text-gray-700">{item.name}</td>
                      <td className="py-4 px-6 text-center text-gray-700">
                        {item.cartItems.reduce(
                          (total, i) => total + i.quantity,
                          0
                        )}
                      </td>
                      <td className="py-4 px-6 text-center text-gray-700">
                        ৳{item.advanceAmount}
                      </td>
                      <td className="py-4 px-6 text-center text-gray-700">
                        ৳{item.remainingAmount}
                      </td>
                      <td className="py-4 px-6 text-center font-medium text-gray-700">
                        ৳{item.advanceAmount + item.remainingAmount}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <NavLink
                          to={`/single-order-details/${item._id}`}
                          className="inline-block">
                          <Eye className="text-blue-500 hover:text-blue-700" />
                        </NavLink>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveredOrders;
