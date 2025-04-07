import axios from "axios";
import { Eye, ShoppingCart } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const ProductCard = ({ product }) => {
    const handleSubmit = () => {
        axios.post(`${import.meta.env.VITE_API_URL}/cartList`, product, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (response.data.insertedId) {
                    toast.success('Added to Cart');
                    console.log('added');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                toast.error('Failed to add to cart');
            });
    }
    return (
        <div className="group w-full flex flex-col h-full rounded-lg shadow-lg bg-[#1E2B3A] relative overflow-hidden border border-[#2D3E50]">
            {/* Floating Accent */}
            <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-16 h-16 sm:w-20 sm:h-20 bg-[#FFD700] rounded-full opacity-15 -z-0" />

            {/* Image with Gradient - Removed padding and rounded corners */}
            <div className="relative overflow-hidden w-full">
                <img
                    width={400}
                    height={400}
                    className="h-[160px] sm:h-[275px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={product.img}
                    alt="Product"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121C26]/90 via-transparent to-transparent" />
            </div>

            {/* Details */}
            <div className="grid gap-1 sm:gap-2 relative z-10 mt-2 sm:mt-4 flex-grow px-4 sm:px-6">
                <h1 className="text-sm sm:text-xl font-bold text-[#F0F4F8] line-clamp-2">{product.title}</h1>
                <div className="text-sm sm:text-lg font-mono font-semibold text-[#FFD700] bg-[#253141] px-2 py-1 rounded-md inline-block mt-1 sm:mt-2">
                    Price: {product.price}৳
                </div>
            </div>

            {/* Buttons */}
            <div className="grid lg:flex xl:flex 2xl:flex gap-2 sm:gap-3 lg:gap-4 mt-2 sm:mt-4 px-4 sm:px-6 pb-4 sm:pb-6">
                <button onClick={handleSubmit} className="flex items-center justify-center gap-1 sm:gap-2 bg-[#FFD700] hover:bg-[#E5C100] text-[#1A1A1A] font-semibold px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg transition-all hover:shadow-lg text-xs sm:text-sm">
                    <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Add to Cart</span>
                </button>

                <button className="flex items-center justify-center gap-1 sm:gap-2 border-2 hover:text-[#1E2B3A] text-[#F0F4F8] border-[#FFD700] hover:bg-[#FFD700] font-semibold px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg transition-all text-xs sm:text-sm">
                    <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>View Details</span>
                </button>
            </div>
            <div>
                <Toaster />
            </div>
        </div>
    )
}

export default ProductCard