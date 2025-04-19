import { ShoppingBasket, ShoppingCart } from "lucide-react";
import Accordion from "../../Components/Accordion/Accordion";
import SingleProductSwiper from "../../Components/SingleProductSwiper/SingleProductSwiper";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";

const SingleProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [selectedSize, setSelectedSize] = useState('');
    const [isBuyNowClicked, setIsBuyNowClicked] = useState(false);


    const { isLoading, error, data } = useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/allProducts/${id}`
            );
            return response.data;
        }
    });

    const { mutate } = useMutation({
        mutationFn: (product) =>
            axios.post(`${import.meta.env.VITE_API_URL}/cartList`, product, {
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        onSuccess: (response) => {
            if (response.data.insertedId) {
                toast.success('Added to Cart');
                queryClient.invalidateQueries({ queryKey: ['cart'] });

                // Only redirect if Buy Now was clicked (for no-size products)
                if (isBuyNowClicked) {
                    navigate('/place-orders');
                    setIsBuyNowClicked(false);
                }
            }
        },
        onError: (error, _, context) => {
            console.error('Error:', error);
            toast.error('Failed to add to cart');
            if (context?.previousCart) {
                queryClient.setQueryData(['cart'], context.previousCart);
            }
            setIsBuyNowClicked(false);
        }
    });

    const handleSubmit = () => {
        // Only validate size if the product has sizes defined
        if (data.sizes && data.sizes.length > 0 && !selectedSize) {
            return toast.error('Please select a size');
        }

        const cartProduct = {
            productId: data._id,
            title: data.title,
            price: data.price,
            img: data.img,
            quantity: 1,
            ...(data.sizes && data.sizes.length > 0 && { size: selectedSize }) // Only include size if product has sizes
        };

        mutate(cartProduct, {
            onError: (error) => {
                toast.error('Failed to add to cart');
                console.log(error);
            }
        });
    };

    if (isLoading) return <div className="min-h-screen pt-24 flex justify-center">
        <div className="w-10 h-10 animate-[spin_2s_linear_infinite] rounded-full border-4 border-dashed border-[#FFB300]"></div>
    </div>;
    if (error) return <div className="min-h-screen pt-24 flex justify-center">Error: {error.message}</div>;
    if (!data) return <div className="min-h-screen pt-24 flex justify-center">Product not found</div>;

    // Check if product has sizes
    const hasSizes = data.sizes && data.sizes.length > 0;

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
                    {/* Only show size selection if product has sizes */}
                    {hasSizes && (
                        <div className="space-y-3">
                            <h3 className="font-semibold text-lg">Available Sizes:</h3>
                            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-3 gap-3 sm:gap-4">
                                {data.sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`w-full px-3 py-2 rounded-lg border-2 ${selectedSize === size
                                            ? 'bg-[#FFD700] border-[#FFD700]'
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
                    )}

                    <div>
                        <Accordion description={data.description} />
                    </div>

                    <div className="space-y-4">
                        {/* Show Add to Cart only if product has sizes */}
                        {hasSizes && (
                            <button
                                onClick={handleSubmit}
                                className="w-full flex items-center justify-center gap-3 bg-[#FFD700] hover:bg-[#FFB300] text-black font-bold py-2 px-4 rounded transition"
                            >
                                <ShoppingCart className="w-4 h-4" />
                                Add to cart
                            </button>
                        )}

                        {/* Buy Now button */}
                        <button
                            onClick={() => {
                                if (!hasSizes) {
                                    // For products without sizes: add to cart then redirect
                                    const cartProduct = {
                                        productId: data._id,
                                        title: data.title,
                                        price: data.price,
                                        img: data.img,
                                        quantity: 1,
                                    };
                                    setIsBuyNowClicked(true);
                                    mutate(cartProduct);
                                } else {
                                    // For products with sizes: just redirect to checkout
                                    navigate('/place-orders');
                                }
                            }}
                            className={`w-full flex items-center justify-center gap-3 ${(hasSizes && !selectedSize) ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#FFD700] hover:bg-[#FFB300]'
                                } text-black font-bold py-2 px-4 rounded transition`}
                            disabled={hasSizes && !selectedSize}
                        >
                            <ShoppingBasket className="w-4 h-4" />
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <Toaster />
            </div>
        </div>
    );
};

export default SingleProduct;