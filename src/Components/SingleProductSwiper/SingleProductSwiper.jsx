// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import { Autoplay, Navigation, Pagination } from "swiper/modules";

const SingleProductSwiper = ({ images }) => {
    // Filter out empty image URLs and check if we should use Swiper
    const validImages = images ? images.filter(img => img && img.trim() !== "") : [];
    const useSwiper = validImages.length > 1; // Use Swiper if 2+ valid images

    return (
        <div className="w-full pt-5 sm:pt-0 md:pt-0 lg:pt-0 xl:pt-0 2xl:pt-0 lg:w-[60%] xl:w-[50%]">
            {useSwiper ? (
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                >
                    {validImages.map((image, index) => (
                        <SwiperSlide key={index}>
                            <img
                                src={image}
                                alt={`Product view ${index + 1}`}
                                className="w-full h-auto max-h-[80vh] object-contain"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : validImages.length > 0 ? (
                <div className="w-full">
                    <img
                        src={validImages[0]}
                        alt="Product view"
                        className="w-full h-auto max-h-[80vh] object-contain"
                    />
                </div>
            ) : (
                <div className="w-full bg-gray-100 flex items-center justify-center h-64">
                    <span>No images available</span>
                </div>
            )}
        </div>
    );
};

export default SingleProductSwiper;