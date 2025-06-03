import React from 'react';
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { Link, NavLink } from 'react-router';

const Footer = () => {
    return (
        <footer className="bg-[#1A1A1A] mt-10">
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                {/* Main Content */}
                <div className="lg:flex lg:items-start lg:gap-8">
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-2 lg:grid-cols-5 lg:gap-y-16">
                        {/* Newsletter Section - Full width on mobile, 2 cols on md+ */}
                        <div className="col-span-2">
                            <div>
                                <h2 className="text-2xl font-bold text-white">
                                    Get the latest news!
                                </h2>
                                <p className="mt-4 text-gray-300">
                                    Stay updated with our newest products and exclusive offers.
                                </p>
                            </div>
                        </div>

                        {/* Newsletter Form - Full width on mobile, 2 cols on md+ */}
                        <div className="col-span-2 lg:col-span-3 lg:flex lg:items-end">
                            <form className="w-full">
                                <label htmlFor="UserEmail" className="sr-only">Email</label>
                                <div className="border rounded-md p-2 focus-within:ring-2 focus-within:ring-[#FFD700] sm:flex sm:items-center sm:gap-4 border-gray-700">
                                    <input
                                        type="email"
                                        id="UserEmail"
                                        placeholder="your@email.com"
                                        className="w-full border-none bg-transparent outline-none text-white"
                                    />
                                    <button
                                        className="mt-1 w-full px-6 py-3 text-sm font-bold uppercase tracking-wide transition sm:mt-0 sm:w-auto sm:shrink-0 bg-[#FFD700] text-black hover:bg-[#FFB300] rounded-md"
                                    >
                                        Sign Up
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Footer Links - Always 2 columns on mobile and up */}
                        {[
                            { title: "Helpful Links", items: ['Contact', 'FAQs'] },
                            { title: "Legal", items: ['Terms', 'Privacy Policy'] }
                        ].map((section, index) => (
                            <div key={index} className="col-span-1">
                                <p className="font-medium text-white">{section.title}</p>
                                <ul className="mt-6 space-y-4 text-sm">
                                    {section.items.map((item) => (
                                        <li key={item}>
                                            <a href="#" className="transition text-gray-300 hover:text-[#FFD700]">
                                                {item}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        {/* Social Links - Full width on mobile, 5 cols on lg+ */}
                        <div className="col-span-2 lg:col-span-5">
                            <ul className="flex flex-wrap justify-start gap-6 lg:justify-end">
                                <li>
                                    <Link
                                        to={{ pathname: "https://www.facebook.com/gamerskit.gg" }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            window.open("https://www.facebook.com/gamerskit.gg", "_blank");
                                        }}
                                        className="text-gray-600 transition hover:text-[#FFD700]"
                                    >
                                        <FaFacebookF color='white' className='w-6 h-6' />
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={{ pathname: "https://www.instagram.com/gamerskit.gg" }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            window.open("https://www.instagram.com/gamerskit.gg", "_blank");
                                        }}
                                        className="text-gray-600 transition hover:text-[#FFD700]"
                                    >
                                        <FiInstagram color='white' className='w-6 h-6' />
                                    </Link>
                                </li>
                                <li>
                                    <a
                                        href="https://wa.me/+8801882706510"  // Replace PHONE_NUMBER with the actual number (including country code)
                                        className="text-gray-600 transition hover:text-[#FFD700]"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <FaWhatsapp color='white' className='w-6 h-6' />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="mt-8 border-t  pt-8 border-gray-800">
                    <div className="sm:flex sm:justify-between">
                        <p className="text-xs text-gray-400">
                            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
                        </p>

                        <ul className="mt-4 flex flex-wrap justify-start gap-4 text-xs sm:mt-0 lg:justify-end">
                            {['Terms', 'Privacy', 'Cookies'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-white transition hover:text-[#FFD700]">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='text-xs text-gray-400 text-start my-8 sm:text-center md:text-center lg:text-center'>
                        Developed by <a className='font-bold' href='https://saif-portfolio-9c0a3.web.app' target='_blank'>Saif Sultan Mizan</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;