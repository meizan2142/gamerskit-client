import SingleProductSwiper from "../../Components/SingleProductSwiper/SingleProductSwiper"

const SingleProduct = () => {
    return (
        <div className="min-h-screen pt-12 md:pt-24">
            {/* Flex container for large screens */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8 py-6">
                {/* Slider - takes more space on large screens */}
                <SingleProductSwiper />
                {/* Product Info - takes less space on large screens */}
                <div className="w-full lg:w-[40%] xl:w-[30%]">
                    {/* Heading & Price */}
                    <div className="mb-6">
                        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[40px]">
                            G2 Prestige 2025
                        </h1>
                        <p className="text-lg sm:text-xl mt-2">650৳</p>
                    </div>

                    {/* Available Sizes */}
                    <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-3 gap-3 sm:gap-4">
                        <button
                            className={`w-full sm:w-[120px] px-3 py-2 rounded-lg transition-colors hover:shadow-2xl border-2`}
                        >
                            <div className="flex flex-col justify-center items-center text-center gap-1">
                                <h1 className="text-sm sm:text-base font-bold">S</h1>
                            </div>
                        </button>
                        <button
                            className={`w-full sm:w-[120px] px-3 py-2 rounded-lg transition-colors hover:shadow-2xl border-2`}
                        >
                            <div className="flex flex-col justify-center items-center text-center gap-1">
                                <h1 className="text-sm sm:text-base font-bold">M</h1>
                            </div>
                        </button>
                        <button
                            className={`w-full sm:w-[120px] px-3 py-2 rounded-lg transition-colors hover:shadow-2xl border-2`}
                        >
                            <div className="flex flex-col justify-center items-center text-center gap-1">
                                <h1 className="text-sm sm:text-base font-bold">L</h1>
                            </div>
                        </button>
                        <button
                            className={`w-full sm:w-[120px] px-3 py-2 rounded-lg transition-colors hover:shadow-2xl border-2`}
                        >
                            <div className="flex flex-col justify-center items-center text-center gap-1">
                                <h1 className="text-sm sm:text-base font-bold">XL</h1>
                            </div>
                        </button>
                        <button
                            className={`w-full sm:w-[120px] px-3 py-2 rounded-lg transition-colors hover:shadow-2xl border-2`}
                        >
                            <div className="flex flex-col justify-center items-center text-center gap-1">
                                <h1 className="text-sm sm:text-base font-bold">XXL</h1>
                            </div>
                        </button>
                        <button
                            className={`w-full sm:w-[120px] px-3 py-2 rounded-lg transition-colors hover:shadow-2xl border-2`}
                        >
                            <div className="flex flex-col justify-center items-center text-center gap-1">
                                <h1 className="text-sm sm:text-base font-bold">3XL</h1>
                            </div>
                        </button>
                        <button
                            className={`w-full sm:w-[120px] px-3 py-2 rounded-lg transition-colors hover:shadow-2xl border-2`}
                        >
                            <div className="flex flex-col justify-center items-center text-center gap-1">
                                <h1 className="text-sm sm:text-base font-bold">4XL</h1>
                            </div>
                        </button>
                    </div>
                    {/* Size Customization */}
                </div>
            </div>
        </div>
    )
}

export default SingleProduct