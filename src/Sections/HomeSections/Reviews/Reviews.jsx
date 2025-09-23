import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import Heading from "../../../Components/Heading";

const Reviews = () => {
  const reviews = [
    {
      name: "Mohammed Ihfaz Abedin",
      review:
        "Bought the RC GTR car from them. The RC car is really high-quality and they are so cooperative",
      img: "https://i.ibb.co.com/N6m84qGk/464776146-2043910189406672-2430777052060718725-n.jpg",
      rating: 5,
    },
    {
      name: "Sameer Rashid",
      review:
        "The admins were very co operative. This rc car is super fun and well-made! The colors are bright. I recommend this page.",
      img: "https://i.ibb.co.com/Vpp7rYwT/523801024-1296754335355376-5991493133399493592-n.jpg",
      rating: 5,
    },
    {
      name: "Abu Ayub Ansare",
      review:
        "Bought the RC GTR car from them. The RC car is really high-quality and their behaviour is really good❤️",
      img: "https://i.ibb.co.com/4wm12RmJ/480827413-1140797237539229-7132170754175881763-n.jpg",
      rating: 4,
    },
    {
      name: "Nayeem Hossain",
      review:
        "I ordered two of the sentinels half sleeve jerseys. One is black and another one is special edition. Both of them are best quality jerseys. I am going to order two more jerseys for my dad. Must recommend, buy from GamersKit!! 💙👌🏻",
      img: "https://i.ibb.co.com/V09Y5FDM/506845305-2864256783760727-1966484007278259698-n.jpg",
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
            linear-gradient(to right, rgba(255,255,255,0.05) 2px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 2px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)",
        }}></div>

      <div className="relative 2xl:container 2xl:mx-auto px-4 text-center z-10">
        <Heading
          title="What Gamers Say"
          subtitle="Reviews from our Facebook Page"
        />

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
            bulletActiveClass:
              "swiper-pagination-bullet-active custom-bullet-active",
          }}>
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
