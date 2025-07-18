import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { allLocation } from "../OrderForm/locations";

const UpdateOrderDetails = () => {
    const { id } = useParams();
    const queryClient = useQueryClient();
    const locations = allLocation();
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [advanceAmount, setAdvanceAmount] = useState(0);
    const navigate = useNavigate()

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

    const updateOrderMutation = useMutation({
        mutationFn: (updatedOrder) =>
            axios.put(`${import.meta.env.VITE_API_URL}/orderdetails/${id}`, updatedOrder),
        onSuccess: () => {
            queryClient.invalidateQueries(['orderDetails', id]);
            alert('Order updated successfully!');
            navigate(-1);
        },
        onError: (error) => {
            console.error('Error updating order:', error);
            alert('Failed to update order');
        }
    });

    useEffect(() => {
        if (data) {
            // Set all form values from fetched data
            reset({
                email: data.email,
                name: data.name,
                mobile: data.mobile,
                district: data.district,
                thana: data.thana,
                address: data.address,
                advanceAmount: data.advanceAmount,
                paymentDigits: data.paymentDigits,
                note: data.note
            });

            // Set district and thana states
            setSelectedDistrict(data.district);
            setAdvanceAmount(data.advanceAmount || 0);
        }
    }, [data, reset]);

    const onSubmit = (formData) => {
        // Calculate remaining amount
        const remainingAmount = data.totalPrice - formData.advanceAmount;

        const updatedOrder = {
            ...formData,
            totalPrice: data.totalPrice,
            remainingAmount: remainingAmount,
            cartItems: data.cartItems,
            deliveryCharge: data.deliveryCharge,
            extra4XLCharge: data.extra4XLCharge
        };

        updateOrderMutation.mutate(updatedOrder);
    };

    // Get thanas for selected district
    const getThanas = () => {
        if (!selectedDistrict) return [];
        const districtData = locations.find(loc => loc.district === selectedDistrict);
        return districtData ? districtData.thana : [];
    };

    const thanas = getThanas();
    const totalPrice = data?.totalPrice || 0;

    if (isLoading) return (
        <div className="p-6 text-white flex flex-col items-center">
            <div className="w-10 h-10 animate-[spin_2s_linear_infinite] rounded-full border-4 border-dashed border-[#FFB300]"></div>
        </div>
    );

    if (error) return <div className="p-6 text-red-500">Error: {error.message}</div>;

    return (
        <div className="pt-20 md:pt-20 lg:pt-24 px-4 sm:px-6 md:px-10 space-y-6 md:space-y-10 min-h-screen">
            <form onSubmit={handleSubmit(onSubmit)} className="container flex flex-col mx-auto space-y-8 md:space-y-12">
                <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-6 rounded-md shadow-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4 col-span-full">
                        {/* Email and Name */}
                        <div className="col-span-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Email */}
                            <div className="w-full">
                                <label htmlFor="email" className="text-sm sm:text-base font-bold">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    className="w-full rounded-md border border-black text-black p-2 sm:p-3 outline-none"
                                    {...register("email")}
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                            </div>

                            <div className="w-full">
                                <label htmlFor="name" className="text-sm sm:text-base font-bold">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Recipient Name"
                                    className="w-full rounded-md border border-black text-black p-2 sm:p-3 outline-none"
                                    {...register("name", {
                                        required: "Name is required",
                                        minLength: {
                                            value: 3,
                                            message: "Name must be at least 3 characters"
                                        }
                                    })}
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                            </div>
                        </div>

                        {/* Mobile Number */}
                        <div className="col-span-full sm:col-span-3">
                            <label htmlFor="mobile" className="text-sm sm:text-base font-bold">Mobile Number</label>
                            <input
                                id="mobile"
                                type="tel"
                                placeholder="Your mobile number"
                                className="w-full rounded-md border-black text-black p-2 sm:p-3 outline"
                                {...register("mobile", {
                                    required: "Mobile number is required",
                                    pattern: {
                                        value: /^[0-9]{11}$/,
                                        message: "Please enter a valid phone number with 11 Digit!"
                                    }
                                })}
                            />
                            {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile.message}</p>}
                        </div>

                        {/* District and Thana */}
                        <div className="col-span-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* District */}
                            <div className="w-full">
                                <label htmlFor="district" className="text-sm sm:text-base font-bold">District</label>
                                <select
                                    id="district"
                                    className="w-full rounded-md border border-black text-black p-2 sm:p-3 outline-none"
                                    {...register("district", { required: "District is required" })}
                                    value={selectedDistrict}
                                    onChange={(e) => {
                                        setSelectedDistrict(e.target.value);
                                        setValue("thana", "");
                                    }}
                                >
                                    <option value="">Select a district</option>
                                    {locations.map((location) => (
                                        <option key={location.district} value={location.district}>
                                            {location.district}
                                        </option>
                                    ))}
                                </select>
                                {errors.district && <p className="text-red-500 text-xs mt-1">{errors.district.message}</p>}
                            </div>

                            {/* Thana */}
                            <div className="w-full">
                                <label htmlFor="thana" className="text-sm sm:text-base font-bold">Thana</label>
                                <select
                                    id="thana"
                                    className="w-full rounded-md border border-black text-black p-2 sm:p-3 outline-none disabled:opacity-70 disabled:cursor-not-allowed"
                                    disabled={!selectedDistrict}
                                    {...register("thana", { required: "Thana is required" })}
                                >
                                    <option value="">Select a thana</option>
                                    {thanas.map((thana, index) => (
                                        <option key={index} value={thana}>
                                            {thana}
                                        </option>
                                    ))}
                                </select>
                                {errors.thana && <p className="text-red-500 text-xs mt-1">{errors.thana.message}</p>}
                            </div>
                        </div>

                        {/* Address */}
                        <div className="col-span-full">
                            <label htmlFor="address" className="text-sm sm:text-base font-bold">Address</label>
                            <input
                                id="address"
                                type="text"
                                placeholder="Type Address"
                                className="w-full rounded-md border-black text-black p-2 sm:p-3 outline"
                                {...register("address", {
                                    required: "Address is required",
                                    minLength: {
                                        value: 10,
                                        message: "Address must be at least 10 characters"
                                    }
                                })}
                            />
                            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
                        </div>

                        {/* Payment details */}
                        <div className="col-span-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Advance amount */}
                            <div className="w-full">
                                <label htmlFor="advanceAmount" className="text-sm sm:text-sm font-bold text-black">
                                    Advance
                                </label>
                                <input
                                    id="advanceAmount"
                                    type="number"
                                    placeholder="Type Advance Amount"
                                    className="w-full rounded-md border border-black text-black p-2 sm:p-3 outline-none"
                                    {...register("advanceAmount", {
                                        min: 0,
                                        max: {
                                            value: totalPrice,
                                            message: "Advance can't exceed total price"
                                        }
                                    })}
                                    value={advanceAmount}
                                    onChange={(e) => {
                                        const value = Number(e.target.value);
                                        setAdvanceAmount(value);
                                    }}
                                />
                                {errors.advanceAmount && <p className="text-red-500 text-xs mt-1">{errors.advanceAmount.message}</p>}
                            </div>

                            {/* Bkash/Nagad digits */}
                            <div className="w-full">
                                <label htmlFor="paymentDigits" className="text-sm sm:text-base font-bold">Last 4 digits of (Bkash/Nagad) number</label>
                                <input
                                    id="paymentDigits"
                                    type="text"
                                    placeholder="Type last 4 digits"
                                    className="w-full rounded-md border border-black text-black p-2 sm:p-3 outline-none"
                                    {...register("paymentDigits", {
                                        required: "Payment digits are required",
                                        pattern: {
                                            value: /^[0-9]{4}$/,
                                            message: "Please enter exactly 4 digits"
                                        }
                                    })}
                                />
                                {errors.paymentDigits && <p className="text-red-500 text-xs mt-1">{errors.paymentDigits.message}</p>}
                            </div>
                        </div>

                        {/* Note */}
                        <div className="col-span-full">
                            <label htmlFor="note" className="text-sm sm:text-base font-bold">Note</label>
                            <input
                                id="note"
                                type="text"
                                placeholder="Type Note"
                                className="w-full rounded-md border-black text-black p-2 sm:p-3 outline"
                                {...register("note")}
                            />
                        </div>
                    </div>
                </fieldset>

                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                    disabled={updateOrderMutation.isLoading}
                >
                    {updateOrderMutation.isLoading ? 'Updating...' : 'Update Order'}
                </button>
            </form>
        </div>
    );
};

export default UpdateOrderDetails;