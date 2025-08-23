import { NavLink } from "react-router";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section
      className="relative w-full min-h-[calc(100vh-8rem)] px-4 sm:px-6 lg:px-12 xl:px-20 pt-28 
  bg-[url('https://ik.imagekit.io/Gamerskit/mobile.jpg?updatedAt=1746205747764')] 
  lg:bg-[url('https://ik.imagekit.io/Gamerskit/PC.jpg?updatedAt=1746205763054')] 
  bg-cover bg-center bg-no-repeat flex">
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0"></div>

      <div className="container relative z-10 mx-auto flex flex-col lg:flex-row items-center gap-10">
        {/* Left Content */}
        <div className="lg:w-1/2 text-center lg:text-left space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-white drop-shadow-lg max-w-[600px]">
            Get your favorite team
            <span className="text-[#FFD700]"> Jersey and Toys!</span>
          </h1>
          <p className="mt-2 text-base sm:text-lg lg:text-xl text-gray-200 leading-relaxed">
            Grab high quality esports jerseys and <br /> racing drift cars from
            Gamerskit!
          </p>

          <div className="mt-6 flex justify-center lg:justify-start">
            <NavLink to="/shop">
              <button
                className="px-6 py-3 rounded-full flex items-center gap-2 text-sm sm:text-base font-semibold 
          bg-[#FFD700] text-black hover:bg-[#FFB300] transition-all shadow-lg">
                Order Now
                <ArrowRight className="w-4 h-4" />
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
