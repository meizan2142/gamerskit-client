import { ShoppingBasket, ShoppingCart } from "lucide-react";
import Accordion from "../../Components/Accordion/Accordion";
import SingleProductSwiper from "../../Components/SingleProductSwiper/SingleProductSwiper";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";

const SingleProduct = () => {
    const { id } = useParams();
    const queryClient = useQueryClient();
    const [selectedSize, setSelectedSize] = useState('');

    const { isLoading, error, data } = useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/allProducts/${id}`
            );
            return response.data;
        }
    });


    // Define the mutation
    const { mutate } = useMutation({
        mutationFn: (product) =>
            axios.post(`${import.meta.env.VITE_API_URL}/cartList`, product, {
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        onMutate: async (newProduct) => {
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries({ queryKey: ['cart'] });

            // Snapshot the previous value
            const previousCart = queryClient.getQueryData(['cart']);

            // Optimistically update to the new value
            queryClient.setQueryData(['cart'], (old) => {
                return [...(old || []), { ...newProduct, _id: Date.now().toString() }];
            });

            return { previousCart };
        },
        onSuccess: (response) => {
            if (response.data.insertedId) {
                toast.success('Added to Cart');
                // Invalidate and refetch to ensure our data is fresh
                queryClient.invalidateQueries({ queryKey: ['cart'] });
            }
        },
        onError: (error, _, context) => {
            console.error('Error:', error);
            toast.error('Failed to add to cart');
            // Roll back to the previous value on error
            if (context?.previousCart) {
                queryClient.setQueryData(['cart'], context.previousCart);
            }
        }
    });

    const handleSubmit = () => {
        if (data.sizes && data.sizes.length > 0 && !selectedSize) {
            return toast.error('Please select a size');
        }

        const cartProduct = {
            productId: data._id,
            title: data.title,
            price: data.price,
            img: data.img,
            quantity: 1,
            ...(data.sizes && { size: selectedSize })
        };

        mutate(cartProduct);
    };

    if (isLoading) return <div className="min-h-screen pt-24 flex justify-center">
        <div className="w-10 h-10 animate-[spin_2s_linear_infinite] rounded-full border-4 border-dashed border-[#FFB300]"></div>
    </div>;
    if (error) return <div className="min-h-screen pt-24 flex justify-center">Error: {error.message}</div>;
    if (!data) return <div className="min-h-screen pt-24 flex justify-center">Product not found</div>;

    return (
        <div className="min-h-screen pt-12 md:pt-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8 py-6">
                <SingleProductSwiper images={data.subImages ? [data.img, ...data.subImages] : [data.img]} />

                <div className="w-full lg:w-[40%] xl:w-[30%] space-y-8">
                    <div className="mb-6 space-y-3">
                        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[40px]">
                            {data.title}
                        </h1>
                        <p className="text-lg sm:text-xl mt-2">Price: ৳{data.price}</p>
                    </div>
                    {/* Size Selection - Only show if sizes exist */}
                    {data.sizes && data.sizes.length > 0 ? (
                        <div className="space-y-3">
                            <h3 className="font-semibold text-lg">Available Sizes:</h3>
                            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-3 gap-3 sm:gap-4">
                                {data.sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`w-full px-3 py-2 rounded-lg border-2 ${selectedSize === size
                                                ? 'border-[#FFD700] bg-amber-50'
                                                : 'border-gray-300 hover:border-[#FFD700]'
                                            } hover:shadow-md transition-colors`}
                                    >
                                        <div className="flex flex-col justify-center items-center">
                                            <h1 className="text-sm sm:text-base font-bold">{size}</h1>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}

                    <div>
                        <Accordion description={data.description} />
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="w-full flex items-center justify-center gap-3 bg-[#FFD700] hover:bg-[#FFB300] text-black font-bold py-2 px-4 rounded transition">
                        <ShoppingCart className="w-4 h-4" />
                        Add to cart
                    </button>
                    <button className="w-full flex items-center justify-center gap-3 bg-[#FFD700] hover:bg-[#FFB300] text-black font-bold py-2 px-4 rounded transition">
                        <ShoppingBasket className="w-4 h-4" />
                        Buy Now
                    </button>
                </div>
            </div>
            <div>
                <Toaster />
            </div>
        </div>
    );
};

export default SingleProduct;