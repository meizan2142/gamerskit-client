import React from 'react';
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { Link, NavLink } from 'react-router';

const Footer = () => {
    return (
        <footer className="bg-[#1A1A1A] mt-10 text-white">
            <div className="max-w-screen-xl mx-auto px-4 py-12 sm:px-6 lg:px-8">

                {/* Newsletter Section */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 md:gap-4">
                    <div>
                        <h2 className="text-2xl font-bold">Get the latest news!</h2>
                        <p className="mt-2 text-gray-300 text-sm sm:text-base">
                            Stay updated with our newest products and exclusive offers.
                        </p>
                    </div>

                    <form className="flex flex-col sm:flex-row gap-2 sm:gap-0 w-full md:w-auto">
                        <input
                            type="email"
                            placeholder="your@email.com"
                            className="w-full md:w-64 px-3 py-2 rounded-l-md border border-gray-700 bg-[#111] text-white outline-none focus:ring-2 focus:ring-[#FFD700]"
                        />
                        <button className="px-5 py-2 bg-[#FFD700] hover:bg-[#FFB300] text-black font-bold rounded-r-md transition">
                            Sign Up
                        </button>
                    </form>
                </div>

                {/* Links Section */}
                <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-8">
                    {[
                        { title: "Helpful Links", items: ['Contact', 'FAQs'] },
                        { title: "Legal", items: ['Terms', 'Privacy Policy'] }
                    ].map((section, idx) => (
                        <div key={idx}>
                            <p className="font-medium">{section.title}</p>
                            <ul className="mt-4 space-y-2 text-sm">
                                {section.items.map((item) => (
                                    <li key={item}>
                                        <a href="#" className="hover:text-[#FFD700] transition">{item}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Social Links */}
                    <div className="col-span-2 sm:col-span-2 flex gap-4 lg:justify-end mt-4 lg:mt-0">
                        <Link href="#" onClick={(e) => { e.preventDefault(); window.open("https://facebook.com/gamerskit.gg", "_blank") }} className="hover:text-[#FFD700] transition-transform transform hover:scale-110">
                            <FaFacebookF size={20} />
                        </Link>
                        <Link href="#" onClick={(e) => { e.preventDefault(); window.open("https://instagram.com/gamerskit.gg", "_blank") }} className="hover:text-[#FFD700] transition-transform transform hover:scale-110">
                            <FiInstagram size={20} />
                        </Link>
                        <a href="https://wa.me/+8801818136701" target="_blank" rel="noopener noreferrer" className="hover:text-[#FFD700] transition-transform transform hover:scale-110">
                            <FaWhatsapp size={20} />
                        </a>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="mt-10 border-t border-gray-800 pt-6 text-sm sm:text-xs flex flex-col sm:flex-row justify-between items-center">
                    <p className="text-gray-400">&copy; {new Date().getFullYear()} GamersKit. All rights reserved.</p>
                    <p className="text-gray-400 mt-2 sm:mt-0">
                        Designed & Developed by <a className="font-bold hover:text-[#FFD700]" href="https://saif-portfolio-9c0a3.web.app" target="_blank">Saif Sultan Mizan</a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
