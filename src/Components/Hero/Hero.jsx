import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import loudImage from '/src/assets/loud.png';
import TeamLiquidImage from '/src/assets/Team Liquid.png';
import PRXIMAGE from '/src/assets/PRX.png';
// import NissanImage from '/src/assets/Nissan.png';

const Hero = () => {
    return (
        <section
            className="w-full min-h-screen py-12 lg:py-72 relative pt-32"
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
            <div className="container mx-auto flex flex-col lg:flex-row items-center gap-12 px-6 relative z-10">
                {/* Left Text Section */}
                <div className="lg:w-1/2 text-center lg:text-left">
                    <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                        Elevate Your Business with <span className="text-black">Modern Solutions</span>
                    </h1>
                    <p className="mt-4 text-black text-lg">
                        We provide cutting-edge solutions to help your business grow and succeed in the digital era.
                    </p>
                    <div className="mt-6">
                        <button className="px-4 py-2 rounded-xl text-base hover:bg-[#FF6F61] transition-all ease-in bg-black text-white outline-none">Shop now</button>
                    </div>
                </div>

                {/* Right Slider Section */}
                <div className="lg:w-1/2 w-full">
                    <Swiper
                        modules={[Autoplay]}
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        pagination={{ clickable: true }}
                        loop={true}
                        className="rounded-lg"
                    >
                        <SwiperSlide>
                            <div className="overflow-hidden h-72 rounded-lg">
                                <img src={loudImage} alt="Slide 1" className="w-full h-full object-contain animated-slide" />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="overflow-hidden h-72 rounded-lg">
                                <img src={TeamLiquidImage} alt="Slide 2" className="w-full h-full object-contain animated-slide" />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="overflow-hidden h-72 rounded-lg">
                                <img src={PRXIMAGE} alt="Slide 3" className="w-full h-full object-contain animated-slide" />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="overflow-hidden h-72 rounded-lg">
                                <img src={TeamLiquidImage} alt="Slide 4" className="w-full h-full object-contain animated-slide" />
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </section>
    )
}

export default Hero