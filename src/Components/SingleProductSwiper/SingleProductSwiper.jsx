// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import { Autoplay, Navigation, Pagination } from "swiper/modules";

const SingleProductSwiper = () => {
    return (
        <div className="w-full lg:w-[60%] xl:w-[50%]">
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                slidesPerView={1}  // Important for loop to work properly
                loop={true}        // You already had this
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                modules={[Autoplay, Pagination, Navigation]} // Added Navigation module
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
                <SwiperSlide>
                    <img
                        src="http://res.cloudinary.com/dyqjzfdwi/image/upload/v1744090261/vwz7hvuuyftui9hklwid.jpg"
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
    )
}

export default SingleProductSwiper