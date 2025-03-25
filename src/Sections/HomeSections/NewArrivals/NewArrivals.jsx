const NewArrivals = () => {
    return (
        <div className="space-y-10 mt-24 px-4 sm:px-6 lg:px-8">
            {/* Heading */}
            <div className="text-center space-y-5">
                <h1 className="text-black font-bold text-3xl sm:text-4xl md:text-5xl">
                    New Arrivals
                </h1>
                <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto px-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, ducimus. Repudiandae molestias eaque qui? Voluptatem nisi commodi libero, molestiae dolores deleniti, obcaecati aliquid ab aperiam illum cumque laboriosam, ipsum veniam.
                </p>
            </div>

            {/* Cards */}
            <div className="2xl:container 2xl:mx-auto">
                {/* Parent Div of cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
                    {/* Single Card */}
                    <div className="w-full space-y-4 rounded-lg bg-white p-6 shadow-lg dark:bg-[#18181B]">
                        <div className="overflow-hidden rounded-lg">
                            <img
                                width={400}
                                height={400}
                                className="h-[275px] w-full rounded-lg object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="jersey image"
                            />
                        </div>
                        <div className="grid gap-2">
                            <h1 className="text-lg font-semibold">Product Name</h1>
                            <p className="text-sm text-gray-500 dark:text-white/60">
                                This is a brief description of the product. It highlights the key features and benefits.
                            </p>
                            <div className="text-lg font-semibold">$99.99</div>
                        </div>
                        <div className="flex gap-4">
                            <button className="rounded-lg bg-slate-800 px-4 py-2 text-xs sm:text-sm font-semibold text-white duration-300 hover:bg-slate-950">
                                Add to Cart
                            </button>
                            <button className="rounded-md border border-black px-4 py-2 text-xs sm:text-sm dark:border-white dark:hover:text-slate-800 dark:hover:bg-white duration-300 hover:bg-gray-200">
                                View Details
                            </button>
                        </div>
                    </div>
                    <div className="w-full space-y-4 rounded-lg bg-white p-6 shadow-lg dark:bg-[#18181B]">
                        <div className="overflow-hidden rounded-lg">
                            <img
                                width={400}
                                height={400}
                                className="h-[275px] w-full rounded-lg object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="jersey image"
                            />
                        </div>
                        <div className="grid gap-2">
                            <h1 className="text-lg font-semibold">Product Name</h1>
                            <p className="text-sm text-gray-500 dark:text-white/60">
                                This is a brief description of the product. It highlights the key features and benefits.
                            </p>
                            <div className="text-lg font-semibold">$99.99</div>
                        </div>
                        <div className="flex gap-4">
                            <button className="rounded-lg bg-slate-800 px-4 py-2 text-xs sm:text-sm font-semibold text-white duration-300 hover:bg-slate-950">
                                Add to Cart
                            </button>
                            <button className="rounded-md border border-black px-4 py-2 text-xs sm:text-sm dark:border-white dark:hover:text-slate-800 dark:hover:bg-white duration-300 hover:bg-gray-200">
                                View Details
                            </button>
                        </div>
                    </div>
                    <div className="w-full space-y-4 rounded-lg bg-white p-6 shadow-lg dark:bg-[#18181B]">
                        <div className="overflow-hidden rounded-lg">
                            <img
                                width={400}
                                height={400}
                                className="h-[275px] w-full rounded-lg object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="jersey image"
                            />
                        </div>
                        <div className="grid gap-2">
                            <h1 className="text-lg font-semibold">Product Name</h1>
                            <p className="text-sm text-gray-500 dark:text-white/60">
                                This is a brief description of the product. It highlights the key features and benefits.
                            </p>
                            <div className="text-lg font-semibold">$99.99</div>
                        </div>
                        <div className="flex gap-4">
                            <button className="rounded-lg bg-slate-800 px-4 py-2 text-xs sm:text-sm font-semibold text-white duration-300 hover:bg-slate-950">
                                Add to Cart
                            </button>
                            <button className="rounded-md border border-black px-4 py-2 text-xs sm:text-sm dark:border-white dark:hover:text-slate-800 dark:hover:bg-white duration-300 hover:bg-gray-200">
                                View Details
                            </button>
                        </div>
                    </div>
                    <div className="w-full space-y-4 rounded-lg bg-white p-6 shadow-lg dark:bg-[#18181B]">
                        <div className="overflow-hidden rounded-lg">
                            <img
                                width={400}
                                height={400}
                                className="h-[275px] w-full rounded-lg object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="jersey image"
                            />
                        </div>
                        <div className="grid gap-2">
                            <h1 className="text-lg font-semibold">Product Name</h1>
                            <p className="text-sm text-gray-500 dark:text-white/60">
                                This is a brief description of the product. It highlights the key features and benefits.
                            </p>
                            <div className="text-lg font-semibold">$99.99</div>
                        </div>
                        <div className="flex gap-4">
                            <button className="rounded-lg bg-slate-800 px-4 py-2 text-xs sm:text-sm font-semibold text-white duration-300 hover:bg-slate-950">
                                Add to Cart
                            </button>
                            <button className="rounded-md border border-black px-4 py-2 text-xs sm:text-sm dark:border-white dark:hover:text-slate-800 dark:hover:bg-white duration-300 hover:bg-gray-200">
                                View Details
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewArrivals