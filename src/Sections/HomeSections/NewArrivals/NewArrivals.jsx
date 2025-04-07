import { Car, Shirt } from 'lucide-react';
import { allProducts } from './allProducts';
import { FaMaskFace } from "react-icons/fa6";
import { useState } from 'react';
import { FaExternalLinkAlt } from "react-icons/fa";
import ProductCard from '../../../Components/ProductCard/ProductCard';


const tabs = [
    { id: 'all', label: 'All', icon: <FaExternalLinkAlt /> },
    { id: 'car', label: 'Car', icon: <Car /> },
    { id: 'E-sports', label: 'E-Sports Jersey', icon: <Shirt /> },
    { id: 'F1', label: 'F1 Jersey', icon: <Shirt /> },
    { id: 'Sleeves', label: 'Hand Sleeves', icon: <Shirt /> },
    { id: 'Mask', label: 'Mask', icon: <FaMaskFace /> },
    { id: 'Tshirt', label: 'Cotton-Tshirts', icon: <Shirt /> },
];

const NewArrivals = ({ heading }) => {
    const products = allProducts();
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [activeTab, setActiveTab] = useState('all');

    const filteredProducts = activeTab === 'all'
        ? products
        : products.filter(product => product.name === activeTab);


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
                <div className='flex items-center justify-start sm:justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 overflow-x-auto pb-2 mb-6 sm:mb-8 sm:flex-wrap sm:overflow-x-visible sm:pb-0 scrollbar-hide'>
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            aria-label={`Filter ${tab.label} products`}
                            className={`flex-shrink-0 cursor-pointer px-3 py-2 rounded-lg transition-colors ${activeTab === tab.id
                                ? 'bg-[#FFD700] text-black border-2'
                                : 'hover:shadow-2xl'
                                }`}
                        >
                            <div className='flex flex-col justify-center items-center text-center gap-1'>
                                {tab.icon}
                                <h1 className="text-sm sm:text-base font-bold">{tab.label}</h1>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Products Grid */}
                <div className="2xl:container 2xl:mx-auto">
                    {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6"> */}
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
        </div>
    );
};


export default NewArrivals;