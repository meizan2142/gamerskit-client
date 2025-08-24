import React from "react";

const Heading = ({
  title = "Welcome to Our Store",
  subtitle = "Discover amazing products every day",
}) => {
  return (
    <section className="py-10 px-4">
      <div className="max-w-3xl mx-auto text-center">
        {/* Main Title */}
        {/* Bottom Bar */}
        <div className="w-24 h-1.5 bg-yellow-300 mx-auto mt-1 md:mt-3 mb-2 md:mb-4 rounded"></div>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">{title}</h2>
        {/* Subtitle */}
        <p className="text-gray-400 text-sm md:text-md">{subtitle}</p>
      </div>
    </section>
  );
};

export default Heading;
