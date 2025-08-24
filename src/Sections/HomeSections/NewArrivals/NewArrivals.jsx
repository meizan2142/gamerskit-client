import { useState, useEffect } from "react";
import ProductCard from "../../../Components/ProductCard/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Sleeves from "/src/assets/sleeves.svg";
import Mask from "/src/assets/mask.svg";
import Tshirt from "/src/assets/tshirt.svg";
import Car from "/src/assets/sedan.png";
import F1 from "/src/assets/soccer-jersey.png";
import Esports from "/src/assets/jersey.png";
import All from "/src/assets/all.png";
import game from "/src/assets/gameController.png";

const tabs = [
  {
    id: "all",
    label: "All",
    icon: <img src={All} alt="All products" className="w-6 h-6" />,
  },
  {
    id: "car",
    label: "RC Car",
    icon: <img src={Car} alt="Car products" className="w-6 h-6" />,
  },
  {
    id: "consoles",
    label: "Consoles",
    icon: <img src={game} alt="Game Console" className="w-6 h-6" />,
  },
  {
    id: "E-sports",
    label: "E-Sports",
    icon: <img src={Esports} alt="E-Sports jerseys" className="w-6 h-6" />,
  },
  {
    id: "F1",
    label: "F1 Jersey",
    icon: <img src={F1} alt="F1 jerseys" className="w-6 h-6" />,
  },
  {
    id: "Sleeves",
    label: "Sleeves",
    icon: <img src={Sleeves} alt="Sleeves" className="w-6 h-6" />,
  },
  {
    id: "Mask",
    label: "Mask",
    icon: <img src={Mask} alt="Masks" className="w-6 h-6" />,
  },
  {
    id: "Tshirt",
    label: "Tshirts",
    icon: <img src={Tshirt} alt="T-shirts" className="w-6 h-6" />,
  },
];

// Skeleton Card
const SkeletonCard = () => (
  <div className="animate-pulse flex flex-col rounded-lg bg-white overflow-hidden">
    <div className="bg-gray-100 h-48 w-full"></div>
    <div className="p-3 flex flex-col space-y-2">
      <div className="h-4 bg-gray-100 rounded w-3/4"></div>
      <div className="h-4 bg-gray-100 rounded w-1/2"></div>
      <div className="mt-auto flex gap-2">
        <div className="h-8 bg-gray-100 rounded w-1/2"></div>
        <div className="h-8 bg-gray-100 rounded w-1/2"></div>
      </div>
    </div>
  </div>
);

const NewArrivals = ({ heading }) => {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch products
  const {
    isLoading,
    error,
    data = [],
  } = useQuery({
    queryKey: ["allProduct"],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/addedProducts`
      );
      return response.data;
    },
  });

  const filteredProducts =
    activeTab === "all"
      ? [...data].sort((a, b) => b.price - a.price)
      : data.filter((product) => product.name === activeTab);

  const displayedProducts = showAll
    ? filteredProducts
    : filteredProducts.slice(0, 14);

  return (
    <div className="space-y-3 my-10 px-4 sm:px-6 lg:px-8 relative">
      {/* Heading */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
          {heading}
        </h1>
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-600">
          subheading
        </p>
      </div>

      {/* Tabs */}
      <div className="text-center">
        {isSmallScreen ? (
          <Swiper
            slidesPerView={3.5}
            spaceBetween={12}
            freeMode
            loop
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            modules={[Autoplay]}
            className="pb-2 mb-6">
            {tabs.map((tab) => (
              <SwiperSlide
                key={tab.id}
                className="flex items-center justify-center">
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full aspect-square px-3 py-2 rounded-xl border transition-all flex-shrink-0 ${
                    activeTab === tab.id
                      ? "bg-[#FFD700] text-black border-[#E6C200]"
                      : "bg-white hover:bg-gray-50 hover:shadow-md border-gray-200"
                  }`}>
                  <div className="flex flex-col justify-center items-center gap-1">
                    <span className="text-lg">{tab.icon}</span>
                    <span className="text-xs sm:text-sm font-semibold truncate">
                      {tab.label}
                    </span>
                  </div>
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="flex items-center justify-center gap-4 md:gap-6 lg:gap-8 mt-6 flex-wrap cursor-pointer">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-[110px] aspect-square px-3 py-2 rounded-xl border transition-all ${
                  activeTab === tab.id
                    ? "bg-[#FFD700] text-black border-[#E6C200]"
                    : "bg-white hover:bg-gray-50 border-gray-200"
                }`}>
                <div className="flex flex-col justify-center items-center gap-1">
                  <span className="text-lg">{tab.icon}</span>
                  <span className="text-xs sm:text-sm font-semibold truncate">
                    {tab.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Products Grid */}
      <div className="2xl:container 2xl:mx-auto 2xl:mt-10 relative">
        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-5 gap-3">
          {isLoading
            ? Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)
            : displayedProducts.map((product) => (
                <ProductCard
                  key={`${product.name}-${product.title}`}
                  product={product}
                  isAddingToCart={isAddingToCart}
                  setIsAddingToCart={setIsAddingToCart}
                />
              ))}
        </div>

        {/* Blur Effect */}
        {!showAll && filteredProducts.length > 8 && (
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#F1EFEC] to-transparent pointer-events-none"></div>
        )}
      </div>

      {/* See All Button */}
      {!showAll && filteredProducts.length > 8 && (
        <div className="text-center mt-6 py-3 md:py-8">
          <button
            onClick={() => setShowAll(true)}
            className="px-6 py-2 rounded-lg bg-[#FFD700] hover:bg-[#e6c200] text-black font-semibold text-sm">
            See All...
          </button>
        </div>
      )}

      {error && (
        <div className="text-center text-red-500 font-medium mt-6">
          Failed to load products. Please try again.
        </div>
      )}
    </div>
  );
};

export default NewArrivals;
