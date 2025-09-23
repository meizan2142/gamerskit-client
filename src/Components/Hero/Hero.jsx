import { NavLink } from "react-router-dom"; // ✅ should be react-router-dom
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section
      className="relative w-full min-h-[calc(100vh-8rem)] px-4 sm:px-6 lg:px-12 xl:px-20 pt-28 
  bg-[url('https://ik.imagekit.io/Gamerskit/mobile.jpg?updatedAt=1746205747764')] 
  lg:bg-[url('https://ik.imagekit.io/Gamerskit/PC.jpg?updatedAt=1746205763054')] 
  bg-cover bg-center bg-no-repeat flex">
      <div className="container relative z-10 mx-auto flex flex-col lg:flex-row items-center gap-10">
        {/* Left Content */}
        <motion.div
          className="lg:w-1/2 text-center lg:text-left space-y-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}>
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-white drop-shadow-lg max-w-[600px]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}>
            Get your favorite team{" "}
            <span className="text-[#FFD700]">Jersey and Toys!</span>
          </motion.h1>

          <motion.p
            className="mt-2 text-base sm:text-lg lg:text-xl text-gray-200 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.4 }}>
            Grab high quality esports jerseys and <br /> racing drift cars from
            Gamerskit!
          </motion.p>

          <motion.div
            className="mt-6 flex justify-center lg:justify-start"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}>
            <NavLink to="/shop">
              <button
                className="px-6 py-3 rounded-full flex items-center gap-2 text-sm sm:text-base font-semibold 
          bg-[#FFD700] text-black hover:bg-[#FFB300] transition-all shadow-lg">
                Order Now
                <ArrowRight className="w-4 h-4" />
              </button>
            </NavLink>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
