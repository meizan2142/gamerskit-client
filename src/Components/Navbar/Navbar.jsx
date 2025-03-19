import { useState } from "react";
import { NavLink } from "react-router-dom";
import { navLinks } from "./navData";
import { AlignJustify, Heart, MailIcon, ShoppingCart, X } from "lucide-react";
import { Badge } from "@mui/material";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const links = navLinks();

    return (
        <header className="p-4 shadow-none fixed w-full z-50">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <a href="#" className="flex items-center @7xl:text-4xl xs:text-3xl md:text-4xl @2xs:text-4xl font-bold">
                    Gamers<span className="text-[#FAE82A]">Kit</span>  
                </a>

                {/* Navigation Links */}
                <nav className={`lg:flex ${isOpen ? "block" : "hidden"} lg:block absolute lg:relative top-16 lg:top-0 left-0 w-full lg:w-auto bg-white lg:bg-transparent shadow-md lg:shadow-none transition-all`}>
                    <ul className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-12 text-center p-4 lg:p-0">
                        {links.map((link) => (
                            <li key={link.path}>
                                <NavLink
                                    to={link.path}
                                    className={({ isActive }) => isActive ? "font-bold text-black text-base" : "text-black hover:font-bold transition text-base"}
                                >
                                    {link.pathName}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Sign In & Sign Up Buttons */}
                <div className="hidden lg:flex space-x-6 items-center">
                    <Badge badgeContent={4} color="secondary">
                        <Heart />
                    </Badge>
                    <Badge badgeContent={4} color="primary">
                        <ShoppingCart />
                    </Badge>
                    <button className="px-4 py-2 rounded-xl text-base hover:bg-[#FF6F61] transition-all ease-in bg-black text-white outline-none">Sign in</button>
                    <button className="px-4 py-2 rounded-xl text-base hover:bg-[#FF6F61] transition-all ease-in bg-black text-white outline-none">Sign up</button>
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
