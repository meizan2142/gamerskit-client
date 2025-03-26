import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-[#1A1A1A] mt-24">
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                {/* Main Content */}
                <div className="lg:flex lg:items-start lg:gap-8">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5 lg:gap-y-16">
                        {/* Newsletter Section */}
                        <div className="col-span-2">
                            <div>
                                <h2 className="text-2xl font-bold text-black dark:text-white">
                                    Get the latest news!
                                </h2>
                                <p className="mt-4 text-gray-600 dark:text-gray-300">
                                    Stay updated with our newest products and exclusive offers.
                                </p>
                            </div>
                        </div>

                        {/* Newsletter Form */}
                        <div className="col-span-2 lg:col-span-3 lg:flex lg:items-end">
                            <form className="w-full">
                                <label htmlFor="UserEmail" className="sr-only">Email</label>
                                <div className="border border-gray-300 p-2 focus-within:ring-2 focus-within:ring-[#FFD700] sm:flex sm:items-center sm:gap-4 dark:border-gray-700">
                                    <input
                                        type="email"
                                        id="UserEmail"
                                        placeholder="your@email.com"
                                        className="w-full border-none bg-transparent text-black outline-none dark:text-white"
                                    />
                                    <button
                                        className="mt-1 w-full bg-black px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[#333333] sm:mt-0 sm:w-auto sm:shrink-0 dark:bg-[#FFD700] dark:text-black dark:hover:bg-[#FFB300]"
                                    >
                                        Sign Up
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Footer Links */}
                        {[
                            { title: "Services", items: ['1on1 Coaching', 'Company Review', 'Accounts Review'] },
                            { title: "Company", items: ['About', 'Meet the Team', 'Careers'] },
                            { title: "Helpful Links", items: ['Contact', 'FAQs', 'Live Chat'] },
                            { title: "Legal", items: ['Terms', 'Privacy Policy', 'Cookies'] }
                        ].map((section, index) => (
                            <div key={index} className="col-span-2 sm:col-span-1">
                                <p className="font-medium text-black dark:text-white">{section.title}</p>
                                <ul className="mt-6 space-y-4 text-sm">
                                    {section.items.map((item) => (
                                        <li key={item}>
                                            <a href="#" className="text-gray-600 transition hover:text-[#FFB300] dark:text-gray-300 dark:hover:text-[#FFD700]">
                                                {item}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        {/* Social Links */}
                        <div className="col-span-2 lg:col-span-5">
                            <ul className="flex flex-wrap justify-start gap-6 lg:justify-end">
                                {['Facebook', 'Instagram', 'Twitter', 'GitHub'].map((social) => (
                                    <li key={social}>
                                        <a
                                            href="#"
                                            className="text-gray-600 transition hover:text-[#FFB300] dark:text-gray-300 dark:hover:text-[#FFD700]"
                                        >
                                            <span className="sr-only">{social}</span>
                                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                                {/* Social media icons would go here */}
                                            </svg>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="mt-8 border-t border-gray-200 pt-8 dark:border-gray-800">
                    <div className="sm:flex sm:justify-between">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
                        </p>

                        <ul className="mt-4 flex flex-wrap justify-start gap-4 text-xs sm:mt-0 lg:justify-end">
                            {['Terms', 'Privacy', 'Cookies'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-gray-500 transition hover:text-[#FFB300] dark:text-gray-400 dark:hover:text-[#FFD700]">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;