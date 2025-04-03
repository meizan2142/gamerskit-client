import { useState } from "react";
import { NavLink } from "react-router-dom";
import { navLinks } from "./navData";
import { AlignJustify, Heart, MailIcon, ShoppingCart, User, X } from "lucide-react";
import { Badge } from "@mui/material";
import Dialog from "../user-dialog/Dialog";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false); // New state for cart sidebar
    const links = navLinks();

    return (
        <>
            <header className="p-4 lg:px-8 xl:px-20 shadow-none fixed w-full z-50 bg-white dark:bg-[#1A1A1A]">
                <div className="container mx-auto flex justify-between items-center">
                    {/* Logo - Yellow accent */}
                    <a href="#" className="flex items-center text-2xl sm:text-3xl font-bold text-black dark:text-white">
                        Gamers<span className="text-[#FFD700]">Kit</span>
                    </a>

                    {/* Navigation Links */}
                    <nav
                        className={`lg:flex ${isOpen ? "block" : "hidden"} lg:block absolute lg:relative top-16 lg:top-0 left-0 w-full lg:w-auto bg-white dark:bg-[#1A1A1A] lg:bg-transparent shadow-md lg:shadow-none transition-all`}
                    >
                        <ul className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-8 xl:space-x-12 text-center p-4 lg:p-0">
                            {links.map((link) => (
                                <li key={link.path}>
                                    <NavLink
                                        to={link.path}
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

                    {/* Icons and Buttons */}
                    <div className="hidden lg:flex space-x-4 xl:space-x-6 items-center">
                        {/* Wishlist */}
                        <Badge badgeContent={4} className="text-yellow-400 font-bold hover:text-[#FFB300]">
                            <NavLink to='/wishlist'>
                                <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-black dark:text-white hover:text-[#FFB300] dark:hover:text-[#FFD700]" />
                            </NavLink>
                        </Badge>
                        {/* Cart */}
                        <Badge badgeContent={4} className="text-green-700 font-bold">
                            <button onClick={() => setIsCartOpen(true)}>
                                <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-black dark:text-white hover:text-[#FFB300] dark:hover:text-[#FFD700]" />
                            </button>
                        </Badge>
                        <Dialog />
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="p-2 lg:hidden text-black dark:text-white"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? (
                            <X size={24} className="hover:text-[#FFB300] dark:hover:text-[#FFD700]" />
                        ) : (
                            <AlignJustify size={24} className="hover:text-[#FFB300] dark:hover:text-[#FFD700]" />
                        )}
                    </button>
                </div>
            </header>

            {/* Cart Sidebar */}
            <div className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white dark:bg-[#1A1A1A] shadow-lg transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-50`}>
                <div className="p-6 h-full flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-black dark:text-white">Your Cart</h2>
                        <button
                            onClick={() => setIsCartOpen(false)}
                            className="text-black dark:text-white hover:text-[#FFB300] dark:hover:text-[#FFD700]"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Cart items will go here */}
                    <div className="flex-1 overflow-y-auto">
                        {/* Example cart item */}
                        <div className="border-b border-gray-200 dark:border-gray-700 py-4">
                            <p className="text-black dark:text-white">Product Name</p>
                            <p className="text-[#FFD700]">$99.99</p>
                        </div>
                        {/* If cart is empty */}
                        <p className="text-white font-normal text-base">Your cart is currently empty.</p>
                    </div>

                    {/* Cart summary and checkout */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                        <div className="flex justify-between mb-4">
                            <span className="text-black dark:text-white">Total:</span>
                            <span className="text-[#FFD700] font-bold">$99.99</span>
                        </div>
                        <button className="w-full bg-[#FFD700] hover:bg-[#FFB300] text-black font-bold py-2 px-4 rounded transition">
                            Checkout
                        </button>
                    </div>
                </div>
            </div>

            {/* Overlay when cart is open */}
            {isCartOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setIsCartOpen(false)}
                />
            )}
        </>
    );
};

export default Navbar;