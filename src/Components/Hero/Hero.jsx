import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import NissanImage from '/src/assets/Nissan.png';
import Porsche from '/src/assets/Porsche.png';
import Sentinels from '/src/assets/Sentinels.png';
import Custom from '/src/assets/Custom.png';
import { NavLink } from "react-router";
import { ArrowRight } from "lucide-react";

const Hero = () => {
    return (
        <section
            className="w-full h-[650px] px-4 sm:px-6 lg:px-12 xl:px-20 relative pt-20 bg-black">
            {/* Content */}
            <div className="container mx-auto h-full flex flex-col lg:flex-row items-center gap-2 lg:gap-12 relative z-10">
                {/* Left Text Section */}
                <div className="lg:w-1/2 text-center lg:text-left space-y-4">
                    <h1 className="text-3xl sm:text-5xl md:text-5xl lg:text-5xl lg:leading-14 xl:leading-16 leading-10 xl:text-6xl font-bold text-white">
                        Get your <br /> favourite team <br /> <span className="text-[#FFD700]">Jersey and toys!</span>
                    </h1>
                    <p className="mt-4 text-sm sm:text-base leading-5 lg:leading-6 lg:text-lg text-[#F0F0F0]">
                        Grab high quality esports jersey and <br /> racing drift cars from Gamerskit!
                    </p>
                    <div className="mt-6">
                        <NavLink to='/shop'>
                            <button className="px-5 gap-2 py-3 rounded-full flex items-center justify-center mx-auto lg:mx-0 xl:mx-0 2xl:mx-0 text-sm sm:text-base font-bold bg-[#FFD700] text-white hover:bg-[#FFB300] transition-all">
                                Order now
                                <ArrowRight />
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