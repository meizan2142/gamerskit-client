import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import NissanImage from '/src/assets/Nissan.png';
import Porsche from '/src/assets/Porsche.png';
import Sentinels from '/src/assets/Sentinels.png';
import Custom from '/src/assets/Custom.jpg';
import { NavLink } from "react-router";

const Hero = () => {
    return (
        <section
            className="w-full h-[650px] px-4 sm:px-6 lg:px-12 xl:px-20 relative pt-20" // Fixed height here
            style={{
                backgroundImage: "url('/hero-bg.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-[#FFD700]/30"></div>

            {/* Content */}
            <div className="container mx-auto h-full flex flex-col lg:flex-row items-center gap-8 lg:gap-12 relative z-10">
                {/* Left Text Section */}
                <div className="lg:w-1/2 text-center lg:text-left">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                        Elevate Your Business with <span className="text-[#FFD700]">Modern Solutions</span>
                    </h1>
                    <p className="mt-4 text-sm sm:text-base lg:text-lg text-gray-200">
                        We provide cutting-edge solutions to help your business grow and succeed in the digital era.
                    </p>
                    <div className="mt-6">
                        <NavLink to='/shop'>
                            <button className="px-6 py-3 rounded-xl text-sm sm:text-base font-medium bg-[#FFD700] text-black hover:bg-[#FFB300] transition-all">
                                Shop now
                            </button>
                        </NavLink>
                    </div>
                </div>

                {/* Right Slider Section */}
                <div className="lg:w-1/2 w-full mt-8 lg:mt-0">
                    <Swiper
                        modules={[Autoplay]}
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        pagination={{ clickable: true }}
                        loop={true}
                        className="rounded-lg h-full" // Make swiper fill available height
                    >
                        <div className="lg:w-1/2 w-full mt-8 lg:mt-0">
                            <Swiper
                                modules={[Autoplay]}
                                autoplay={{ delay: 5000, disableOnInteraction: false }}
                                pagination={{ clickable: true }}
                                loop={true}
                                className="rounded-lg"
                            >
                                <SwiperSlide>
                                    <div className="overflow-hidden h-64 sm:h-64 md:h-72 lg:h-80 xl:h-96 rounded-lg">
                                        <img src={Sentinels} alt="Slide 3" className="w-full h-full object-contain animated-slide" />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="overflow-hidden h-64 sm:h-64 md:h-72 lg:h-80 xl:h-96 rounded-lg">
                                        <img src={Custom} alt="Slide 3" className="w-full h-full object-contain animated-slide" />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="overflow-hidden h-64 sm:h-64 md:h-72 lg:h-80 xl:h-96 rounded-lg">
                                        <img src={NissanImage} alt="Slide 4" className="w-full h-full object-contain animated-slide" />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="overflow-hidden h-64 sm:h-64 md:h-72 lg:h-80 xl:h-96 rounded-lg">
                                        <img src={Porsche} alt="Slide 4" className="w-full h-full object-contain animated-slide" />
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default Hero;