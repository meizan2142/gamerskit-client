import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Eye } from "lucide-react";
import { NavLink } from "react-router-dom";
import Loader from "../../../../Components/loader";

const DeliveredOrders = () => {
  const { isLoading, error, data: allOrders = [] } = useQuery({
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
    <div className="overflow-x-auto p-4">
      <h1 className="font-bold text-3xl text-center mb-6">
        Delivered Orders
      </h1>

      {delivered.length === 0 ? (
        <div className="text-center min-h-[50vh] flex flex-col justify-center space-y-3">
          <p className="font-bold text-xl text-gray-500">
            No delivered orders found.
          </p>
        </div>
      ) : (
        <table className="min-w-full shadow-md border border-gray-200 rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-6 border-b">#</th>
              <th className="py-3 px-6 border-b text-left">Date</th>
              <th className="py-3 px-6 border-b text-left">Name</th>
              <th className="py-3 px-6 border-b text-center">Quantity</th>
              <th className="py-3 px-6 border-b text-center">Advance</th>
              <th className="py-3 px-6 border-b text-center">Remaining</th>
              <th className="py-3 px-6 border-b text-center">Total</th>
              <th className="py-3 px-6 border-b text-center">Details</th>
              <th className="py-3 px-6 border-b text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {delivered
              .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
              .map((item, index) => (
                <tr
                  key={item._id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="py-4 px-6 border-b">{index + 1}</td>
                  <td className="py-4 px-6 border-b">
                    {new Date(item.orderDate).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6 border-b">{item.name}</td>
                  <td className="py-4 px-6 border-b text-center">
                    {item.cartItems.reduce(
                      (total, item) => total + item.quantity,
                      0
                    )}
                  </td>
                  <td className="py-4 px-6 border-b text-center">
                    ৳{item.advanceAmount}
                  </td>
                  <td className="py-4 px-6 border-b text-center">
                    ৳{item.remainingAmount}
                  </td>
                  <td className="py-4 px-6 border-b text-center font-medium">
                    ৳{item.advanceAmount + item.remainingAmount}
                  </td>
                  <td className="py-4 px-6 border-b text-center">
                    <NavLink
                      to={`/single-order-details/${item._id}`}
                      className="inline-block"
                    >
                      <Eye className="text-blue-500 hover:text-blue-700" />
                    </NavLink>
                  </td>
                  <td className="py-4 px-6 border-b text-center">
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DeliveredOrders;
