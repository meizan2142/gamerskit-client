// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import { Autoplay, Navigation, Pagination } from "swiper/modules";

const SingleProductSwiper = ({ images }) => {
    // Check if there are multiple images to decide whether to use Swiper
    const hasMultipleImages = images && images.length > 1;

    return (
        <div className="w-full lg:w-[60%] xl:w-[50%]">
            {hasMultipleImages ? (
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
                    {images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <img
                                src={image}
                                alt=""
                                className="w-full h-auto max-h-[80vh] object-contain"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <div className="w-full">
                    <img
                        src={images?.[0] || ''}
                        alt=""
                        className="w-full h-auto max-h-[80vh] object-contain"
                    />
                </div>
            )}
        </div>
    );
};

export default SingleProductSwiper;