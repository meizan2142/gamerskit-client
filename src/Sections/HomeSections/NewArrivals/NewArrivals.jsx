import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { Car, Eye, Heart, Shirt, ShoppingCart } from 'lucide-react';
import { allProducts } from './allProducts';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

const NewArrivals = ({ heading, description }) => {
    const products = allProducts();

    // Categorize products
    const jerseyProducts = products.filter(product =>
        product.title.toLowerCase().includes('jersey') ||
        product.title.toLowerCase().includes('kit')
    );

    const carProducts = products.filter(product =>
        product.title.toLowerCase().includes('car') ||
        product.title.toLowerCase().includes('gtr') ||
        product.title.toLowerCase().includes('porsche')
    );


    return (
        <div className="space-y-10 mt-24 px-4 sm:px-6 lg:px-8">
            {/* Heading */}
            <div className="text-center space-y-5">
                <h1 className="text-black font-bold text-3xl sm:text-4xl md:text-5xl">
                    {heading}
                </h1>
                <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto px-4">
                    {description}
                </p>
            </div>

            {/* All Tabs */}
            <div className='text-center'>
                <Tabs>
                    <TabList className='flex items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 flex-wrap'>
                        <Tab className="cursor-pointer px-3 py-2 rounded-lg hover:bg-gray-hover:bg-gray-800 transition-colors">
                            <div className='grid justify-center items-center text-center gap-1'>
                                <Shirt className="w-5 h-5 sm:w-6 sm:h-6 mx-auto" />
                                <h1 className="text-sm sm:text-base">Jersey</h1>
                            </div>
                        </Tab>
                        <Tab className="cursor-pointer px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                            <div className='grid justify-center items-center text-center gap-1'>
                                <Car className="w-5 h-5 sm:w-6 sm:h-6 mx-auto" />
                                <h1 className="text-sm sm:text-base">Car</h1>
                            </div>
                        </Tab>
                    </TabList>

                    <TabPanel>
                        <div className="2xl:container 2xl:mx-auto mt-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
                                {jerseyProducts.map((product, index) => (
                                    <ProductCard key={index} product={product} />
                                ))}
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="2xl:container 2xl:mx-auto mt-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
                                {carProducts.map((product, index) => (
                                    <ProductCard key={index} product={product} />
                                ))}
                            </div>
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
};

// Extracted ProductCard component for reusability
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
        <div className="group w-full flex flex-col h-full rounded-lg p-6 shadow-lg bg-[#1A1A1A] relative overflow-hidden border border-white/10">
            {/* Floating Accent */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#FFD700] rounded-full opacity-10 -z-0" />

            {/* Image with Gradient */}
            <div className="relative overflow-hidden rounded-lg flex-grow-0">
                <img
                    width={400}
                    height={400}
                    className="h-[275px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={product.img}
                    alt="Product"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                {/* "New" Badge */}
                <div className="absolute top-4 left-4 text-white px-3 py-1 font-bold">
                    <div className=' w-8 h-8'>
                        <Heart />
                    </div>
                </div>
            </div>

            {/* Details */}
            <div className="grid gap-2 relative z-10 mt-4 flex-grow">
                <h1 className="text-xl font-bold text-white">{product.title}</h1>   
                <div className="text-lg font-mono font-semibold text-[#FFB300] bg-[#0F172A]/80 px-2 py-1 rounded-md inline-block mt-2">
                    Price: {product.price}BDT
                </div>
            </div>

            {/* Buttons - Now properly aligned at the bottom */}
            <div className="flex gap-2 sm:gap-3 lg:gap-4 mt-3 sm:mt-4 lg:mt-5">
                {/* Add to Cart Button */}
                <button onClick={handleSubmit} className="flex-1 flex items-center justify-center gap-1 sm:gap-2 lg:gap-2 bg-[#FFD700] hover:bg-[#FFB300] text-black font-semibold px-2 sm:px-3 lg:px-4 py-2 sm:py-3 lg:py-3 rounded-lg transition-all hover:shadow-lg text-xs sm:text-sm lg:text-[10px] xl:text-[12px]">
                    <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 lg:w-4 lg:h-4" />
                    <span>Add to Cart</span>
                </button>

                {/* Quick View Button */}
                <button className="flex-1 flex items-center justify-center gap-1 sm:gap-2 lg:gap-2 border-2 hover:text-black text-white border-[#FFD700] hover:bg-[#FFD700] font-semibold px-2 sm:px-3 lg:px-4 py-2 sm:py-3 lg:py-3 rounded-lg transition-all text-xs sm:text-sm lg:text-[10px] xl:text-[12px]">
                    <Eye className="w-3 h-3 sm:w-4 sm:h-4 lg:w-4 lg:h-4" />
                    <span>View Details</span>
                </button>
            </div>
            <div>
                <Toaster />
            </div>
        </div>
    );
};

export default NewArrivals;