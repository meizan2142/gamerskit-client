import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";

const Hero = () => {
    return (
        <section className="w-full bg-gradient-to-t from-gray-500 to-blue-500 min-h-screen py-12 lg:py-72">
            <div className="container mx-auto flex flex-col lg:flex-row items-center gap-12 px-6">
                {/* Left Text Section */}
                <div className="lg:w-1/2 text-center lg:text-left">
                    <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                        Elevate Your Business with <span className="text-black">Modern Solutions</span>
                    </h1>
                    <p className="mt-4 text-black text-lg">
                        We provide cutting-edge solutions to help your business grow and succeed in the digital era.
                    </p>
                    <div className="mt-6">
                        <button className="px-6 py-3 bg-violet-600 text-white font-medium rounded-lg shadow-md hover:bg-violet-700 transition">
                            Shop now
                        </button>
                    </div>
                </div>

                {/* Right Slider Section */}
                <div className="lg:w-1/2 w-full">
                    <Swiper
                        modules={[Autoplay]}
                        autoplay={{ delay: 7000, disableOnInteraction: false }}
                        pagination={{ clickable: true }}
                        loop={true}
                        className="rounded-lg"
                    >
                        <SwiperSlide>
                            <div className="overflow-hidden h-72 rounded-lg">
                                <img src="/src/assets/loud.png" alt="Slide 1" className="w-full h-full object-contain animated-slide" />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="overflow-hidden h-72 rounded-lg">
                                <img src="/src/assets/loud.png" alt="Slide 2" className="w-full h-full object-contain animated-slide" />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="overflow-hidden h-72 rounded-lg">
                                <img src="/src/assets/loud.png" alt="Slide 3" className="w-full h-full object-contain animated-slide" />
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </section>
    )
}

export default Hero