import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../../useAuth/useAuth";
import Swal from "sweetalert2";
import { useState } from "react";
import Loader from "../../Components/loader";

const SingleOrderDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [deletingId, setDeletingId] = useState(null);

  const { isLoading, error, data } = useQuery({
    queryKey: ["orderDetails", id],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/orderdetails/${id}`);
      return response.data;
    },
  });

  const handleDeleteClick = async (orderId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        setDeletingId(orderId);
        await axios.delete(`${import.meta.env.VITE_API_URL}/orderdetails/${orderId}`);
        await queryClient.invalidateQueries(["orders"]);
        await Swal.fire("Deleted!", "Your order has been deleted.", "success");
        setTimeout(() => navigate(-1), 500);
      } catch (error) {
        console.error("Error deleting order:", error);
        await Swal.fire("Error!", "Failed to delete the order.", "error");
      } finally {
        setDeletingId(null);
      }
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <div className="p-6 text-red-500 text-center">Error: {error.message}</div>;

  return (
    <div className="pt-20 px-4 sm:px-6 md:px-10 space-y-6 md:space-y-10 min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gray-800 p-6 text-white space-y-2">
          <h1 className="text-2xl font-bold">Order #{data?._id}</h1>
          <p>Order Placed: {new Date(data?.orderDate).toLocaleString('en-US', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          }).replace(',', '')}</p>
          {data?.updatedAt && data.status === "delivered" && (
            <p className="text-green-400">Rider picked up the parcel on {new Date(data.updatedAt).toLocaleString()}</p>
          )}
        </div>

        {/* Status & Actions */}
        <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center border-b gap-4">
          <div>
            <h2 className="text-lg font-semibold">Order Status</h2>
            <span
              className={`inline-block px-3 py-1 rounded-full font-medium capitalize ${data.status === "delivered"
                ? "bg-green-100 text-green-800"
                : data.status === "pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : data.status === "cancelled"
                    ? "bg-red-100 text-red-800"
                    : data.status === "returned"
                      ? "bg-purple-100 text-purple-800"
                      : "bg-gray-100 text-gray-800"
                }`}
            >
              {data.status}
            </span>
          </div>
          {user?.email === "gamerskit3859@gmail.com" && (
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleDeleteClick(data._id)}
                className="flex items-center gap-1 text-gray-500 hover:text-red-500"
                disabled={deletingId === data._id}
              >
                {deletingId === data._id ? "Deleting..." : <RiDeleteBin5Line size={18} />}
              </button>
            </div>
          )}
        </div>

        {/* Customer Info */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 border-b">
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <h2 className="text-lg font-semibold">Customer Information</h2>
            <p><span className="font-bold">Name:</span> {data.name}</p>
            {data.email && <p><span className="font-bold">Email:</span> {data.email}</p>}
            <p><span className="font-bold">Mobile:</span> {data.mobile}</p>
            <p><span className="font-bold">Address:</span> {data.address}</p>
            <p><span className="font-bold">District:</span> {data.district}</p>
            <p><span className="font-bold">Thana:</span> {data.thana}</p>
            <p><span className="font-bold">Last Digits:</span> {data.paymentDigits}</p>
            {data.note && <p><span className="font-bold">Note:</span> {data.note}</p>}
          </div>
        </div>

        {/* Order Items */}
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold mb-4">Order Items</h2>
          <div className="space-y-4">
            {data?.cartItems?.length > 0 ? (
              data.cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b pb-4 last:border-b-0"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.productImg || item.mainImage}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="space-y-1">
                      <h3 className="font-medium">
                        {item.title}
                        <span
                          className={
                            item?.tabColor === "Red"
                              ? "text-red-500"
                              : item?.tabColor === "Black"
                                ? "text-yellow-600"
                                : item?.tabColor === "Blue"
                                  ? "text-blue-500"
                                  : "text-green-500"
                          }
                        >
                          {item?.tabColor && ` - (${item.tabColor})`}
                        </span>
                      </h3>
                      {item.size && (
                        <p className="text-gray-500 text-sm">
                          Size: {{ "s": "S", "m": "M", "l": "L", "xl": "XL", "xxl": "XXL", "xxxl": "3XL", "xxxxl": "4XL" }[item.size] || item.size}
                        </p>
                      )}
                      <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
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

        {/* Order Summary */}
        <div className="p-6 bg-gray-50">
          <div className="max-w-md ml-auto space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>৳{data.totalPrice}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery Charge</span>
              <span>{data.deliveryCharge === 0 ? <span className="text-green-500">Free Delivery</span> : <span>৳{data?.deliveryCharge}</span>}</span>
            </div>
            {data?.size === "xxxxl" && (
              <div className="flex justify-between">
                <span className="text-gray-600">Extra For 4XL Size</span>
                <span>৳{data.extra4XLCharge}</span>
              </div>
            )}
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
  );
};

export default SingleOrderDetails;
