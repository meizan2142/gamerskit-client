import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Eye } from "lucide-react";
import { CSVLink } from "react-csv";
import { NavLink } from "react-router";
import Loader from "../../../../Components/loader";

const PendingOrders = () => {
  const { isLoading, error, data: allOrders = [] } = useQuery({
    queryKey: ["pending"],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/orderdetails`
      );
      return response.data;
    },
  });

  const pending = allOrders.filter((p) => p?.status === "pending");

  const getCSVData = () =>
    pending.flatMap((order) =>
      order.cartItems?.map((item) => ({
        date: new Date(order.orderDate).toLocaleDateString(),
        email: order.email || "",
        name: order.name,
        mobile: order.mobile,
        title: item.title,
        size: item.size || "",
        quantity: item.quantity,
        District: order.district,
        Thana: order.thana,
        Address: order.address,
        paymentDigits: order.paymentDigits || "",
        advanceAmount: order.advanceAmount,
        remainingAmount: order.remainingAmount,
        note: order.note,
      })) || []
    );

  if (isLoading) return <Loader />;

  if (error)
    return (
      <div className="p-6 text-red-500 text-center">
        Error loading orders. Please try again later.
      </div>
    );

  return (
    <div className="sm:px-6 md:px-10 space-y-6 md:space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <h1 className="font-bold text-xl md:text-3xl text-center md:text-left mb-4 md:mb-0 text-gray-800">
          Pending Orders
        </h1>

        {pending.length > 0 && (
          <CSVLink
            data={getCSVData()}
            filename={`pending_orders_${new Date().toISOString().slice(0, 10)}.csv`}
            className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded transition"
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
              { label: "Last Digits", key: "paymentDigits" },
              { label: "Advance Amount", key: "advanceAmount" },
              { label: "Remaining Amount", key: "remainingAmount" },
              { label: "Note", key: "note" },
            ]}
          >
            Download CSV
          </CSVLink>
        )}
      </div>

      {pending.length === 0 ? (
        <div className="text-center min-h-[50vh] flex flex-col justify-center items-center space-y-4">
          <p className="font-bold text-xl text-gray-600">
            No pending orders available at the moment.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg">
          <div className="max-h-[90vh] md:max-h-[80vh] overflow-y-auto rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 shadow-md rounded-lg">
              <thead className="bg-gray-800 text-white sticky top-0 z-50">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-semibold">#</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">Date</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">Name</th>
                  <th className="py-3 px-4 text-center text-sm font-semibold">Qty</th>
                  <th className="py-3 px-4 text-center text-sm font-semibold">Advance</th>
                  <th className="py-3 px-4 text-center text-sm font-semibold">Remaining</th>
                  <th className="py-3 px-4 text-center text-sm font-semibold">Details</th>
                  <th className="py-3 px-4 text-center text-sm font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pending
                  .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
                  .map((item, index) => (
                    <tr key={item._id} className="hover:bg-yellow-50 transition-colors">
                      <td className="py-3 px-4 text-sm text-gray-700">{index + 1}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">
                        {new Date(item.orderDate).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-700">{item.name}</td>
                      <td className="py-3 px-4 text-sm text-gray-700 text-center">
                        {item.cartItems.reduce((total, i) => total + i.quantity, 0)}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-700 text-center">
                        ৳{item.advanceAmount}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-700 text-center">
                        ৳{item.remainingAmount}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <NavLink to={`/single-order-details/${item._id}`}>
                          <Eye className="w-5 h-5 mx-auto text-blue-500 hover:text-blue-700" />
                        </NavLink>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-block px-3 py-1 bg-yellow-100 text-black rounded-full text-sm">
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

export default PendingOrders;
