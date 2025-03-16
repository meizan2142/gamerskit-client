import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

const Hero = () => {
    return (
        <section className="w-full bg-gray-100 py-12 lg:py-20">
            <div className="container mx-auto flex flex-col lg:flex-row items-center gap-12 px-6">
                {/* Left Text Section */}
                <div className="lg:w-1/2 text-center lg:text-left">
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                        Elevate Your Business with <span className="text-violet-600">Modern Solutions</span>
                    </h1>
                    <p className="mt-4 text-gray-600 text-lg">
                        We provide cutting-edge solutions to help your business grow and succeed in the digital era.
                    </p>
                    <div className="mt-6">
                        <button className="px-6 py-3 bg-violet-600 text-white font-medium rounded-lg shadow-md hover:bg-violet-700 transition">
                            Get Started
                        </button>
                    </div>
                </div>

                {/* Right Slider Section */}
                <div className="lg:w-1/2 w-full">
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        pagination={{ clickable: true }}
                        loop={true}
                        className="rounded-lg shadow-lg"
                    >
                        <SwiperSlide>
                            <img src="/src/assets/SEN Masters Bangkok Pro Jersey.webp" alt="Slide 1" className="w-full h-72 object-cover  rounded-lg" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="https://source.unsplash.com/600x400/?technology" alt="Slide 2" className="w-full h-72 object-cover rounded-lg" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="https://source.unsplash.com/600x400/?teamwork" alt="Slide 3" className="w-full h-72 object-cover rounded-lg" />
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </section>
    )
}

export default Hero