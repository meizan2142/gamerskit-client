// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import { Autoplay, Pagination } from "swiper/modules";


const SingleProduct = () => {
    return (
        <div className="min-h-screen pt-12 md:pt-24">
            {/* Flex container for large screens */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8 py-6">
                {/* Slider - takes more space on large screens */}
                <div className="w-full lg:w-[60%] xl:w-[50%]">
                    <Swiper
                        spaceBetween={30}
                        centeredSlides={true}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        navigation={true}
                        modules={[Autoplay, Pagination]}
                        className="mySwiper"
                    >
                        <SwiperSlide>
                            <img
                                src="http://res.cloudinary.com/dyqjzfdwi/image/upload/v1744090244/hykzbjr1yfst9rdpfov8.jpg"
                                alt=""
                                className="w-full h-auto max-h-[80vh] object-contain"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src="http://res.cloudinary.com/dyqjzfdwi/image/upload/v1744090261/vwz7hvuuyftui9hklwid.jpg"
                                alt=""
                                className="w-full h-auto max-h-[80vh] object-contain"
                            />
                        </SwiperSlide>
                    </Swiper>
                </div>

                {/* Product Info - takes less space on large screens */}
                <div className="w-full lg:w-[40%] xl:w-[30%]">
                    {/* Heading & Price */}
                    <div className="mb-6">
                        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[40px]">
                            G2 Prestige 2025
                        </h1>
                        <p className="text-lg sm:text-xl mt-2">€85,00 EUR</p>
                    </div>

                    {/* Available Sizes */}
                    <div className="flex flex-wrap gap-3 sm:gap-4">
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleProduct