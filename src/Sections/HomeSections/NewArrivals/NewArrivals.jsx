import NissanImage from '/src/assets/Nissan.png';
import Custom from '/src/assets/Custom.png';
const NewArrivals = ({heading, description}) => {
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

            {/* Cards */}
            <div className="2xl:container 2xl:mx-auto">
                {/* Parent Div of cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
                    {/* Single Card */}
                    <div className="w-full space-y-4 rounded-lg bg-white p-6 shadow-lg dark:bg-[#1A1A1A]">
                        {/* Product Image */}
                        <div className="overflow-hidden rounded-lg">
                            <img
                                width={400}
                                height={400}
                                className="h-[275px] w-full rounded-lg object-cover bg-[#F4F4F5] transition-transform duration-300 ease-in-out hover:scale-110"
                                src={NissanImage}
                                alt="jersey image"
                            />
                        </div>

                        {/* Product Details */}
                        <div className="grid gap-2">
                            <h1 className="text-lg font-semibold text-black dark:text-white">Product Name</h1>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                This is a brief description of the product. It highlights the key features and benefits.
                            </p>
                            <div className="text-lg font-semibold text-[#FFB300]">$99.99</div> {/* Yellow for price */}
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4">
                            {/* Primary Button (Yellow) */}
                            <button className="rounded-lg bg-[#FFD700] px-4 py-2 text-xs sm:text-sm font-semibold text-black duration-300 hover:bg-[#FFB300] hover:shadow-md">
                                Add to Cart
                            </button>

                            {/* Secondary Button (Outline) */}
                            <button className="rounded-md border border-black px-4 py-2 text-xs sm:text-sm font-semibold text-black duration-300 hover:bg-black hover:text-white dark:border-[#FFD700] dark:text-[#FFD700] dark:hover:bg-[#FFD700] dark:hover:text-black">
                                View Details
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewArrivals