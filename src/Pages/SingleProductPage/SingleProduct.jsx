import { ShoppingBasket, ShoppingCart } from "lucide-react";
import Accordion from "../../Components/Accordion/Accordion";
import SingleProductSwiper from "../../Components/SingleProductSwiper/SingleProductSwiper";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const SingleProduct = () => {
    const { id } = useParams();
    
    const { isLoading, error, data } = useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/allProducts/${id}`
            );
            return response.data;
        }
    });

    if (isLoading) return <div className="min-h-screen pt-24 flex justify-center">Loading...</div>;
    if (error) return <div className="min-h-screen pt-24 flex justify-center">Error: {error.message}</div>;
    if (!data) return <div className="min-h-screen pt-24 flex justify-center">Product not found</div>;

    return (
        <div className="min-h-screen pt-12 md:pt-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8 py-6">
                <SingleProductSwiper images={[data.img]} />
                
                <div className="w-full lg:w-[40%] xl:w-[30%] space-y-8">
                    <div className="mb-6 space-y-3">
                        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[40px]">
                            {data.title}
                        </h1>
                        <p className="text-lg sm:text-xl mt-2">Price: {data.price}৳</p>
                    </div>

                    {/* Size Selection - Only show if sizes exist */}
                    {data.sizes && data.sizes.length > 0 ? (
                        <div className="space-y-3">
                            <h3 className="font-semibold text-lg">Available Sizes:</h3>
                            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-3 gap-3 sm:gap-4">
                                {data.sizes.map((size) => (
                                    <button
                                        key={size}
                                        className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 hover:border-[#FFD700] hover:shadow-md transition-colors"
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

                    <button className="w-full flex items-center justify-center gap-3 bg-[#FFD700] hover:bg-[#FFB300] text-black font-bold py-2 px-4 rounded transition">
                        <ShoppingCart className="w-4 h-4" />
                        Add to cart
                    </button>
                    <button className="w-full flex items-center justify-center gap-3 bg-[#FFD700] hover:bg-[#FFB300] text-black font-bold py-2 px-4 rounded transition">
                        <ShoppingBasket className="w-4 h-4" />
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;