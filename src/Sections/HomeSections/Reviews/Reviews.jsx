import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import Heading from "../../../Components/Heading";

const Reviews = () => {
  const reviews = [
    {
      name: "Sazzad Hossain Rufiat",
      review:
        "fast delivery and friendly owner! the quality of rc car is very good going to order another one soon!",
      img: "https://scontent.fcgp27-1.fna.fbcdn.net/v/t39.30808-1/431373062_1834140637031609_8147741017359682088_n.jpg?stp=cp0_dst-jpg_s80x80_tt6&_nc_cat=106&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeE7GiDkyGF-i9U1_trGa5W6CwEunsPTBqYLAS6ew9MGpkrxk18GSqFdTSJvK_hDvXkXc6kNxRQmoUXkOfH3sgCK&_nc_ohc=MTB5AOONmbYQ7kNvwFSkZej&_nc_oc=AdmSW6E6Of4mJg0QVeSCMc5QgnsLqwi0B3fnvjcw_5HtfxVsbF6MXXCpx-BrrfXauf7JphRlE0PHX9wzsJqkSMw7&_nc_zt=24&_nc_ht=scontent.fcgp27-1.fna&_nc_gid=wgcU2Zp5SnfkvdOJYg2wCA&oh=00_AfbIoe_BEa3jvs90WMRuIEbZOzrCvdrqI4ejc79OemYQTw&oe=68C84F61",
      rating: 5,
    },
    {
      name: "Mohammed Ihfaz Abedin",
      review:
        "Bought the RC GTR car from them. The RC car is really high-quality and they are so cooperative",
      img: "https://scontent.fcgp38-1.fna.fbcdn.net/v/t39.30808-1/464776146_2043910189406672_2430777052060718725_n.jpg?stp=dst-jpg_s480x480_tt6&_nc_cat=108&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeFe7D7UCRJ1KprVbPwDH0p-TtmxKsU5pN1O2bEqxTmk3SngCcRDUuCYNLO-9e9w_aZGoQg4PU0lfoJM_31a_ThY&_nc_ohc=PKw3Va_nAKAQ7kNvwHG0-PY&_nc_oc=AdlrgFH2v4TjhVFKQsxXa66pu-bpRjxokjiovkMTZA_id71Lxiw_BQJ9ICiMQbGyf5PEeiyfn9LqseWJq7e9-2AY&_nc_zt=24&_nc_ht=scontent.fcgp38-1.fna&_nc_gid=hMUmI81ZhWVp6hwzOFic3g&oh=00_AfZ3hXUYlsXEkVxsCfY2ipvV6p4ggCsVtd1jQV_7rqI2MQ&oe=68C8537B",
      rating: 5,
    },
    {
      name: "Sameer Rashid",
      review:
        "The admins were very co operative. This rc car is super fun and well-made! The colors are bright. I recommend this page.",
      img: "https://scontent.fcgp27-1.fna.fbcdn.net/v/t39.30808-1/523801024_1296754335355376_5991493133399493592_n.jpg?stp=dst-jpg_s480x480_tt6&_nc_cat=107&ccb=1-7&_nc_sid=1d2534&_nc_eui2=AeHe9O75XsrXPALUhW7iPE4wOsk8xVTWdjM6yTzFVNZ2M-23aQTgKYq_y7aZTsgZfvmny4qqppFBHKkKe5-Jq91l&_nc_ohc=6QXGW-N6CdsQ7kNvwF9etnx&_nc_oc=AdkY2KXHWH9l-8JZKCNvKcnMS8TK_i50TOarmxfQWKIRSDXKZ-yMqOqYHTPScGiP1HBDxwzenUIY4BiDyGkG6VZY&_nc_zt=24&_nc_ht=scontent.fcgp27-1.fna&_nc_gid=wHufKSQ-jvokBzpbt61sYw&oh=00_AfaT-mQ1KcKdx4y-xFhzBpdopLNWG96q1smelTpseHOWDw&oe=68C86673",
      rating: 5,
    },
    {
      name: "Abu Ayub Ansare",
      review:
        "Bought the RC GTR car from them. The RC car is really high-quality and their behaviour is really good❤️",
      img: "https://scontent.fcgp38-1.fna.fbcdn.net/v/t39.30808-1/480827413_1140797237539229_7132170754175881763_n.jpg?stp=dst-jpg_s480x480_tt6&_nc_cat=103&ccb=1-7&_nc_sid=1d2534&_nc_eui2=AeEeQhaPMGlcFXMplfHcex8q9yOijdQagUH3I6KN1BqBQZQuT_FAn9UIaLv9xbFfJ9jCM14EWR0Kt7PKtXAzkNdZ&_nc_ohc=SDfh9YFb-o0Q7kNvwHscIRB&_nc_oc=Adn85m82-7afsteQrtfn1bfQpCjS8jnhIFwDjS1LIXk-d2LAx4mL0Zbl7yNSZa-g9QJP1K0GO2t5_qbGBb8FUOVR&_nc_zt=24&_nc_ht=scontent.fcgp38-1.fna&_nc_gid=aud9nkrC0pgIVoN_Lp1_WA&oh=00_Afb24KDr-DcxU8E3m_FiUBvg1EHe0UdrNBk1O7FmFKgUgQ&oe=68C84FAC",
      rating: 4,
    },
    {
      name: "Nayeem Hossain",
      review:
        "I ordered two of the sentinels half sleeve jerseys. One is black and another one is special edition. Both of them are best quality jerseys. I am going to order two more jerseys for my dad. Must recommend, buy from GamersKit!! 💙👌🏻",
      img: "https://scontent.fcgp27-1.fna.fbcdn.net/v/t39.30808-1/506845305_2864256783760727_1966484007278259698_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=100&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeHC5TZXOCiQaErotD_y8IFsFAzlXrm3wU0UDOVeubfBTYRr0swcyFPOo7gG-K5JY6xeJ3tUZOvLPobKACyu2PA_&_nc_ohc=C_-xcM8NQYQQ7kNvwE0tHXQ&_nc_oc=Adl-WBe9yhB9o32brFW-AoTr2S5TC65KqXI08fAMKwcMQ4EMtyXTMpFgvmz1iHYdwKiIZ_QLCfIZXshZmlXfYq6E&_nc_zt=24&_nc_ht=scontent.fcgp27-1.fna&_nc_gid=DpUBOlpvGNmnc2n9PQUYiQ&oh=00_AfbcXvJboSJtoYLleUOYE0Vge0nM6K4cr__WqBV6M0sOfA&oe=68C864F4",
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
