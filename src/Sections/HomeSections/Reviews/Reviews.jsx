import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

const Reviews = () => {
  const reviews = [
    {
      name: "Alex Johnson",
      review:
        "GamersKit is amazing! Got my gaming headset delivered super fast and the quality is top-notch.",
      img: "https://i.pravatar.cc/100?img=1",
      rating: 5,
    },
    {
      name: "Samantha Lee",
      review:
        "I love the variety of products here. The prices are great and the customer service was very helpful.",
      img: "https://i.pravatar.cc/100?img=2",
      rating: 4,
    },
    {
      name: "David Miller",
      review:
        "Best place for gamers! I ordered my mechanical keyboard and it feels perfect for my gaming setup.",
      img: "https://i.pravatar.cc/100?img=3",
      rating: 5,
    },
    {
      name: "Rachel Green",
      review:
        "The gaming chair I bought is super comfortable, great support for long sessions!",
      img: "https://i.pravatar.cc/100?img=4",
      rating: 4,
    },
    {
      name: "Michael Scott",
      review:
        "Fast delivery and authentic products. Definitely shopping again!",
      img: "https://i.pravatar.cc/100?img=5",
      rating: 5,
    },
  ];

  return (
    <section className="relative py-12 bg-black text-white overflow-hidden">
      {/* Full Linear Strip Background with Bottom Fade */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)",
        }}
      ></div>

      <div className="relative 2xl:container 2xl:mx-auto px-4 text-center z-10">
        {/* Title + Subtitle */}
        <h2 className="text-3xl font-bold">What Gamers Say</h2>
        <p className="text-gray-400 mt-2 mb-8 text-lg">
          Reviews from our Facebook Page
        </p>

        {/* Swiper */}
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{
            clickable: true,
            el: ".custom-swiper-pagination",
            bulletClass: "swiper-pagination-bullet custom-bullet",
            bulletActiveClass: "swiper-pagination-bullet-active custom-bullet-active",
          }}
        >
          {reviews.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="p-6 bg-[#1c1c1c] rounded-2xl shadow-lg flex flex-col h-full min-h-[280px]">
                <FaQuoteLeft className="text-yellow-400 text-3xl mb-4" />
                <p className="text-lg italic flex-grow">"{item.review}"</p>
                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center space-x-3">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-12 h-12 rounded-full border-2 border-yellow-400"
                    />
                    <span className="font-semibold">{item.name}</span>
                  </div>
                  <div className="flex">
                    {Array.from({ length: 5 }, (_, i) => (
                      <FaStar
                        key={i}
                        className={`${
                          i < item.rating ? "text-yellow-400" : "text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Pagination */}
        <div className="custom-swiper-pagination mt-6 flex justify-center"></div>
      </div>

      {/* Custom Swiper Bullets */}
      <style>
        {`
          .custom-bullet {
            background-color: #FFD700;
            opacity: 0.5;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            margin: 0 6px !important;
            transition: all 0.3s ease;
          }
          .custom-bullet-active {
            opacity: 1;
            transform: scale(1.2);
          }
        `}
      </style>
    </section>
  );
};

export default Reviews;
