import { ShoppingBasket, ShoppingCart } from "lucide-react";
import Accordion from "../../Components/Accordion/Accordion";
import SingleProductSwiper from "../../Components/SingleProductSwiper/SingleProductSwiper";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";

const SingleProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [selectedSize, setSelectedSize] = useState('');
    const [isCopied, setIsCopied] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    // Load cart items from localStorage on component mount
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
    }, []);

    // Fetch product data
    const { isLoading, error, data } = useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/allProducts/${id}`
            );
            return response.data;
        }
    });

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText("01303775977");
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy!", err);
        }
    };

    const saveCartToLocalStorage = (items) => {
        localStorage.setItem('cart', JSON.stringify(items));
        setCartItems(items);
    };

    const handleAddToCart = () => {
        if (data?.sizes?.length > 0 && !selectedSize) {
            return toast.error('Please select a size');
        }

        const cartProduct = {
            productId: data._id,
            title: data.title,
            price: data.price,
            img: data.img,
            quantity: 1,
            ...(data.sizes?.length > 0 && { size: selectedSize })
        };

        const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');

        // Check if item exists
        const existingIndex = currentCart.findIndex(item =>
            item.productId === cartProduct.productId &&
            (!data.sizes || item.size === cartProduct.size)
        );

        let updatedCart;
        if (existingIndex >= 0) {
            // Update quantity if exists
            updatedCart = [...currentCart];
            updatedCart[existingIndex].quantity += 1;
        } else {
            // Add new item
            updatedCart = [...currentCart, cartProduct];
        }

        localStorage.setItem('cart', JSON.stringify(updatedCart));
        // Trigger storage event to update all components
        window.dispatchEvent(new Event('storage'));
        toast.success('Added to Cart');
    };

    const handleBuyNow = () => {
        if (data?.sizes?.length > 0 && !selectedSize) {
            return toast.error('Please select a size');
        }

        const cartProduct = {
            productId: data._id,
            title: data.title,
            price: data.price,
            img: data.img,
            quantity: 1,
            ...(data.sizes?.length > 0 && { size: selectedSize })
        };

        // Check if item is already in cart
        const isItemInCart = cartItems.some(item =>
            item.productId === data._id &&
            (!data.sizes || item.size === selectedSize)
        );

        let updatedCart;
        if (!isItemInCart) {
            updatedCart = [...cartItems, cartProduct];
            saveCartToLocalStorage(updatedCart);
        } else {
            updatedCart = [...cartItems];
        }

        // Explicitly trigger storage event to update Navbar
        window.dispatchEvent(new Event('storage'));

        navigate('/place-orders');
    };

    if (isLoading) return <div className="min-h-screen pt-24 flex justify-center">
        <div className="w-10 h-10 animate-[spin_2s_linear_infinite] rounded-full border-4 border-dashed border-[#FFB300]"></div>
    </div>;

    if (error) return <div className="min-h-screen pt-24 flex justify-center">Error: {error.message}</div>;
    if (!data) return <div className="min-h-screen pt-24 flex justify-center">Product not found</div>;

    const hasSizes = data.sizes?.length > 0;
    const isButtonDisabled = hasSizes && !selectedSize;

    return (
        <div className="min-h-screen pt-12 md:pt-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8 py-6">
                <SingleProductSwiper images={data.subImages ? [data.img, ...data.subImages] : [data.img]} />
                <div className="w-full lg:w-[40%] xl:w-[30%] space-y-8">
                    <div className="mb-6 space-y-3">
                        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[40px]">
                            {data.title}
                        </h1>
                        {
                            data?.name === "car" ?
                                <p>Price: ৳{data?.price} <span className="text-green-600 text-sm font-bold">(Free Home Delivery)</span></p>
                                :
                                <p>Price: ৳{data?.price}</p>
                        }
                        <p className="text-green-600 text-base font-semibold">
                            <strong className="font-bold text-xl text-black">Order Process:</strong><br />
                            {data?.name === "car" && "• RC Car: 500 TK each"}
                            {data?.name === "F1" && "• F1 Jersey: 100 TK each"}
                            {data?.name === "E-sports" && "• E-sports Jersey: 100 TK for each"}
                            {data?.name === "Tshirt" && "• Tshirt: 100 TK each"}
                            {data?.name === "Sleeves" && "• Hand Sleeves: No advance needed"}
                            {data?.name === "Mask" && "• Mask: No advance needed"}
                            <br />

                            {(data?.name === "car" ||
                                data?.name === "F1" ||
                                data?.name === "Tshirt" ||
                                data?.name === "E-sports") && (
                                    <>
                                        Send advance via (Bkash/Nagad) to:
                                        <span
                                            className="text-black font-bold cursor-pointer relative"
                                            onClick={handleCopy}
                                        >
                                            01303775977
                                            {isCopied && (
                                                <span className="absolute -top-8 -right-4 bg-black text-white text-xs px-2 py-1 rounded">
                                                    Copied!
                                                </span>
                                            )}
                                        </span>
                                        <br /><br />
                                    </>
                                )}

                            {(data?.name === "car" ||
                                data?.name === "F1" ||
                                data?.name === "Tshirt" ||
                                data?.name === "E-sports") && (
                                    <>
                                        Need help? Call us at the same number.
                                    </>
                                )}

                            {(data?.name === "Sleeves" ||
                                data?.name === "Mask") && (
                                    <>
                                        Need help? Call us
                                        <span
                                            className="text-black font-bold cursor-pointer relative"
                                            onClick={handleCopy}
                                        >
                                            01303775977
                                            {isCopied && (
                                                <span className="absolute -top-8 -right-4 bg-black text-white text-xs px-2 py-1 rounded">
                                                    Copied!
                                                </span>
                                            )}
                                        </span>
                                    </>
                                )}
                        </p>
                    </div>

                    {hasSizes && (
                        <div className="space-y-3">
                            <h3 className="font-semibold text-lg">Available Sizes: (Choose a size to place your order)</h3>
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
                        <Accordion data={data} />
                    </div>

                    <div className="space-y-4">
                        <button
                            onClick={handleAddToCart}
                            className={`w-full flex items-center justify-center gap-3 ${isButtonDisabled
                                ? 'bg-gray-300 cursor-not-allowed'
                                : 'bg-[#FFD700] hover:bg-[#FFB300]'
                                } text-black font-bold py-2 px-4 rounded transition`}
                            disabled={isButtonDisabled}
                        >
                            <ShoppingCart className="w-4 h-4" />
                            Add to cart
                        </button>

                        <button
                            onClick={handleBuyNow}
                            className={`w-full flex items-center justify-center gap-3 ${isButtonDisabled
                                ? 'bg-gray-300 cursor-not-allowed'
                                : 'bg-[#FFD700] hover:bg-[#FFB300]'
                                } text-black font-bold py-2 px-4 rounded transition`}
                            disabled={isButtonDisabled}
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