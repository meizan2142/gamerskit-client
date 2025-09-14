import mainLogo from "../../assets/logo.jpg";
import instragramLogo from "../../assets/instragram.svg";
import facebookLogo from "../../assets/facebook.svg";
import whatsAppLogo from "../../assets/whatsappIcon.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Top Fade */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.05) 2px, transparent 1px),
            linear-gradient(to top, rgba(255,255,255,0.05) 2px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          maskImage:
            "linear-gradient(to top, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage:
            "linear-gradient(to top, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)",
        }}
      ></div>

      <div className="relative max-w-screen-xl mx-auto px-4 py-12 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-8 text-center z-10">
        {/* Logo + Description */}
        <div className="pb-5 w-full">
          <div className="flex justify-center items-center gap-3 mb-4">
            <img
              src={mainLogo}
              alt="GamersKit Logo"
              className="w-14 rounded-full"
            />
            <h1 className="font-bold text-2xl">GamersKit</h1>
          </div>
          <p className="text-gray-400 text-sm">
            <span className="font-bold">GamersKit</span> brings you the best
            gaming gears and accessories with top-notch quality and service.
          </p>
        </div>

        {/* Quick Links */}
        <div className="w-full lg:flex lg:justify-center">
          <div>
            <ul className="space-y-2 text-sm lg:space-y-0 lg:flex lg:gap-6">
              {[
                { label: "Home", href: "/" },
                { label: "Shop", href: "/shop" },
                { label: "Media", href: "/media" },
                { label: "My Orders", href: "/my-orders" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="hover:text-[#FFD700] transition">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media */}
        <div>
          <div className="flex justify-center gap-4 md:gap-8">
            <a
              href="https://facebook.com/gamerskit.gg"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FFD700] transition-transform transform hover:scale-110">
              <img src={facebookLogo} className="w-8" alt="" />
            </a>
            <a
              href="https://instagram.com/gamerskit.gg"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FFD700] transition-transform transform hover:scale-110">
              <img src={instragramLogo} className="w-8" alt="" />
            </a>
            <a
              href="https://wa.me/+8801818136701"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FFD700] transition-transform transform hover:scale-110">
              <img src={whatsAppLogo} alt="" className="w-8" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="pb-6 text-xs text-center text-gray-400 z-10 relative">
        <p className="text-gray-400 mt-2 sm:mt-0 text-xs pb-1">
          Designed & Developed by{" "}
          <a
            className="font-bold hover:text-[#FFD700]"
            href="https://saif-portfolio-9c0a3.web.app"
            target="_blank">
            Saif
          </a>
          <span> X </span>
          <a
            className="font-bold hover:text-[#FFD700]"
            href="https://nasif-s-portfolio.web.app/"
            target="_blank">
            Nasif
          </a>
        </p>
        &copy; {new Date().getFullYear()}{" "}
        <span className="font-bold">GamersKit</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;