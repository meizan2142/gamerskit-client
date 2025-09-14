import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Eye } from "lucide-react";
import { NavLink } from "react-router-dom";
import Status from "../../../../Components/Status/Status";
import Loader from "../../../../Components/loader";

const AllOrder = () => {
  const queryClient = useQueryClient();

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

  const updateOrderStatus = async (orderId, newStatus) => {
    const updatedAt = new Date()
      .toLocaleString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })
      .replace(",", "");

    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/orderdetails/${orderId}`,
        {
          status: newStatus,
          updatedAt: updatedAt,
        }
      );
      queryClient.invalidateQueries(["orders"]);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  if (isLoading) return <Loader />;

  if (error)
    return (
      <div className="p-6 text-red-500 text-center">
        Error loading orders. Please try again later.
      </div>
    );

  return (
    <div className="sm:px-6 md:px-10 space-y-6 md:space-y-10">
      <h1 className="font-bold text-xl md:text-3xl text-center text-gray-800">
        All Orders
      </h1>

      {allOrders.length > 0 ? (
        <div className="overflow-x-auto rounded-lg">
          <div className="max-h-[90vh] md:max-h-[80vh] overflow-y-auto rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-800 text-white sticky top-0 z-50">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-semibold">
                    #
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">
                    Date
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">
                    Name
                  </th>
                  <th className="py-3 px-4 text-center text-sm font-semibold">
                    Qty
                  </th>
                  <th className="py-3 px-4 text-center text-sm font-semibold">
                    Advance
                  </th>
                  <th className="py-3 px-4 text-center text-sm font-semibold">
                    Remaining
                  </th>
                  <th className="py-3 px-4 text-center text-sm font-semibold">
                    Details
                  </th>
                  <th className="py-3 px-4 text-center text-sm font-semibold">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {allOrders
                  .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
                  .map((item, index) => (
                    <tr
                      key={item._id}
                      className="hover:bg-yellow-50 transition-colors">
                      <td className="py-3 px-4 text-sm text-gray-700">
                        {index + 1}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-700">
                        {new Date(item.orderDate).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-700">
                        {item.name}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-700 text-center">
                        {item.cartItems.reduce(
                          (total, item) => total + item.quantity,
                          0
                        )}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-700 text-center">
                        ৳{item.advanceAmount}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-700 text-center">
                        ৳{item.remainingAmount}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <NavLink to={`/single-order-details/${item._id}`}>
                          <Eye className=" w-5 h-5 mx-auto" />
                        </NavLink>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <Status
                          item={item}
                          onStatusChange={updateOrderStatus}
                        />
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
            No orders have been placed yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default AllOrder;
