import { ShoppingBasket, ShoppingCart } from "lucide-react";
import Accordion from "../../Components/Accordion/Accordion";
import SingleProductSwiper from "../../Components/SingleProductSwiper/SingleProductSwiper";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

const SingleProduct = () => {
    const { productSlug } = useParams();
    const location = useLocation();
    const productId = location.state?.productId;
    const navigate = useNavigate();
    const [selectedSize, setSelectedSize] = useState('');
    const [isCopied, setIsCopied] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [selectedTab, setSelectedTab] = useState(0);

    const REACT_TABS = [
        "R36S Max Handheld Game Console"
    ]

    // Load cart items from localStorage on component mount
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
    }, []);

    useEffect(() => {
        const savedTab = localStorage.getItem('selectedTab');
        if (savedTab !== null) {
            setSelectedTab(parseInt(savedTab));
        }
    }, []);

    // Fetch product data
    const { data, isLoading, error } = useQuery({
        queryKey: ['product', productSlug],
        queryFn: async () => {
            try {
                // First try fetching by slug
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/products-by-slug/${productSlug}`
                );
                return response.data;
            } catch (error) {
                if (error.response?.status === 404 && productId) {
                    // Fallback to ID-based fetch if available
                    const fallback = await axios.get(
                        `${import.meta.env.VITE_API_URL}/addedProducts/${productId}`
                    );
                    return fallback.data;
                }
                throw error;
            }
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
        // Check if sizes exist and are available
        const hasAvailableSizes = data.sizes && Object.values(data.sizes).some(qty => {
            const quantity = typeof qty === 'string' ? parseInt(qty) : qty;
            return quantity > 0;
        });

        if (hasAvailableSizes && !selectedSize) {
            return toast.error('Please select a size');
        }

        // For R36S Max Handheld Game Console, include storage option
        const storageOption = data.title === "R36S Max Handheld Game Console"
            ? (selectedTab === 0 ? "64GB" : "128GB")
            : null;

        const price = REACT_TABS.includes(data.title)
            ? (selectedTab === 0 ? 5200 : 5700)
            : data.price;

        const cartProduct = {
            productId: data._id,
            title: data.title,
            price: price, // Use the determined price
            mainImage: data.mainImage,
            quantity: 1,
            ...(hasAvailableSizes && { size: selectedSize }),
            ...(storageOption && { storage: storageOption })
        };

        const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');

        // Check if item exists - compare productId, size, and storage
        const existingIndex = currentCart.findIndex(item =>
            item.productId === cartProduct.productId &&
            (
                (!hasAvailableSizes && !item.size) ||
                (hasAvailableSizes && item.size === cartProduct.size)
            ) &&
            (
                !storageOption ||
                (storageOption && item.storage === cartProduct.storage)
            )
        );

        let updatedCart;
        if (existingIndex >= 0) {
            updatedCart = [...currentCart];
            updatedCart[existingIndex].quantity += 1;
        } else {
            updatedCart = [...currentCart, cartProduct];
        }

        localStorage.setItem('cart', JSON.stringify(updatedCart));
        window.dispatchEvent(new Event('storage'));
        toast.success('Added to Cart');
    };

    const handleBuyNow = () => {
        // Similar modifications as handleAddToCart
        const hasAvailableSizes = data.sizes && Object.values(data.sizes).some(qty => {
            const quantity = typeof qty === 'string' ? parseInt(qty) : qty;
            return quantity > 0;
        });

        if (hasAvailableSizes && !selectedSize) {
            return toast.error('Please select a size');
        }

        const price = REACT_TABS.includes(data.title)
            ? (selectedTab === 0 ? 5200 : 5700)
            : data.price;

        const storageOption = data.title === "R36S Max Handheld Game Console"
            ? (selectedTab === 0 ? "64GB" : "128GB")
            : null;

        const cartProduct = {
            productId: data._id,
            title: data.title,
            price: price,
            mainImage: data.mainImage,
            quantity: 1,
            ...(hasAvailableSizes && { size: selectedSize }),
            ...(storageOption && { storage: storageOption })
        };

        const isItemInCart = cartItems.some(item =>
            item.productId === data._id &&
            (
                (!hasAvailableSizes && !item.size) ||
                (hasAvailableSizes && item.size === selectedSize)
            ) &&
            (
                !storageOption ||
                (storageOption && item.storage === cartProduct.storage)
            )
        );

        let updatedCart;
        if (!isItemInCart) {
            updatedCart = [...cartItems, cartProduct];
            saveCartToLocalStorage(updatedCart);
        } else {
            updatedCart = [...cartItems];
        }

        window.dispatchEvent(new Event('storage'));
        navigate('/place-orders');
    };

    if (isLoading) return <div className="min-h-screen pt-24 flex justify-center">
        <div className="w-10 h-10 animate-[spin_2s_linear_infinite] rounded-full border-4 border-dashed border-[#FFB300]"></div>
    </div>;

    if (error) return <div className="min-h-screen pt-24 flex justify-center">Error: {error.message}</div>;
    if (!data) return <div className="min-h-screen pt-24 flex justify-center">Product not found</div>;

    const hasSizes = data.sizes && Object.values(data.sizes).some(qty => {
        const quantity = typeof qty === 'string' ? parseInt(qty) : qty;
        return quantity > 0;
    });
    const isButtonDisabled = hasSizes && !selectedSize;

    const EXCLUDED_OFFER_PRICE = [
        "Nissan GTR R34 RWD (Dual battery & Gyro Stabilizer)",
        "MN99S Full Scale 4WD Climbing Defender (Black) - (Dual Battery)",
        "MN98 RC Rock Crawler Defender (Yellow) - (Dual Battery)",
        "Nissan Black Racer (Dual Battery)",
        "G2 Prestige 2025",
        "Sentinels Jersey",
        "F1 Red Bull 2024",
        "Team Liquid Hand Sleeves",
        "Fnatic Tshirt",
        "F1 SHELL 2024",
        "F1 MERCEDES 2024",
        "Fnatic Hand Sleeves",
        "Sentinels Hand Sleeves",
        "Sentinels Tshirt",
        "Team Liquid Mask",
        "Sentinels Mask",
        "G2 Mask",
        "F1 SHELL 2025",
        "M22 Playstation 128GB",
        "R36S Handheld Game Console",
        "R36S Max Handheld Game Console"
    ];

    const ANOTHER_OFFER_PRICE = [
        "Nissan GTR Skyline 4WD (White-Grey) Dual Batteries",
        "Porsche 911 Drift Car 4WD (Dual Batteries)",
        "Ford Mustang GT"
    ]

    return (
        <div className="min-h-screen pt-12 md:pt-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8 py-6">
                <SingleProductSwiper images={data.subImages ? [data.mainImage, ...data.subImages] : [data.mainImage]} />
                <div className="w-full lg:w-[40%] xl:w-[30%] space-y-8">
                    <div className="mb-6 space-y-3">
                        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[40px]">
                            {data.title}
                        </h1>
                        {
                            EXCLUDED_OFFER_PRICE.includes(data?.title) ?
                                <>
                                    {
                                        REACT_TABS.includes(data?.title) ?
                                            <>
                                                <div className="max-w-4xl mx-auto px-4 py-6">
                                                    <Tabs
                                                        selectedIndex={selectedTab}
                                                        onSelect={(index) => {
                                                            setSelectedTab(index);
                                                            localStorage.setItem('selectedTab', index.toString());
                                                        }}
                                                    >
                                                        <TabList className="flex flex-wrap gap-3 border-b border-gray-200 mb-4">
                                                            <Tab
                                                                className="px-4 py-2 text-sm font-medium text-gray-700 border border-transparent rounded-t-md cursor-pointer transition duration-200"
                                                                selectedClassName="border-b-2 border-blue-500 text-blue-600 bg-[#FFD700]"
                                                            >
                                                                64GB
                                                            </Tab>
                                                            <Tab
                                                                className="px-4 py-2 text-sm font-medium text-gray-700 border border-transparent rounded-t-md cursor-pointer transition duration-200"
                                                                selectedClassName="border-b-2 border-blue-500 text-blue-600 bg-[#FFD700]"
                                                            >
                                                                128GB
                                                            </Tab>
                                                        </TabList>

                                                        <TabPanel>
                                                            <p className="font-bold">Price: <span className="text-green-500 text-xl">৳5200</span></p>
                                                        </TabPanel>
                                                        <TabPanel>
                                                            <p className="font-bold">Price: <span className="text-green-500 text-xl">৳5700</span></p>
                                                        </TabPanel>
                                                    </Tabs>
                                                </div>
                                            </>
                                            :
                                            <>
                                                <p className="font-bold">Price: <span className="text-green-500 text-xl">৳{data?.price}</span></p>
                                            </>
                                    }
                                </>
                                :
                                <>
                                    {
                                        ANOTHER_OFFER_PRICE.includes(data?.title) ?
                                            <>
                                                {
                                                    data?.title === "Ford Mustang GT"
                                                        ?
                                                        <>
                                                            <p className="font-bold">Regular Price: <span className="text-green-500 text-xl line-through">৳ 3400</span></p>
                                                            <p className="font-bold">Offer Price: <span className="text-green-500 text-xl">৳{data?.price}</span></p>
                                                            <p className="font-bold">Saved: <span className="text-green-500 text-xl">৳ 400</span></p>
                                                        </>
                                                        :
                                                        <>
                                                            <p className="font-bold">Regular Price: <span className="text-green-500 text-xl line-through">৳ 3200</span></p>
                                                            <p className="font-bold">Offer Price: <span className="text-green-500 text-xl">৳{data?.price}</span></p>
                                                            <p className="font-bold">Saved: <span className="text-green-500 text-xl">৳ 700</span></p>
                                                        </>
                                                }
                                            </>
                                            :
                                            <>
                                                <p className="font-bold">Regular Price: <span className="text-green-500 text-xl line-through">৳ 2800</span></p>
                                                <p className="font-bold">Offer Price: <span className="text-green-500 text-xl">৳{data?.price}</span></p>
                                                <p className="font-bold">Saved: <span className="text-green-500 text-xl">৳ 500</span></p>
                                            </>
                                    }
                                </>
                        }
                        <p className="text-green-600 text-base font-semibold">
                            <strong className="font-bold text-xl text-black">Order Process:</strong><br />
                            {data?.name === "car" && "• RC Car: For order make 100 tk advance."}
                            {data?.name === "consoles" && "• Game Console: For order make 100 tk advance."}
                            {data?.name === "F1" && "• F1 Jersey: For order make 100 tk advance."}
                            {data?.name === "E-sports" && "• E-sports Jersey: For order make 100 tk advance."}
                            {data?.name === "Tshirt" && "• Tshirt: For order make 100 tk advance."}
                            {data?.name === "Sleeves" && "• Hand Sleeves: No advance needed"}
                            {data?.name === "Mask" && "• Mask: No advance needed"}
                            <br />

                            {(data?.name === "car" ||
                                data?.name === "F1" ||
                                data?.name === "Tshirt" ||
                                data?.name === "E-sports") && (
                                    <>
                                        Send money via (Bkash/Nagad) to:
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
                                {Object.entries(data.sizes || {})
                                    // eslint-disable-next-line no-unused-vars
                                    .filter(([size, quantity]) => {
                                        // Convert quantity to number and check if it's greater than 0
                                        const qty = typeof quantity === 'string' ? parseInt(quantity) : quantity;
                                        return qty > 0;
                                    })
                                    .map(([size]) => (
                                        <button
                                            key={size}
                                            onClick={() => {
                                                setSelectedSize(size);
                                            }}
                                            className={`w-full px-3 py-2 rounded-lg border-2 ${selectedSize === size
                                                ? 'bg-[#FFD700] border-[#FFD700]'
                                                : 'border-gray-300 hover:border-[#FFD700]'
                                                } hover:shadow-md transition-colors`}
                                        >
                                            <div className="flex flex-col justify-center items-center">
                                                <h1 className="text-sm sm:text-base font-bold">{size.toUpperCase()}</h1>
                                            </div>
                                        </button>
                                    ))}
                            </div>
                        </div>
                    )}

                    <div>
                        <Accordion data={data} selectedTab={selectedTab} />
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