// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { Autoplay, Navigation, Pagination, Thumbs } from "swiper/modules";
import { useState } from "react";

const SingleProductSwiper = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const validImages = images
    ? images.filter((img) => img && img.trim() !== "")
    : [];
  if (validImages.length === 0) {
    return (
      <div className="w-full bg-gray-100 flex items-center justify-center h-64">
        <span>No images available</span>
      </div>
    );
  }

  return (
    <div className="w-full lg:w-[60%] xl:w-[50%]">
      {/* Main Swiper */}
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Autoplay, Pagination, Thumbs]}
        className="overflow-hidden rounded-2xl">
        {validImages.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`Product view ${index + 1}`}
              className="w-full h-auto max-h-[80vh] object-contain rounded-2xl"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail Swiper */}
      {validImages.length > 1 && (
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={15}
          slidesPerView={validImages.length > 3 ? 3 : validImages.length}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[Thumbs]}
          className="mt-4">
          {validImages.map((image, index) => (
            <SwiperSlide
              key={index}
              className="cursor-pointer rounded-md overflow-hidden">
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-24 md:h-32 object-cover hover:scale-105 transition-transform"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default SingleProductSwiper;
