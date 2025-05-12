import { useEffect, useState } from "react";

const StockModal = ({ data }) => {
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        if (openModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [openModal]);
    return (
        <div className="pt-2">
            <button
                onClick={() => setOpenModal(true)}
                className="rounded-lg bg-gradient-to-r from-gray-700 to-gray-600 px-6 py-2.5 font-medium text-white transition-all hover:from-gray-800 hover:to-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
                Update Closing Stock
            </button>

            <div
                className={`fixed inset-0 z-[100] grid place-items-center bg-black/30 backdrop-blur transition-opacity duration-200 ${openModal ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
                onClick={() => setOpenModal(false)}
            >
                <div
                    className={`relative my-12 w-full max-w-sm transform transition-all duration-200 ${openModal ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`}
                    onClick={(e_) => e_.stopPropagation()}
                >
                    <div className="rounded-xl bg-white p-5 shadow-lg sm:p-6 dark:bg-gray-900">
                        <div className="flex justify-end">
                            <button onClick={() => setOpenModal(false)} className="rounded-full p-1.5 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
                                <svg className="h-5 w-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-900 dark:text-white">{data.title}</h2>

                        <form className="space-y-5">
                            <div className="flex gap-2">
                                <div className="relative">
                                    <input
                                        id="total"
                                        type="number"
                                        className="peer w-full rounded-md border border-gray-300 bg-transparent px-4 py-2.5 text-gray-900 placeholder-transparent focus:outline-none focus:ring-1 focus:ring-gray-500 dark:border-gray-700 dark:text-white"
                                        placeholder="Opening Stock"
                                    />
                                    <label
                                        htmlFor="Opening Stock"
                                        className="absolute -top-2 left-3 bg-white px-1 text-xs font-medium text-gray-600 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-gray-600 dark:bg-gray-900 dark:text-gray-400 dark:peer-focus:text-gray-400"
                                    >
                                        Opening Stock
                                    </label>
                                </div>

                                <div className="relative">
                                    <input
                                        id="sold"
                                        type="number"
                                        className="peer w-full rounded-md border border-gray-300 bg-transparent px-4 py-2.5 text-gray-900 placeholder-transparent focus:outline-none focus:ring-1 focus:ring-gray-500 dark:border-gray-700 dark:text-white"
                                        placeholder="Sold Products"
                                    />
                                    <label
                                        htmlFor="sold"
                                        className="absolute -top-2 left-3 bg-white px-1 text-xs font-medium text-gray-600 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-gray-600 dark:bg-gray-900 dark:text-gray-400 dark:peer-focus:text-gray-400"
                                    >
                                        Sold Products
                                    </label>
                                </div>
                            </div>

                            <div className="relative">
                                <input
                                    id="closing"
                                    type="number"
                                    className="peer w-full rounded-md border border-gray-300 bg-transparent px-4 py-2.5 text-gray-900 placeholder-transparent focus:outline-none focus:ring-1 focus:ring-gray-500 dark:border-gray-700 dark:text-white"
                                    placeholder="Closing Stock"
                                />
                                <label
                                    htmlFor="closing"
                                    className="absolute -top-2 left-3 bg-white px-1 text-xs font-medium text-gray-600 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-gray-600 dark:bg-gray-900 dark:text-gray-400 dark:peer-focus:text-gray-400"
                                >
                                    Closing Stock
                                </label>
                            </div>
                            <button
                                type="button"
                                className="w-full rounded-lg bg-gradient-to-r from-gray-700 to-gray-600 px-6 py-2.5 font-medium text-white transition-all hover:from-gray-800 hover:to-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StockModal