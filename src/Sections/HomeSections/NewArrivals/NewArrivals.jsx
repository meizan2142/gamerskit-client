import { useState, useEffect } from 'react';
import ProductCard from '../../../Components/ProductCard/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/autoplay';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Sleeves from '/src/assets/sleeves.svg';
import Mask from '/src/assets/mask.svg';
import Tshirt from '/src/assets/tshirt.svg';
import Car from '/src/assets/sedan.png';
import F1 from '/src/assets/soccer-jersey.png';
import Esports from '/src/assets/jersey.png';
import All from '/src/assets/all.png';

const tabs = [
    { 
        id: 'all', 
        label: 'All', 
        icon: <img src={All} alt="All products" className="w-6 h-6" /> 
    },
    { 
        id: 'car', 
        label: 'RC Car', 
        icon: <img src={Car} alt="Car products" className="w-6 h-6" /> 
    },
    { 
        id: 'E-sports', 
        label: 'E-Sports', 
        icon: <img src={Esports} alt="E-Sports jerseys" className="w-6 h-6" /> 
    },
    { 
        id: 'F1', 
        label: "F1 Jersey", 
        icon: <img src={F1} alt="F1 jerseys" className="w-6 h-6" /> 
    },
    { 
        id: 'Sleeves', 
        label: 'Sleeves', 
        icon: <img src={Sleeves} alt="Sleeves" className="w-6 h-6" /> 
    },
    { 
        id: 'Mask', 
        label: 'Mask', 
        icon: <img src={Mask} alt="Masks" className="w-6 h-6" /> 
    },
    { 
        id: 'Tshirt', 
        label: 'Tshirts', 
        icon: <img src={Tshirt} alt="T-shirts" className="w-6 h-6" /> 
    },
];

const NewArrivals = ({ heading }) => {
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [activeTab, setActiveTab] = useState('all');
    const [isSmallScreen, setIsSmallScreen] = useState(false);


    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 640); // Apply Swiper only if screen width is < 640px (small)
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    // Fetch cart data
    const { isLoading, error, data = [] } = useQuery({
        queryKey: ['allProduct'],
        queryFn: async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/allProducts`
                );
                return response.data; // Axios automatically parses JSON
            } catch (err) {
                console.error(err, "Failed to fetch cart items");
                return []; // Fallback empty array on error
            }
        },
    });




    if (isLoading) return <div className="min-h-screen pt-24 flex justify-center">
        <div className="w-10 h-10 animate-[spin_2s_linear_infinite] rounded-full border-4 border-dashed border-[#FFB300]"></div>
    </div>;
    if (error) return <div className="min-h-screen pt-24 flex justify-center">Error: {error.message}</div>;

    const filteredProducts = activeTab === 'all'
        ? data
        : data.filter(product => product.name === activeTab);

    return (
        <div className="space-y-3 mt-10 px-4 sm:px-6 lg:px-8">
            {/* Heading */}
            <div className="text-center space-y-5">
                <h1 className="text-black font-bold text-3xl sm:text-4xl md:text-5xl">
                    {heading}
                </h1>
            </div>

            {/* Tabs */}
            <div className='text-center'>
                {isSmallScreen ? (
                    <Swiper
                        slidesPerView="auto"
                        spaceBetween={10}
                        freeMode={true}
                        loop={true}
                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: false,
                        }}
                        modules={[Autoplay]}
                        className="pb-2 mb-6"
                    >
                        {tabs.map((tab) => (
                            <SwiperSlide key={tab.id} className="!w-[120px] flex items-center justify-center"> {/* Fixed width */}
                                <button
                                    onClick={() => setActiveTab(tab.id)}
                                    aria-label={`Filter ${tab.label} products`}
                                    className={`w-full px-3 py-2 rounded-lg transition-colors flex-shrink-0 ${activeTab === tab.id
                                        ? 'bg-[#FFD700] text-black '
                                        : 'hover:shadow-2xl '
                                        }`}
                                >
                                    <div className="flex flex-col justify-center items-center text-center gap-1">
                                        {tab.icon}
                                        <h1 className="text-sm sm:text-base font-bold">{tab.label}</h1>
                                    </div>
                                </button>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <div className="flex items-center justify-center gap-6 md:gap-8 lg:gap-10 mt-8 flex-wrap">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                aria-label={`Filter ${tab.label} products`}
                                className={`w-[120px] px-3 py-2 rounded-lg transition-colors ${activeTab === tab.id
                                    ? 'bg-[#FFD700] text-black'
                                    : 'hover:shadow-2xl'
                                    }`}
                            >
                                <div className="flex flex-col justify-center items-center text-center gap-1">
                                    {tab.icon}
                                    <h1 className="text-sm sm:text-base font-bold">{tab.label}</h1>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>


            {/* Products Grid */}
            <div 
            className="2xl:container 2xl:mx-auto 2xl:mt-10">
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-3">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={`${product.name}-${product.title}`}
                            product={product}
                            isAddingToCart={isAddingToCart}
                            setIsAddingToCart={setIsAddingToCart}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NewArrivals;
