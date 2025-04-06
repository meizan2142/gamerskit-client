import { useState } from "react";
import { NavLink } from "react-router-dom";
import { navLinks } from "./navData";
import { AlignJustify, ShoppingCart, X } from "lucide-react";
import { Badge } from "@mui/material";
import Dialog from "../user-dialog/Dialog";
import ProductCart from "../ProductCart/ProductCart";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const links = navLinks();


    return (
        <>
            <header className="p-4 lg:px-8 xl:px-20 shadow-none fixed w-full z-50 bg-[#1A1A1A]">
                <div className="container mx-auto flex justify-between items-center">
                    {/* Mobile Menu Button - First on small screens */}
                    <button
                        className="p-2 lg:hidden text-black dark:text-white order-1 lg:order-none"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? (
                            <X size={24} className="hover:text-[#FFB300] dark:hover:text-[#FFD700]" />
                        ) : (
                            <AlignJustify size={24} className="hover:text-[#FFB300] dark:hover:text-[#FFD700]" />
                        )}
                    </button>

                    {/* Logo - Second on small screens */}
                    <a href="#" className="flex items-center text-2xl sm:text-3xl font-bold text-white order-2 lg:order-none mx-auto lg:mx-0">
                        Gamers<span className="text-[#FFD700]">Kit</span>
                    </a>

                    {/* Navigation Links */}
                    <nav
                        className={`lg:flex ${isOpen ? "block" : "hidden"} lg:block absolute lg:relative top-16 lg:top-0 left-0 w-full lg:w-auto bg-white dark:bg-[#1A1A1A] lg:bg-transparent shadow-md lg:shadow-none transition-all order-4 lg:order-none`}
                    >
                        <ul className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-8 xl:space-x-12 text-center p-4 lg:p-0">
                            {links.map((link) => (
                                <li key={link.path}>
                                    <NavLink
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className={({ isActive }) =>
                                            isActive
                                                ? "font-bold text-black dark:text-white text-sm sm:text-base border-b-2 border-[#FFD700]"
                                                : "text-black dark:text-gray-300 hover:text-[#FFB300] dark:hover:text-[#FFD700] transition text-sm sm:text-base"
                                        }
                                    >
                                        {link.pathName}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Icons and Buttons - Third on small screens */}
                    <div className="flex space-x-4 xl:space-x-6 items-center order-3 lg:order-none">
                        {/* Cart */}
                        <Badge badgeContent={4} className="text-green-700 font-bold">
                            <button onClick={() => setIsCartOpen(true)}>
                                <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-black dark:text-white hover:text-[#FFB300] dark:hover:text-[#FFD700]" />
                            </button>
                        </Badge>
                        <Dialog />
                    </div>
                </div>
            </header>
            <ProductCart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
        </>
    );
};

export default Navbar;