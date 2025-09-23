import React from "react";
import { motion } from "framer-motion";

const Heading = ({
  title = "Welcome to Our Store",
  subtitle = "Discover amazing products every day",
}) => {
  return (
    <section className="py-10 px-4">
      <div className="max-w-3xl mx-auto text-center">
        {/* Bottom Bar */}
        <motion.div
          className="w-24 h-1.5 bg-yellow-300 mx-auto mt-1 md:mt-3 mb-2 md:mb-4 rounded"
          initial={{ width: 0 }}
          whileInView={{ width: "6rem" }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}></motion.div>

        {/* Main Title */}
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-white mb-1"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}>
          {title}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="text-gray-400 text-sm md:text-md"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.4 }}>
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
};

export default Heading;
