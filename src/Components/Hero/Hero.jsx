import { NavLink } from "react-router";
import { ArrowRight } from "lucide-react";

const Hero = () => {
    return (
        <section
            className="w-full h-[800px] px-4 sm:px-6 md:px-6 lg:px-12 xl:px-20 relative pt-20 
               bg-[url('http://res.cloudinary.com/dyqjzfdwi/image/upload/v1745168508/nqagnygx4btwww13iexg.jpg')] 
               lg:bg-[url('http://res.cloudinary.com/dyqjzfdwi/image/upload/v1745170101/wlxhoah43ubpcmyuykpo.jpg')] 
               md:bg-[url('http://res.cloudinary.com/dyqjzfdwi/image/upload/v1745168246/nmpxmhxi8yk20v4qxuf0.jpg')] 
               bg-cover bg-center bg-no-repeat"
        >
            {/* Content */}
            <div className="container mx-auto h-full flex flex-col lg:flex-row items-center gap-2 lg:gap-12 relative z-10">
                {/* Left Text Section */}
                <div className="lg:w-1/2 text-center lg:text-left space-y-">
                    <h1 className="text-3xl sm:text-5xl md:text-5xl lg:text-5xl lg:leading-14 md:leading-12 xl:leading-16 leading-10 xl:text-6xl font-bold text-white">
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
            </div>
        </section>
    );
};

export default Hero;