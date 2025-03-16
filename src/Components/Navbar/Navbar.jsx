import { useState } from "react";
import { NavLink } from "react-router-dom";
import { navLinks } from "./navData";
import { AlignJustify, X } from "lucide-react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const links = navLinks();

    return (
        <header className="p-4 bg-white fixed w-full z-50">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <a href="#" className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 32 32" className="w-8 h-8 text-violet-600">
                        <path d="M27.912 7.289l-10.324-5.961c-0.455-0.268-1.002-0.425-1.588-0.425s-1.133 0.158-1.604 0.433l0.015-0.008-10.324 5.961c-0.955 0.561-1.586 1.582-1.588 2.75v11.922c0.002 1.168 0.635 2.189 1.574 2.742l0.016 0.008 10.322 5.961c0.455 0.267 1.004 0.425 1.59 0.425 0.584 0 1.131-0.158 1.602-0.433l-0.014 0.008 10.322-5.961c0.955-0.561 1.586-1.582 1.588-2.75v-11.922c-0.002-1.168-0.633-2.189-1.573-2.742z"></path>
                    </svg>
                </a>

                {/* Navigation Links */}
                <nav className={`lg:flex ${isOpen ? "block" : "hidden"} lg:block absolute lg:relative top-16 lg:top-0 left-0 w-full lg:w-auto bg-white lg:bg-transparent shadow-md lg:shadow-none transition-all`}>
                    <ul className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-12 text-center p-4 lg:p-0">
                        {links.map((link) => (
                            <li key={link.path}>
                                <NavLink
                                    to={link.path}
                                    className={({ isActive }) => isActive ? "font-bold text-black" : "text-black hover:font-bold transition"}
                                >
                                    {link.pathName}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Sign In & Sign Up Buttons */}
                <div className="hidden lg:flex space-x-4 items-center">
                    <button className="px-4 py-2 border rounded hover:bg-gray-100">Sign in</button>
                    <button className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700 transition">Sign up</button>
                </div>

                {/* Mobile Menu Button */}
                <button className="p-4 lg:hidden" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={24} className="text-gray-800" /> : <AlignJustify size={24} className="text-gray-800" />}
                </button>
            </div>
        </header>
    );
};

export default Navbar;
