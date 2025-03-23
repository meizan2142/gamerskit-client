import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import NissanImage from '/src/assets/Nissan.png';
import Porsche from '/src/assets/Porsche.png';
import Sentinels from '/src/assets/Sentinels.png';
import Custom from '/src/assets/Custom.png';

const Hero = () => {
    return (
        <section
            className="w-full min-h-screen py-12 lg:py-32 xl:py-48 2xl:py-72 px-4 sm:px-6 lg:px-12 xl:px-20 relative pt-24 sm:pt-32"
            style={{
                backgroundImage: "url('/hero-bg.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#FAE82A]/80 to-[#FF6F61]/80"></div>

            {/* Content */}
            <div className="container mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-12 relative z-10">
                {/* Left Text Section */}
                <div className="lg:w-1/2 text-center lg:text-left">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                        Elevate Your Business with <span className="text-black">Modern Solutions</span>
                    </h1>
                    <p className="mt-4 text-sm sm:text-base lg:text-lg text-gray-200">
                        We provide cutting-edge solutions to help your business grow and succeed in the digital era.
                    </p>
                    <div className="mt-6">
                        <button className="px-4 py-2 rounded-xl text-sm sm:text-base hover:bg-[#FF6F61] transition-all ease-in bg-black text-white outline-none">
                            Shop now
                        </button>
                    </div>
                </div>

                {/* Right Slider Section */}
                <div className="lg:w-1/2 w-full mt-8 lg:mt-0">
                    <Swiper
                        modules={[Autoplay]}
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        pagination={{ clickable: true }}
                        loop={true}
                        className="rounded-lg"
                    >
                        <SwiperSlide>
                            <div className="overflow-hidden h-48 sm:h-64 md:h-72 lg:h-80 xl:h-96 rounded-lg">
                                <img src={Sentinels} alt="Slide 3" className="w-full h-full object-contain animated-slide" />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="overflow-hidden h-48 sm:h-64 md:h-72 lg:h-80 xl:h-96 rounded-lg">
                                <img src={Custom} alt="Slide 3" className="w-full h-full object-contain animated-slide" />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="overflow-hidden h-48 sm:h-64 md:h-72 lg:h-80 xl:h-96 rounded-lg">
                                <img src={NissanImage} alt="Slide 4" className="w-full h-full object-contain animated-slide" />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="overflow-hidden h-48 sm:h-64 md:h-72 lg:h-80 xl:h-96 rounded-lg">
                                <img src={Porsche} alt="Slide 4" className="w-full h-full object-contain animated-slide" />
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default Hero;