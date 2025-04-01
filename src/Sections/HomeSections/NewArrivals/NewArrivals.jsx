import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import NissanImage from '/src/assets/Nissan.png';
import { Car, Eye, Shirt, ShoppingCart } from 'lucide-react';
const NewArrivals = ({ heading, description }) => {
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
                    <TabList className='flex items-center justify-center gap-10'>
                        <Tab>
                            <div className='grid justify-center items-center text-center'>
                                <h1>Jersey</h1>
                                <Shirt />
                            </div>
                        </Tab>
                        <Tab>
                            <div>
                                <h1>Car</h1>
                                <Car />
                            </div>
                        </Tab>
                    </TabList>

                    <TabPanel>
                        <h2>Any content 1</h2>
                    </TabPanel>
                    <TabPanel>
                        <h2>Any content 2</h2>
                    </TabPanel>
                </Tabs>
            </div>

            {/* Cards */}
            <div className="2xl:container 2xl:mx-auto">
                {/* Parent Div of cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
                    {/* Single Card */}
                    <div className="group w-full space-y-4 rounded-lg bg-white p-6 shadow-lg dark:bg-[#1A1A1A] relative overflow-hidden border border-black/10 dark:border-white/10">
                        {/* Floating Accent */}
                        <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#FFD700] rounded-full opacity-10 -z-0" />

                        {/* Image with Gradient */}
                        <div className="relative overflow-hidden rounded-lg">
                            <img
                                width={400}
                                height={400}
                                className="h-[275px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                src={NissanImage}
                                alt="Product"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                            {/* "New" Badge */}
                            <div className="absolute top-4 left-4 bg-[#0F172A] text-[#FFD700] px-3 py-1 rounded-full text-xs font-bold">
                                NEW
                            </div>
                        </div>

                        {/* Details */}
                        <div className="grid gap-2 relative z-10">
                            <h1 className="text-xl font-bold text-black dark:text-white">Nissan GTR Skyline 4WD</h1>
                            <p className="text-sm text-gray-600 dark:text-gray-300 h-0 group-hover:h-16 overflow-hidden transition-all duration-300">
                                This description appears on hover. Highlight key features here.
                            </p>
                            <div className="text-lg font-mono font-semibold text-[#FFB300] bg-[#0F172A]/80 px-2 py-1 rounded-md inline-block">
                                $99.99
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4">
                            <button className="flex-1 flex items-center justify-center gap-2 bg-[#FFD700] hover:bg-[#FFB300] text-black font-semibold px-4 py-3 rounded-lg transition-all hover:shadow-lg">
                                <ShoppingCart className="w-4 h-4" />
                                <span>Add to Cart</span>
                            </button>
                            <button className="flex-1  flex items-center justify-center gap-2 border-2  hover:text-black text-white dark:border-[#FFD700] dark:hover:bg-[#FFD700]   font-semibold px-4 py-3 rounded-lg transition-all">
                                <Eye className="w-4 h-4 " />
                                <span>Quick View</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewArrivals